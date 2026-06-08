const fs = require('fs');
const HTMLtoJSX = require('htmltojsx');

const html = fs.readFileSync('c:/Users/DELL/antigravity/Valo-AI/home_snippet.html', 'utf8');

// remove onclick handlers before conversion to keep it clean
const cleanHtml = html.replace(/onclick="[^"]*"/g, '');

const converter = new HTMLtoJSX({
  createClass: false,
});
let jsx = converter.convert(cleanHtml);

const result = `import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <>
      ${jsx}
    </>
  );
}
`;

fs.writeFileSync('c:/Users/DELL/antigravity/Valo-AI/src/components/LandingPage.tsx', result);
console.log('Converted to JSX successfully.');
