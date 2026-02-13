import React, { useState } from 'react';
import { DriverDocumentsValidation } from './DriverDocumentsValidation';
import { CommissionsManagement } from './CommissionsManagement';
import { FleetStats } from './FleetStats';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('documents');

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">Panneau d'administration ROMUO VTC</h1>
      </div>
      
      <div className="flex border-b">
        <button 
          className={`px-4 py-2 font-medium ${activeTab === 'documents' ? 'bg-white border-t border-l border-r rounded-t text-blue-600' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('documents')}
        >
          Validation documents
        </button>
        <button 
          className={`px-4 py-2 font-medium ${activeTab === 'commissions' ? 'bg-white border-t border-l border-r rounded-t text-blue-600' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('commissions')}
        >
          Gestion commissions
        </button>
        <button 
          className={`px-4 py-2 font-medium ${activeTab === 'stats' ? 'bg-white border-t border-l border-r rounded-t text-blue-600' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('stats')}
        >
          Statistiques flotte
        </button>
      </div>
      
      <div className="p-4">
        {activeTab === 'documents' && <DriverDocumentsValidation />}
        {activeTab === 'commissions' && <CommissionsManagement />}
        {activeTab === 'stats' && <FleetStats />}
      </div>
    </div>
  );
};
