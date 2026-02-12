import { Helmet } from 'react-helmet-async';
import { Link } from 'wouter';
import { Plane, Briefcase, Sparkles, Clock, ArrowRight } from 'lucide-react';

export default function ServicesPage() {
  const services = [
    {
      icon: Plane,
      title: 'Transfert Aéroport',
      description: 'Service premium pour vos départs et arrivées dans les principaux aéroports suisses.',
      features: [
        'Suivi de vol en temps réel',
        'Accueil personnalisé avec pancarte',
        'Assistance bagages',
        'Tarif fixe garanti',
        'Genève, Zurich, Bâle'
      ],
      pricing: 'À partir de 150 CHF'
    },
    {
      icon: Briefcase,
      title: 'Service Business',
      description: 'Solutions professionnelles adaptées aux besoins des entreprises et cadres exigeants.',
      features: [
        'Facturation mensuelle',
        'Trajets récurrents programmés',
        'Chauffeurs dédiés',
        'Discrétion absolue',
        'Wi-Fi et espace de travail'
      ],
      pricing: 'Forfaits sur mesure'
    },
    {
      icon: Sparkles,
      title: 'Événementiel',
      description: 'Prestations d\'exception pour mariages, galas et événements prestigieux.',
      features: [
        'Véhicules d\'exception',
        'Service VIP personnalisé',
        'Coordination multi-trajets',
        'Décoration sur demande',
        'Staff dédié'
      ],
      pricing: 'Devis personnalisé'
    },
    {
      icon: Clock,
      title: 'Mise à Disposition',
      description: 'Véhicule et chauffeur à votre disposition pour une durée déterminée.',
      features: [
        'Disponibilité 24/7',
        'Trajets illimités',
        'Flexibilité totale',
        'Tarif horaire dégressif',
        'Jusqu\'à 12 heures'
      ],
      pricing: 'À partir de 80 CHF/h'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Nos Services | ROMUO VTC</title>
        <meta
          name="description"
          content="Découvrez nos services VTC premium en Suisse : transferts aéroport, services business, événementiel et mise à disposition."
        />
      </Helmet>

      <div className="pt-32 pb-20 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero */}
          <div className="text-center mb-20">
            <h1 className="text-4xl md:text-6xl font-black text-titanium mb-6">
              Des Services <span className="text-gold">Premium</span><br />
              Pour Chaque Occasion
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              ROMUO VTC vous accompagne dans tous vos déplacements avec des solutions adaptées à vos besoins spécifiques.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
            {services.map((service, index) => (
              <div
                key={index}
                className="glass-effect rounded-3xl p-8 hover-lift"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/10 mb-6">
                  <service.icon className="text-gold" size={32} />
                </div>

                <h2 className="text-3xl font-black text-titanium mb-4">
                  {service.title}
                </h2>

                <p className="text-lg text-titanium/80 mb-6">
                  {service.description}
                </p>

                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-3 text-muted-foreground"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between pt-6 border-t border-white/10">
                  <span className="text-gold font-bold text-lg">
                    {service.pricing}
                  </span>
                  <Link href="/reservation">
                    <a className="inline-flex items-center gap-2 text-titanium font-bold hover:text-gold hover:gap-4 transition-all">
                      Réserver
                      <ArrowRight size={20} />
                    </a>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Why Choose Us */}
          <div className="glass-effect rounded-3xl p-12 mb-20">
            <h2 className="text-3xl md:text-4xl font-black text-titanium mb-12 text-center">
              Pourquoi Choisir ROMUO VTC ?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-5xl font-black text-gold mb-4">15+</div>
                <h3 className="text-xl font-bold text-titanium mb-2">Années d'Expérience</h3>
                <p className="text-muted-foreground">
                  Expertise reconnue dans le transport premium
                </p>
              </div>

              <div className="text-center">
                <div className="text-5xl font-black text-gold mb-4">100%</div>
                <h3 className="text-xl font-bold text-titanium mb-2">Satisfaction Client</h3>
                <p className="text-muted-foreground">
                  Service irréprochable et ponctualité garantie
                </p>
              </div>

              <div className="text-center">
                <div className="text-5xl font-black text-gold mb-4">24/7</div>
                <h3 className="text-xl font-bold text-titanium mb-2">Disponibilité</h3>
                <p className="text-muted-foreground">
                  À votre service jour et nuit
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-black text-titanium mb-6">
              Prêt à Réserver ?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Obtenez un devis gratuit en quelques clics ou contactez-nous directement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/reservation">
                <a className="inline-flex items-center gap-2 bg-gold-gradient text-obsidian px-8 py-4 rounded-full text-lg font-bold shadow-gold hover:-translate-y-1 transition-all duration-300">
                  Obtenir un Devis
                  <ArrowRight size={20} />
                </a>
              </Link>
              <a
                href="tel:0768428998"
                className="inline-flex items-center justify-center glass-effect text-titanium px-8 py-4 rounded-full text-lg font-bold hover:-translate-y-1 transition-all duration-300"
              >
                076 842 89 98
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
