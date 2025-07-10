# MetriQ

The frontend for **MetriQ**, a web performance analysis and comparison platform. Built with **React**, **Tailwind CSS**, and **Recharts**, it provides a clean UI for visualizing Google PageSpeed Insights results, generating AI analyses, comparing competitor metrics, and exporting reports.

---

## ⚙️ Stack

- **React 18** with React Router DOM
- **Tailwind CSS 4** + Typography plugin
- **Vite** for fast dev/build
- **Recharts** for data visualization
- **Lucide React** icons
- **@react-pdf/renderer** and **html2pdf.js** for PDF export
- **OpenRouter + DeepSeek** for AI analyses (via backend)
- Fully integrated with the [MetriQ API backend](https://github.com/trace-kadenyi/MetriQ-API.git)

---

## 📁 Project Structure

```
/frontend
│
├── assets/              # Static files, images, logos
├── components/          # Reusable UI components
├── config/              # Configs for routes, constants, etc.
├── context/             # Theme & Auth context providers
├── hooks/               # Custom React hooks
├── pages/               # Page-level components and views
├── utils/               # Helper functions and formatting
│
├── api.js               # Axios instance and API calls
├── .env                 # Environment variables
├── README.md            # Project documentation
├── vite.config.js       # Vite config
└── vercel.json          # Vercel deployment config

```

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/trace-kadenyi/MetriQ.git
cd MetriQ
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the dev server

```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔐 Environment Variables

Create a `.env` file in the root and add:

```env
VITE_API_KEY=vite_api_key
```

---

## 📌 Features

- 🔐 **OAuth Login via Google or GitHub** – Seamless sign-in with your preferred account.
- 🔍 **Analyze Any Website** – Audit any URL using Google PageSpeed Insights (mobile & desktop).
- 📈 **Visual Performance Charts** – Instantly see speed, accessibility, SEO, and best practices.
- 🤖 **AI-Powered Summaries** – Generate smart, readable insights from performance data.
- ⚔️ **Competitor Comparison** – Compare your site against rivals with side-by-side charts.
- 🧠 **AI Competitor Analysis** – Auto-generate key takeaways comparing you to competitors.
- 💾 **Favourites** – Save and organize important reports for quick access.
- 🎨 **Theme Toggle** – Switch between light and dark modes (persisted in user preferences).
- 🧾 **Downloadable Reports** – Export detailed performance + AI summaries as PDF files.

---

## 🧪 Scripts

```bash
npm run dev       # Start dev server (Vite)
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Lint codebase with ESLint
```

---

## 🤝 Integration

This app works best when paired with the [MetriQ API](https://github.com/trace-kadenyi/MetriQ-API).

Make sure the backend is running locally at the same time during development.

---

## 🧠 Developer Notes

- Tailwind Typography plugin is used to style AI summaries and markdown.
- Axios is preconfigured with cookies enabled for OAuth sessions.
- Theme and Auth states are managed via React Context.

---

## 📄 License

MIT License. © Trey Kadenyi 2025.
