/**
 * export-from-notion.js
 * 
 * أداة تصدير البيانات من Notion وتحويلها إلى هيكلية Firestore الخاصة بمشروع "خُطى" (Khuta)
 * للمستخدم: 5Gtwu8M8vXYqE8WkA5ejbSwD4bD3
 */

const fs = require("fs");
const path = require("path");
const readline = require("readline");

// المعرّف المستهدف للمستخدم في قاعدة بيانات خُطى (Firestore)
const TARGET_USER_ID = process.env.TARGET_USER_ID || "5Gtwu8M8vXYqE8WkA5ejbSwD4bD3";

// مسارات مجلدات الحفظ
const EXPORT_DIRS = [
  path.join(__dirname, "khuta_export"),
  path.join(__dirname, "..", "khuta", "khuta_export")
];

const KNOWN_DATA_SOURCES = {
  lessons: process.env.NOTION_DATA_SOURCE_ID || "0874e087-7c06-4a81-9d0a-4d7c72e22ca8",
  channels: process.env.NOTION_CHANNELS_DATA_SOURCE_ID || "43ebac62-0e94-48d6-a7aa-c338554d9e6f",
  weeklyActivity: process.env.NOTION_WEEKLY_ACTIVITY_DATA_SOURCE_ID || "eb7fb5f2-79b7-450d-b207-d2bb9e202733",
  weeklyTasks: process.env.NOTION_WEEKLY_DATA_SOURCE_ID || "",
  exams: process.env.NOTION_EXAMS_DATA_SOURCE_ID || ""
};

const ARABIC_DAYS = [
  "الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"
];

