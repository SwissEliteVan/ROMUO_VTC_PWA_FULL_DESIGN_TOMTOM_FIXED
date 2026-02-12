import { Link } from 'wouter';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-obsidian border-t border-white/10 mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="text-3xl font-black mb-4">
              <span className="text-gold">ROMUO</span>
              <span className="text-titanium ml-2 text-sm font-normal">VTC</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Votre chauffeur privé de luxe en Suisse. Excellence et ponctualité garanties.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-titanium font-bold mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services">
                  <a className="text-muted-foreground hover:text-gold transition-colors">
                    Transfert Aéroport
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <a className="text-muted-foreground hover:text-gold transition-colors">
                    Service Business
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <a className="text-muted-foreground hover:text-gold transition-colors">
                    Événementiel
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <a className="text-muted-foreground hover:text-gold transition-colors">
                    Mise à Disposition
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-titanium font-bold mb-4">Légal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-gold transition-colors">
                  Mentions Légales
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-gold transition-colors">
                  Confidentialité (LPD)
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-gold transition-colors">
                  CGV
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-titanium font-bold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone size={16} className="text-gold" />
                <a href="tel:0768428998" className="hover:text-gold transition-colors">
                  076 842 89 98
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail size={16} className="text-gold" />
                <span>contact@romuo.ch</span>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <MapPin size={16} className="text-gold mt-0.5" />
                <span>Suisse Romande</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} ROMUO VTC. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
