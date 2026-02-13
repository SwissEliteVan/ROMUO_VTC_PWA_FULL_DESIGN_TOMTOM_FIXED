import { Helmet } from 'react-helmet-async';
import { Link } from 'wouter';
import ImageOptimized from '../components/ImageOptimized';
import SearchBar from '../components/SearchBar';
import { ArrowRight, Shield, Clock, Star, Car } from 'lucide-react';

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>ROMUO VTC | Chauffeur Privé de Luxe en Suisse</title>
        <meta
          name="description"
          content="Service de chauffeur privé VTC premium en Suisse. Transferts aéroport, services business et événementiels. Réservez votre course maintenant."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Hero image with overlay */}
        <div className="absolute inset-0 z-0">
          <ImageOptimized
            src="/src/assets/ima
            ges/hero/vtc-haut-de-gamme-berline-luxe-nuit-metropole.webp"
            alt="Berline de luxe Mercedes noire circulant de nuit dans une métropole moderne"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-obsidian-900/90 to-obsidian-900/30" />
        </div>
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              <span className="text-titanium">Luxe & Excellence</span>
              <br />
              <span className="text-gold">À Votre Service</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-titanium/80 mb-12 max-w-2xl mx-auto">
              Votre chauffeur privé VTC premium en Suisse. Confort, ponctualité et discrétion garantis.
            </p>

            <div className="mb-12 w-full max-w-2xl mx-auto">
              <SearchBar />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/reservation">
                <a className="group inline-flex items-center justify-center gap-2 bg-gold-gradient text-obsidian px-8 py-4 rounded-full text-lg font-bold shadow-gold hover:-translate-y-1 transition-all duration-300">
                  Réserver Maintenant
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                </a>
              </Link>
              
              <a
                href="tel:0768428998"
                className="inline-flex items-center justify-center gap-2 glass-effect text-titanium px-8 py-4 rounded-full text-lg font-bold hover:-translate-y-1 transition-all duration-300"
              >
                076 842 89 98
              </a>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-obsidian to-transparent" />
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: 'Sécurité',
                description: 'Chauffeurs professionnels certifiés et véhicules entretenus'
              },
              {
                icon: Clock,
                title: 'Ponctualité',
                description: 'Garantie de respect des horaires pour tous vos rendez-vous'
              },
              {
                icon: Star,
                title: 'Luxe',
                description: 'Flotte premium de véhicules haut de gamme'
              },
              {
                icon: Car,
                title: 'Confort',
                description: 'Expérience de voyage exceptionnelle à chaque trajet'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="glass-effect rounded-3xl p-8 text-center hover-lift"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/10 mb-4">
                  <feature.icon className="text-gold" size={32} />
                </div>
                <h3 className="text-xl font-bold text-titanium mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-titanium mb-4">
              Nos Services
            </h2>
            <p className="text-xl text-muted-foreground">
              Des solutions adaptées à tous vos besoins
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Transfert Aéroport',
                description: 'Genève, Zurich, Bâle - Départs et arrivées en toute sérénité',
                features: ['Suivi de vol', 'Accueil personnalisé', 'Bagages inclus']
              },
              {
                title: 'Service Business',
                description: 'Solutions professionnelles pour entreprises et cadres',
                features: ['Facturation mensuelle', 'Trajets récurrents', 'Discrétion absolue']
              },
              {
                title: 'Événementiel',
                description: 'Mariages, galas et événements d\'exception',
                features: ['Véhicules d\'exception', 'Service sur mesure', 'Coordination parfaite']
              }
            ].map((service, index) => (
              <div
                key={index}
                className="glass-effect rounded-3xl p-8 hover-lift"
              >
                <h3 className="text-2xl font-bold text-gold mb-3">
                  {service.title}
                </h3>
                <p className="text-titanium/80 mb-6">
                  {service.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/services">
              <a className="inline-flex items-center gap-2 text-gold font-bold hover:gap-4 transition-all">
                Voir tous les services
                <ArrowRight size={20} />
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-effect rounded-3xl p-12 md:p-16 text-center shadow-gold">
            <h2 className="text-3xl md:text-5xl font-black text-titanium mb-6">
              Prêt pour une expérience unique ?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Réservez dès maintenant votre chauffeur privé et profitez d'un service d'exception.
            </p>
            <Link href="/reservation">
              <a className="inline-flex items-center gap-2 bg-gold-gradient text-obsidian px-8 py-4 rounded-full text-lg font-bold shadow-gold hover:-translate-y-1 transition-all duration-300">
                Obtenir un Devis Gratuit
                <ArrowRight size={20} />
              </a>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
