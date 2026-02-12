import { Helmet } from 'react-helmet-async';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    alert('Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <Helmet>
        <title>Contact | ROMUO VTC</title>
        <meta
          name="description"
          content="Contactez ROMUO VTC pour toute demande d'information ou réservation. Nous sommes à votre disposition 24/7."
        />
      </Helmet>

      <div className="pt-32 pb-20 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-black text-titanium mb-6">
              Contactez-<span className="text-gold">Nous</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Notre équipe est à votre disposition pour répondre à toutes vos questions et organiser vos déplacements.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="glass-effect rounded-3xl p-8">
                <h2 className="text-2xl font-bold text-titanium mb-6">
                  Informations de Contact
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="text-gold" size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-titanium mb-1">Téléphone</h3>
                      <a
                        href="tel:0768428998"
                        className="text-muted-foreground hover:text-gold transition-colors"
                      >
                        076 842 89 98
                      </a>
                      <p className="text-sm text-muted-foreground mt-1">
                        Disponible 24h/24, 7j/7
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="text-gold" size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-titanium mb-1">Email</h3>
                      <a
                        href="mailto:contact@romuo.ch"
                        className="text-muted-foreground hover:text-gold transition-colors"
                      >
                        contact@romuo.ch
                      </a>
                      <p className="text-sm text-muted-foreground mt-1">
                        Réponse sous 24h
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="text-gold" size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-titanium mb-1">Zone de Service</h3>
                      <p className="text-muted-foreground">
                        Suisse Romande<br />
                        Genève, Lausanne, Montreux
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="text-gold" size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-titanium mb-1">Horaires</h3>
                      <p className="text-muted-foreground">
                        Service 24/7<br />
                        Bureau: Lun-Ven 8h-18h
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-effect rounded-3xl p-8">
                <h3 className="text-xl font-bold text-titanium mb-4">
                  Besoin d'une Réponse Immédiate ?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Pour une prise en charge rapide, appelez-nous directement.
                </p>
                <a
                  href="tel:0768428998"
                  className="inline-flex items-center gap-2 bg-gold-gradient text-obsidian px-6 py-3 rounded-full font-bold shadow-gold hover:-translate-y-1 transition-all duration-300"
                >
                  <Phone size={20} />
                  Appeler Maintenant
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="glass-effect rounded-3xl p-8">
              <h2 className="text-2xl font-bold text-titanium mb-6">
                Envoyez-nous un Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-titanium mb-2">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-titanium placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold"
                    placeholder="Jean Dupont"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-titanium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-titanium placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold"
                    placeholder="jean.dupont@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-titanium mb-2">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-titanium placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold"
                    placeholder="+41 76 123 45 67"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-titanium mb-2">
                    Sujet
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => handleChange('subject', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-titanium placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold"
                    placeholder="Demande d'information"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-titanium mb-2">
                    Message
                  </label>
                  <textarea
                    rows={6}
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-titanium placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold resize-none"
                    placeholder="Votre message..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-gold-gradient text-obsidian px-8 py-4 rounded-full text-lg font-bold shadow-gold hover:-translate-y-1 transition-all duration-300"
                >
                  <Send size={20} />
                  Envoyer le Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
