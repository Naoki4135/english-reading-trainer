# English Reading Trainer

## 概要
TOEFL iBT+レベルの英文リーディング学習ツール。エッセイ表示、Glossary、日本語訳、音声再生（シャドーイング用）、Anki式SRS単語学習を統合。

## ファイル構成
- `index.html` - メインアプリケーション（レスポンシブHTML）
- `data.js` - エッセイ・単語データ（Claude Codeが更新）
- `vocab-enrichment.js` - 語彙拡充データ。2つのconstを持つ: ①`VOCAB_ENRICHMENT`（第2例文・語源/覚え方・コロケーション・類義語`syn`・ニュアンス/使用場面`nuance`。2026-08-11に全2,029語へsyn/nuance付与済み）②`VISUAL_OVERRIDES`（フラッシュカードのイラスト修正版。`{e:絵文字, h:情景ヒント}`）。キーはどちらもglossaryの`word.toLowerCase()`。**新しいエッセイを追加したら、新出単語分を両方に追加する（synは2〜4個の同義語、nuanceは語感+使用場面を日本語30〜70字）**
- `listening-data.js` - リスニング教材（audioUrl形式 or youtubeId形式）
- `ejdict.txt` - 内蔵英和辞書（EJDict-hand、パブリックドメイン、45,609語、タブ区切り）。タップ辞書用。**再生成・編集しない**
- `drill-data.js` - 瞬間英作文ドリル（`DRILLS`配列: {id, level(1-3), ja, en, key, keyJa}。Lv1=5〜8語/Lv2=8〜12語/Lv3=12〜16語）
- `articles-data.js` - ニュース記事教材（`ARTICLES`配列。ESSAYSと同じスキーマ+source/sourceUrl）。**著作権配慮のため原文の転載は禁止。報道を基にClaudeが書き起こしたオリジナル要約記事のみ**。glossaryの新出単語はvocab-enrichment.jsにも追記する

## エッセイ生成ルール
1. **長さ**: 約150語
2. **難易度**: TOEFL iBT以上（ランダム）
3. **トピック**: 経済、環境、AI、時事ネタ、科学、社会問題など幅広く
4. **Glossary**: 難しい単語・表現は**すべて**ピックアップ（数の制限なし）
5. **例文**: 短い例文（10語程度目安）
6. **日本語訳**: 全文逐語訳

## 新しいエッセイの追加方法
`data.js` の `ESSAYS` 配列に新しいエッセイオブジェクトを追加する。

### エッセイオブジェクトのフォーマット:
```javascript
{
  id: "YYYY-MM-DD-NNN",  // 日付-連番
  date: "YYYY-MM-DD",
  topic: "トピック名（英語）",
  title: "エッセイタイトル（英語）",
  difficulty: "TOEFL iBT" or "TOEFL iBT+" or "Academic",
  wordCount: 150,
  text: `英文テキスト`,
  glossary: [
    {
      word: "単語",
      pos: "品詞",
      japanese: "日本語訳",
      definition: "英語での定義",
      example: "短い英語例文（10語程度）",
      exampleJa: "例文の日本語訳"
    }
  ],
  translation: `全文の日本語訳`
}
```

### 重複チェック
- 既存のGlossaryに含まれる単語と同じ単語が新エッセイに出ても、Glossaryには入れる（エッセイ内の文脈理解のため）
- ただし、累積単語帳（アプリ内）では自動的に重複排除される

## Obsidian同期
エッセイとボキャブラリーは以下のパスにも保存：
- エッセイ: `{Vault}/Shigoto-company/english-training/essays/`
- 単語帳: `{Vault}/Shigoto-company/english-training/vocabulary.md`
- 学習記録: `{Vault}/Shigoto-company/english-training/study-log.md`

Vault: `/Users/naokimatsui/Library/Mobile Documents/iCloud~md~obsidian/Documents/iCloud/`

## エッセイ規模
- エッセイは186本（2026-08-04時点。data.jsのESSAYS配列。うちReal Conversations 40本）
- 長さは標準150語だが、2026-07-31追加分（コロケーション10+スラング10）は約100語のショート版

## UI/UX仕様
- Premium/Enhanced Apple Neural TTS音声を優先選択
- 再生レート0.95x、ピッチ1.05（速度スライダーは0.8〜2.0x）
- 通し番号付き、10個ずつ折りたたみ表示
- 読了回数の常時表示（緑ハイライト）
- タブ移動時の音声自動停止
- Glossaryハイライトはツールチップ表示（改行なし）
- Read Completeボタンは画面下部に固定表示

