const fs = require('fs');

// 1. Update login.css
let css = fs.readFileSync('public/login.css', 'utf8');
css = css.replace(
  /.brand\{width:58px;height:58px;display:grid;place-items:center;border-radius:18px;background:#f1efff;font-size:28px;margin-bottom:18px\}/,
  '.brand{width:100%;height:auto;display:grid;place-items:center;background:transparent;margin-bottom:18px}'
);
css = css.replace(
  /.eyebrow\{color:var\(--accent\);font-size:13px;font-weight:700\}/,
  '.eyebrow{color:var(--accent);font-size:13px;font-weight:700;display:block;text-align:center}'
);
fs.writeFileSync('public/login.css', css);

// 2. Update HTML files
const files = ['login.html', 'register.html', 'forgot-password.html', 'reset-password.html', 'verify.html'];
for (const file of files) {
  let content = fs.readFileSync('public/' + file, 'utf8');
  content = content.replace(/<span class="eyebrow">Study Dashboard<\/span>/g, '<span class="eyebrow">خُطى | رفيقك نحو التفوق</span>');
  
  // also in app.js for the shell function
  fs.writeFileSync('public/' + file, content);
}

// 3. Update app.js
let appjs = fs.readFileSync('public/app.js', 'utf8');
appjs = appjs.replace(/<span class="eyebrow">Study Dashboard<\/span>/g, '<span class="eyebrow">خُطى | رفيقك نحو التفوق</span>');
fs.writeFileSync('public/app.js', appjs);

console.log('UI updated successfully!');
