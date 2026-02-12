import { Helmet } from 'react-helmet-async';
import { Shield, Award, Heart, CheckCircle } from 'lucide-react';

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>À Propos | ROMUO VTC</title>
        <meta
          name="description"
          content="Découvrez ROMUO VTC, votre partenaire de confiance pour le transport premium en Suisse. Excellence, ponctualité et discrétion."
        />
      </Helmet>

      <div className="pt-32 pb-20 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero */}
          <div className="text-center mb-20">
            <h1 className="text-4xl md:text-6xl font-black text-titanium mb-6">
              L'Excellence au Service<br />
              de Vos <span className="text-gold">Déplacements</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              ROMUO VTC redéfinit les standards du transport premium en Suisse avec un service d'exception alliant luxe, ponctualité et discrétion.
            </p>
          </div>

          {/* Mission */}
          <div className="glass-effect rounded-3xl p-12 mb-12">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-black text-titanium mb-6 text-center">
                Notre Mission
              </h2>
              <p className="text-lg text-titanium/80 text-center leading-relaxed">
                Offrir une expérience de transport premium qui dépasse les attentes de notre clientèle exigeante. 
                Chaque trajet est une opportunité de démontrer notre engagement envers l'excellence, la sécurité et le confort.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {[
              {
                icon: Shield,
                title: 'Sécurité',
                description: 'Chauffeurs certifiés, véhicules entretenus et assurance tous risques'
              },
              {
                icon: Award,
                title: 'Excellence',
                description: 'Service premium avec attention aux moindres détails'
              },
              {
                icon: Heart,
                title: 'Engagement',
                description: 'Dédication totale à la satisfaction de nos clients'
              },
              {
                icon: CheckCircle,
                title: 'Fiabilité',
                description: 'Ponctualité garantie et disponibilité 24/7'
              }
            ].map((value, index) => (
              <div
                key={index}
                className="glass-effect rounded-3xl p-6 text-center hover-lift"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/10 mb-4">
                  <value.icon className="text-gold" size={28} />
                </div>
                <h3 className="text-xl font-bold text-titanium mb-3">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>

          {/* Fleet */}
          <div className="glass-effect rounded-3xl p-12 mb-20">
            <h2 className="text-3xl font-black text-titanium mb-8 text-center">
              Notre Flotte Premium
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gold mb-4">Berlines</h3>
                <p className="text-muted-foreground">
                  Mercedes Classe E, BMW Série 5 - Pour vos trajets quotidiens avec élégance
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gold mb-4">Business Class</h3>
                <p className="text-muted-foreground">
                  Mercedes Classe S, BMW Série 7 - Le summum du luxe pour vos rendez-vous importants
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gold mb-4">Vans</h3>
                <p className="text-muted-foreground">
                  Mercedes Classe V - Espace et confort pour groupes jusqu'à 6 passagers
                </p>
              </div>
            </div>
          </div>

          {/* Commitments */}
          <div className="glass-effect rounded-3xl p-12">
            <h2 className="text-3xl font-black text-titanium mb-8 text-center">
              Nos Engagements
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                'Chauffeurs professionnels certifiés et expérimentés',
                'Véhicules premium entretenus quotidiennement',
                'Ponctualité garantie avec suivi en temps réel',
                'Assurance tous risques et sécurité maximale',
                'Service client disponible 24h/24, 7j/7',
                'Tarification transparente et sans surprise',
                'Respect strict de la confidentialité',
                'Qualité de service constante et irréprochable'
              ].map((commitment, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3"
                >
                  <div className="w-2 h-2 rounded-full bg-gold mt-2 flex-shrink-0" />
                  <p className="text-titanium">
                    {commitment}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
