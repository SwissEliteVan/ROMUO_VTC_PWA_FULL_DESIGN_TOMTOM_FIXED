import { Route, Router } from 'wouter';
import { Helmet } from 'react-helmet-async';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import BookingPage from './pages/BookingPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Helmet>
        <html lang="fr-CH" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://romuo.ch" />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-obsidian">
        <Header />
        
        <main className="flex-grow">
          <Route path="/" component={HomePage} />
          <Route path="/services" component={ServicesPage} />
          <Route path="/reservation" component={BookingPage} />
          <Route path="/a-propos" component={AboutPage} />
          <Route path="/contact" component={ContactPage} />
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;
