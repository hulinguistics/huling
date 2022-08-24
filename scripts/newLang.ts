import fetch from 'node-fetch';
import jsdom from 'jsdom';
const { JSDOM } = jsdom;

const langInJa = process.argv[2];

(async () => {
  console.log('result: ' + (await getISO639(langInJa)));
})();

async function getISO639(langInJa: string) {
  const res = await fetch('https://ja.wikipedia.org/wiki/' + langInJa);
  const body = await res.text();
  const dom = new JSDOM(body);

  const infobox = dom.window.document.getElementsByClassName('infobox')[0];
  if (infobox == undefined) throw new Error(langInJa + ' does not exist.');

  const trs = [...infobox.getElementsByTagName('tr')].filter((item) => item.getElementsByTagName('code')[0] != undefined);
  if (trs[0] == undefined) throw new Error(langInJa + ' does not exist.');

  return trs;
}
