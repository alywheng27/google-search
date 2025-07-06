"use client"

import { useState } from 'react';

const icons = [
  '/globe.svg',
  '/window.svg',
  '/file.svg',
  '/next.svg',
  '/vercel.svg',
];

const SearchComponent = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const apiKey = 'AIzaSyATqHyIoZgFjw7G1JXH_Pnp9MIK5igrrtE';
  const searchEngineId = '64064ada5362f4478';

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      setResults(data.items || []);
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 rounded-lg shadow-lg bg-gray-900">
      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="What's the latest news about Iran today?"
          className="flex-1 px-3 py-2 rounded bg-gray-800 bg-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 font-semibold shadow"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>
      {loading && <p className="text-blue-300 mb-4">Loading results...</p>}
      <ul className="space-y-4">
        {results.map((item, idx) => (
          <li key={item.link} className="flex items-start gap-3 bg-gray-800 rounded p-3 shadow hover:bg-gray-700 transition-colors">
            <img
              src={icons[idx % icons.length]}
              alt="icon"
              className="w-8 h-8 mt-1 opacity-80"
            />
            <div>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline font-medium text-lg"
              >
                {item.title}
              </a>
              <p className="text-gray-300 text-sm mt-1">{item.snippet}</p>
            </div>
          </li>
        ))}
      </ul>
      {results.length === 0 && !loading && (
        <p className="text-gray-400 text-center mt-8">Walang resulta. Subukan mong mag-search!</p>
      )}
    </div>
  );
};

export default SearchComponent; 