import React, { useState, useEffect } from 'react';
import { getFleetStats } from '../../lib/api';

export const FleetStats: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await getFleetStats();
      setStats(data);
      setLoading(false);
    } catch (error) {
      console.error("Erreur lors de la récupération des statistiques", error);
      setLoading(false);
    }
  };

  if (loading) return <div>Chargement...</div>;
  if (!stats) return <div>Aucune donnée disponible</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Statistiques de flotte</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold text-gray-700">Véhicules</h3>
          <div className="mt-2">
            <p>Total: <span className="font-bold">{stats.totalVehicles}</span></p>
            <p>Actifs: <span className="font-bold text-green-600">{stats.activeVehicles}</span></p>
            <p>Inactifs: <span className="font-bold text-red-600">{stats.totalVehicles - stats.activeVehicles}</span></p>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold text-gray-700">Utilisation</h3>
          <div className="mt-2">
            <p>Taux moyen: <span className="font-bold">{stats.averageUtilization}%</span></p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{ width: `${stats.averageUtilization}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold text-gray-700">Revenus</h3>
          <div className="mt-2">
            <p>Par véhicule: <span className="font-bold">{stats.revenuePerVehicle} CHF</span></p>
            <p>Total mensuel: <span className="font-bold text-green-600">{stats.totalMonthlyRevenue} CHF</span></p>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow flex items-center justify-center">
          <div className="text-center">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto" />
            <p className="mt-2 text-sm text-gray-500">Image de tableau de bord</p>
          </div>
        </div>
      </div>
    </div>
  );
};
