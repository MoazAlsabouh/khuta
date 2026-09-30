const fs = require('fs');

let server = fs.readFileSync('server.js', 'utf8');

const errorHandler = `
function getFriendlyError(err) {
  if (err.name === 'MongooseServerSelectionError' || (err.message && err.message.includes('timed out'))) {
    return "نعتذر، تعذر الاتصال بقاعدة البيانات حالياً. يرجى المحاولة بعد قليل.";
  }
  return err.message || "حدث خطأ غير متوقع.";
}
`;

if (!server.includes('function getFriendlyError')) {
  server = server.replace('const app = express();', errorHandler + '\\nconst app = express();');
}

server = server.replace(/res\.status\(500\)\.json\(\{\s*error:\s*error\.message\s*\}\)/g, 'res.status(500).json({ error: getFriendlyError(error) })');
server = server.replace(/res\.status\(500\)\.json\(\{\s*error:\s*err\.message\s*\}\)/g, 'res.status(500).json({ error: getFriendlyError(err) })');
server = server.replace(/res\.status\(500\)\.json\(\{\s*error:\s*e\.message\s*\}\)/g, 'res.status(500).json({ error: getFriendlyError(e) })');

fs.writeFileSync('server.js', server);
console.log('Error messages updated successfully!');
