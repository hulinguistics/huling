import fetch from 'node-fetch';
import jsdom from 'jsdom';
import path from 'path';
import fs from 'fs-extra';

const { JSDOM } = jsdom;

type F = (arg: string) => Promise<void>;

const typeList = (typ: string): F => {
  switch (typ) {
    case 'lang':
      return newLangPost;
    default:
      throw new Error('type not found: ' + typ);
  }
};

const typ = process.argv[2];
const arg = process.argv[3];

(async () => {
  await typeList(typ)(arg);
})();

export async function newLangPost(lang: string) {
  const { IsoCode, JpnName, NtvName } = await getLangData(lang);

  const postPath = path.join('src/docs/', IsoCode, 'index.md');
  const templatePath = 'archetypes/docs/lang/index.md';
  const dict = {
    JpnName: JpnName,
    NtvName: NtvName,
  };

  await newPost(postPath, templatePath, dict);
}

async function newPost(postPath: string, templatePath: string, dict: { [key: string]: string }) {
  // exist check
  if (fs.existsSync(postPath)) throw new Error('Post (' + postPath + ') already exists.');
  if (!fs.existsSync(templatePath)) throw new Error('Template (' + templatePath + ") doesn't exists");

  // Create dir
  const dirPath = path.dirname(postPath);
  fs.mkdir(dirPath, (err) => {
    if (err) throw err;
    console.log('create dir ' + dirPath);
  });

  // Read template
  const template = await fs.readFile(templatePath, 'utf-8');
  let post = template;
  for (const key in dict) while (post != (post = post.replace('{{ ' + key + ' }}', dict[key])));

  // Create and write post
  fs.writeFile(postPath, post, (err) => {
    if (err) throw err;
    console.log('create file ' + postPath);
  });
}

async function getLangData(lang: string) {
  const res = await fetch('https://ja.wikipedia.org/wiki/' + lang);
  const body = await res.text();
  const dom = new JSDOM(body);

  const infobox = [...dom.window.document.getElementsByClassName('infobox')].filter((item) => item.innerHTML.includes('ISO 639-3'))[0];
  if (infobox == undefined) throw new Error(lang + " doesn't have any infoboxes.");

  // ISO 639-3 code
  const isoTrs = [...infobox.getElementsByTagName('tr')].filter((item) => item.outerHTML.includes('ISO 639-3'))[0];
  if (isoTrs == undefined) throw new Error("Something's gone wrong");
  const iso = isoTrs.getElementsByTagName('code')[0].lastChild;
  if (iso == undefined || !iso.textContent) throw new Error(lang + ' does not have any ISO 639-3 links.');
  const IsoCode = iso.textContent.trim();

  // Japanese name
  const jpn = dom.window.document.getElementsByTagName('h1')[0].textContent;
  if (!jpn) throw new Error("Something's gone wrong");
  const JpnName = jpn.trim();

  // Native name
  const ntv = [...infobox.getElementsByTagName('span')].filter((span) => span.getAttribute('lang') != null)[0].textContent;
  if (!ntv) throw new Error("Something's gone wrong");
  const NtvName = ntv.trim()[0].toUpperCase() + ntv.trim().slice(1);

  return { IsoCode, JpnName, NtvName };
}
