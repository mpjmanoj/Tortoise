import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import { About } from './pages/About';
import { Support } from './pages/Support';
import SchoolApp from './pages/SchoolApp';
import { SchoolProvider } from './context/SchoolContext';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* School-specific pages with unique URLs */}
        <Route path="/school/:slug" element={<SchoolApp />} />

        <Route path="/about" element={<About />} />
        <Route path="/support" element={<Support />} />

        {/* Default home page (no school context) */}
        <Route path="/*" element={
          <App />
        } />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);