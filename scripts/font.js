import { globby } from 'globby';
import fs from 'fs-extra';
import fetch from 'node-fetch';
import * as fontkit from 'fontkit';
import path from 'path';

// コマンドライン引数
const typ = process.argv[2];
const arg = process.argv[3];

// アスキー文字のセット
const ascii = '!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~';

// 元フォントのURLのリスト
const fontUrls = [
  'https://github.com/notofonts/noto-fonts/raw/main/hinted/ttf/NotoSans/NotoSans-Regular.ttf',
  'https://github.com/notofonts/noto-fonts/raw/main/hinted/ttf/NotoSans/NotoSans-Medium.ttf',
  'https://github.com/notofonts/noto-fonts/raw/main/hinted/ttf/NotoSans/NotoSans-SemiBold.ttf',
  'https://github.com/googlefonts/noto-cjk/raw/main/Sans/OTF/Japanese/NotoSansCJKjp-Regular.otf',
  'https://github.com/googlefonts/noto-cjk/raw/main/Sans/OTF/Japanese/NotoSansCJKjp-Bold.otf',
];

const fontDir = 'src/public/font/';

const typeList = (typ) => {
  switch (typ) {
    case 'paths':
      return getMDFilePaths;
    case 'contents':
      return getContents;
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

async function getMDFilePaths(parent) {
  const paths = (
    await globby(['**.md'], {
      ignore: ['node_modules', 'README.md'],
    })
  ).filter((path) => path.includes(parent));
  return paths;
}

async function getContents(parent) {
  const contents = await Promise.all(
    (
      await getMDFilePaths(parent)
    ).map(async (path) => {
      return await fs.readFile(path, 'utf-8');
    }),
  );
  return contents;
}

async function getCharaList(parent) {
  const charas = await Promise.all(
    Array.from(
      new Set(
        (
          await getContents(parent)
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

async function createSubsetFont(parent) {
  fs.existsSync(fontDir) && fs.removeSync(fontDir);
  fs.mkdirsSync(fontDir);
  const charas = await getCharaList(parent);
  return await Promise.all(
    fontUrls.map(async (fontUrl) => {
      console.log(fontUrl);
      const subset = await (async () => {
        const font = await fontkit.create(Buffer.from(await (await fetch(fontUrl)).arrayBuffer()));
        const run = font.layout(charas);
        let subset = font.createSubset();
        run.glyphs.forEach((glyph) => {
          subset.includeGlyph(glyph);
        });
        return subset;
      })();
      const fontPath = path.join(fontDir, path.basename(fontUrl, path.extname(fontUrl)) + '.woff');
      fs.writeFileSync(fontPath, subset.encode());
      return fontPath;
    }),
  );
}
