import React, { useState, useEffect } from "react";
import pointsData from "./points_data"; // Import points data
import "./Gallery.css";

const Gallery = () => {
  const [species, setSpecies] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadSpecies = (startIdx) => {
    setLoading(true);
    setError(null);

    try {
      const slice = pointsData.slice(startIdx, startIdx + 9).map((item) => ({
        ...item,
        image_url: item["img-url"] && item["img-url"] !== "NaN"
          ? item["img-url"]
          : "https://via.placeholder.com/150",
      }));

      setSpecies(slice);
    } catch (err) {
      setError("Failed to load species data.");
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    const nextIndex = (startIndex + 9) % pointsData.length;
    setStartIndex(nextIndex);
    loadSpecies(nextIndex);
  };

  useEffect(() => {
    loadSpecies(startIndex);
  }, [startIndex]);

  return (
    <div className="gallery-container">
      <div className="gallery-header">
        <h1>ENDANGERED SPECIES</h1>
      </div>
           <button onClick={handleRefresh} className="refresh-button">
            Refresh
          </button>
      {loading ? (
        <div className="spinner">Loading...</div>
      ) : error ? (
        <div className="error-container">
          <h2>Error</h2>
          <p>{error}</p>
        </div>
      ) : (
        <div>
          <div className="species-grid">
            {species.map((specie, index) => (
              <div key={index} className="species-card">
                <h3 className="species-name">{specie.sci_name}</h3>
                <img
                  src={specie.image_url}
                  alt={specie.sci_name}
                  className="species-image"
                  onError={(e) => (e.target.src = "https://via.placeholder.com/150?text=Not+available")}
                />
                <p className="species-citation">
                  <strong>Citation:</strong> {specie.citation}
                </p>
                <p className="species-location">
                  <strong>Latitude:</strong> {specie.latitude} <br />
                  <strong>Longitude:</strong> {specie.longitude}
                </p>
              </div>
            ))}
          </div>
     
        </div>
      )}
    </div>
  );
};

export default Gallery;


