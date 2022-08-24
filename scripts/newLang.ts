import fetch from 'node-fetch';
import jsdom from 'jsdom';
const { JSDOM } = jsdom;

const lang = process.argv[2];

(async () => {
  console.log('result: ' + (await getISO639('ja', lang)));
})();

async function getISO639(code: string, lang: string) {
  const res = await fetch('https://' + code + '.wikipedia.org/wiki/' + lang);
  const body = await res.text();
  const dom = new JSDOM(body);

  const infobox = dom.window.document.getElementsByClassName('infobox')[0];
  if (infobox == undefined) throw new Error(lang + ' does not exist.');

  const trs = [...infobox.getElementsByTagName('tr')].filter((item) => item.getElementsByTagName('code')[0] != undefined);
  if (trs[0] == undefined) throw new Error(lang + ' does not exist.');

  const iso3 = trs.filter((item) => item.outerHTML.includes('ISO 639-3'))[0];
  if (iso3 == undefined) throw new Error(lang + ' does not exist.');

  const isocode = iso3.getElementsByTagName('a')[1];

  return isocode.textContent;
}
