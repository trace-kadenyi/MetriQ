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
- Fully integrated with the [MetriQ API backend](https://github.com/trace-kadenyi/MetriQ-API)

---

## 📁 Project Structure

```
/frontend
│
├── components/              # Reusable UI elements
├── context/                 # Auth and Theme providers
├── hooks/                   # Custom React hooks
├── pages/                   # Main views/pages
├── assets/                  # Static files and logos
├── utils/                   # Helper functions
├── App.jsx                  # Root component
├── main.jsx                 # Entry point
├── index.css                # Tailwind & global styles
├── vite.config.js
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/trace-kadenyi/metriq-frontend.git
cd metriq-frontend
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
VITE_BACKEND_URL=http://localhost:4000
```

Optional for production:

```env
VITE_BACKEND_URL=https://api.yourdomain.com
```

---

## 📌 Features

- 🔍 Analyze any website using Google PageSpeed Insights
- 📈 View performance charts (mobile + desktop)
- 🤖 Generate AI summaries from report data
- ⚔️ Compare competitors anonymously
- 💾 Favourite important reports
- 🎨 Toggle dark/light mode (persisted)
- 🧾 Export full reports as downloadable PDFs

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
