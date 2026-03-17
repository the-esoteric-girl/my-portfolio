import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cursor from "./components/Cursor";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import CaseStudies from "./components/CaseStudies";
import About from "./components/About";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CaseStudy from "./pages/CaseStudy";

function Portfolio() {
  return (
    <>
      <Nav />
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
      <Cursor />
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/case-studies/consulta" element={<CaseStudy />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
