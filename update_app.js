const fs = require('fs');
let c = fs.readFileSync('public/app.js', 'utf8');

c = c.replace(
  /<span class="brand-mark">.*?<\/span>\s*<span><b>.*?<\/b><small>.*?<\/small><\/span>/,
  `<img src="logo.jpg" alt="Logo" style="height: 40px; border-radius: 5px; margin-left: 10px;">
            <span><b>منصة خريطة الدراسة</b><small>2026 / 2027</small></span>`
);

c = c.replace(
  /<footer>.*?<\/footer>/,
  `<footer style="text-align: center; padding: 20px; font-size: 0.9em; color: #666; margin-top: 40px; border-top: 1px solid #eee;">
          جميع الحقوق محفوظة معاذ الصبوح &copy; \${new Date().getFullYear()}<br>
          <div style="margin-top: 10px; display: flex; justify-content: center; gap: 15px;">
            <a href="https://github.com/MoazAlsabouh/" target="_blank" style="color: #4CAF50; text-decoration: none;">GitHub</a>
            <a href="https://www.linkedin.com/in/moazalsabouh/" target="_blank" style="color: #4CAF50; text-decoration: none;">LinkedIn</a>
            <a href="https://x.com/moazAlsabouh" target="_blank" style="color: #4CAF50; text-decoration: none;">X (Twitter)</a>
          </div>
        </footer>`
);

fs.writeFileSync('public/app.js', c);
console.log('App.js updated successfully!');
