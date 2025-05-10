import { useState } from 'react';

function PopularCities({ onCitySelect }) {
  const popularCities = [
    "London",
    "New York",
    "Tokyo",
    "Paris",
    "Sydney",
    "Dubai",
    "Singapore",
    "Rome"
  ];

  const [selectedCity, setSelectedCity] = useState(null);

  const handleSelect = (city) => {
    setSelectedCity(city);
    onCitySelect(city);
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Popular Cities</h3>
      <div className="popular-cities" style={styles.citiesContainer}>
        {popularCities.map((city, index) => (
          <button
            key={index}
            className="city-chip"
            style={{
              ...styles.cityButton,
              ...(selectedCity === city ? styles.selectedCity : {})
            }}
            onClick={() => handleSelect(city)}
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    marginBottom: '24px',
  },
  title: {
    fontSize: '1.2rem',
    fontWeight: '500',
    color: 'var(--heading-color)',
    marginBottom: '12px',
    textAlign: 'center',
  },
  citiesContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    justifyContent: 'center',
  },
  cityButton: {
    backgroundColor: 'var(--card-bg)',
    color: 'var(--text-color)',
    border: '1px solid var(--border-color)',
    borderRadius: '20px',
    padding: '8px 16px',
    fontSize: '0.9rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  selectedCity: {
    backgroundColor: 'var(--accent-color)',
    color: 'white',
    borderColor: 'var(--accent-color)',
  },
};

export default PopularCities;