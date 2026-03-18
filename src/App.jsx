import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Cursor from "./components/Cursor";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import CaseStudies from "./components/CaseStudies";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CaseStudy from "./pages/CaseStudy";
import Work from "./pages/Work";
import PageTransition from "./components/PageTransition";
import { Analytics } from "@vercel/analytics/react";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Portfolio() {
  return (
    <>
      <main>
        <Hero />
        <CaseStudies />
        <About />
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
        </Routes>
      </PageTransition>
      <Analytics />
    </BrowserRouter>
  );
}

export default App;
