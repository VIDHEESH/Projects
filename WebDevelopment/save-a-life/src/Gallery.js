import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Gallery.css';

const API_URL = 'https://api/v4.iucnredlist.org/api/v4';
const API_KEY = 'Hrs1VqK8EsxZYBf4UUkn1365xEDgL1SZopKc';

const Gallery = () => {
  const navigate = useNavigate();
  const [species, setSpecies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [navigate]);

  const fetchSpecies = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${API_URL}/species/category/CR?page=${page}&token=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();

      if (!data.result || data.result.length === 0) {
        throw new Error('No species data found.');
      }

      const speciesDetails = await Promise.all(
        data.result.map(async (species) => {
          try {
            const detailResponse = await fetch(
              `${API_URL}/species/${species.taxonid}?token=${API_KEY}`
            );

            if (!detailResponse.ok) {
              throw new Error(`Details not found for species ID: ${species.taxonid}`);
            }

            const detailData = await detailResponse.json();
            return { ...species, ...detailData.result[0] };
          } catch (error) {
            return species;
          }
        })
      );

      setSpecies((prevSpecies) => [...prevSpecies, ...speciesDetails]);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to load endangered species data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpecies();
  }, [page]);

  const getThreatColor = (category) => {
    const colors = {
      CR: '#dc2626',
      EN: '#ea580c',
      VU: '#ca8a04',
      NT: '#2563eb',
      LC: '#16a34a',
    };
    return colors[category] || '#4b5563';
  };

  return (
    <div className="gallery-container">
      <div className="gallery-header">
        <div className="header-content">
          <h1 className="gallery-title">Endangered Species Directory</h1>
          <p className="gallery-description">
            Discover critically endangered species and learn about conservation efforts to protect them.
          </p>
        </div>

        {error ? (
          <div className="error-container">
            <h2 className="error-title">Error</h2>
            <p className="error-message">{error}</p>
          </div>
        ) : (
          <>
            <div className="species-grid">
              {species.map((species) => (
                <div key={species.taxonid} className="species-card">
                  <div className="card-content">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="species-name">
                          {species.scientific_name}
                        </h3>
                        <p className="species-common-name">
                          {species.common_name || 'Common name not available'}
                        </p>
                      </div>
                      <span
                        className="threat-badge"
                        style={{ backgroundColor: getThreatColor(species.category) }}
                      >
                        {species.category}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="load-more-container">
              {loading ? (
                <div className="spinner"></div>
              ) : (
                <button onClick={() => setPage((prev) => prev + 1)} className="load-more-button">
                  Load More Species
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Gallery;

