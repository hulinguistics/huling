import fetch from 'node-fetch';
import jsdom from 'jsdom';
import path from 'path';
import newPost from './newPost.js';

const { JSDOM } = jsdom;

const typeList = (typ) => {
  switch (typ) {
    case 'new':
      return newLangPost;
    case 'iso':
      return async (arg) => {
        const { IsoCode } = await getLangData(arg);
        return IsoCode;
      };
    case 'jpn':
      return async (arg) => {
        const { JpnName } = await getLangData(arg);
        return JpnName;
      };
    case 'ntv':
      return async (arg) => {
        const { NtvName } = await getLangData(arg);
        return NtvName;
      };
    default:
      throw new Error('type not found: ' + typ);
  }
};

const typ = process.argv[2];
const arg = process.argv[3];

(async () => {
  console.log(await typeList(typ)(arg));
})();

async function newLangPost(lang) {
  const { IsoCode, JpnName, NtvName } = await getLangData(lang);

  const postPath = path.join('src/docs/', IsoCode, 'index.md');
  const templatePath = 'archetypes/docs/lang/index.md';
  const dict = {
    JpnName: JpnName,
    NtvName: NtvName ? NtvName : '',
  };

  return await newPost(postPath, templatePath, dict);
}

async function getLangData(lang) {
  const res = await fetch('https://ja.wikipedia.org/wiki/' + lang);
  const body = await res.text();
  const dom = new JSDOM(body);

  const infobox = [...dom.window.document.getElementsByClassName('infobox')].filter((item) => item.innerHTML.includes('ISO 639-3'))[0];
  if (infobox == undefined) throw new Error(lang + " doesn't have any infoboxes.");

  // ISO 639-3 code
  const IsoCode = (() => {
    const isoTrs = [...infobox.getElementsByTagName('tr')].filter((item) => item.outerHTML.includes('ISO 639-3'))[0];
    if (isoTrs == undefined) throw new Error("Something's gone wrong");
    const iso = isoTrs.getElementsByTagName('code')[0].lastChild;
    if (iso == undefined || !iso.textContent) throw new Error(lang + ' does not have any ISO 639-3 links.');
    return iso.textContent.trim();
  })();

  // Japanese name
  const JpnName = (() => {
    const jpn = dom.window.document.getElementsByTagName('h1')[0].textContent;
    if (!jpn) throw new Error("Something's gone wrong");
    return jpn.trim();
  })();

  // Native name
  const NtvName = (() => {
    const spans = [...infobox.getElementsByTagName('span')].filter((span) => span.getAttribute('lang') != null);
    if (!spans[0]) return null;
    const ntv = spans[0].lastChild;
    if (!ntv) return null;
    return ntv.textContent.trim()[0].toUpperCase() + ntv.textContent.trim().slice(1);
  })();

  return { IsoCode, JpnName, NtvName };
}
