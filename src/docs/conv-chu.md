---
title: 古教会スラヴ語キリル文字変換器
id: conv-chu
category: conv
tags:
  - 文字変換器
  - 古教会スラヴ語
  - キリル文字
comment: "true"
---
前舌のイェル (front jer) <span cyrs>ь</span> は `/`,
後舌のイェル (back jer) <span cyrs>ъ</span> は `//`.  
一部の字母は後ろに `_` を加えることで別形になります (対応表を参照のこと).  
数字は1~9999の範囲のみ対応.

<HLConverter src="/conv/chu.tsv" fontRight="Monomakh Unicode" />

## 対応表

| キリル文字 | ラテン文字 | 備考 |
| :--: | :--: | :-- |
| <span cyrs>а</span> | a |  |
| <span cyrs>б</span> | b |  |
| <span cyrs>в</span> | v |  |
| <span cyrs>г</span> | g |  |
| <span cyrs>д</span> | d |  |
| <span cyrs>е</span> | e |  |
| <span cyrs>ж</span> | ž, zh | zh → <span cyrs>ж</span> ↔ ž |
| <span cyrs>ѕ</span> | dz |  |
| <span cyrs>з</span> | z | z_ = <span cyrs>ꙁ</span> |
| <span cyrs>и</span> | i |  |
| <span cyrs>і</span> | î, j | 通例：キリル文字 <span cyrs>і</span> ↔ ラテン文字 i <br> 当変換器：キリル文字 <span cyrs>і</span> ↔ ラテン文字 î <br> （技術的な問題により） |
| <span cyrs>ꙇ</span> | ɩ, jj | 通例：キリル文字 <span cyrs>ꙇ</span> ↔ ラテン文字 i <br> 当変換器：キリル文字 <span cyrs>ꙇ</span> ↔ ラテン文字 ɩ <br> （技術的な問題により） |
| <span cyrs>ћ</span> | ǵ, gh | gh → <span cyrs>ћ</span> ↔ ǵ |
| <span cyrs>к</span> | k |  |
| <span cyrs>л</span> | l |  |
| <span cyrs>м</span> | m |  |
| <span cyrs>н</span> | n |  |
| <span cyrs>о</span> | o |  |
| <span cyrs>п</span> | p |  |
| <span cyrs>р</span> | r |  |
| <span cyrs>с</span> | s |  |
| <span cyrs>т</span> | t |  |
| <span cyrs>ѹ</span> | u | u_ = <span cyrs>ꙋ</span> |
| <span cyrs>ф</span> | f |  |
| <span cyrs>ѳ</span> | th |  |
| <span cyrs>х</span> | x, h | h は zh (<span cyrs>ж</span>), eh (<span cyrs>ѣ</span>) などの記述にも使われているため, なるべく x を使うよう推奨. <br>e.g. ex ↔ <span cyrs>ех</span>, eh → <span cyrs>ѣ</span> ↔ ě |
| <span cyrs>ѡ</span> | ô, oh | oh_ = <span cyrs>ѻ</span> |
| <span cyrs>ѿ</span> | ôtъ, oht | oht → <span cyrs>ѿ</span> ↔ ôtъ <br> oh-t// → <span cyrs>ѡтъ</span> ↔ ôtъ |
| <span cyrs>ц</span> | c |  |
| <span cyrs>ч</span> | č, ch | ch → <span cyrs>ч</span> ↔ č |
| <span cyrs>ш</span> | š, sh | sh → <span cyrs>ш</span> ↔ š |
| <span cyrs>щ</span> | št, sht | sht → <span cyrs>щ</span> ↔ št |
| <span cyrs>ъ</span> | ъ, ŭ, // | 単独または一部の文字列の後ろで <br> // → <span cyrs>ъ</span> ↔ ŭ <br> （技術的な問題により） |
| <span cyrs>ꙑ</span> | y |  |
| <span cyrs>ь</span> | ь, ĭ, / | 単独または一部の文字列の後ろで <br> / → <span cyrs>ь</span> ↔ ĭ <br> （技術的な問題により） |
| <span cyrs>ѣ</span> | ě, eh | eh → <span cyrs>ѣ</span> ↔ ě |
| <span cyrs>ꙗ</span> | ja |  |
| <span cyrs>ѥ</span> | je |  |
| <span cyrs>ю</span> | ju |  |
| <span cyrs>ѫ</span> | ǫ, onn | onn → <span cyrs>ѫ</span> ↔ ǫ |
| <span cyrs>ѭ</span> | jǫ, jonn | jonn → <span cyrs>ѭ</span> ↔ jǫ |
| <span cyrs>ѧ</span> | ę, enn | enn → <span cyrs>ѧ</span> ↔ ę<br>enn_ = <span cyrs>ꙙ</span> |
| <span cyrs>ѩ</span> | ję, jenn | jenn → <span cyrs>ѩ</span> ↔ ję<br>jenn_ = <span cyrs>ꙝ</span> |
| <span cyrs>ѯ</span> | ks |  |
| <span cyrs>ѱ</span> | ps |  |
| <span cyrs>ѳ</span> | th |  |
| <span cyrs>ѵ</span> | ü, uh | uh → <span cyrs>ѵ</span> ↔ ü |
| <span cyrs>ҁ</span> | q |  |
| <span cyrs> ҃</span> | ˜, ~ | 略記記号のティトロ（titlo） |
| <span cyrs> ҄</span> | ⏜, ^ | 口蓋化を表す記号 |
| <span cyrs> ꙯</span> | ¯, & | 略記記号. 正しく表示されない可能性あり |
