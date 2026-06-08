const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const html = fs.readFileSync('c:/Users/DELL/Desktop/valoai-COMPLETE-FINAL (11).html', 'utf8');
const dom = new JSDOM(html);
const document = dom.window.document;

function convertToJsx(node) {
  if (node.nodeType === 3) return node.textContent; // Text node
  if (node.nodeType !== 1) return ''; // Element node

  let jsx = `<${node.tagName.toLowerCase()}`;
  
  for (let attr of node.attributes) {
    let name = attr.name;
    let value = attr.value;
    
    if (name === 'class') name = 'className';
    if (name === 'for') name = 'htmlFor';
    if (name === 'style') {
        const styleObj = {};
        value.split(';').forEach(rule => {
            if (!rule.trim()) return;
            const [k, v] = rule.split(':');
            const camelKey = k.trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
            styleObj[camelKey] = v.trim();
        });
        value = `{${JSON.stringify(styleObj)}}`;
        jsx += ` style=${value}`;
        continue;
    }
    
    if (name === 'onclick' || name === 'onmouseover' || name === 'onmouseout' || name === 'oninput') {
        // Skip inline handlers or keep them as string (we'll manually clean up)
        jsx += ` ${name}="${value.replace(/"/g, '&quot;')}"`;
        continue;
    }
    
    jsx += ` ${name}="${value.replace(/"/g, '&quot;')}"`;
  }
  
  if (node.childNodes.length === 0) {
    jsx += ' />';
  } else {
    jsx += '>';
    for (let child of node.childNodes) {
      jsx += convertToJsx(child);
    }
    jsx += `</${node.tagName.toLowerCase()}>`;
  }
  
  return jsx;
}

const userDash = document.getElementById('page-dashboard');
if (userDash) fs.writeFileSync('UserDashboard_ui.txt', convertToJsx(userDash));

const refDash = document.getElementById('page-referral');
if (refDash) fs.writeFileSync('ReferralDashboard_ui.txt', convertToJsx(refDash));

const adminDash = document.getElementById('page-admin');
if (adminDash) fs.writeFileSync('AdminDashboard_ui.txt', convertToJsx(adminDash));

console.log('UI extracted.');
