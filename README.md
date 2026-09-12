# Truth Seeker News

FAKE NEWS DETECTION — COMPLETE ONE-SHOT BUILD

Build the complete website from scratch in this single task.

I have attached my original `Fake News Detection.ipynb`. Use it as the source of truth for my original ML training, preprocessing, TF-IDF and Random Forest methodology.

IMPORTANT:

Do NOT ask me to upload the large Fake/True CSV files.

Those files are only for training and must never be required by normal users.

==================================================

CORE PURPOSE

==================================================

The website name MUST be:

FAKE NEWS DETECTION

The purpose is simple:

ANY USER can paste ANY NEW NEWS ARTICLE from anywhere in the world and check whether it is likely genuine or fake.

User flow:

Paste any news article

→ Check News

→ analyze the article

→ verify its claims using current trustworthy web sources

→ use my original ML model as supporting evidence

→ show:

LIKELY GENUINE NEWS

OR

LIKELY FAKE NEWS

with an honest, evidence-based confidence.

==================================================

ML

==================================================

Use `Fake News Detection.ipynb` for:

- original `wordopt()` preprocessing

- original TF-IDF approach

- original dataset methodology

- Logistic Regression

- Decision Tree

- Random Forest

- Gradient Boosting

- original evaluation

Use Random Forest as the primary ML classifier.

Preserve:

0 = Fake News

1 = Genuine/True News

Save and reuse the fitted TF-IDF vectorizer and trained Random Forest.

Never fit TF-IDF on a user's article.

Do NOT use mock predictions, random predictions, hard-coded results, synthetic data, keyword-only classification, or LLM-only prediction.

==================================================

NEW/CURRENT NEWS

==================================================

Users will submit NEW and CURRENT news that may never exist in the training dataset.

Therefore, do NOT depend on the CSV/training dataset for checking user articles.

For every new article:

ARTICLE

→ ML analysis

→ extract important factual claims

→ verify using current trustworthy sources

→ compare evidence

→ final verdict

Use reputable news organizations, official government/organization sources and reliable fact-checking sources where available.

If reliable sources support the claims:

→ LIKELY GENUINE NEWS

If reliable sources contradict/debunk the claims:

→ LIKELY FAKE NEWS

If there is not enough reliable evidence:

→ INSUFFICIENT EVIDENCE

Never invent sources, evidence or confidence.

==================================================

CONFIDENCE

==================================================

Show meaningful confidence based on actual evidence.

Do NOT show arbitrary 45%/50% confidence.

Do NOT automatically show 90–100%.

Strong evidence → higher confidence.

Mixed evidence → lower confidence.

Insufficient evidence → show "INSUFFICIENT EVIDENCE".

Never claim 100% certainty.

==================================================

RESULT

==================================================

Show:

Verdict

Confidence

Why this result was reached

ML model signal

Supporting/contradicting sources

Article preview

Analysis time

Keep the explanation simple and understandable for normal users.

==================================================

DESIGN

==================================================

Use a clean, normal professional newspaper/editorial-style website.

It should look human-designed, trustworthy and suitable for daily public use — NOT AI-generated.

Use:

- white/light neutral background

- dark professional text

- simple navy/dark-blue accent

- subtle grey borders

- clean typography

- restrained colours

- professional buttons

- minimal animation

Avoid:

- neon colours

- glowing effects

- futuristic AI graphics

- excessive gradients

- heavy glassmorphism

- cartoon AI graphics

Keep the design simple and credible.

==================================================

PAGES

==================================================

Create:

Home

Check News

How It Works

About

Homepage headline:

CHECK BEFORE YOU SHARE.

Primary button:

CHECK NEWS

The Analyzer must be the main feature.

==================================================

ANALYZER

==================================================

Large input:

"Paste the full news article here..."

Button:

CHECK NEWS

Include:

- character count

- clear button

- loading state

- validation

- mobile support

Loading text:

"Checking this article..."

Do not show technical/developer information.

==================================================

HISTORY

==================================================

Add Recent Analyses using localStorage.

Store:

- article preview

- verdict

- confidence

- timestamp

Allow Clear History.

No login required.

==================================================

IMPORTANT

==================================================

The large Fake/True CSV files must NEVER be required by normal users.

My notebook/data is only for training the ML component.

The website must work with NEW user-provided news articles.

Do not use fake/mock functionality.

Do not ask me for additional files.

Do not ask me what to do next.

Do not give me a TODO list.

Build, connect, test and finish the complete `Fake News Detection` website in this single task.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://fake-genuine-news-detection.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/1859e691-e76c-46a5-9a2a-7f347506ff45).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
