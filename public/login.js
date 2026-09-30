document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const error = document.getElementById('loginError');
  const btn = form.querySelector('button');
  error.hidden = true; btn.disabled = true; btn.textContent = 'جاري الدخول...';
  try {
    const body = Object.fromEntries(new FormData(form).entries());
    const res = await fetch('/api/login', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(body) });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    location.href = '/index.html';
  } catch (err) {
    error.textContent = err.message; error.hidden = false;
  } finally {
    btn.disabled = false; btn.textContent = 'دخول';
  }
});
