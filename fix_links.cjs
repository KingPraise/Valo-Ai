const fs = require('fs');
let code = fs.readFileSync('c:/Users/DELL/antigravity/Valo-AI/src/components/LandingPage.tsx', 'utf8');

// Replace all <a> tags with <Link>
code = code.replace(/<a(\s[^>]*)?>/g, (match, attrs) => {
  if (!attrs) attrs = '';
  let toPath = '#';
  if (match.includes('Start for free') || match.includes('signup') || match.includes('Start free trial') || match.includes('Get Monthly') || match.includes('Get Quarterly') || match.includes('Get 6 Months') || match.includes('Get Yearly')) {
    toPath = '/signup';
  } else if (match.includes('pricing') || match.includes('Compare all plans')) {
    toPath = '/pricing';
  } else if (match.includes('How it works')) {
    toPath = '/#how-it-works';
  }
  return `<Link to="${toPath}"${attrs}>`;
});
code = code.replace(/<\/a>/g, '</Link>');

fs.writeFileSync('c:/Users/DELL/antigravity/Valo-AI/src/components/LandingPage.tsx', code);
console.log('Fixed Links in LandingPage.tsx');
