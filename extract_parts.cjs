const fs = require('fs');
const html = fs.readFileSync('c:/Users/DELL/Desktop/valoai-COMPLETE-FINAL (11).html', 'utf8');

function extractAndSave(startTag, endTag, filename) {
  const startIndex = html.indexOf(startTag);
  const endIndex = html.indexOf(endTag, startIndex);
  if (startIndex !== -1 && endIndex !== -1) {
    const content = html.substring(startIndex, endIndex + endTag.length);
    fs.writeFileSync('c:/Users/DELL/antigravity/Valo-AI/' + filename, content);
    console.log(`Saved ${filename}`);
  } else {
    console.log(`Could not find ${filename}`);
  }
}

extractAndSave('<nav id="nav"', '</nav>', 'navbar_snippet.html');
extractAndSave('<footer', '</footer>', 'footer_snippet.html');
extractAndSave('<main id="page-home"', '</main>', 'home_snippet.html');
extractAndSave('<main id="page-pricing"', '</main>', 'pricing_snippet.html');
extractAndSave('<div class="auth-wrap"', '<!-- ══════════════════════════ DASHBOARD', 'auth_snippet.html'); // roughly auth pages
