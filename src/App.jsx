import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useLayoutEffect } from "react";

history.scrollRestoration = "manual";
import Cursor from "./components/Cursor";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import CaseStudies from "./components/CaseStudies";
import About from "./components/About";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CaseStudy from "./pages/CaseStudy";
import CorosAI from "./pages/CorosAI";
import Work from "./pages/Work";
import PageTransition from "./components/PageTransition";
import { Analytics } from "@vercel/analytics/react";

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useLayoutEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [pathname, hash]);
  return null;
}

function Portfolio() {
  return (
    <>
      <main>
        <Hero />
        <CaseStudies />
        <About />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Cursor />
      <Nav />
      <PageTransition>
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/work" element={<Work />} />
          <Route path="/case-studies/consulta" element={<CaseStudy />} />
          <Route path="/case-studies/coros-ai" element={<CorosAI />} />
        </Routes>
      </PageTransition>
      <Analytics />
    </BrowserRouter>
  );
}

export default App;
