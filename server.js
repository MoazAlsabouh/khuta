require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const bcrypt = require("bcryptjs");
const mailer = require("./mailer");

const User = require("./models/User");
const Lesson = require("./models/Lesson");
const LessonProgress = require("./models/LessonProgress");
const Channel = require("./models/Channel");
const Exam = require("./models/Exam");
const WeeklyTask = require("./models/WeeklyTask");
const WeeklyActivity = require("./models/WeeklyActivity");

const app = express();
const port = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/study-dashboard";

mongoose.connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET || "supersecretkey",
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: MONGO_URI }),
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 } // 1 week
}));

// Load user from session
app.use(async (req, res, next) => {
  if (req.session.userId) {
    try {
      req.user = await User.findById(req.session.userId);
    } catch (err) {
      console.error(err);
    }
  }
  next();
});

function requireAuth(req, res, next) {
  if (req.user) return next();
  if (req.path.startsWith("/api/")) return res.status(401).json({ error: "غير مصرح. سجّل الدخول أولاً." });
  return res.redirect("/login.html");
}

function requireAdmin(req, res, next) {
  if (req.user && req.user.role === 'admin') return next();
  return res.status(403).json({ error: "صلاحيات مسؤول مطلوبة." });
}

// Generate random 6-digit code
const generateCode = () => Math.floor(100000 + Math.random() * 900000).toString();

// AUTH ROUTES
app.post("/api/register", async (req, res) => {
  try {
    const { name, email, password, stream } = req.body;
    if (!name || !email || !password || !stream) return res.status(400).json({ error: "جميع الحقول مطلوبة" });
    
    let user = await User.findOne({ email });
    if (user && user.isVerified) return res.status(400).json({ error: "البريد الإلكتروني مسجل بالفعل" });
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const code = generateCode();

    if (user && !user.isVerified) {
      // update existing unverified user
      user.name = name;
      user.password = hashedPassword;
      user.stream = stream;
      user.verificationCode = code;
    } else {
      const userCount = await User.countDocuments();
      user = new User({
        name,
        email,
        password: hashedPassword,
        stream,
        verificationCode: code,
        role: userCount === 0 ? 'admin' : 'user'
      });
    }
    await user.save();
    
    // Send email
    await mailer.sendVerificationEmail(email, code);
    res.json({ ok: true, message: "تم إرسال رمز التحقق إلى بريدك الإلكتروني" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/verify", async (req, res) => {
  try {
    const { email, code } = req.body;
    const user = await User.findOne({ email, verificationCode: code });
    if (!user) return res.status(400).json({ error: "الرمز غير صحيح أو البريد خاطئ" });
    
    user.isVerified = true;
    user.verificationCode = null;
    await user.save();
    
    req.session.userId = user._id; // Login after verify
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !user.isVerified) return res.status(400).json({ error: "البريد غير صحيح أو الحساب غير مفعل" });
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "كلمة المرور غير صحيحة" });
    
    req.session.userId = user._id;
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email, isVerified: true });
    if (!user) return res.status(400).json({ error: "البريد غير مسجل أو غير مفعل" });
    
    const code = generateCode();
    user.resetPasswordCode = code;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();
    
    await mailer.sendResetPasswordEmail(email, code);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/reset-password", async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;
    const user = await User.findOne({ 
      email, 
      resetPasswordCode: code, 
      resetPasswordExpires: { $gt: Date.now() } 
    });
    if (!user) return res.status(400).json({ error: "الرمز غير صحيح أو منتهي الصلاحية" });
    
    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordCode = null;
    user.resetPasswordExpires = null;
    await user.save();
    
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ ok: true });
  });
});

app.get("/api/user", (req, res) => {
  if (req.user) {
    res.json({ user: { id: req.user._id, name: req.user.name, email: req.user.email, role: req.user.role } });
  } else {
    res.json({ user: null });
  }
});

// Pages mapping
const publicPages = ['/login.html', '/register.html', '/verify.html', '/forgot-password.html', '/reset-password.html'];
publicPages.forEach(page => {
  app.get(page, (req, res) => {
    if (req.user && page === '/login.html') return res.redirect('/index.html');
    res.sendFile(path.join(__dirname, "public", page.slice(1)));
  });
});