function normDay(str = "") {
  return String(str).trim()
    .replace(/[أإآ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي");
}

function valueOf(prop) {
  if (!prop) return null;
  if (prop.type === "title") return prop.title?.map(x => x.plain_text).join("") || "";
  if (prop.type === "rich_text") return prop.rich_text?.map(x => x.plain_text).join("") || "";
  if (prop.type === "select") return prop.select?.name || "";
  if (prop.type === "status") return prop.status?.name || "";
  if (prop.type === "checkbox") return !!prop.checkbox;
  if (prop.type === "number") return prop.number ?? 0;
  if (prop.type === "url") return prop.url || "";
  if (prop.type === "date") return prop.date?.start || "";
  if (prop.type === "formula") return prop.formula?.number ?? prop.formula?.string ?? prop.formula?.boolean ?? null;
  return null;
}

async function notionRequest(endpoint, token, options = {}) {
  const url = `https://api.notion.com/v1/${endpoint}`;
  const res = await fetch(url, {
    method: options.method || "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json"
    },
    body: options.body ? JSON.stringify(options.body) : undefined
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(`Notion API error (${res.status}): ${data.message || JSON.stringify(data)}`);
  }
  return data;
}

async function queryAllPages(databaseId, token) {
  let results = [];
  let cursor = undefined;

  do {
    const res = await notionRequest(`databases/${databaseId}/query`, token, {
      method: "POST",
      body: {
        page_size: 100,
        start_cursor: cursor
      }
    });
    results.push(...res.results);
    cursor = res.has_more ? res.next_cursor : undefined;
  } while (cursor);

  return results;
}

// دالة لاكتشاف قواعد البيانات تلقائياً في حال لم تكن الـ IDs محددة
async function autoDiscoverDatabases(token) {
  console.log("🔍 البحث في Notion عن قواعد البيانات المتاحة للتوكن...");
  const searchRes = await notionRequest("search", token, {
    method: "POST",
    body: {
      filter: { property: "object", value: "database" },
      page_size: 100
    }
  });

  const discovered = { ...KNOWN_DATA_SOURCES };
  const dbs = searchRes.results || [];

  console.log(`📋 تم العثور على ${dbs.length} قاعدة بيانات في حساب Notion:`);
  for (const db of dbs) {
    const title = db.title?.map(t => t.plain_text).join(" ") || "بدون عنوان";
    const propKeys = Object.keys(db.properties || {});
    console.log(` - [${title}] (ID: ${db.id}) الخصائص: [${propKeys.slice(0, 5).join(", ")}]`);

    // تصنيف قاعدة البيانات حسب الاسم والخصائص
    if (!discovered.lessons && (title.includes("درس") || title.includes("دروس") || propKeys.includes("الدراسة الأولى"))) {
      discovered.lessons = db.id;
    }
    if (!discovered.channels && (title.includes("قنوات") || propKeys.includes("اسم القناة") || propKeys.includes("رابط القناة"))) {
      discovered.channels = db.id;
    }
    if (!discovered.weeklyTasks && (title.includes("جدول") || title.includes("أسبوع") || (propKeys.includes("المهمة") && propKeys.includes("اليوم")))) {
      discovered.weeklyTasks = db.id;
    }
    if (!discovered.exams && (title.includes("امتحان") || propKeys.includes("الامتحان") || propKeys.includes("الموعد"))) {
      discovered.exams = db.id;
    }
    if (!discovered.weeklyActivity && (title.includes("نشاط") || propKeys.includes("المكتمل") || propKeys.includes("النسبة"))) {
      discovered.weeklyActivity = db.id;
    }
  }

  return discovered;
}

function transformChannels(pages, user) {
  return pages.map(page => {
    const p = page.properties || {};
    return {
      name: valueOf(p["اسم القناة"] || Object.values(p).find(x => x.type === "title")) || "",
      subject: valueOf(p["المادة"]) || "",
      channelUrl: valueOf(p["رابط القناة"]) || "",
      playlistName: valueOf(p["اسم قائمة التشغيل"]) || "",
      playlistUrl: valueOf(p["رابط قائمة التشغيل"]) || "",
      notes: valueOf(p["ملاحظات"]) || "",
      user: user
    };
  });
}

function transformWeeklyTasks(pages, user) {
  return pages.map(page => {
    const p = page.properties || {};
    const done = valueOf(p["منجز"]) === true;
    const doneDate = p["تاريخ الإنجاز"]?.date?.start || (done ? new Date().toISOString() : null);

    return {
      day: valueOf(p["اليوم"]) || "الأحد",
      subject: valueOf(p["المادة"]) || "",
      task: valueOf(p["المهمة"] || Object.values(p).find(x => x.type === "title")) || "",
      time: valueOf(p["الوقت"]) || "",
      done: done,
      doneDate: doneDate,
      user: user
    };
  });
}

function transformWeeklyActivity(pages, user, weeklyTasks = []) {
  if (pages.length > 0) {
    return pages.map(page => {
      const p = page.properties || {};
      const start = p["تاريخ الأسبوع"]?.date?.start || p["الموعد"]?.date?.start || "";
      const end = p["تاريخ الأسبوع"]?.date?.end || "";
      const completed = Number(valueOf(p["المكتمل"] || p["منجز"]) || 0);
      const total = Number(valueOf(p["الإجمالي"] || p["العدد"]) || 0);
      const percent = total > 0 ? Math.round((completed / total) * 100) : Number(valueOf(p["النسبة"]) || 0);

      // بناء خريطة الأيام التراكمية
      const daysMap = {};
      ARABIC_DAYS.forEach((dayName, idx) => {
        const dayTasks = weeklyTasks.filter(t => normDay(t.day) === normDay(dayName));
        const dayTotal = dayTasks.length;
        const dayDone = dayTasks.filter(t => t.done).length;
        const dayPct = dayTotal > 0 ? Math.round((dayDone / dayTotal) * 100) : 0;

        const stat = { completed: dayDone, percent: dayPct, total: dayTotal };
        daysMap[idx] = stat;
        daysMap[dayName] = stat;
        daysMap[normDay(dayName)] = stat;
      });

      const docId = start ? `${user}_${start.slice(0, 10)}` : `${user}_${page.id}`;

      return {
        _id: docId,
        user: user,
        start: start ? start.slice(0, 10) : "",
        end: end ? end.slice(0, 10) : "",
        completed: completed,
        total: total,
        percent: percent,
        days: daysMap,
        updatedAt: new Date().toISOString()
      };
    });
  }

  // في حال لم يكن هناك سجل نشاط أسبوعي محفوظ، يتم توليده تلقائياً من مهام الأسبوع
  const completed = weeklyTasks.filter(t => t.done).length;
  const total = weeklyTasks.length;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
  const now = new Date();
  const startStr = now.toISOString().slice(0, 10);

  const daysMap = {};
  ARABIC_DAYS.forEach((dayName, idx) => {
    const dayTasks = weeklyTasks.filter(t => normDay(t.day) === normDay(dayName));
    const dayTotal = dayTasks.length;
    const dayDone = dayTasks.filter(t => t.done).length;
    const dayPct = dayTotal > 0 ? Math.round((dayDone / dayTotal) * 100) : 0;

    const stat = { completed: dayDone, percent: dayPct, total: dayTotal };
    daysMap[idx] = stat;
    daysMap[dayName] = stat;
    daysMap[normDay(dayName)] = stat;
  });

  return [{
    _id: `${user}_${startStr}`,
    user: user,
    start: startStr,
    end: new Date(Date.now() + 6 * 86400000).toISOString().slice(0, 10),
    completed: completed,
    total: total,
    percent: percent,
    days: daysMap,
    updatedAt: new Date().toISOString()
  }];
}

function transformExams(pages, user) {
  return pages.map(page => {
    const p = page.properties || {};
    return {
      name: valueOf(p["الامتحان"] || Object.values(p).find(x => x.type === "title")) || "امتحان",
      subject: valueOf(p["المادة"]) || "",
      at: p["الموعد"]?.date?.start || "",
      user: user
    };
  });
}

function transformLessonsAndProgress(pages, user) {
  const lessons = [];
  const progress = [];

  for (const page of pages) {
    const p = page.properties || {};
    const titleProp = Object.values(p).find(x => x.type === "title");
    const lessonTitle = valueOf(titleProp) || "";
    const subject = valueOf(p["المادة"]) || "";
    const unit = valueOf(p["الوحدة"]) || "";
    const pageNum = valueOf(p["الصفحة"]) || "";

    const first = valueOf(p["الدراسة الأولى"]) === true;
    const review1 = valueOf(p["المراجعة الأولى"]) === true;
    const review2 = valueOf(p["المراجعة الثانية"]) === true;
    const retention = valueOf(p["مراجعة التثبيت"]) === true;
    const final = valueOf(p["المراجعة الامتحانية الأخيرة"]) === true;

    const lessonDoc = {
      id: page.id,
      lesson: lessonTitle,
      subject: subject,
      unit: unit,
      page: pageNum,
      stream: "علمي"
    };
    lessons.push(lessonDoc);

    // سجل تقدم المستخدم لكل درس
    const progressDoc = {
      user: user,
      lesson: page.id,
      first: first,
      review1: review1,
      review2: review2,
      retention: retention,
      final: final
    };
    progress.push(progressDoc);
  }

  return { lessons, progress };
}

function saveJsonFiles(dataMap) {
  for (const dir of EXPORT_DIRS) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    for (const [key, val] of Object.entries(dataMap)) {
      const filePath = path.join(dir, `${key}.json`);
      fs.writeFileSync(filePath, JSON.stringify(val, null, 2), "utf-8");
      console.log(`💾 تم حفظ: ${filePath} (${Array.isArray(val) ? val.length + " عنصر" : "كائن"})`);
    }

    // ملف مجمّع لكل المجموعات
    const bundlePath = path.join(dir, "khuta_all_firestore_data.json");
    fs.writeFileSync(bundlePath, JSON.stringify(dataMap, null, 2), "utf-8");
    console.log(`📦 تم إنشاء الحزمة الشاملة: ${bundlePath}`);
  }
}

async function runExport(token) {
  if (!token) {
    console.error("❌ مطلوب Notion Token للبدء!");
    process.exit(1);
  }

  console.log(`\n🚀 بدء تصدير بيانات Notion إلى Firestore خُطى...`);
  console.log(`👤 معرّف المستخدم المستهدف: ${TARGET_USER_ID}\n`);

  const dbs = await autoDiscoverDatabases(token);

  const outputData = {};

  // 1) القنوات
  if (dbs.channels) {
    console.log(`\n📡 جلب القنوات من Notion [${dbs.channels}]...`);
    try {
      const raw = await queryAllPages(dbs.channels, token);
      outputData.channels = transformChannels(raw, TARGET_USER_ID);
      console.log(`✅ تم استخراج ${outputData.channels.length} قناة`);
    } catch (e) {
      console.error(`⚠️ تعذر جلب القنوات:`, e.message);
      outputData.channels = [];
    }
  } else {
    outputData.channels = [];
  }

  // 2) المهام الأسبوعية
  let rawWeekly = [];
  if (dbs.weeklyTasks) {
    console.log(`\n📅 جلب الجدول الأسبوعي من Notion [${dbs.weeklyTasks}]...`);
    try {
      rawWeekly = await queryAllPages(dbs.weeklyTasks, token);
      outputData.weeklyTasks = transformWeeklyTasks(rawWeekly, TARGET_USER_ID);
      console.log(`✅ تم استخراج ${outputData.weeklyTasks.length} مهمة أسبوعية`);
    } catch (e) {
      console.error(`⚠️ تعذر جلب الجدول الأسبوعي:`, e.message);
      outputData.weeklyTasks = [];
    }
  } else {
    outputData.weeklyTasks = [];
  }

  // 3) سجل النشاط الأسبوعي
  if (dbs.weeklyActivity) {
    console.log(`\n📈 جلب سجل النشاط السنوي من Notion [${dbs.weeklyActivity}]...`);
    try {
      const rawActivity = await queryAllPages(dbs.weeklyActivity, token);
      outputData.weeklyActivity = transformWeeklyActivity(rawActivity, TARGET_USER_ID, outputData.weeklyTasks);
      console.log(`✅ تم استخراج ${outputData.weeklyActivity.length} أسبوع نشاط`);
    } catch (e) {
      console.error(`⚠️ تعذر جلب سجل النشاط:`, e.message);
      outputData.weeklyActivity = transformWeeklyActivity([], TARGET_USER_ID, outputData.weeklyTasks);
    }
  } else {
    outputData.weeklyActivity = transformWeeklyActivity([], TARGET_USER_ID, outputData.weeklyTasks);
  }

  // 4) الامتحانات
  if (dbs.exams) {
    console.log(`\n🎯 جلب الامتحانات من Notion [${dbs.exams}]...`);
    try {
      const rawExams = await queryAllPages(dbs.exams, token);
      outputData.exams = transformExams(rawExams, TARGET_USER_ID);
      console.log(`✅ تم استخراج ${outputData.exams.length} امتحان`);
    } catch (e) {
      console.error(`⚠️ تعذر جلب الامتحانات:`, e.message);
      outputData.exams = [];
    }
  } else {
    outputData.exams = [];
  }

  // 5) الدروس والتقدم
  if (dbs.lessons) {
    console.log(`\n📚 جلب الدروس ونسب الإنجاز من Notion [${dbs.lessons}]...`);
    try {
      const rawLessons = await queryAllPages(dbs.lessons, token);
      const { lessons, progress } = transformLessonsAndProgress(rawLessons, TARGET_USER_ID);
      outputData.lessons = lessons;
      outputData.progress = progress;
      console.log(`✅ تم استخراج ${lessons.length} درس و ${progress.length} سجل إنجاز للمستخدم`);
    } catch (e) {
      console.error(`⚠️ تعذر جلب الدروس:`, e.message);
      outputData.lessons = [];
      outputData.progress = [];
    }
  } else {
    outputData.lessons = [];
    outputData.progress = [];
  }

  // حفظ الملفات
  console.log(`\n💾 حفظ ملفات JSON المهيأة لقاعدة بيانات Firestore...`);
  saveJsonFiles(outputData);

  console.log(`\n🎉 اكتمل التصدير بنجاح! الملفات مهيأة ومطابقة تماماً لقاعدة بيانات خطى.`);
}

// قراءة التوكن من سطر الأوامر أو متغيرات البيئة
const cliToken = process.argv[2] || process.env.NOTION_TOKEN;

if (cliToken) {
  runExport(cliToken).catch(err => {
    console.error("❌ خطأ أثناء التصدير:", err);
    process.exit(1);
  });
} else {
  // طلب التوكن تفاعلياً
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log("==================================================================");
  console.log("🌟 أداة تصدير بيانات Notion إلى JSON لمشروع خُطى (Khuta)");
  console.log(`👤 المستخدم المستهدف: ${TARGET_USER_ID}`);
  console.log("==================================================================");

  rl.question("👉 يرجى إدخال Notion Integration Token (يبدأ بـ secret_ أو ntn_): ", answer => {
    rl.close();
    const token = answer.trim();
    if (!token) {
      console.error("❌ لم يتم إدخال التوكن. تم إلغاء العملية.");
      process.exit(1);
    }
    runExport(token).catch(err => {
      console.error("❌ خطأ أثناء التصدير:", err);
      process.exit(1);
    });
  });
}
