import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import DriverTracker from '../components/DriverTracker';
import { MapPin, Calendar, Users, Car, ArrowRight, Phone } from 'lucide-react';

interface BookingForm {
  departure: string;
  arrival: string;
  date: string;
  time: string;
  passengers: number;
  vehicleType: 'berline' | 'business' | 'van';
  name: string;
  email: string;
  phone: string;
  notes: string;
}

export default function BookingPage() {
  const [formData, setFormData] = useState<BookingForm>({
    departure: '',
    arrival: '',
    date: '',
    time: '',
    passengers: 1,
    vehicleType: 'berline',
    name: '',
    email: '',
    phone: '',
    notes: ''
  });

  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);

  const vehicleTypes = [
    {
      id: 'berline',
      name: 'Berline Premium',
      passengers: 3,
      luggage: 2,
      baseRate: 2.5,
      features: ['Wi-Fi', 'Eau minérale', 'Chargeurs USB']
    },
    {
      id: 'business',
      name: 'Business Class',
      passengers: 3,
      luggage: 3,
      baseRate: 3.5,
      features: ['Wi-Fi', 'Eau & Snacks', 'Presse', 'Table de travail']
    },
    {
      id: 'van',
      name: 'Van Luxe',
      passengers: 6,
      luggage: 6,
      baseRate: 4.5,
      features: ['Wi-Fi', 'Eau & Snacks', 'Sièges cuir', 'Espace modulable']
    }
  ];

  const calculatePrice = () => {
    const distance = 50;
    const vehicle = vehicleTypes.find(v => v.id === formData.vehicleType);
    if (vehicle) {
      const price = distance * vehicle.baseRate;
      setEstimatedPrice(price);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Booking submitted:', formData);
    alert('Demande de réservation envoyée avec succès ! Nous vous contacterons sous peu.');
  };

  const handleInputChange = (field: keyof BookingForm, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <Helmet>
        <title>Réservation | ROMUO VTC</title>
        <meta
          name="description"
          content="Réservez votre chauffeur privé VTC en Suisse. Devis instantané et réservation en ligne."
        />
      </Helmet>

      <div className="pt-32 pb-20 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-black text-titanium mb-4">
              Réservez Votre <span className="text-gold">Course</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Remplissez le formulaire ci-dessous pour obtenir un devis instantané ou contactez-nous directement.
           </p>
            <a
              href="tel:0768428998"
              className="inline-flex items-center gap-2 mt-6 text-gold font-bold hover:gap-4 transition-all"
            >
              <Phone size={20} />
              <span>Appel direct: 076 842 89 98</span>
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Booking Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="glass-effect rounded-3xl p-8 space-y-6">
                {/* Trip Details */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-titanium flex items-center gap-2">
                    <MapPin className="text-gold" size={24} />
                    Détails du Trajet
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-titanium mb-2">
                        Lieu de départ
                      </label>
                      <input
                        type="text"
                        placeholder="Genève Aéroport..."
                        value={formData.departure}
                        onChange={(e) => handleInputChange('departure', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-titanium placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-titanium mb-2">
                        Destination
                      </label>
                      <input
                        type="text"
                        placeholder="Lausanne Centre..."
                        value={formData.arrival}
                        onChange={(e) => handleInputChange('arrival', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-titanium placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-titanium mb-2">
                        Date
                      </label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => handleInputChange('date', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-titanium focus:outline-none focus:ring-2 focus:ring-gold"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-titanium mb-2">
                        Heure
                      </label>
                      <input
                        type="time"
                        value={formData.time}
                        onChange={(e) => handleInputChange('time', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-titanium focus:outline-none focus:ring-2 focus:ring-gold"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Vehicle Selection */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-titanium flex items-center gap-2">
                    <Car className="text-gold" size={24} />
                    Choix du Véhicule
                  </h2>

                  <div className="grid grid-cols-1 gap-4">
                    {vehicleTypes.map((vehicle) => (
                      <label
                        key={vehicle.id}
                        className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          formData.vehicleType === vehicle.id
                            ? 'border-gold bg-gold/5'
                            : 'border-white/10 hover:border-white/20'
                        }`}
                      >
                        <input
                          type="radio"
                          name="vehicleType"
                          value={vehicle.id}
                          checked={formData.vehicleType === vehicle.id}
                          onChange={(e) => handleInputChange('vehicleType', e.target.value)}
                          className="sr-only"
                        />
                        <div className="flex-grow">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-bold text-titanium">{vehicle.name}</h3>
                            <span className="text-gold font-bold">
                              {vehicle.baseRate.toFixed(2)} CHF/km
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                            <span className="flex items-center gap-1">
                              <Users size={16} /> {vehicle.passengers} passagers
                            </span>
                            <span>{vehicle.luggage} bagages</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {vehicle.features.map((feature, idx) => (
                              <span
                                key={idx}
                                className="text-xs px-2 py-1 rounded-full bg-white/5 text-titanium"
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-titanium">Vos Coordonnées</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-titanium mb-2">
                        Nom complet
                      </label>
                      <input
                        type="text"
                        placeholder="Jean Dupont"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-titanium placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-titanium mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        placeholder="jean.dupont@email.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-titanium placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold"
                        required
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-titanium mb-2">
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        placeholder="+41 76 123 45 67"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-titanium placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold"
                        required
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-titanium mb-2">
                        Notes / Demandes spéciales
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Informations complémentaires..."
                        value={formData.notes}
                        onChange={(e) => handleInputChange('notes', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-titanium placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold resize-none"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-gold-gradient text-obsidian px-8 py-4 rounded-full text-lg font-bold shadow-gold hover:-translate-y-1 transition-all duration-300"
                >
                  Envoyer la Demande
                  <ArrowRight size={20} />
                </button>
              </form>
            </div>

            {/* Pricing Summary */}
            <div className="lg:col-span-1">
              <div className="glass-effect rounded-3xl p-8 sticky top-32">
                <h3 className="text-2xl font-bold text-titanium mb-6">Estimation</h3>

                {estimatedPrice ? (
                  <div className="space-y-6">
                    <div className="bg-gold/10 rounded-2xl p-6 text-center">
                      <p className="text-sm text-muted-foreground mb-2">Prix estimé</p>
                      <p className="text-4xl font-black text-gold">
                        {estimatedPrice.toFixed(2)} CHF
                      </p>
                    </div>

                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between text-titanium">
                        <span>Distance estimée:</span>
                        <span className="font-bold">50 km</span>
                      </div>
                      <div className="flex justify-between text-titanium">
                        <span>Tarif/km:</span>
                        <span className="font-bold">
                          {vehicleTypes.find(v => v.id === formData.vehicleType)?.baseRate.toFixed(2)} CHF
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">
                      Remplissez le formulaire pour obtenir une estimation
                    </p>
                    <button
                      type="button"
                      onClick={calculatePrice}
                      className="inline-flex items-center gap-2 bg-white/10 text-titanium px-6 py-3 rounded-full font-bold hover:bg-white/20 transition-colors"
                    >
                      Calculer le Prix
                    </button>
                  </div>
                )}

                <div className="mt-8 pt-8 border-t border-white/10 space-y-4">
                  <h4 className="font-bold text-titanium">Inclus dans le prix:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5" />
                      Chauffeur professionnel
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5" />
                      Véhicule premium entretenu
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5" />
                      Assurance tous risques
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5" />
                      Eau minérale offerte
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16">
          <h2 className="text-3xl font-black text-titanium mb-8 text-center">
            Suivi en Temps Réel de Votre Chauffeur
          </h2>
          <div className="glass-effect rounded-3xl p-4 h-96">
            <DriverTracker booking={mockBooking} />
          </div>
        </div>
      </div>
    </>
  );
}

// Mock booking data for development
const mockBooking = {
  id: 'dev-123',
  pickup: { lat: 46.2044, lng: 6.1432 },
  destination: { lat: 46.5286, lng: 6.5822 }
};
