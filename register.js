import { auth, db, createUserWithEmailAndPassword, setDoc, doc, googleProvider, signInWithPopup } from './firebase-init.js';

document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const error = document.getElementById('registerError');
  const btn = form.querySelector('button[type="submit"]');
  error.hidden = true; btn.disabled = true; btn.textContent = 'جاري التسجيل...';
  
  const name = form.name.value;
  const stream = form.stream.value;
  const email = form.email.value;
  const password = form.password.value;
  
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Save user profile data
    await setDoc(doc(db, 'users', user.uid), {
      name,
      stream,
      email
    });
    
    location.href = '/index.html';
  } catch (err) {
    error.textContent = 'فشل التسجيل: ' + err.message;
    error.hidden = false;
  } finally {
    btn.disabled = false; btn.textContent = 'تسجيل';
  }
});

document.getElementById('googleLogin').addEventListener('click', async (e) => {
  const error = document.getElementById('registerError');
  error.hidden = true;
  try {
    const userCredential = await signInWithPopup(auth, googleProvider);
    const user = userCredential.user;
    // For google sign in, we might not have 'stream' chosen in the form, 
    // but we can save name and email if the user document doesn't exist.
    // For simplicity, we just save/overwrite here.
    const form = document.getElementById('registerForm');
    const stream = form.stream ? form.stream.value : 'علمي';
    
    await setDoc(doc(db, 'users', user.uid), {
      name: user.displayName || 'مستخدم جوجل',
      stream,
      email: user.email
    }, { merge: true });
    
    location.href = '/index.html';
  } catch (err) {
    error.textContent = 'فشل التسجيل بواسطة جوجل: ' + err.message;
    error.hidden = false;
  }
});