## 主要機能（2026-07-19更新）
- **削除済み機能（復活させないこと）**: Gold Phrases（金フレ）全機能、VocabのDuo/Duo Seqフィルター、QuizのDuo Sentencesモード、SRSタブの弱点分析（苦手単語・品詞別正答率）は2026-07-19に削除済み
- **Vocabのシャッフル（2026-08-11にユーザー要望で復活）**: Allビューの「🔀 シャッフル」ボタンで表示順をランダム化、「🎲 並べ直す」で再抽選。`vocabShuffled`と`shuffleOrder`(key→順位のMap)で管理し、検索・フィルターを変えても並びが保たれる。旧実装のようなfilter値'shuffle'ではなく独立トグルにしてある
- **通訳練習モード**（Quizタブ内）: Glossary例文ペアを使用。日→英はSpeechRecognitionで発話を文字起こしし単語一致率を採点、英→日は音声を聞いて自己チェック
- **実戦モード**（エッセイ再生）: 文ごとに話者・速度・ピッチをランダム化してリスニング負荷を上げる
- **ブラインドモード**: エッセイ本文/Transcript/YouTubeスクリプトをblurで隠して耳だけで聞く（.blind-blurクラス）
- **YouTubeリスニング**（Listenタブ）: URL+スクリプト貼り付けで動画教材を追加（state.youtubeItemsにlocalStorage保存）。YouTube IFrame APIで埋め込み再生し、タイムスタンプ付きスクリプトは再生位置に同期ハイライト・タップでシーク。速度0.5〜2.0x。listening-data.jsに`youtubeId`を持つアイテムを置けばtranslation/glossary付きの完全教材にもできる（Claude経由追加用）
- **バックアップ促進バナー**（ホーム）: 最終バックアップから7日超で表示（state.lastBackupAt / backupSnoozedUntil）
- **PWA対応**: manifest.json + sw.js（stale-while-revalidateキャッシュ）+ アイコン3種。ホーム画面追加・オフライン動作可
- **ホーム**: エッセイライブラリは6ジャンル（Finance & Economics / Business English / Native Collocations / Slang & Casual / Science & Technology / Society & Culture、`essayGenre()`でtopicから判定）別のデフォルト全折りたたみ表示。Read Essaysも全折りたたみ。Recently Openedは5件表示+「もっと見る」で最大50件。連続学習2日以上でストリークバナー表示
- **語彙エンリッチメント**: 全単語に第2例文・語源/覚え方・コロケーションを表示（単語カード・フラッシュカード）。例文読み上げボタン付き。Vocab検索は例文・コロケーション・語源にもヒット
- **Vocabタブは3ビュー構成（2026-07-27刷新。タブ順は2026-08-11に 今日の10語 → All → エッセイ別 へ変更）**: ①「今日の10語」デイリーセッション（`state.dailyVocab`。復習期限語(最大4)+最近読んだエッセイの新語(最大3)+新語で10語選定。カードか✓ボタンのタップでチェック、10/10で完了画面+「もう10語」）②「エッセイ別」（出典ごとにグループ表示、新しい順）③「All」（検索+フィルター）。**単語カードは2026-08-11からデフォルト全展開**（ユーザー指示。ヘッダータップで折りたたみ可。旧・折りたたみ小テスト設計は廃止）。カード内は 意味→例文→🔁類義語→💬ニュアンス→💡語源→🔗コロケーション の順で表示。**見出し語21px・訳17px**（2026-08-11。補足情報が増えて主役が埋もれたため拡大。小さく戻さないこと）
- **単語チェック回数（2026-08-11追加）**: 各単語カードの音声ボタン隣に✓ボタン。押すたび`state.vocabulary[key].checkCount`と`dailyStats[date].checked`が+1（`checkWord()`）。ホームに「Words Checked」（checkCount延べ合計）と「Quiz Answers」（dailyStats.reviewedの累計）のタイル。checkCountとdailyStats.checkedはクラウド同期対象（単調増加なのでmaxマージ）。ストリーク判定にもcheckedを含む
- **フラッシュカードのイラスト**: `getWordVisual()` が `VISUAL_OVERRIDES` → `WORD_VISUAL_MAP`（手作り183件）→ 日本語訳のキーワード自動マッチ、の順で解決する。自動マッチは誤爆しやすいため、2026-07-26に全1403語を点検し880語を修正済み。**汎用フォールバック（「名詞」「形容詞」等）に落ちる語はゼロを維持すること**
- **ヒントのネタバレ防止（重要）**: `buildFlashcardHint()` は `visual.h` が日本語訳と一致する場合にImage行を出さない。自動生成のhは訳そのままで答えになるため。`VISUAL_OVERRIDES` の h には**訳語を書かず情景を書く**こと（例: hollow out →「外側は立派な大木。でも中身は空っぽ」）
- **記事リーダー**（ホームのNews Articlesセクション）: ①アプリ内「＋記事を追加」で本文貼り付け→state.articlesにlocalStorage保存（Glossary/訳なし、音声再生・ブラインド可）②記事URLをClaudeに送る→articles-data.jsにGlossary・訳付きオリジナル要約記事として追加。記事はエッセイ詳細ページを流用表示（訳・Glossaryがない場合はボタン非表示）。記事のglossaryも単語帳・SRSに自動統合
- **横断ハイライト（2026-08-02追加。同日にコロケーション対応へ拡張）**: 3種を統合する。①このエッセイのGlossary（黄 `.highlight-word`）②他の教材で既習の語（青 `.cross`）③**エンリッチメントの`collocations`由来のコロケーション（緑 `.colloc`、訳は基語のもの）**。`buildHighlightIndex()`が候補を集め`renderHighlightedHtml()`が重なりを解決して描画（優先度 Glossary>既習>コロケーション、同種なら長い一致）。エッセイ本文とリスニングTranscriptで共用
- **ハイライトの性能設計（重要）**: コロケーションは約5,300件あるため、①`getCollocBuckets()`で「先頭語の頭4文字」ごとにバケット化して一度だけ索引化 ②本文側も`hlTextStems()`で同じ粒度の接頭辞集合を作り、交差するバケットだけ照合 ③`hlPatternCache`で正規表現を再利用。これで1本あたり約1ms（素朴な全件走査だと85ms）。**この3点を崩さないこと**
- **キャンバス描画の注意**: `prepareCanvas()`が幅0（非表示中）なら描画をスキップし、高さ0に潰れていたらheight属性から復元する。これを外すと一度非表示中に描画された瞬間キャンバスが高さ0で固定され、以後グラフが永久に表示されなくなる
- **旧・横断ハイライトの実装メモ**: `buildHighlightIndex(glossary, text)` が「このエッセイのGlossary（黄色）」＋「他の教材で既習の語＝state.vocabulary（青色 `.highlight-word.cross`）」を統合した索引を作り、`renderHighlightedHtml()` が描画する。エッセイ本文とリスニングTranscriptで共用。**精度の要**: ①本文に出現する語だけ索引化して正規表現を小さく保つ ②語尾変化 `(s|es|ed|d|ing|ly)?` を許容しlookupは活用語尾を除いた `m[1]` で行う ③横断分は「6文字未満の単語」と「超頻出2000語(`COMMON_WORDS`)」を除外（多義語の誤訳表示を防ぐため。除外前は `effective→〜付けで発効する` のような誤表示が出た）④excluded(level -1)の語は対象外
- **タップ辞書（2026-08-01追加）**: エッセイ・記事本文/リスニングTranscript/YouTubeスクリプトの任意の単語をタップ→内蔵EJDictで意味ポップアップ+「単語帳に追加」（userAddedフラグ付きで同期対象）。活用形の逆引き対応。Glossaryハイライト語は既存ツールチップ優先
- **会話文の音声（2026-08-01追加）**: `splitEssayForSpeech`が"Name: 発話"を検出し話者名を読み上げから除外、`assignDialogueVoices`が話者ごとに固定ボイス（1人目女性系/2人目男性系）を割当。実戦モードでも会話文は声固定
- **Glossary網羅率**: 2026-08-01に全156本を監査し拾い漏れ307語を追加（glossary総数2,012）。新規エッセイは「難しい単語・表現はすべてピックアップ」を厳守
- **瞬間英作文Drillタブ（2026-08-01追加）**: ナビ6番目。1日10問（ミス再出題最大3+現Lvドリル文+単語帳例文2）。自己チェック3択（言えた/惜しい/言えなかった）。直近正答率でLv1〜3自動昇降（80%↑で昇格、40%↓で降格）。ミスは`state.drill.missedPool`に入り「言えた2回」で卒業。`dailyStats.drilled`がストリークにカウント。state.drillは同期対象
- **Real Conversationsジャンル（2026-08-01追加）**: 2人の話者による会話スクリプト形式エッセイ（`Name: 発話`を\n\n区切り）。ライブラリで独立ジャンル🗣️。実戦モードで話者ごとに声が変わる
- **自動クラウド同期（2026-07-31追加）**: GitHub Gist（非公開・`ert-sync.json`）を使ってデバイス間で学習データを自動同期。トークンはlocalStorage（`ert-sync-token`）のみに保存し、**stateやバックアップ・Sync Codeには絶対に含めない**。挙動: 起動時とフォアグラウンド復帰時に`cloudPull()`（フィールド単位マージ）、`saveState()`の30秒後と離脱時に`cloudPush()`。ペイロードは`buildSyncPayload()`（SRS進捗のみ、約200KB）。401はトークン失効表示
- **SRSタブの学習記録（2026-08-02改良、2026-08-11に単語チェック追加）**: 日次(14日)/週次(12週)/月次(12ヶ月)を`setStatsPeriod()`で切替。`buildStatsBuckets()`が`dailyStats`を期間集計し、読んだ語数・クイズ復習数・単語チェック数・瞬間英作文の4グラフ＋前期間比サマリー（学習した日数つき）を表示。週は月曜始まり。その他の構成: Due alert / 長期グラフ2種 / Mastery Distribution / Device Sync / バックアップ。Upcoming Reviews・Study History・Vocabulary Growthグラフは削除済み（復活させない）

## 技術スタック
- HTML/CSS/JavaScript（単体ファイル）
- Web Speech API（音声再生・音声認識）
- localStorage（SRS進捗管理）
- SM-2アルゴリズム（忘却曲線ベースの間隔反復）
- Service Worker（PWA/オフラインキャッシュ。キャッシュ名 ert-cache-vN はアセット更新時にバンプ）
