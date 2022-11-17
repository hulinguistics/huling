---
title: 文字変換器
commentHide: true
section: 便利機能
---

# {{ $frontmatter.title }}

主にローマ字と別の文字を相互に変換できます。
文字の詳しい対応についてはテキストエリア下の表を参照してください。
予告無く仕様が変更される場合があります。

## ロシア語キリル文字

[詳細](/docs/rus/index.html#ラテン文字・ロシア語キリル文字変換器)

<HLConverter src="/conv/rus.csv" />

## 古教会スラヴ語キリル文字

<HLConverter src="/conv/chu.csv" fontRight="Monomakh Unicode" />

::: details 対応表

| キリル文字 | ラテン文字 | 備考 |
| :--: | :--: | :-- |
| <span cyrs>а</span> | a |  |
| <span cyrs>б</span> | b |  |
| <span cyrs>г</span> | g |  |
| <span cyrs>д</span> | d |  |
| <span cyrs>е</span> | e |  |
| <span cyrs>ж</span> | ž, zh | zh→<span cyrs>ж</span>↔ž |
| <span cyrs>ѕ</span> | dz |  |
| <span cyrs>з</span> | z |  |
| <span cyrs>и</span> | i |  |
| <span cyrs>і</span> | î, j | 通例：キリル文字 <span cyrs>і</span> ↔ラテン文字 i <br> 当変換器：キリル文字 <span cyrs>і</span> ↔ラテン文字 î <br> （技術的な問題により） |
| <span cyrs>ꙇ</span> | ɩ, jj | 通例：キリル文字 <span cyrs>ꙇ</span> ↔ラテン文字 i <br> 当変換器：キリル文字 <span cyrs>ꙇ</span> ↔ラテン文字 ɩ <br> （技術的な問題により） |
| <span cyrs>ћ</span> | ǵ, gh | gh→<span cyrs>ћ</span>↔ǵ |
| <span cyrs>к</span> | k |  |
| <span cyrs>л</span> | l |  |
| <span cyrs>м</span> | m |  |
| <span cyrs>н</span> | n |  |
| <span cyrs>о</span> | o |  |
| <span cyrs>п</span> | p |  |
| <span cyrs>р</span> | r |  |
| <span cyrs>с</span> | s |  |
| <span cyrs>т</span> | t |  |
| <span cyrs>ѹ</span> | u |  |
| <span cyrs>ф</span> | f |  |
| <span cyrs>х</span> | x, h | h は zh(<span cyrs>ж</span>), eh(<span cyrs>ѣ</span>) などの表記にも使われているため, <br> なるべく x を使うよう推奨. <br>e.g. ex↔<span cyrs>ех</span>, eh→<span cyrs>ѣ</span>↔ě |
| <span cyrs>ѡ</span> | ô, oh |  |
| <span cyrs>ѿ</span> | ôtъ, oht | oht→<span cyrs>ѿ</span>↔ôtъ <br> oht"→<span cyrs>ѡтъ</span>↔ôtъ |
| <span cyrs>ц</span> | c |  |
| <span cyrs>ч</span> | č, ch | ch→<span cyrs>ч</span>↔č |
| <span cyrs>ш</span> | š, sh | sh→<span cyrs>ш</span>↔š |
| <span cyrs>щ</span> | št, sht | sht→<span cyrs>щ</span>↔št |
| <span cyrs>ъ</span> | ъ, ŭ, " | 単独または一部の文字列の後ろで "→<span cyrs>ъ</span>↔ŭ |
| <span cyrs>ꙑ</span> | y |  |
| <span cyrs>ь</span> | ь, ĭ, ' | 単独または一部の文字列の後ろで '→<span cyrs>ь</span>↔ĭ​ |
| <span cyrs>ѣ</span> | ě, eh | eh→<span cyrs>ѣ</span>↔ě |
| <span cyrs>ꙗ</span> | ja |  |
| <span cyrs>ѥ</span> | je |  |
| <span cyrs>ю</span> | ju |  |
| <span cyrs>ѫ</span> | ǫ, onn | onn→<span cyrs>ѫ</span>↔ǫ |
| <span cyrs>ѭ</span> | jǫ, jonn | jonn→<span cyrs>ѭ</span>↔jǫ |
| <span cyrs>ѧ</span> | ę, enn | enn→<span cyrs>ѧ</span>↔ę |
| <span cyrs>ѩ</span> | ję, jenn | jenn→<span cyrs>ѩ</span>↔ję |
| <span cyrs>ѯ</span> | ks |  |
| <span cyrs>ѱ</span> | ps |  |
| <span cyrs>ѳ</span> | th |  |
| <span cyrs>ѵ</span> | ü, uh | uh→<span cyrs>ѵ</span>↔ü |
| <span cyrs>ҁ</span> | q |  |
| <span cyrs> ҃</span> | ˜, ~ | 略記記号のティトロ（titlo） |
| <span cyrs> ҄</span> | ⏜, ^ | 口蓋化を表す記号 |
| <span cyrs> ꙯</span> | ¯, / | 略記記号. 正しく表示されない可能性あり |
| <span cyrs>҂</span> | # | 数字'1000' |

:::

## アラビア語アラビア文字

長母音は大文字 `A U I`,
アリフマクスーラ付き長母音は `_A`,
短剣アリフは `/A`,
動詞の複数形接尾辞のアリフ付き母音は `_U _au`,
タンウィーンは `aN uN iN`
(アリフ無しは `_aN` ),
名詞の女性語尾のターは `_t`,
ワスラ付きアリフは `/a`.

<HLConverter src="/conv/ara.csv" dirRight="rtl" />

::: details 対応表解説

### 構造

```txt
%%%%%,# 順方向符号化
L,<S<
...
%%%%%,# 符号処理
f(:S:),g(:S:)
...
%%%%%,# 逆方向符号化
>S>,A
...
%%%%%,# 処理開始/終了フラグ
<,:
:,>
```

### 変換アルゴリズム

#### 順方向

1. ラテン文字を符号化
    `L,<S<`
2. `<`を `:`に
    `<,:`
3. 符号を処理
    `f(:S:),g(:S:)`
4. `:`を `>`に
    `:,>`
5. 符号をアラビア文字化
    `>S>,A`

#### 逆変換

1. アラビア文字を符号化
    `>S>,A`
2. `:`を `>`に
    `:,>`
3. 符号を処理
    `f(:S:),g(:S:)`
4. `<`を `:`に
    `<,:`
5. 符号をラテン文字化
    `L,<S<`

### 中間符号一覧

```md
# シャクル
## ファトハ カスラ ダンマ
:^:   : @!@!!!!@:
:~:   : @!!!!!!@:
:_:   : @!@!!!!!:
## ファトハターン カスラターン ダンマターン
:=^:  : @@!!!!@! @!@!!!!@:
:=~:  : @@!!!!@! @!!!!!!@:
:=_:  : @@!!!!@! @!@!!!!!:
## シャッダ
:#:   : @@!@@@!!:
## スクーン
:*:   : @@!@!@!@:
## 短剣アリフ
:+:   : @@!@!@!!:
## スクーン + アリフ
:+|:  : @@!@!@!@ @!!!!!@@:

# 子音
:|:   : @!!!!!@@:
:_|:  : @!@!!!!! @!!!!!@@:
:~|:  : @!!!!!!@ @!!!!!@@:
:^|:  : @!@!!!!@ @!!!!!@@:
:b:   : @!!@@@!@:
:th:  : @!!!@!@@ @!!@!@@@:
:t:   : @!!!@!@@:
:_t:  : @!@!!!!! @!!!@!@@:
:j:   : @!!@!@!@:
:H:   : @!@@!@@@:
:kh:  : @!!@!@!! @!!@!@@@:
:dh:  : @!!@@!@@ @!!@!@@@:
:d:   : @!!@@!@@:
:r:   : @!!!@@!@:
:z:   : @!!!!@!@:
:sh:  : @!!!@@!! @!!@!@@@:
:s:   : @!!!@@!!:
:S:   : @!@!@@!!:
:D:   : @!@@@!@@:
:T:   : @!@!@!@@:
:Z:   : @!@!!@!@:
:`:   : @!!@@@@@:
:gh:  : @!!@@!!! @!!@!@@@:
:f:   : @!!@@!!@:
:q:   : @!!!@@@!:
:k:   : @!!@!@!!:
:l:   : @!!@!!@@:
:m:   : @!!@!!@!:
:n:   : @!!@!!!@:
:h:   : @!!@!@@@:
:w:   : @!!!@!!!:
:y:   : @!!!!@@!:
:':   : @@!@@!!!:

# 記号
:-:  : @@!@!!@!:
:/:  : @@!@!!!!:
```

:::

## イディッシュ語ヘブライ文字

シュトゥメル・アリフ「א」は `|`．
ヘブライ語系の単語にのみ見られる文字の入力は，
「בֿ」`*v`，
「כּ」`*k`，
「ח」`*kh`，
「שׂ」`*s`,
「ת」`*S`，
「תּ」`*t`．
ラテン文字は語頭も小文字で入力すること．

<HLConverter src="/conv/yid.csv" dirRight="rtl"  />

## アイヌ語仮名

北海道アイヌ語、樺太アイヌ語対応。

<HLConverter src="/conv/ain.csv" />

## ダイアクリティカルマーク付きラテン文字

例)

- `a^'` = á
- `o_c` = ǫ

詳しくは下の「対応表」を参照してください．

<HLConverter src="/conv/lat.csv" />

::: details 対応表

### 非ASCIIラテン文字の入力

| | 大文字 | 小文字 |
| :-: | :-: | :-: |
| Ææ | `A=E` | `a=e` |
| Ĳĳ | `I=J` | `i=j` |
| Œœ | `O=E` | `o=e` |
| Øø | `O/` | `o/` |
| ẞß | `S=Z` | `s=z` |
| ſ | | `s/` |
| Ʒʒ | `Z/` | `z/` |

### ダイアクリティカルマーク付きラテン文字 の例

以下の表は出力の一例です．Unicodeに合字のある文字については合字が優先して出力されます．

| | Aa | Ææ | Bb | Cc | Dd | Ee | Ff | Gg | Hh | Ii | Jj | Kk | Ll | Mm | Nn | Oo | Øø | Pp | Qq | Rr | Ssſ | Tt | Uu | Vv | Ww | Xx | Yy | Zz | Ʒʒ |
| :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| `^'` | Áá | Ǽǽ | B́b́ | Ćć | D́d́ | Éé | F́f́ | Ǵǵ | H́h́ | Íí | J́j́ | Ḱḱ | Ĺĺ | Ḿḿ | Ńń | Óó | Ǿǿ | Ṕṕ | Q́q́ | Ŕŕ | Śśſ́ | T́t́ | Úú | V́v́ | Ẃẃ | X́x́ | Ýý | Źź | Ʒ́ʒ́ |
| `^u` | Ăă | Æ̆æ̆ | B̆b̆ | C̆c̆ | D̆d̆ | Ĕĕ | F̆f̆ | Ğğ | H̆h̆ | Ĭĭ | J̆j̆ | K̆k̆ | L̆l̆ | M̆m̆ | N̆n̆ | Ŏŏ | Ø̆ø̆ | P̆p̆ | Q̆q̆ | R̆r̆ | S̆s̆ſ̆ | T̆t̆ | Ŭŭ | V̆v̆ | W̆w̆ | X̆x̆ | Y̆y̆ | Z̆z̆ | Ʒ̆ʒ̆ |
| `_u` | A̮a̮ | Æ̮æ̮ | B̮b̮ | C̮c̮ | D̮d̮ | E̮e̮ | F̮f̮ | G̮g̮ | Ḫḫ | I̮i̮ | J̮j̮ | K̮k̮ | L̮l̮ | M̮m̮ | N̮n̮ | O̮o̮ | Ø̮ø̮ | P̮p̮ | Q̮q̮ | R̮r̮ | S̮s̮ſ̮ | T̮t̮ | U̮u̮ | V̮v̮ | W̮w̮ | X̮x̮ | Y̮y̮ | Z̮z̮ | Ʒ̮ʒ̮ |
| `^v` | Ǎǎ | Æ̌æ̌ | B̌b̌ | Čč | Ďď | Ěě | F̌f̌ | Ǧǧ | Ȟȟ | Ǐǐ | J̌ǰ | Ǩǩ | Ľľ | M̌m̌ | Ňň | Ǒǒ | Ø̌ø̌ | P̌p̌ | Q̌q̌ | Řř | Ššſ̌ | Ťť | Ǔǔ | V̌v̌ | W̌w̌ | X̌x̌ | Y̌y̌ | Žž | Ǯǯ |
| `_z` | A̧a̧ | Æ̧æ̧ | B̧b̧ | Çç | Ḑḑ | Ȩȩ | F̧f̧ | Ģģ | Ḩḩ | I̧i̧ | J̧j̧ | Ķķ | Ļļ | M̧m̧ | Ņņ | O̧o̧ | Ø̧ø̧ | P̧p̧ | Q̧q̧ | Ŗŗ | Şşſ̧ | Ţţ | U̧u̧ | V̧v̧ | W̧w̧ | X̧x̧ | Y̧y̧ | Z̧z̧ | Ʒ̧ʒ̧ |
| `^^` | Ââ | Æ̂æ̂ | B̂b̂ | Ĉĉ | D̂d̂ | Êê | F̂f̂ | Ĝĝ | Ĥĥ | Îî | Ĵĵ | K̂k̂ | L̂l̂ | M̂m̂ | N̂n̂ | Ôô | Ø̂ø̂ | P̂p̂ | Q̂q̂ | R̂r̂ | Ŝŝſ̂ | T̂t̂ | U^̆̂ | V^̌̂ | Ŵŵ | X̂x̂ | Ŷŷ | Ẑẑ | Ʒ̂ʒ̂ |
| `_'` | A̦a̦ | Æ̦æ̦ | B̦b̦ | C̦c̦ | D̦d̦ | E̦e̦ | F̦f̦ | G̦g̦ | H̦h̦ | I̦i̦ | J̦j̦ | K̦k̦ | L̦l̦ | M̦m̦ | N̦n̦ | O̦o̦ | Ø̦ø̦ | P̦p̦ | Q̦q̦ | R̦r̦ | Șșſ̦ | Țț | U̦u̦ | V̦v̦ | W̦w̦ | X̦x̦ | Y̦y̦ | Z̦z̦ | Ʒ̦ʒ̦ |
| `^"` | Ää | Æ̈æ̈ | B̈b̈ | C̈c̈ | D̈d̈ | Ëë | F̈f̈ | G̈g̈ | Ḧḧ | Ïï | J̈j̈ | K̈k̈ | L̈l̈ | M̈m̈ | N̈n̈ | Öö | Ø̈ø̈ | P̈p̈ | Q̈q̈ | R̈r̈ | S̈s̈ſ̈ | T̈ẗ | Üü | V̈v̈ | Ẅẅ | Ẍẍ | Ÿÿ | Z̈z̈ | Ʒ̈ʒ̈ |
| `^.` | Ȧȧ | Æ̇æ̇ | Ḃḃ | Ċċ | Ḋḋ | Ėė | Ḟḟ | Ġġ | Ḣḣ | İi̇ | J̇j̇ | K̇k̇ | L̇l̇ | Ṁṁ | Ṅṅ | Ȯȯ | Ø̇ø̇ | Ṗṗ | Q̇q̇ | Ṙṙ | Ṡṡẛ | Ṫṫ | U̇u̇ | V̇v̇ | Ẇẇ | Ẋẋ | Ẏẏ | Żż | Ʒ̇ʒ̇ |
| `_.` | Ạạ | Æ̣æ̣ | Ḅḅ | C̣c̣ | Ḍḍ | Ẹẹ | F̣f̣ | G̣g̣ | Ḥḥ | Ịị | J̣j̣ | Ḳḳ | Ḷḷ | Ṃṃ | Ṇṇ | Ọọ | Ø̣ø̣ | P̣p̣ | Q̣q̣ | Ṛṛ | Ṣṣſ̣ | Ṭṭ | Ụụ | Ṿṿ | Ẉẉ | X̣x̣ | Ỵỵ | Ẓẓ | Ʒ̣ʒ̣ |
| `^\`` | Àà | Æ̀æ̀ | B̀b̀ | C̀c̀ | D̀d̀ | Èè | F̀f̀ | G̀g̀ | H̀h̀ | Ìì | J̀j̀ | K̀k̀ | L̀l̀ | M̀m̀ | Ǹǹ | Òò | Ø̀ø̀ | P̀p̀ | Q̀q̀ | R̀r̀ | S̀s̀ſ̀ | T̀t̀ | Ùù | V̀v̀ | Ẁẁ | X̀x̀ | Ỳỳ | Z̀z̀ | Ʒ̀ʒ̀ |
| `^+` | A̛a̛ | Æ̛æ̛ | B̛b̛ | C̛c̛ | D̛d̛ | E̛e̛ | F̛f̛ | G̛g̛ | H̛h̛ | I̛i̛ | J̛j̛ | K̛k̛ | L̛l̛ | M̛m̛ | N̛n̛ | Ơơ | Ø̛ø̛ | P̛p̛ | Q̛q̛ | R̛r̛ | S̛s̛ſ̛ | T̛t̛ | Ưư | V̛v̛ | W̛w̛ | X̛x̛ | Y̛y̛ | Z̛z̛ | Ʒ̛ʒ̛ |
| `^?` | Ȃȃ | Æ̑æ̑ | B̑b̑ | C̑c̑ | D̑d̑ | Ȇȇ | F̑f̑ | G̑g̑ | H̑h̑ | Ȋȋ | J̑j̑ | K̑k̑ | L̑l̑ | M̑m̑ | N̑n̑ | Ȏȏ | Ø̑ø̑ | P̑p̑ | Q̑q̑ | Ȓȓ | S̑s̑ſ̑ | T̑t̑ | Ȗȗ | V̑v̑ | W̑w̑ | X̑x̑ | Y̑y̑ | Z̑z̑ | Ʒ̑ʒ̑ |
| `^-` | Āā | Ǣǣ | B̄b̄ | C̄c̄ | D̄d̄ | Ēē | F̄f̄ | Ḡḡ | H̄h̄ | Īī | J̄j̄ | K̄k̄ | L̄l̄ | M̄m̄ | N̄n̄ | Ōō | Ø̄ø̄ | P̄p̄ | Q̄q̄ | R̄r̄ | S̄s̄ſ̄ | T̄t̄ | Ūū | V̄v̄ | W̄w̄ | X̄x̄ | Ȳȳ | Z̄z̄ | Ʒ̄ʒ̄ |
| `_-` | A̱a̱ | Æ̱æ̱ | Ḇḇ | C̱c̱ | Ḏḏ | E̱e̱ | F̱f̱ | G̱g̱ | H̱ẖ | I̱i̱ | J̱j̱ | Ḵḵ | Ḻḻ | M̱m̱ | Ṉṉ | O̱o̱ | Ø̱ø̱ | P̱p̱ | Q̱q̱ | Ṟṟ | S̱s̱ſ̱ | Ṯṯ | U̱u̱ | V̱v̱ | W̱w̱ | X̱x̱ | Y̱y̱ | Ẕẕ | Ʒ̱ʒ̱ |
| `_c` | Ąą | Æ̨æ̨ | B̨b̨ | C̨c̨ | D̨d̨ | Ęę | F̨f̨ | G̨g̨ | H̨h̨ | Įį | J̨j̨ | K̨k̨ | L̨l̨ | M̨m̨ | N̨n̨ | Ǫǫ | Ø̨ø̨ | P̨p̨ | Q̨q̨ | R̨r̨ | S̨s̨ſ̨ | T̨t̨ | Ųų | V̨v̨ | W̨w̨ | X̨x̨ | Y̨y̨ | Z̨z̨ | Ʒ̨ʒ̨ |
| `^o` | Åå | Æ̊æ̊ | B̊b̊ | C̊c̊ | D̊d̊ | E̊e̊ | F̊f̊ | G̊g̊ | H̊h̊ | I̊i̊ | J̊j̊ | K̊k̊ | L̊l̊ | M̊m̊ | N̊n̊ | O̊o̊ | Ø̊ø̊ | P̊p̊ | Q̊q̊ | R̊r̊ | S̊s̊ſ̊ | T̊t̊ | Ůů | V̊v̊ | W̊ẘ | X̊x̊ | Y̊ẙ | Z̊z̊ | Ʒ̊ʒ̊ |
| `_o` | Ḁḁ | Æ̥æ̥ | B̥b̥ | C̥c̥ | D̥d̥ | E̥e̥ | F̥f̥ | G̥g̥ | H̥h̥ | I̥i̥ | J̥j̥ | K̥k̥ | L̥l̥ | M̥m̥ | N̥n̥ | O̥o̥ | Ø̥ø̥ | P̥p̥ | Q̥q̥ | R̥r̥ | S̥s̥ſ̥ | T̥t̥ | U̥u̥ | V̥v̥ | W̥w̥ | X̥x̥ | Y̥y̥ | Z̥z̥ | Ʒ̥ʒ̥ |
| `^~` | Ãã | Æ̃æ̃ | B̃b̃ | C̃c̃ | D̃d̃ | Ẽẽ | F̃f̃ | G̃g̃ | H̃h̃ | Ĩĩ | J̃j̃ | K̃k̃ | L̃l̃ | M̃m̃ | Ññ | Õõ | Ø̃ø̃ | P̃p̃ | Q̃q̃ | R̃r̃ | S̃s̃ſ̃ | T̃t̃ | Ũũ | Ṽṽ | W̃w̃ | X̃x̃ | Ỹỹ | Z̃z̃ | Ʒ̃ʒ̃ |
| `_~` | A̰a̰ | Æ̰æ̰ | B̰b̰ | C̰c̰ | D̰d̰ | Ḛḛ | F̰f̰ | G̰g̰ | H̰h̰ | Ḭḭ | J̰j̰ | K̰k̰ | L̰l̰ | M̰m̰ | N̰n̰ | O̰o̰ | Ø̰ø̰ | P̰p̰ | Q̰q̰ | R̰r̰ | S̰s̰ſ̰ | T̰t̰ | Ṵṵ | V̰v̰ | W̰w̰ | X̰x̰ | Y̰y̰ | Z̰z̰ | Ʒ̰ʒ̰ |

:::

## 国際音声記号(X-SAMPA to IPA)

<HLConverter src="/conv/ipa.csv" />
