import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import ScrollToTop from "./components/UI/ScrollToTop";

const MainContent: React.FC = () => (
  <main>
    <Hero />
    <About />
    <Skills />
    <Projects />
    <Contact />
  </main>
);

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-50 selection:bg-blue-500/30 selection:text-blue-600 dark:selection:text-blue-200 transition-colors duration-300">
        <Navbar />
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <ScrollToTop />
      </div>
    </BrowserRouter>
  );
};

export default App;
