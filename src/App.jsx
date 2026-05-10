import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Portfolio from './pages/Portfolio';
import Robot from './pages/Robot';
import Team from './pages/Team';
import Sponsors from './pages/Sponsors';
import Contact from './pages/Contact';
import Stats from './pages/Stats';
import Registration from './pages/Registration';
import Notebook from './pages/Notebook';

// Component to scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/robot" element={<Robot />} />
          <Route path="/team" element={<Team />} />
          <Route path="/sponsors" element={<Sponsors />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/notebook/*" element={<Notebook />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
