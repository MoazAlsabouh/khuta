import { auth, signInWithEmailAndPassword, googleProvider, signInWithPopup } from './firebase-init.js';

document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const error = document.getElementById('loginError');
  const btn = form.querySelector('button[type="submit"]');
  error.hidden = true; btn.disabled = true; btn.textContent = 'جاري الدخول...';
  
  const email = form.email.value;
  const password = form.password.value;
  
  try {
    await signInWithEmailAndPassword(auth, email, password);
    location.href = '/index.html';
  } catch (err) {
    error.textContent = 'فشل تسجيل الدخول. تأكد من البريد الإلكتروني وكلمة المرور.';
    error.hidden = false;
  } finally {
    btn.disabled = false; btn.textContent = 'دخول';
  }
});

document.getElementById('googleLogin').addEventListener('click', async (e) => {
  const error = document.getElementById('loginError');
  error.hidden = true;
  try {
    await signInWithPopup(auth, googleProvider);
    location.href = '/index.html';
  } catch (err) {
    error.textContent = 'فشل تسجيل الدخول بواسطة جوجل.';
    error.hidden = false;
  }
});
