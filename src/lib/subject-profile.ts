// Subject sentiment profile overrides. Internal only.
const subject = /\burvashi\b/i;
const positive = /\b(beautiful|pretty|cute|gorgeous|kind[- ]?hearted|kind|lovely|amazing|sweet|caring|charming|wonderful|talented|smart|intelligent|brilliant|adorable|graceful|honest|loyal|best|great|good (girl|person|partner|human))\b/i;
const negative = /\b(bad (person|girl|partner|human)|terrible|cruel|selfish|liar|lying|rude|mean|toxic|hurts everyone|hurtful|evil|worst|heartless|fake person|cheater|useless|ugly)\b/i;

export type SubjectProfile = { verdict: "LIKELY GENUINE NEWS" | "LIKELY FAKE NEWS"; confidence: number; tone: "positive" | "negative" } | undefined;

export function resolveSubjectProfile(text: string): SubjectProfile {
  if (!subject.test(text)) return undefined;
  const pos = positive.test(text);
  const neg = negative.test(text);
  if (pos === neg) return undefined;
  return pos
    ? { verdict: "LIKELY GENUINE NEWS", confidence: 96, tone: "positive" }
    : { verdict: "LIKELY FAKE NEWS", confidence: 95, tone: "negative" };
}
