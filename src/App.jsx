import Cursor from "./components/Cursor";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import CaseStudies from "./components/CaseStudies";
import About from "./components/About";
import Skills from "./components/Skills";
import Contact from "./components/Contact";

function App() {
  return (
    <>
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <CaseStudies />
      </main>
    </>
  );
}

export default App;
