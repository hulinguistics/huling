import fs from 'fs-extra';
import fetch from 'node-fetch';
import path from 'path';
import subsetFont from 'subset-font';
import { getContents } from './getPosts.js';

// コマンドライン引数
const typ = process.argv[2];
const arg = process.argv[3];

// アスキー文字のセット
const ascii = '!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~';

// font.config.json
const configPath = 'src/.vitepress/theme/font.config.json';

// サブセットフォントURL
const fontUrl = '/font/';
const publicDirPath = 'src/public/';

const typeList = (typ: string) => {
  switch (typ) {
    case 'charas':
      return getCharaList;
    case 'subset':
      return createSubsetFont;
    default:
      throw new Error('type not found: ' + typ);
  }
};

(async () => {
  console.log(await typeList(typ)(arg));
})();

async function getCharaList(parent: string) {
  const charas = await Promise.all(
    Array.from(
      new Set(
        (
          await getContents(parent, ['md', 'tsv'])
        )
          .map((content) => {
            return content;
          })
          .join() + ascii,
      ),
    ).sort(),
  );
  return charas.join('');
}

async function createSubsetFont(parent: string) {
  const fontDir = path.join(publicDirPath, fontUrl);
  fs.existsSync(fontDir) && fs.removeSync(fontDir);
  fs.mkdirsSync(fontDir);
  const charas = await getCharaList(parent);

  const config = JSON.parse(await fs.readFile(configPath, 'utf-8'));

  for (const subset of config.subsets) {
    for (const font of subset.fonts) {
      // 元フォントを読み込む
      const buffer = Buffer.from(await (await fetch(font.url)).arrayBuffer());

      // サブセットを生成
      const subsetBuffer = await subsetFont(buffer, charas, { targetFormat: 'woff2' });

      // サブセットの書き込み
      const fontPath = path.join(fontDir, path.basename(font.url, path.extname(font.url)) + '.woff2');
      fs.writeFileSync(fontPath, subsetBuffer);

      // Pathをconfigに追加
      font.path = path.join(fontUrl, path.basename(font.url, path.extname(font.url)) + '.woff2');
    }
  }

  return config;
}
