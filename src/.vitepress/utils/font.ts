import fs from 'fs-extra';
import fetch from 'node-fetch';
import path from 'path';
import subsetFont from 'subset-font';
import { getFiles } from './getPosts.js';

// コマンドライン引数
const typ = process.argv[2];
const arg = process.argv[3];

// アスキー文字のセット
const ascii = '!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~';

// font.config.json
const configPath = 'src/.vitepress/font.json';

// サブセットフォントURL
const fontUrl = '/font/';
const publicDirPath = 'src/public/';

// font.scss
const scssPath = 'src/.vitepress/theme/scss/font.scss';

const typeList = (typ: string) => {
  switch (typ) {
    case 'charas':
      return getCharaList;
    case 'subset':
      return createSubsetFont;
    case 'subset-dry':
      return createSubsetFontDry;
    default:
      throw new Error('type not found: ' + typ);
  }
};

(async () => {
  console.log(await typeList(typ)(arg));
})();

// 使われている文字の一覧を取得
async function getCharaList(parent: string) {
  return (
    await Promise.all(Array.from(new Set((await getFiles(parent, ['md', 'tsv'])).map((file) => file.content).join('') + ascii)).sort())
  ).join('');
}

// サブセットフォントを作成
async function createSubsetFont(parent: string) {
  const fontDir = path.join(publicDirPath, fontUrl);
  fs.existsSync(fontDir) && fs.removeSync(fontDir);
  fs.mkdirsSync(fontDir);
  const charas = await getCharaList(parent);
  const config = JSON.parse(await fs.readFile(configPath, 'utf-8'));

  for (const subset of config.subsets) {
    for (const font of subset.fonts) {
      // 元フォントを読み込む
      const buffer = Buffer.from(await (await fetch(font.src)).arrayBuffer());

      // サブセットを生成
      const subsetBuffer = await subsetFont(buffer, charas, { targetFormat: 'woff2' });

      // サブセットの書き込み
      const fontPath = path.join(fontDir, path.basename(font.src, path.extname(font.src)) + '.woff2');
      fs.writeFileSync(fontPath, subsetBuffer);

      // Pathをconfigに追加
      font.src = path.join(fontUrl, path.basename(font.src, path.extname(font.src)) + '.woff2');
    }
  }

  createScss(config, scssPath);
  return config;
}

// サブセットフォントを作成(ドライラン)
async function createSubsetFontDry(parent: string) {
  const config = JSON.parse(await fs.readFile(configPath, 'utf-8'));

  createScss(config, scssPath);
  return config;
}

// フォントを指定する Scss を生成
async function createScss(config: any, scssPath: string) {
  const result: object[] = [];

  // :root のフォントの指定
  if (config.root_family) {
    result.push({
      selector: ':root',
      style: [
        {
          property: '--vp-font-family-base',
          value: config.root_family.map((f: string) => '"' + f + '"').join(','),
        },
      ],
    });
  }

  // サブセットしたフォントを定義
  config.subsets.forEach((subset: any) => {
    // 名前が無いときは何もしない
    if (!subset.name) return;

    if (subset.tag) {
      result.push({
        selector: '[' + subset.tag + ']',
        style: [
          {
            property: 'font-family',
            value: '"' + subset.name + '",var(--vp-font-family-base)',
          },
        ],
      });
    }

    subset.fonts.forEach((font: any) => {
      result.push({
        selector: '@font-face',
        style: [
          {
            property: 'font-family',
            value: '"' + subset.name + '"',
          },
          ...Object.entries(font).map(([prop, val]) => ({
            property: prop == 'src' ? prop : 'font-' + prop,
            value: prop == 'src' ? 'url("' + val + '")' : val,
          })),
        ],
      });
    });
  });

  // Scss を scssPath に書き込み
  if (result) fs.writeFileSync(scssPath, object2scss(result));
}

// // in
// [
//   {
//     "selector": "p",
//     "style": [
//       { "property": "color", "value": "#333" }
//     ],
//     "child": []
//   }
// ]
// // out
// "p{color:#333;}"
const object2scss = (obj: any) =>
  obj
    .map(
      (o: any) =>
        o.selector &&
        o.selector +
          '{' +
          (o.style ? o.style.map((s: { property: string; value: string }) => s.property + ':' + s.value + ';').join('') : '') +
          (o.child ? object2scss(o.child) : '') +
          '}',
    )
    .join('');
