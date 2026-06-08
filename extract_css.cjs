const fs = require('fs');
const html = fs.readFileSync('c:/Users/DELL/Desktop/valoai-COMPLETE-FINAL (11).html', 'utf8');
const match = html.match(/<style>([\s\S]*?)<\/style>/);
if (match) {
  let css = `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');\n@import "tailwindcss";\n` + match[1];
  fs.writeFileSync('c:/Users/DELL/antigravity/Valo-AI/src/index.css', css);
  console.log("Extracted CSS successfully.");
} else {
  console.log("No <style> tag found.");
}