app.get("/", (req, res) => res.redirect(req.user ? "/index.html" : "/login.html"));
app.use(express.static(path.join(__dirname, "public"), { index: false }));
app.use(requireAuth);

app.get("/api/lessons", async (req, res) => {
  try {
    // Show lessons matching user's stream OR 'مشترك' (common)
    const lessons = await Lesson.find({ stream: { $in: [req.user.stream, 'مشترك'] } }).sort({ createdAt: 1 });
    const progressList = await LessonProgress.find({ user: req.user._id });
    const progressMap = {};
    progressList.forEach(p => { progressMap[p.lesson.toString()] = p; });

    const stages = [["first","الدراسة الأولى"],["review1","المراجعة الأولى"],["review2","المراجعة الثانية"],["retention","مراجعة التثبيت"],["final","المراجعة الامتحانية الأخيرة"]];
    
    res.json(lessons.map(x => {
      const p = progressMap[x._id.toString()] || {};
      return {
        id: x._id,
        lesson: x.lesson,
        subject: x.subject,
        unit: x.unit,
        stages: stages.map(([key, label]) => ({
          property: label,
          label,
          checked: !!p[key]
        }))
      };
    }));
  } catch(e) { res.status(500).json({error:e.message}); }
});

app.patch("/api/lessons/:id", async (req, res) => {
  try {
    const allowed = {
      "الدراسة الأولى": "first",
      "المراجعة الأولى": "review1",
      "المراجعة الثانية": "review2",
      "مراجعة التثبيت": "retention",
      "المراجعة الامتحانية الأخيرة": "final"
    };
    const { property, checked } = req.body || {};
    const key = allowed[property];
    
    if(!key || typeof checked !== "boolean") return res.status(400).json({error:"بيانات غير صالحة"});
    
    let progress = await LessonProgress.findOne({ user: req.user._id, lesson: req.params.id });
    if (!progress) {
      progress = new LessonProgress({ user: req.user._id, lesson: req.params.id });
    }
    progress[key] = checked;
    await progress.save();
    
    res.json({ ok: true });
  } catch(e) { res.status(500).json({error:e.message}); }
});

app.get("/api/channels", async (req, res) => {
  try {
    const channels = await Channel.find({ user: req.user._id });
    res.json(channels.map(ch => ({
      id: ch._id,
      subject: ch.subject,
      name: ch.name,
      channelUrl: ch.channelUrl,
      playlistName: ch.playlistName,
      playlistUrl: ch.playlistUrl,
      notes: ch.notes
    })));
  } catch (error) {
    res.status(500).json({ error: "تعذر تحميل القنوات.", details: error.message });
  }
});

app.post("/api/channels", async (req, res) => {
  try {
    const {name, subject, channelUrl, playlistName, playlistUrl, notes} = req.body || {};
    if (!name || !subject) return res.status(400).json({error:"الاسم والمادة مطلوبان."});
    
    const channel = new Channel({ user: req.user._id, name, subject, channelUrl, playlistName, playlistUrl, notes });
    await channel.save();
    
    res.json({ id: channel._id, subject: channel.subject, name: channel.name, channelUrl: channel.channelUrl, playlistName: channel.playlistName, playlistUrl: channel.playlistUrl, notes: channel.notes });
  } catch (error) {
    res.status(500).json({error:"خطأ.", details:error.message});
  }
});

function localCalendarDate(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Damascus",
    year: "numeric", month: "2-digit", day: "2-digit",
  }).formatToParts(date);
  const get = type => parts.find(x => x.type === type)?.value;
  return new Date(Date.UTC(Number(get("year")), Number(get("month")) - 1, Number(get("day"))));
}

function isoDate(d) { return d.toISOString().slice(0, 10); }

function currentWeeklyWindow(date = new Date()) {
  const today = localCalendarDate(date);
  const day = today.getUTCDay(); 
  const daysSinceThursday = (day - 4 + 7) % 7;
  const start = new Date(today);
  start.setUTCDate(start.getUTCDate() - daysSinceThursday);
  const end = new Date(start);
  end.setUTCDate(end.getUTCDate() + 6);
  return { start: isoDate(start), end: isoDate(end) };
}

