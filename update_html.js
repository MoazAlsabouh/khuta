const fs = require('fs');

const files = ['login.html', 'register.html', 'forgot-password.html', 'reset-password.html', 'verify.html'];

const footerHtml = `
  <footer style="text-align: center; padding: 20px; font-size: 0.9em; color: #666; margin-top: 40px; border-top: 1px solid #eee;">
    جميع الحقوق محفوظة معاذ الصبوح &copy; <script>document.write(new Date().getFullYear())</script><br>
    <div style="margin-top: 10px; display: flex; justify-content: center; gap: 15px;">
      <a href="https://github.com/MoazAlsabouh/" target="_blank" style="color: #4CAF50; text-decoration: none;">GitHub</a>
      <a href="https://www.linkedin.com/in/moazalsabouh/" target="_blank" style="color: #4CAF50; text-decoration: none;">LinkedIn</a>
      <a href="https://x.com/moazAlsabouh" target="_blank" style="color: #4CAF50; text-decoration: none;">X (Twitter)</a>
    </div>
  </footer>
`;

for (const file of files) {
  let content = fs.readFileSync('public/' + file, 'utf8');
  
  // Replace the brand emoji with the logo image
  content = content.replace(/<div class="brand">.*?<\/div>/, '<div class="brand"><img src="logo.jpg" alt="Logo" style="height: 60px; border-radius: 8px;"></div>');
  
  // If there's no footer, add it before </body>
  if (!content.includes('جميع الحقوق محفوظة معاذ الصبوح')) {
    content = content.replace('</body>', footerHtml + '\\n</body>');
  }

  fs.writeFileSync('public/' + file, content);
}
console.log('HTML files updated successfully!');
