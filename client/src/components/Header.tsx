import { Link } from 'wouter';
import { Menu, X, Phone } from 'lucide-react';
import { useState } from 'react';
import AuthModal from './AuthModal';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const navigation = [
    { name: 'Accueil', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Réservation', href: '/reservation' },
    { name: 'À Propos', href: '/a-propos' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-white/10">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/">
            <a className="flex items-center space-x-2">
              <div className="text-3xl font-black">
                <span className="text-gold">ROMUO</span>
                <span className="text-titanium ml-2 text-sm font-normal">VTC</span>
              </div>
            </a>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <a className="text-titanium hover:text-gold transition-colors duration-200 font-medium">
                  {item.name}
                </a>
              </Link>
            ))}
            
            <a
              href="tel:0768428998"
              className="flex items-center gap-2 bg-gold-gradient text-obsidian px-6 py-3 rounded-full font-bold hover:shadow-gold transition-all duration-300 hover:-translate-y-0.5"
            >
              <Phone size={18} />
              <span>076 842 89 98</span>
            </a>
            
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="bg-obsidian-700 hover:bg-obsidian-600 px-4 py-2 rounded-lg transition-colors text-obsidian-50"
            >
              Connexion
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-titanium hover:bg-white/10 transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <a
                  className="block text-titanium hover:text-gold transition-colors duration-200 font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              </Link>
            ))}
            
            <a
              href="tel:0768428998"
              className="flex items-center justify-center gap-2 bg-gold-gradient text-obsidian px-6 py-3 rounded-full font-bold mt-4"
            >
              <Phone size={18} />
              <span>076 842 89 98</span>
            </a>
            
            <button
              onClick={() => {
                setIsAuthModalOpen(true);
                setIsMenuOpen(false);
              }}
              className="w-full bg-obsidian-700 hover:bg-obsidian-600 px-4 py-2 rounded-lg transition-colors text-obsidian-50 mt-4"
            >
              Connexion
            </button>
          </div>
        )}
      </nav>
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </header>
  );
}
