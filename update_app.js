const fs = require('fs');
const path = require('path');

const appJsPath = path.join(__dirname, 'public', 'app.js');
let appJs = fs.readFileSync(appJsPath, 'utf8');

const imports = "import { app, auth, db, onAuthStateChanged, signOut, collection, getDocs, getDoc, doc, setDoc, updateDoc, query, where, addDoc, deleteDoc } from './firebase-init.js';\n\n";

const newApiFuncs = `
async function fetchLessons() {
  const q = query(collection(db, "lessons"));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

async function fetchProgress() {
  if (!auth.currentUser) return [];
  const q = query(collection(db, "progress"), where("user", "==", auth.currentUser.uid));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

async function fetchExams() {
  if (!auth.currentUser) return [];
  const q = query(collection(db, "exams"), where("user", "==", auth.currentUser.uid));
  const snap = await getDocs(q);
  const exams = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  return exams.sort((a, b) => new Date(a.at) - new Date(b.at));
}

async function fetchChannels() {
  if (!auth.currentUser) return [];
  const q = query(collection(db, "channels"), where("user", "==", auth.currentUser.uid));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

async function fetchWeeklyTasks() {
  if (!auth.currentUser) return [];
  const q = query(collection(db, "weeklyTasks"), where("user", "==", auth.currentUser.uid));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

async function fetchWeeklyActivities() {
  if (!auth.currentUser) return { weeks: [], current: null, window: {} };
  const q = query(collection(db, "weeklyActivity"), where("user", "==", auth.currentUser.uid));
  const snap = await getDocs(q);
  const activities = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  const now = new Date();
  const currentWindow = { start: new Date(now.setDate(now.getDate() - now.getDay())).toISOString().slice(0, 10), end: new Date(now.setDate(now.getDate() - now.getDay() + 6)).toISOString().slice(0, 10) };
  let current = activities.find(a => a.start === currentWindow.start);
  return { weeks: activities, current, window: currentWindow };
}

async function loadProgress() {
  const user = auth.currentUser;
  if (!user) return { overallPercent: 0, totalLessons: 0, subjects: [], stages: [] };

  const [lessons, progressList] = await Promise.all([
    fetchLessons(),
    fetchProgress()
  ]);

  const progressMap = {};
  progressList.forEach(p => { progressMap[p.lesson] = p; });

  const subjects = [...new Set(lessons.map(x => x.subject).filter(Boolean))].sort();
  const stages = [["first","الدراسة الأولى"],["review1","المراجعة الأولى"],["review2","المراجعة الثانية"],["retention","مراجعة التثبيت"],["final","المراجعة الامتحانية الأخيرة"]];

  const stageProgress = Object.fromEntries(stages.map(([key, label]) => { 
    const done = lessons.filter(x => progressMap[x.id]?.[key]).length; 
    return [key, {label, done, total: lessons.length, percent: lessons.length ? Math.round((done/lessons.length)*100) : 0}]; 
  }));

  const subjectProgress = subjects.map(subject => { 
    const rows = lessons.filter(x => x.subject === subject); 
    const stage = Object.fromEntries(stages.map(([key, label]) => {
      const done = rows.filter(x => progressMap[x.id]?.[key]).length;
      return [key, {label, done, total: rows.length, percent: rows.length ? Math.round((done/rows.length)*100) : 0}];
    })); 
    const completedStages = rows.reduce((sum, x) => sum + stages.filter(([key]) => progressMap[x.id]?.[key]).length, 0); 
    const totalChecks = rows.length * stages.length; 
    return {subject, lessons: rows.length, percent: totalChecks ? Math.round((completedStages/totalChecks)*100) : 0, stages: stage}; 
  });

  const totalChecks = lessons.length * stages.length; 
  const completedChecks = lessons.reduce((sum, x) => sum + stages.filter(([key]) => progressMap[x.id]?.[key]).length, 0);

  state.data = { academicYear: "2026/2027", updatedAt: new Date().toISOString(), totalLessons: lessons.length, overallPercent: totalChecks ? Math.round((completedChecks/totalChecks)*100) : 0, stages: stageProgress, subjects: subjectProgress };
  return state.data;
}
`;

appJs = imports + appJs;

