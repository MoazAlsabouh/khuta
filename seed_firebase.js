const fs = require('fs');
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, getDocs } = require('firebase/firestore');
const Module = require('module');

// Firebase initialization
const firebaseConfig = {
  apiKey: "AIzaSyDrs5mq2KaxBnnLSBugncOsvnFX_2GY6EQ",
  authDomain: "khuta-b9128.firebaseapp.com",
  projectId: "khuta-b9128",
  storageBucket: "khuta-b9128.firebasestorage.app",
  messagingSenderId: "137647973861",
  appId: "1:137647973861:web:ce4f3c740688af5bc97b0c"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Mocking to capture lessons
let allLessons = [];
const mockMongoose = {
  connect: () => Promise.resolve(),
  model: () => ({ insertMany: (arr) => { allLessons.push(...arr); } }),
};

const originalRequire = Module.prototype.require;
Module.prototype.require = function(arg) {
  if (arg === 'mongoose') return mockMongoose;
  if (arg === './models/Lesson') return mockMongoose.model();
  if (arg === 'dotenv') return { config: () => {} };
  return originalRequire.apply(this, arguments);
};

// Prevent process.exit
const originalExit = process.exit;
process.exit = () => {};

async function seed() {
  const seedFiles = [
    './seed_common.js',
    './seed_literary.js',
    './seed_scientific.js',
    './seed_more.js',
    './seed_philosophy.js'
  ];

  for (const file of seedFiles) {
    if (fs.existsSync(file)) {
      try {
        require(file);
      } catch (e) {
        console.error(`Error requiring ${file}:`, e);
      }
    }
  }

  // Wait a bit for promises to resolve
  await new Promise(r => setTimeout(r, 1000));

  console.log(`Total lessons extracted: ${allLessons.length}`);

  if (allLessons.length === 0) {
    console.log("No lessons found.");
    originalExit(0);
  }

  try {
    const lessonsRef = collection(db, 'lessons');
    
    console.log("Inserting new lessons...");
    let count = 0;
    for (const lesson of allLessons) {
      await addDoc(lessonsRef, lesson);
      count++;
      if (count % 20 === 0) console.log(`Inserted ${count}/${allLessons.length}`);
    }

    console.log("Firebase seeding complete!");
    originalExit(0);
  } catch (error) {
    console.error("Error seeding Firebase:", error);
    originalExit(1);
  }
}

seed();
