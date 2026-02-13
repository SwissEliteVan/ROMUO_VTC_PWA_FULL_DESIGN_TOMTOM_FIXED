import { useState, useEffect, useRef } from 'react';

type SearchResult = {
  id: string;
  address: string;
};

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (query.length < 3) {
      setResults([]);
      return;
    }

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      fetchResults();
    }, 300);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [query]);

  const fetchResults = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/maps/autocomplete?query=${encodeURIComponent(query)}`);
      
      if (!response.ok) {
        throw new Error('Erreur réseau');
      }

      const data = await response.json();
      setResults(data.results || []);
    } catch (error) {
      console.error('Erreur de recherche:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = (result: SearchResult) => {
    setQuery(result.address);
    setResults([]);
  };

  return (
    <div className="relative w-full max-w-xl">
      <div className="flex items-center bg-obsidian-700 rounded-full overflow-hidden">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Où allez-vous ?"
          className="w-full py-4 px-6 bg-transparent text-obsidian-50 placeholder-obsidian-300 focus:outline-none"
        />
        <button 
          className="bg-gold text-obsidian-900 px-6 py-4 font-semibold hover:bg-gold-600 transition-colors"
          onClick={() => console.log('Recherche:', query)}
        >
          Rechercher
        </button>
      </div>
      
      {results.length > 0 && (
        <div className="absolute z-10 w-full mt-2 bg-obsidian-800 rounded-xl shadow-lg overflow-hidden">
          {results.map((result) => (
            <div 
              key={result.id}
              className="px-6 py-4 hover:bg-obsidian-700 cursor-pointer transition-colors border-b border-obsidian-700 last:border-0"
              onClick={() => handleSelect(result)}
            >
              {result.address}
            </div>
          ))}
        </div>
      )}
      
      {isLoading && (
        <div className="absolute z-10 w-full mt-2 bg-obsidian-800 rounded-xl p-4 text-center text-obsidian-300">
          Recherche en cours...
        </div>
      )}
    </div>
  );
}
