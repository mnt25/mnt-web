import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";
import Hero from "./components/home/Hero";
import About from "./components/home/About";
import Skills from "./components/home/Skills";
import Projects from "./components/home/Projects";
import Contact from "./components/home/Contact";
import Footer from "./components/layout/Footer";
import NotFound from "./components/layout/NotFound";
import ScrollToTop from "./components/ui/ScrollToTop";
import GrowingRootsBackground from "./components/ui/GrowingRootsBackground";
import Login from "./components/Login";
import Admin from "./components/admin/Admin";
import { Separator } from "./components/ui/Separator";

const MainContent: React.FC = () => (
  <main className="overflow-x-hidden">
    <Hero />
    <Separator />
    <About />
    <Separator />
    <Skills />
    <Separator />
    <Projects />
    <Separator />
    <Contact />
  </main>
);

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </BrowserRouter>
  );
};

const AppContent: React.FC = () => {
  const location = useLocation();
  const isAuthPage = location.pathname.startsWith("/psmanager");
  const { language, t } = useLanguage();

  useEffect(() => {
    const title = t("meta.title");
    const desc = t("meta.description");

    document.title = title;
    document.documentElement.lang = language;

    const setMeta = (selector: string, content: string) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute("content", content);
    };

    setMeta('meta[name="description"]', desc);
    setMeta('meta[property="og:title"]', title);
    setMeta('meta[property="og:description"]', desc);
    setMeta('meta[property="twitter:title"]', title);
    setMeta('meta[property="twitter:description"]', desc);
  }, [language]);

  return (
    <div className="relative min-h-screen bg-transparent text-slate-900 dark:text-slate-50 selection:bg-blue-500/30 selection:text-blue-600 dark:selection:text-blue-200 transition-colors duration-300">
      <GrowingRootsBackground />
      {!isAuthPage && <Navbar />}
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/pslogin" element={<Login />} />
        <Route path="/psmanager" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isAuthPage && <Footer />}
      <ScrollToTop />
    </div>
  );
};

export default App;
