import fs from 'fs-extra';
import fetch from 'node-fetch';
import path from 'path';
import subsetFont from 'subset-font';
import { getPosts } from '../src/.vitepress/utils/getPosts.js';

// コマンドライン引数
const typ = process.argv[2];
const arg = process.argv[3];

// アスキー文字のセット
const ascii = '!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~';

// 元フォントのURLのリスト
const fontUrls = [
  'https://github.com/notofonts/noto-fonts/raw/main/hinted/ttf/NotoSans/NotoSans-Regular.ttf',
  'https://github.com/notofonts/noto-fonts/raw/main/hinted/ttf/NotoSans/NotoSans-Italic.ttf',
  'https://github.com/notofonts/noto-fonts/raw/main/hinted/ttf/NotoSans/NotoSans-Medium.ttf',
  'https://github.com/notofonts/noto-fonts/raw/main/hinted/ttf/NotoSans/NotoSans-MediumItalic.ttf',
  'https://github.com/notofonts/noto-fonts/raw/main/hinted/ttf/NotoSans/NotoSans-SemiBold.ttf',
  'https://github.com/notofonts/noto-fonts/raw/main/hinted/ttf/NotoSans/NotoSans-SemiBoldItalic.ttf',
  'https://github.com/googlefonts/noto-cjk/raw/main/Sans/OTF/Japanese/NotoSansCJKjp-Regular.otf',
  'https://github.com/googlefonts/noto-cjk/raw/main/Sans/OTF/Japanese/NotoSansCJKjp-Bold.otf',
  'https://github.com/googlefonts/noto-cjk/raw/main/Sans/OTF/SimplifiedChinese/NotoSansCJKsc-Regular.otf',
  'https://github.com/googlefonts/noto-cjk/raw/main/Sans/OTF/SimplifiedChinese/NotoSansCJKsc-Bold.otf',
  'https://github.com/googlefonts/noto-cjk/raw/main/Sans/OTF/TraditionalChinese/NotoSansCJKtc-Regular.otf',
  'https://github.com/googlefonts/noto-cjk/raw/main/Sans/OTF/TraditionalChinese/NotoSansCJKtc-Bold.otf',
];

const fontDir = 'src/public/font/';

const typeList = (typ) => {
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

async function getCharaList(parent) {
  const charas = await Promise.all(
    Array.from(
      new Set(
        (
          await getPosts(parent)
        )
          .map((post) => post.content)
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
      // 元フォントを読み込む
      const buffer = Buffer.from(await (await fetch(fontUrl)).arrayBuffer());

      // サブセットを生成
      const subsetBuffer = await subsetFont(buffer, charas, { targetFormat: 'woff2' });

      // サブセットの書き込み
      const fontPath = path.join(fontDir, path.basename(fontUrl, path.extname(fontUrl)) + '.woff2');
      fs.writeFileSync(fontPath, subsetBuffer);

      return fontPath;
    }),
  );
}
