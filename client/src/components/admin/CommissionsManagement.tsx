import React, { useState, useEffect } from 'react';
import { getCommissions, updateCommissionStatus } from '../../lib/api';

export const CommissionsManagement: React.FC = () => {
  const [commissions, setCommissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCommissions();
  }, []);

  const fetchCommissions = async () => {
    try {
      const data = await getCommissions();
      setCommissions(data);
      setLoading(false);
    } catch (error) {
      console.error("Erreur lors de la récupération des commissions", error);
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (commissionId: string, status: string) => {
    try {
      await updateCommissionStatus(commissionId, status);
      fetchCommissions();
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut", error);
    }
  };

  if (loading) return <div>Chargement...</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Gestion des commissions</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Chauffeur</th>
              <th className="py-2 px-4 border-b">Montant</th>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Statut</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {commissions.map((commission) => (
              <tr key={commission.id}>
                <td className="py-2 px-4 border-b">{commission.driverName}</td>
                <td className="py-2 px-4 border-b">{commission.amount} CHF</td>
                <td className="py-2 px-4 border-b">{new Date(commission.date).toLocaleDateString()}</td>
                <td className="py-2 px-4 border-b">
                  <span className={`px-2 py-1 rounded ${commission.status === 'payé' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
                    {commission.status}
                  </span>
                </td>
                <td className="py-2 px-4 border-b">
                  <select 
                    value={commission.status}
                    onChange={(e) => handleUpdateStatus(commission.id, e.target.value)}
                    className="border rounded px-2 py-1"
                  >
                    <option value="en attente">En attente</option>
                    <option value="payé">Payé</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
