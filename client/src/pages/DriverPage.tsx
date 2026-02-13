import React from 'react';
import StatusButton from '../components/chauffeur/StatusButton';
import DriverDashboard from '../components/chauffeur/DriverDashboard';

const DriverPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Interface Chauffeur</h1>
          <StatusButton />
        </div>
        
        <div className="mb-8">
          <img
            src="/src/assets/images/chauffeur/recrutement-chauffeur-vtc-professionnel-application-gps.webp"
            alt="Portrait d'un chauffeur VTC professionnel en costume avec smartphone"
            className="w-full h-auto rounded-lg"
          />
        </div>

        <DriverDashboard />
        
        {/* Section pour les courses en temps réel */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Courses en temps réel</h2>
          <div id="rides-container" className="space-y-3">
            {/* Les nouvelles courses apparaîtront ici via WebSocket */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverPage;