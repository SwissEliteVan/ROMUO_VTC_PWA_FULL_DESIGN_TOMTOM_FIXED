import React, { useState, useEffect } from 'react';

const StatusButton = () => {
  const [isOnline, setIsOnline] = useState(false);

  // Récupération de l'état initial depuis le stockage local
  useEffect(() => {
    const savedStatus = localStorage.getItem('driverStatus');
    if (savedStatus) {
      setIsOnline(savedStatus === 'online');
    }
  }, []);

  // Mise à jour du statut et persistance
  const toggleStatus = async () => {
    const newStatus = !isOnline;
    setIsOnline(newStatus);
    
    // Sauvegarde locale
    localStorage.setItem('driverStatus', newStatus ? 'online' : 'offline');
    
    // Envoi au serveur
    try {
      const response = await fetch('/api/driver/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus ? 'online' : 'offline' })
      });
      
      if (!response.ok) {
        throw new Error('Échec de la mise à jour du statut');
      }
    } catch (error) {
      console.error(error);
      // Revert en cas d'erreur
      setIsOnline(!newStatus);
      localStorage.setItem('driverStatus', (!newStatus) ? 'online' : 'offline');
    }
  };

  return (
    <button
      onClick={toggleStatus}
      className={`px-4 py-2 rounded-md font-semibold ${
        isOnline 
          ? 'bg-green-500 hover:bg-green-600' 
          : 'bg-red-500 hover:bg-red-600'
      } text-white transition-colors`}
    >
      {isOnline ? 'En ligne' : 'Hors ligne'}
    </button>
  );
};

export default StatusButton;
