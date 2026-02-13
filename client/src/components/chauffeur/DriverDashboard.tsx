import React, { useState, useEffect } from 'react';

const DriverDashboard = () => {
  const [earnings, setEarnings] = useState({
    today: 0,
    thisWeek: 0,
    thisMonth: 0
  });

  // Récupération des données des revenus
  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        const response = await fetch('/api/driver/earnings');
        if (!response.ok) {
          throw new Error('Échec de la récupération des données');
        }
        const data = await response.json();
        setEarnings(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEarnings();
    
    // WebSocket pour les mises à jour en temps réel
    const ws = new WebSocket('ws://localhost:3000/driver-updates');
    
    ws.onmessage = (event) => {
      const update = JSON.parse(event.data);
      if (update.type === 'newRide') {
        fetchEarnings(); // Actualiser les données
      }
    };

    return () => ws.close();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Tableau de bord des revenus</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-100 p-4 rounded">
          <h3 className="text-gray-600">Aujourd'hui</h3>
          <p className="text-2xl font-bold">{earnings.today.toFixed(2)} €</p>
        </div>
        <div className="bg-gray-100 p-4 rounded">
          <h3 className="text-gray-600">Cette semaine</h3>
          <p className="text-2xl font-bold">{earnings.thisWeek.toFixed(2)} €</p>
        </div>
        <div className="bg-gray-100 p-4 rounded">
          <h3 className="text-gray-600">Ce mois</h3>
          <p className="text-2xl font-bold">{earnings.thisMonth.toFixed(2)} €</p>
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;