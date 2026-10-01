import { auth, signInWithEmailAndPassword, googleProvider, signInWithPopup } from './firebase-init.js';

document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const error = document.getElementById('loginError');
  const btn = form.querySelector('button[type="submit"]');
  error.hidden = true; btn.disabled = true; btn.textContent = 'جاري التحقق...';
  
  const email = form.email.value;
  const password = form.password.value;
  
  try {
    await signInWithEmailAndPassword(auth, email, password);
    location.href = 'index.html';
  } catch (err) {
    error.textContent = 'خطأ في البريد الإلكتروني أو كلمة المرور.';
    error.hidden = false;
  } finally {
    btn.disabled = false; btn.textContent = 'تسجيل الدخول';
  }
});

document.getElementById('googleLogin').addEventListener('click', async (e) => {
  const error = document.getElementById('loginError');
  error.hidden = true;
  try {
    await signInWithPopup(auth, googleProvider);
    location.href = 'index.html';
  } catch (err) {
    error.textContent = 'فشل تسجيل الدخول بواسطة جوجل. تحقق من إعدادات المتصفح أو قم بإضافة النطاق للقائمة البيضاء في Firebase.';
    error.hidden = false;
  }
});
