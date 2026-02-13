import React, { useState, useEffect } from 'react';
import { getDriverDocuments, validateDocument } from '../../lib/api';

export const DriverDocumentsValidation: React.FC = () => {
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDriverDocuments();
  }, []);

  const fetchDriverDocuments = async () => {
    try {
      const data = await getDriverDocuments();
      setDocuments(data);
      setLoading(false);
    } catch (error) {
      console.error("Erreur lors de la récupération des documents", error);
      setLoading(false);
    }
  };

  const handleValidate = async (documentId: string) => {
    try {
      await validateDocument(documentId);
      fetchDriverDocuments();
    } catch (error) {
      console.error("Erreur lors de la validation du document", error);
    }
  };

  if (loading) return <div>Chargement...</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Validation des documents chauffeurs</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Chauffeur</th>
              <th className="py-2 px-4 border-b">Document</th>
              <th className="py-2 px-4 border-b">Statut</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc) => (
              <tr key={doc.id}>
                <td className="py-2 px-4 border-b">{doc.driverName}</td>
                <td className="py-2 px-4 border-b">{doc.documentType}</td>
                <td className="py-2 px-4 border-b">
                  <span className={`px-2 py-1 rounded ${doc.status === 'validé' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
                    {doc.status}
                  </span>
                </td>
                <td className="py-2 px-4 border-b">
                  {doc.status !== 'validé' && (
                    <button 
                      onClick={() => handleValidate(doc.id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Valider
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
