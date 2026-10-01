import { auth, createUserWithEmailAndPassword, googleProvider, signInWithPopup, db, doc, setDoc } from './firebase-init.js';

document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const error = document.getElementById('registerError');
  const btn = form.querySelector('button[type="submit"]');
  error.hidden = true; btn.disabled = true; btn.textContent = 'جاري الإنشاء...';
  
  const name = form.name.value;
  const stream = form.stream.value;
  const email = form.email.value;
  const password = form.password.value;
  
  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, 'users', cred.user.uid), {
      name,
      stream,
      email
    });
    location.href = 'index.html';
  } catch (err) {
    error.textContent = 'حدث خطأ أثناء الإنشاء: ' + err.message;
    error.hidden = false;
  } finally {
    btn.disabled = false; btn.textContent = 'إنشاء الحساب';
  }
});

document.getElementById('googleLogin').addEventListener('click', async (e) => {
  const error = document.getElementById('registerError');
  error.hidden = true;
  const stream = document.getElementById('stream').value;
  try {
    const cred = await signInWithPopup(auth, googleProvider);
    await setDoc(doc(db, 'users', cred.user.uid), {
      name: cred.user.displayName || cred.user.email.split('@')[0],
      stream: stream,
      email: cred.user.email
    }, { merge: true });
    location.href = 'index.html';
  } catch (err) {
    error.textContent = 'فشل التسجيل بواسطة جوجل. تحقق من النطاق في Firebase.';
    error.hidden = false;
  }
});