appJs = appJs.replace(/fetch\("\/api\/user"\)\.then\(res => res\.json\(\)\)\.then\(data => \{/g,
  "const user = auth.currentUser;\nconst data = { user: user ? { name: user.displayName || user.email, role: 'user' } : null };\nif (true) {");

appJs = appJs.replace(/try \{ await fetch\("\/api\/logout", \{ method: "POST" \}\); \} catch\(_\) \{\}/g,
  "await signOut(auth);");

appJs = appJs.replace(/async function api\(url, options\) \{[\s\S]*?return data;\n\}/g, "");

appJs = appJs.replace(/async function loadProgress\(\) \{[\s\S]*?return state\.data;\n\}/g, newApiFuncs);

// Exams
appJs = appJs.replace(/api\("\/api\/exams"\)\.catch\(\(\) => \[\]\)/g, "fetchExams()");
appJs = appJs.replace(/api\("\/api\/exams"\)/g, "fetchExams()");
appJs = appJs.replace(/await api\(`\/api\/exams\/\$\{el\.dataset\.delexamId\}`\, \{ method: "DELETE" \}\);/g,
  "await deleteDoc(doc(db, 'exams', el.dataset.delexamId));");
appJs = appJs.replace(/await api\("\/api\/exams", \{[\s\S]*?body: JSON\.stringify\(\{(.*?)\}\)[\s\S]*?\}\);/gs,
  "await addDoc(collection(db, 'exams'), { user: auth.currentUser.uid, $1 });");

// Channels
appJs = appJs.replace(/api\("\/api\/channels"\)\.catch\(\(\) => \[\]\)/g, "fetchChannels()");
appJs = appJs.replace(/await api\("\/api\/channels", \{[\s\S]*?body: JSON\.stringify\(Object\.fromEntries\(f\.entries\(\)\)\)[\s\S]*?\}\);/gs,
  "await addDoc(collection(db, 'channels'), { user: auth.currentUser.uid, ...Object.fromEntries(f.entries()) });");

// Weekly
appJs = appJs.replace(/api\("\/api\/weekly"\)\.catch\(\(\) => \[\]\)/g, "fetchWeeklyTasks()");
appJs = appJs.replace(/api\("\/api\/weekly"\)/g, "fetchWeeklyTasks()");
appJs = appJs.replace(/api\("\/api\/weekly\/activity"\)\.catch\(\(\) => \(\{\}\)\)/g, "fetchWeeklyActivities()");
appJs = appJs.replace(/api\("\/api\/weekly\/activity"\)/g, "fetchWeeklyActivities()");

appJs = appJs.replace(/await api\(`\/api\/weekly\/\$\{el\.dataset\.weekId\}`\, \{[\s\S]*?body: JSON\.stringify\(\{ done: el\.checked \}\)[\s\S]*?\}\);/gs,
  "await updateDoc(doc(db, 'weeklyTasks', el.dataset.weekId), { done: el.checked, doneDate: el.checked ? new Date().toISOString() : null });");
appJs = appJs.replace(/await api\(`\/api\/weekly\/\$\{el\.dataset\.delweekId\}`\, \{ method: "DELETE" \}\);/gs,
  "await deleteDoc(doc(db, 'weeklyTasks', el.dataset.delweekId));");

appJs = appJs.replace(/await api\("\/api\/weekly", \{[\s\S]*?body: JSON\.stringify\(\{(.*?)\}\)[\s\S]*?\}\);/gs,
  "await addDoc(collection(db, 'weeklyTasks'), { user: auth.currentUser.uid, done: false, $1 });");

// Lessons
appJs = appJs.replace(/api\("\/api\/lessons"\)/g,
  `(async function() {
  const [lessons, progressList] = await Promise.all([ fetchLessons(), fetchProgress() ]);
  const progressMap = {};
  progressList.forEach(p => { progressMap[p.lesson] = p; });
  const stages = [["first","الدراسة الأولى"],["review1","المراجعة الأولى"],["review2","المراجعة الثانية"],["retention","مراجعة التثبيت"],["final","المراجعة الامتحانية الأخيرة"]];
  return lessons.map(x => {
    const p = progressMap[x.id] || {};
    return {
      id: x.id, lesson: x.lesson, subject: x.subject, unit: x.unit,
      stages: stages.map(([key, label]) => ({ property: label, label, checked: !!p[key] }))
    };
  });
})()`);

appJs = appJs.replace(/await api\(`\/api\/lessons\/\$\{encodeURIComponent\(el\.dataset\.id\)\}`\, \{[\s\S]*?body: JSON\.stringify\(\{ property: el\.dataset\.prop, checked: el\.checked \}\)[\s\S]*?\}\);/gs,
  `const allowed = { "الدراسة الأولى": "first", "المراجعة الأولى": "review1", "المراجعة الثانية": "review2", "مراجعة التثبيت": "retention", "المراجعة الامتحانية الأخيرة": "final" };
  const key = allowed[el.dataset.prop];
  const q = query(collection(db, "progress"), where("user", "==", auth.currentUser.uid), where("lesson", "==", el.dataset.id));
  const snap = await getDocs(q);
  if (!snap.empty) {
    await updateDoc(snap.docs[0].ref, { [key]: el.checked });
  } else {
    await addDoc(collection(db, "progress"), { user: auth.currentUser.uid, lesson: el.dataset.id, [key]: el.checked });
  }`);

// Initialization wrapping
appJs = appJs.replace(/\(async function init\(\) \{/g,
  `onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }
  const init = async () => {`);

appJs = appJs.replace(/  \} catch \(err\) \{\n    showError\(err\);\n  \}\n\}\)\(\);/g,
  `  } catch (err) {
    showError(err);
  }
};
init();
});`);

fs.writeFileSync(appJsPath, appJs);
console.log('app.js updated successfully!');
