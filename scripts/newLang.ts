import fetch from 'node-fetch';
import jsdom from 'jsdom';
import fs from 'fs-extra';
import path from 'path';

const { JSDOM } = jsdom;

const lang = process.argv[2];

(async () => {
  console.log('ISO result: ' + (await getISO639(lang)));
  console.log('ntv result: ' + (await getNative(lang)));
})();

export async function newLang(lang: string) {
  const code = await getISO639(lang);

  const dirPath = path.join('src/docs/', code);
  fs.mkdir(dirPath, (err) => {
    if (err) throw err;
    console.log('create dir ' + dirPath);
  });

  const postPath = path.join(dirPath, 'index.md');
  fs.writeFile(postPath, '# Hello, world!', (err) => {
    if (err) throw err;
    console.log('create file ' + postPath);
  });

  return code;
}

async function getISO639(lang: string) {
  const res = await fetch('https://ja.wikipedia.org/wiki/' + lang);
  const body = await res.text();
  const dom = new JSDOM(body);

  const infobox = [...dom.window.document.getElementsByClassName('infobox')].filter((item) => item.innerHTML.includes('ISO 639-3'))[0];
  if (infobox == undefined) throw new Error(lang + " doesn't have any infoboxes.");

  const trs = [...infobox.getElementsByTagName('tr')].filter((item) => item.outerHTML.includes('ISO 639-3'))[0];
  if (trs == undefined) throw new Error("Something's gone wrong");

  const isocode = trs.getElementsByTagName('code')[0].lastChild;
  if (isocode == undefined || !isocode.textContent) throw new Error(lang + ' does not have any ISO 639-3 links.');

  return isocode.textContent.trim();
}

async function getNative(lang: string) {
  const res = await fetch('https://ja.wikipedia.org/wiki/' + lang);
  const body = await res.text();
  const dom = new JSDOM(body);

  const infobox = [...dom.window.document.getElementsByClassName('infobox')].filter(
    (item) =>
      item.getElementsByTagName('span')[0] != undefined &&
      [...item.getElementsByTagName('span')].filter((span) => span.getAttribute('lang') != null)[0] != undefined,
  )[0];
  // if (infobox == undefined) throw new Error(lang + ' does not exist.');
  if (infobox == undefined) return null;

  const ntv = [...infobox.getElementsByTagName('span')].filter((span) => span.getAttribute('lang') != null)[0];
  return ntv.textContent ? ntv.textContent.trim() : null;
}
