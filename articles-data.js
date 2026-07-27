// News Articles Data - Claude経由で追加される記事教材
// 実際の報道を基にClaudeが書き起こしたオリジナル要約記事（原文の転載はしない）
// フォーマットはESSAYSと同じ + source / sourceUrl
const ARTICLES = [
{
  id: "article-2026-07-25-001",
  date: "2026-07-25",
  topic: "Markets This Week",
  title: "Markets Rotate as AI Optimism Meets a Hawkish Fed",
  source: "CNBC・Edward Jones等の報道を基にClaudeが再構成",
  sourceUrl: "https://www.cnbc.com/2026/07/24/stock-market-next-week-outlook-for-july-27-31-2026.html",
  difficulty: "News / Advanced",
  wordCount: 208,
  text: `U.S. equities stumbled this week as a sharp rotation out of technology stocks collided with renewed hawkishness at the Federal Reserve. The S&P 500 slipped roughly 1.5%, while the semiconductor benchmark tumbled into bear-market territory, battered by mounting skepticism over whether massive AI investments will ever translate into commensurate profits.

The irony is that corporate fundamentals look robust. With about a quarter of S&P 500 companies having reported, second-quarter earnings are on track to grow nearly 40% year over year, and the vast majority of firms have comfortably beaten analyst estimates. Yet investors are increasingly unwilling to pay premium valuations for growth that hinges on unproven AI monetization.

Monetary policy has compounded the unease. Fed Chair Kevin Warsh has signaled an uncompromising commitment to bringing inflation back to target, and futures markets now assign meaningful odds to a rate hike as early as this month—a dramatic repricing from just a week ago. Because much of the recent inflationary pressure stems from energy-related supply disruptions, the Fed's tools may prove blunt, raising the specter of tighter policy with limited payoff.

For asset allocators, the message is sobering: breadth, not concentration, may define the second half of the year.`,
  glossary: [
    { word: "rotation", pos: "noun", japanese: "（資金の）ローテーション、循環", definition: "The movement of investment money from one sector to another", example: "The rotation from growth to value accelerated last quarter.", exampleJa: "グロース株からバリュー株へのローテーションが前四半期に加速した。" },
    { word: "hawkishness", pos: "noun", japanese: "タカ派姿勢", definition: "A tendency to favor tight monetary policy to fight inflation", example: "The central bank's hawkishness surprised bond investors.", exampleJa: "中央銀行のタカ派姿勢は債券投資家を驚かせた。" },
    { word: "bear-market territory", pos: "phrase", japanese: "弱気相場圏（高値から20%超の下落）", definition: "A decline of 20% or more from a recent peak", example: "The index slid into bear-market territory on Friday.", exampleJa: "その指数は金曜日に弱気相場圏に沈んだ。" },
    { word: "batter", pos: "verb", japanese: "打ちのめす、痛めつける", definition: "To hit or damage something repeatedly and severely", example: "Exporters were battered by the sudden currency surge.", exampleJa: "輸出企業は突然の通貨急騰に打ちのめされた。" },
    { word: "commensurate", pos: "adjective", japanese: "見合った、相応の", definition: "Corresponding in size or degree; in proportion", example: "Returns should be commensurate with the risks taken.", exampleJa: "リターンは取ったリスクに見合ったものであるべきだ。" },
    { word: "monetization", pos: "noun", japanese: "収益化、マネタイズ", definition: "The process of converting something into a source of revenue", example: "The startup struggled with monetization of its huge user base.", exampleJa: "そのスタートアップは巨大なユーザー基盤の収益化に苦戦した。" },
    { word: "hinge on", pos: "phrasal verb", japanese: "〜次第である、〜にかかっている", definition: "To depend entirely on something", example: "The deal hinges on regulatory approval next month.", exampleJa: "その取引は来月の規制当局の承認にかかっている。" },
    { word: "compound", pos: "verb", japanese: "悪化させる、増幅させる", definition: "To make a problem or difficulty worse", example: "Poor liquidity compounded the market's decline.", exampleJa: "流動性の低さが市場の下落を悪化させた。" },
    { word: "uncompromising", pos: "adjective", japanese: "妥協しない、断固たる", definition: "Unwilling to change one's position or soften a stance", example: "She took an uncompromising stance on cost discipline.", exampleJa: "彼女はコスト規律について妥協しない姿勢を取った。" },
    { word: "repricing", pos: "noun", japanese: "（市場の）織り込み直し、価格再評価", definition: "A rapid change in market expectations reflected in prices", example: "The hawkish speech triggered a swift repricing of rate expectations.", exampleJa: "タカ派的な講演が金利観の急速な織り込み直しを引き起こした。" },
    { word: "stem from", pos: "phrasal verb", japanese: "〜に起因する", definition: "To be caused by or originate from something", example: "Most delays stemmed from a shortage of skilled staff.", exampleJa: "遅延の大半は熟練スタッフの不足に起因していた。" },
    { word: "blunt", pos: "adjective", japanese: "切れ味の悪い、効果の鈍い", definition: "Not sharp or effective; lacking precision", example: "Rate hikes are a blunt tool against supply-driven inflation.", exampleJa: "利上げは供給主導のインフレに対しては切れ味の悪い道具だ。" },
    { word: "specter", pos: "noun", japanese: "（悪いことの）影、懸念", definition: "The possibility of something unpleasant that haunts people", example: "The specter of stagflation returned to investor conversations.", exampleJa: "スタグフレーションの影が投資家の会話に戻ってきた。" },
    { word: "sobering", pos: "adjective", japanese: "身の引き締まる、冷静にさせる", definition: "Making you think seriously and feel less optimistic", example: "The fund's drawdown data made for sobering reading.", exampleJa: "そのファンドのドローダウンのデータは身の引き締まる内容だった。" },
    { word: "breadth", pos: "noun", japanese: "（市場の）広がり、裾野の広さ", definition: "The extent to which many stocks participate in a market move", example: "Improving market breadth suggests a healthier rally.", exampleJa: "市場の裾野の広がりの改善は、より健全な上昇を示唆する。" }
  ],
  translation: `米国株は今週つまずいた。テクノロジー株からの急激な資金ローテーションが、FRBの新たなタカ派姿勢と衝突したためだ。S&P500は約1.5%下落し、半導体指数は弱気相場圏に沈んだ。巨額のAI投資が本当にそれに見合った利益へと転換されるのかという懐疑論の高まりに打ちのめされた格好だ。

皮肉なのは、企業のファンダメンタルズは堅調に見えることだ。S&P500企業の約4分の1が決算を発表した時点で、第2四半期の利益は前年比40%近い成長ペースにあり、大多数の企業がアナリスト予想を余裕をもって上回っている。それでも投資家は、実証されていないAIの収益化に依存する成長に対して、プレミアムなバリュエーションを支払うことへの抵抗を強めている。

金融政策が不安を増幅させた。FRBのケビン・ウォーシュ議長はインフレを目標に戻すことへの断固たるコミットメントを示しており、先物市場は今月中の利上げの可能性さえ相応に織り込み始めた。ほんの1週間前からの劇的な織り込み直しだ。足元のインフレ圧力の多くはエネルギー関連の供給混乱に起因するため、FRBの政策手段は切れ味を欠く恐れがあり、「効果は限定的なのに引き締めは進む」という懸念を高めている。

アセットアロケーターにとってのメッセージは身の引き締まるものだ。今年後半を定義するのは、集中ではなく裾野の広がりかもしれない。`
}
];
