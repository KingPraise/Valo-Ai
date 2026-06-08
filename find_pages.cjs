const fs = require('fs');
const html = fs.readFileSync('c:/Users/DELL/Desktop/valoai-COMPLETE-FINAL (11).html', 'utf8');

// find all page sections
const regex = /<main[^>]+id="([^"]+)"/g;
let match;
while ((match = regex.exec(html)) !== null) {
  console.log('Found main page:', match[1]);
}

const authRegex = /<div class="auth-wrap"/g;
let matchAuth = authRegex.exec(html);
console.log('auth-wrap found?', matchAuth !== null);

const allPages = html.match(/id="page-[^"]+"/g);
console.log('All page IDs:', allPages);
