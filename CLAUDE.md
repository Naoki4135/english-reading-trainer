# English Reading Trainer

## 概要
TOEFL iBT+レベルの英文リーディング学習ツール。エッセイ表示、Glossary、日本語訳、音声再生（シャドーイング用）、Anki式SRS単語学習を統合。

## ファイル構成
- `index.html` - メインアプリケーション（レスポンシブHTML）
- `data.js` - エッセイ・単語データ（Claude Codeが更新）
- `vocab-enrichment.js` - 語彙拡充データ。2つのconstを持つ: ①`VOCAB_ENRICHMENT`（第2例文・語源/覚え方・コロケーション）②`VISUAL_OVERRIDES`（フラッシュカードのイラスト修正版。`{e:絵文字, h:情景ヒント}`）。キーはどちらもglossaryの`word.toLowerCase()`。**新しいエッセイを追加したら、新出単語分を両方に追加する**
- `listening-data.js` - リスニング教材（audioUrl形式 or youtubeId形式）
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
- エッセイは126本（2026-07-19時点。data.jsのESSAYS配列）

## UI/UX仕様
- Premium/Enhanced Apple Neural TTS音声を優先選択
- 再生レート0.95x、ピッチ1.05（速度スライダーは0.8〜2.0x）
- 通し番号付き、10個ずつ折りたたみ表示
- 読了回数の常時表示（緑ハイライト）
- タブ移動時の音声自動停止
- Glossaryハイライトはツールチップ表示（改行なし）
- Read Completeボタンは画面下部に固定表示

## 主要機能（2026-07-19更新）
- **削除済み機能（復活させないこと）**: Gold Phrases（金フレ）全機能、VocabのShuffle/Duo/Duo Seqフィルター、QuizのDuo Sentencesモード、SRSタブの弱点分析（苦手単語・品詞別正答率）は2026-07-19に削除済み
- **通訳練習モード**（Quizタブ内）: Glossary例文ペアを使用。日→英はSpeechRecognitionで発話を文字起こしし単語一致率を採点、英→日は音声を聞いて自己チェック
- **実戦モード**（エッセイ再生）: 文ごとに話者・速度・ピッチをランダム化してリスニング負荷を上げる
- **ブラインドモード**: エッセイ本文/Transcript/YouTubeスクリプトをblurで隠して耳だけで聞く（.blind-blurクラス）
- **YouTubeリスニング**（Listenタブ）: URL+スクリプト貼り付けで動画教材を追加（state.youtubeItemsにlocalStorage保存）。YouTube IFrame APIで埋め込み再生し、タイムスタンプ付きスクリプトは再生位置に同期ハイライト・タップでシーク。速度0.5〜2.0x。listening-data.jsに`youtubeId`を持つアイテムを置けばtranslation/glossary付きの完全教材にもできる（Claude経由追加用）
- **バックアップ促進バナー**（ホーム）: 最終バックアップから7日超で表示（state.lastBackupAt / backupSnoozedUntil）
- **PWA対応**: manifest.json + sw.js（stale-while-revalidateキャッシュ）+ アイコン3種。ホーム画面追加・オフライン動作可
- **ホーム**: エッセイライブラリは6ジャンル（Finance & Economics / Business English / Native Collocations / Slang & Casual / Science & Technology / Society & Culture、`essayGenre()`でtopicから判定）別のデフォルト全折りたたみ表示。Read Essaysも全折りたたみ。Recently Openedは5件表示+「もっと見る」で最大50件。連続学習2日以上でストリークバナー表示
- **語彙エンリッチメント**: 全単語に第2例文・語源/覚え方・コロケーションを表示（単語カード・フラッシュカード）。例文読み上げボタン付き。Vocab検索は例文・コロケーション・語源にもヒット
- **Vocabタブは3ビュー構成（2026-07-27刷新）**: ①「今日の10語」デイリーセッション（`state.dailyVocab`。復習期限語(最大4)+最近読んだエッセイの新語(最大3)+新語で10語選定。カードを開くとチェック、10/10で完了画面+「もう10語」）②「エッセイ別」（出典ごとにグループ表示、新しい順）③「All」（検索+フィルター）。**単語カードはデフォルト折りたたみ**（英語だけ表示→タップで意味・例文を展開。畳んだ状態が小テストになる設計）。検索時のみ自動展開。旧来の全件展開一覧（55万px）に戻さないこと
- **フラッシュカードのイラスト**: `getWordVisual()` が `VISUAL_OVERRIDES` → `WORD_VISUAL_MAP`（手作り183件）→ 日本語訳のキーワード自動マッチ、の順で解決する。自動マッチは誤爆しやすいため、2026-07-26に全1403語を点検し880語を修正済み。**汎用フォールバック（「名詞」「形容詞」等）に落ちる語はゼロを維持すること**
- **ヒントのネタバレ防止（重要）**: `buildFlashcardHint()` は `visual.h` が日本語訳と一致する場合にImage行を出さない。自動生成のhは訳そのままで答えになるため。`VISUAL_OVERRIDES` の h には**訳語を書かず情景を書く**こと（例: hollow out →「外側は立派な大木。でも中身は空っぽ」）
- **記事リーダー**（ホームのNews Articlesセクション）: ①アプリ内「＋記事を追加」で本文貼り付け→state.articlesにlocalStorage保存（Glossary/訳なし、音声再生・ブラインド可）②記事URLをClaudeに送る→articles-data.jsにGlossary・訳付きオリジナル要約記事として追加。記事はエッセイ詳細ページを流用表示（訳・Glossaryがない場合はボタン非表示）。記事のglossaryも単語帳・SRSに自動統合
- **SRSタブ構成（2026-07-19整理後）**: Due alert / 14日グラフ（Words Read・Quiz Reviews）/ 長期グラフ2種 / Mastery Distribution / Device Sync / バックアップのみ。Upcoming Reviews・Study History・Vocabulary Growthグラフは削除済み（復活させない）

## 技術スタック
- HTML/CSS/JavaScript（単体ファイル）
- Web Speech API（音声再生・音声認識）
- localStorage（SRS進捗管理）
- SM-2アルゴリズム（忘却曲線ベースの間隔反復）
- Service Worker（PWA/オフラインキャッシュ。キャッシュ名 ert-cache-vN はアセット更新時にバンプ）
