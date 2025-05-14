import { useState } from 'react';

const API_KEY = 'your_api_key_here';

function SearchBar({ city, setCity, setWeather, setForecast, unit, setUnit, fetchWeather }) {
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = async (e) => {
    const value = e.target.value;
    setCity(value);

    if (value.length > 2) {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${API_KEY}`
        );
        const data = await res.json();
        setSuggestions(data);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSearch = async (selectedCity) => {
    const chosen = selectedCity?.name || city;
    setCity(chosen);
    setSuggestions([]);
    fetchWeather(chosen);
  };

  const clearSearch = () => {
    setCity('');
    setWeather(null);
    setForecast(null);
    setSuggestions([]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="weather-card" style={styles.searchCard}>
      <div style={styles.searchContainer}>
        <input
          value={city}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder="Enter city name..."
          style={styles.input}
        />
        {city && (
          <button 
            onClick={clearSearch} 
            style={styles.clearButton}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      {suggestions.length > 0 && isFocused && (
        <ul style={styles.suggestionBox}>
          {suggestions.map((s, idx) => (
            <li 
              key={idx} 
              onClick={() => handleSearch(s)} 
              style={styles.suggestion}
            >
              {s.name}, {s.country}
              {s.state && `, ${s.state}`}
            </li>
          ))}
        </ul>
      )}

      <div style={styles.buttons}>
        <button 
          onClick={() => handleSearch()} 
          style={styles.searchButton}
          disabled={!city}
        >
          <span style={styles.buttonIcon}>🔍</span>
          Get Weather
        </button>
        
        <button
          onClick={() => setUnit(unit === 'metric' ? 'imperial' : 'metric')}
          style={styles.unitButton}
        >
          <span style={styles.buttonIcon}>{unit === 'metric' ? '°F' : '°C'}</span>
          Switch to {unit === 'metric' ? 'Fahrenheit' : 'Celsius'}
        </button>
      </div>
    </div>
  );
}

const styles = {
  searchCard: {
    padding: '24px',
    position: 'relative',
    marginBottom: '24px',
  },
  searchContainer: {
    position: 'relative',
    marginBottom: '16px',
  },
  input: {
    padding: '14px 16px',
    width: '100%',
    fontSize: '16px',
    borderRadius: '12px',
    border: '1px solid var(--border-color)',
    backgroundColor: 'var(--card-bg)',
    color: 'var(--text-color)',
    boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
    transition: 'all 0.3s ease',
    paddingRight: '40px',
  },
  clearButton: {
    position: 'absolute',
    right: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'transparent',
    border: 'none',
    fontSize: '16px',
    color: 'var(--text-muted)',
    cursor: 'pointer',
    padding: '4px 8px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttons: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
    justifyContent: 'center',
  },
  searchButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '12px 20px',
    backgroundColor: 'var(--button-bg)',
    color: 'var(--button-text)',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: '500',
    fontSize: '15px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    transition: 'all 0.2s ease',
    flex: '1',
    minWidth: '160px',
  },
  unitButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '12px 20px',
    backgroundColor: 'var(--card-bg)',
    color: 'var(--accent-color)',
    border: '1px solid var(--accent-color)',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: '500',
    fontSize: '15px',
    transition: 'all 0.2s ease',
    flex: '1',
    minWidth: '160px',
  },
  buttonIcon: {
    marginRight: '8px',
    fontSize: '16px',
  },
  suggestionBox: {
    listStyle: 'none',
    padding: '8px 0',
    margin: 0,
    backgroundColor: 'var(--card-bg)',
    borderRadius: '12px',
    maxHeight: '200px',
    overflowY: 'auto',
    width: '100%',
    position: 'absolute',
    top: 'calc(100% + 5px)',
    left: 0,
    zIndex: 10,
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    border: '1px solid var(--border-color)',
  },
  suggestion: {
    padding: '10px 16px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    color: 'var(--text-color)',
    borderBottom: '1px solid var(--border-color)',
  },
  '@media (max-width: 768px)': {
    buttons: {
      flexDirection: 'column',
    },
    searchButton: {
      width: '100%',
    },
    unitButton: {
      width: '100%',
    },
  },
};

export default SearchBar;