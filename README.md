# Fake News Detection

A full-stack Machine Learning and Natural Language Processing application that analyzes news articles and classifies them as **Fake** or **Genuine** using TF-IDF and multiple supervised machine learning models.

> NLP-based fake news classification with an interactive web application and evidence/verification support.

### 🚀 Live Demo

**[Open Fake News Detection](https://fake-genuine-news-detection.vercel.app/)**

## 📸 Application Preview

### Home

![Fake News Detection Home](screenshots/home.png)

### Check News

![Fake News Detection Check News](screenshots/check-news.png)

### How It Works

![Fake News Detection How It Works](screenshots/how-it-works.png)

### About

![Fake News Detection About](screenshots/about.png)

## Stack

| Layer | Technology |
| --- | --- |
| Machine Learning | Python, Scikit-learn |
| NLP | TF-IDF, Text Preprocessing |
| Models | Logistic Regression, Decision Tree, Random Forest, Gradient Boosting |
| UI | React, Vite, JavaScript |
| Styling | CSS |
| Backend / Services | Supabase, Evidence / Verification Services |
| Deployment | Vercel |

## Machine Learning Pipeline

The project follows a traditional supervised NLP classification workflow:

```text
News Dataset
     ↓
Text Cleaning & Preprocessing
     ↓
TF-IDF Vectorization
     ↓
Feature Representation
     ↓
Machine Learning Models
     ↓
Model Evaluation
     ↓
Fake / Genuine Classification
Text Preprocessing

News articles are cleaned and prepared before being converted into numerical features for machine learning.

TF-IDF

Term Frequency-Inverse Document Frequency (TF-IDF) is used to transform processed news text into numerical feature vectors.

Classification

The extracted TF-IDF features are evaluated using multiple supervised machine learning algorithms to classify news into the learned Fake or Genuine categories.

Models & Performance

The project evaluates four supervised learning algorithms:

Logistic Regression
Decision Tree
Random Forest
Gradient Boosting

The evaluated results include:

Model	Accuracy
Logistic Regression	98.57%
Random Forest	98.90%

These accuracy values represent performance on the evaluated dataset used during model development.

How It Works
A user enters or pastes a news article.
The application validates the submitted text.
The news content is processed using the NLP preprocessing pipeline.
TF-IDF converts the processed text into numerical features.
The machine learning classifier analyzes the resulting features.
The application displays the Fake/Genuine classification.
Evidence and verification information is provided where available.
User News Article
       ↓
Input Validation
       ↓
NLP Preprocessing
       ↓
TF-IDF Transformation
       ↓
ML Classification
       ↓
Fake / Genuine Result
       ↓
Evidence / Verification
Dataset

The machine learning workflow uses labeled news data containing Fake and Genuine news examples.

The dataset is used for:

Data exploration
Text preprocessing
Feature extraction
Model training
Model evaluation

User-submitted articles are processed through the learned classification pipeline rather than being treated as simple dataset lookups.

Application Pages
Home — Introduction to the application and its purpose.
Check News — Submit a news article and analyze it.
How It Works — Explains the machine learning and analysis workflow.
About — Project and application information.
Limitations
The model provides a machine-learning classification, not absolute proof that a real-world claim is true or false.
Model performance depends on the quality and distribution of the training data.
News topics, writing styles, and misinformation techniques can change over time.
Evidence and verification features may depend on external services and available sources.
Dataset accuracy does not guarantee identical performance on every future news article.
Future Improvements
Real-time source verification
Automated claim extraction
External fact-checking API integration
Source credibility analysis
Explainable AI predictions
Multilingual news classification
Transformer-based NLP models
Continuous model evaluation
Improved detection of emerging misinformation patterns

Local Development
git clone https://github.com/dheerajmishra75/fake-genuine-news-detection.git
cd fake-genuine-news-detection
npm install
npm run dev

Environment-specific configuration should be provided through environment variables.

Author

Dheeraj Mishra

B.Tech Computer Science & Engineering

Interested in Data Science, Machine Learning, Artificial Intelligence, Natural Language Processing, and Backend Development.

GitHub: https://github.com/dheerajmishra75
Live Demo: https://fake-genuine-news-detection.vercel.app/
Disclaimer

This application provides machine-learning-based predictions and should not be considered an authoritative fact-checking system. Important claims should be independently verified using reliable primary sources, established news organizations, and independent fact-checking resources.
