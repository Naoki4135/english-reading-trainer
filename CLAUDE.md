# English Reading Trainer

## 概要
TOEFL iBT+レベルの英文リーディング学習ツール。エッセイ表示、Glossary、日本語訳、音声再生（シャドーイング用）、Anki式SRS単語学習を統合。

## ファイル構成
- `index.html` - メインアプリケーション（レスポンシブHTML）
- `data.js` - エッセイ・単語データ（Claude Codeが更新）

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
- エッセイは30本（アカデミック20本 + スラング10本）

## UI/UX仕様
- Premium/Enhanced Apple Neural TTS音声を優先選択
- 再生レート0.95x、ピッチ1.05
- 通し番号付き、10個ずつ折りたたみ表示
- 読了回数の常時表示（緑ハイライト）
- タブ移動時の音声自動停止
- Glossaryハイライトはツールチップ表示（改行なし）
- Read Completeボタンは画面下部に固定表示

## 技術スタック
- HTML/CSS/JavaScript（単体ファイル）
- Web Speech API（音声再生）
- localStorage（SRS進捗管理）
- SM-2アルゴリズム（忘却曲線ベースの間隔反復）