function activityLevel(percent) {
  if (percent <= 0) return "لا نشاط";
  if (percent < 25) return "نشاط منخفض";
  if (percent < 50) return "نشاط متوسط";
  if (percent < 75) return "نشاط جيد";
  if (percent < 100) return "نشاط مرتفع";
  return "نشاط كامل";
}

async function refreshCurrentWeeklyActivity(userId) {
  const rows = await WeeklyTask.find({ user: userId });
  const window = currentWeeklyWindow();
  
  let current = await WeeklyActivity.findOne({ user: userId, start: window.start });
  if (current) {
    const completed = rows.filter(x => x.done).length;
    const total = rows.length;
    const percent = total ? Math.round((completed / total) * 100) : 0;
    
    current.completed = completed;
    current.total = total;
    current.percent = percent;
    current.level = activityLevel(percent);
    await current.save();
  }
  
  const activities = await WeeklyActivity.find({ user: userId });
  return { rows, activities, current, window };
}

app.get("/api/weekly", async (req, res) => {
  try {
    const tasks = await WeeklyTask.find({ user: req.user._id });
    res.json(tasks.map(x => ({ id: x._id, day: x.day, subject: x.subject, task: x.task, time: x.time, done: x.done, doneDate: x.doneDate })));
  } catch(e) { res.status(500).json({error:e.message}); }
});

app.get("/api/weekly/activity", async (req, res) => {
  try {
    const window = currentWeeklyWindow();
    let current = await WeeklyActivity.findOne({ user: req.user._id, start: window.start });
    
    if (!current) {
       current = new WeeklyActivity({
         user: req.user._id, name: "الأسبوع الحالي", start: window.start, end: window.end,
         completed: 0, total: 0, percent: 0, level: activityLevel(0)
       });
       await current.save();
       await WeeklyTask.updateMany({ user: req.user._id }, { done: false, doneDate: null });
    }
    
    const activities = await WeeklyActivity.find({ user: req.user._id });
    res.json({ weeks: activities.map(a => ({ id: a._id, name: a.name, start: a.start, end: a.end, completed: a.completed, total: a.total, percent: a.percent, level: a.level })), 
    current: { id: current._id, name: current.name, start: current.start, end: current.end, completed: current.completed, total: current.total, percent: current.percent, level: current.level }, window });
  } catch(e) { res.status(500).json({error:e.message}); }
});

app.post("/api/weekly", async (req, res) => {
  try {
    const {day, subject, task, time} = req.body || {};
    if (!day || !subject || !task) return res.status(400).json({error:"بيانات مطلوبة"});
    
    const t = new WeeklyTask({ user: req.user._id, day, subject, task, time });
    await t.save();
    
    await refreshCurrentWeeklyActivity(req.user._id);
    res.json({ id: t._id, day: t.day, subject: t.subject, task: t.task, time: t.time, done: t.done, doneDate: t.doneDate });
  } catch(e) { res.status(500).json({error:e.message}); }
});

app.patch("/api/weekly/:id", async (req, res) => {
  try {
    const {done} = req.body || {};
    const task = await WeeklyTask.findOne({ _id: req.params.id, user: req.user._id });
    if (!task) return res.status(404).json({error: "المهمة غير موجودة."});
    
    task.done = done;
    task.doneDate = done ? isoDate(localCalendarDate()) : null;
    await task.save();
    
    const activity = await refreshCurrentWeeklyActivity(req.user._id);
    res.json({ok:true, activity: activity.current});
  } catch(e) { res.status(500).json({error:e.message}); }
});

app.delete("/api/weekly/:id", async (req, res) => {
  try {
    await WeeklyTask.deleteOne({ _id: req.params.id, user: req.user._id });
    await refreshCurrentWeeklyActivity(req.user._id);
    res.json({ok:true});
  } catch(e) { res.status(500).json({error:e.message}); }
});

app.get("/api/exams", async (req, res) => {
  try { 
    const exams = await Exam.find({ user: req.user._id }).sort({ at: 1 });
    res.json(exams.map(ex => ({ id: ex._id, subject: ex.subject, name: ex.name, at: ex.at.toISOString() })));
  } catch(e) { res.status(500).json({error:e.message}); }
});

app.post("/api/exams", async (req, res) => {
  try {
    const {subject, name, at} = req.body || {};
    const exam = new Exam({ user: req.user._id, subject, name: name || subject, at: new Date(at) });
    await exam.save();
    res.json({ id: exam._id, subject: exam.subject, name: exam.name, at: exam.at.toISOString() });
  } catch(e) { res.status(500).json({error:e.message}); }
});

app.delete("/api/exams/:id", async (req, res) => {
  try { 
    await Exam.deleteOne({ _id: req.params.id, user: req.user._id });
    res.json({ok:true});
  } catch(e) { res.status(500).json({error:e.message}); }
});

app.get("/api/progress", async (req, res) => {
  try {
    const lessons = await Lesson.find({ stream: { $in: [req.user.stream, 'مشترك'] } });
    const progressList = await LessonProgress.find({ user: req.user._id });
    const progressMap = {};
    progressList.forEach(p => { progressMap[p.lesson.toString()] = p; });
    
    const subjects = [...new Set(lessons.map(x => x.subject).filter(Boolean))].sort();
    const stages = [["first","الدراسة الأولى"],["review1","المراجعة الأولى"],["review2","المراجعة الثانية"],["retention","مراجعة التثبيت"],["final","المراجعة الامتحانية الأخيرة"]];
    
    const stageProgress = Object.fromEntries(stages.map(([key, label]) => { 
      const done = lessons.filter(x => progressMap[x._id.toString()]?.[key]).length; 
      return [key, {label, done, total: lessons.length, percent: lessons.length ? Math.round((done/lessons.length)*100) : 0}]; 
    }));
    
    const subjectProgress = subjects.map(subject => { 
      const rows = lessons.filter(x => x.subject === subject); 
      const stage = Object.fromEntries(stages.map(([key, label]) => {
        const done = rows.filter(x => progressMap[x._id.toString()]?.[key]).length;
        return [key, {label, done, total: rows.length, percent: rows.length ? Math.round((done/rows.length)*100) : 0}];
      })); 
      const completedStages = rows.reduce((sum, x) => sum + stages.filter(([key]) => progressMap[x._id.toString()]?.[key]).length, 0); 
      const totalChecks = rows.length * stages.length; 
      return {subject, lessons: rows.length, percent: totalChecks ? Math.round((completedStages/totalChecks)*100) : 0, stages: stage}; 
    });
    
    const totalChecks = lessons.length * stages.length; 
    const completedChecks = lessons.reduce((sum, x) => sum + stages.filter(([key]) => progressMap[x._id.toString()]?.[key]).length, 0);
    
    res.json({ academicYear: "2026/2027", updatedAt: new Date().toISOString(), totalLessons: lessons.length, overallPercent: totalChecks ? Math.round((completedChecks/totalChecks)*100) : 0, stages: stageProgress, subjects: subjectProgress });
  } catch (error) { 
    res.status(500).json({ error: "Failed to load progress.", details: error.message }); 
  }
});

// Admin
app.get("/admin", requireAdmin, (req, res) => res.sendFile(path.join(__dirname, "public", "admin.html")));

app.get("/api/admin/users", requireAdmin, async (req, res) => {
  try { res.json(await User.find().select('-password -__v')); } 
  catch (error) { res.status(500).json({ error: error.message }); }
});

app.get("/api/admin/stats", requireAdmin, async (req, res) => {
  try {
    const users = await User.countDocuments();
    const lessons = await Lesson.countDocuments();
    const channels = await Channel.countDocuments();
    const exams = await Exam.countDocuments();
    res.json({ users, lessons, channels, exams });
  } catch (error) { res.status(500).json({ error: error.message }); }
});

if (require.main === module) app.listen(port, () => console.log(`Study dashboard: http://localhost:${port}`));
module.exports = app;
