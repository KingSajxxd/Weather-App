import { useState, useCallback, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import Forecast from './components/Forecast';
import PopularCities from './components/PopularCities';

// Store the OpenWeather API key
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function App() {
  // Core app states
  const [city, setCity] = useState('');
  const [unit, setUnit] = useState('metric'); // Can be 'metric' or 'imperial'
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
   // light or dark mode
  const [theme, setTheme] = useState('light');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch weather data and forecast for a given city
  const fetchWeather = useCallback(async (cityName) => {
    if (!cityName) return;

    setLoading(true);
    setError(null);

    try {
      // Fetch current weather data
      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${unit}&appid=${API_KEY}`
      );
      
      if (!weatherRes.ok) {
        throw new Error("City not found");
      }
      
      const weatherData = await weatherRes.json();
      setWeather(weatherData);

      // Fetch 3 day forecast data
      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=${unit}&appid=${API_KEY}`
      );
      const forecastData = await forecastRes.json();

      // Group forecast data by day
      const groupedByDay = {};
      forecastData.list.forEach(item => {
        const date = item.dt_txt.split(' ')[0];
        if (!groupedByDay[date]) {
          groupedByDay[date] = item;
        }
      });

      // Set forecast data for the next three days
      const nextThreeDays = Object.values(groupedByDay).slice(1, 4);
      setForecast(nextThreeDays);

    } catch (error) {
      console.error('Error fetching weather:', error);
      setError(error.message);
      setWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  }, [unit]);

  // Set theme to light or dark
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Fetch weather data when city or unit changes
  useEffect(() => {
    if (city) {
      fetchWeather(city);
    }
  }, [unit, city, fetchWeather]);

  return (
    <div className="app-container" style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.heading}>Weather <span style={styles.headingAccent}>Forecast</span></h1>
        <button 
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} 
          style={styles.themeButton}
          aria-label="Toggle theme"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>

      <div style={styles.cardContainer}>
        {/* City search input and unit toggle */}
        <SearchBar
          city={city}
          setCity={setCity}
          setWeather={setWeather}
          setForecast={setForecast}
          unit={unit}
          setUnit={setUnit}
          fetchWeather={fetchWeather}
        />

        {/* Popular cities */}
        <PopularCities
          unit={unit}
          onCitySelect={(selected) => {
            setCity(selected);
            fetchWeather(selected);
          }}
        />

        {/* Loading spinner, error, and weather display */}
        {loading && (
          <div style={styles.loadingContainer}>
            <div style={styles.loadingSpinner}></div>
            <p>Loading weather data...</p>
          </div>
        )}

        {/* Error message if city not found or API fails */}
        {error && (
          <div style={styles.errorContainer}>
            <p>⚠️ {error}</p>
            <p>Please try another city name</p>
          </div>
        )}

        {/* Weather display and forecast */}
        {weather && !loading && !error && (
          <>
            <WeatherDisplay weather={weather} unit={unit} />
            {forecast && <Forecast forecast={forecast} unit={unit} />}
          </>
        )}
      </div>
      
      <footer style={styles.footer}>
        <p>Powered by OpenWeather API • {new Date().getFullYear()} • Sajjad Aiyoob</p>
      </footer>
    </div>
  );
}

// App styles
const styles = {
  container: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '2rem',
    fontFamily: '"Poppins", "Segoe UI", sans-serif',
    backgroundColor: 'var(--bg-color)',
    color: 'var(--text-color)',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    transition: 'background 0.3s, color 0.3s',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
  },
  heading: {
    fontSize: '2.5rem',
    color: 'var(--heading-color)',
    fontWeight: '600',
    margin: 0,
  },
  headingAccent: {
    color: 'var(--accent-color)',
  },
  themeButton: {
    padding: '12px',
    borderRadius: '50%',
    width: '45px',
    height: '45px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'var(--button-bg)',
    color: 'var(--button-text)',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1.2rem',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  cardContainer: {
    flex: 1,
  },
  loadingContainer: {
    textAlign: 'center',
    padding: '2rem',
    backgroundColor: 'var(--card-bg)',
    borderRadius: '12px',
    boxShadow: 'var(--card-shadow)',
    margin: '2rem 0',
  },
  loadingSpinner: {
    width: '40px',
    height: '40px',
    margin: '0 auto 1rem',
    border: '4px solid rgba(0, 0, 0, 0.1)',
    borderRadius: '50%',
    borderTop: '4px solid var(--accent-color)',
    animation: 'spin 1s linear infinite',
  },
  errorContainer: {
    textAlign: 'center',
    padding: '2rem',
    backgroundColor: 'var(--error-bg)',
    color: 'var(--error-text)',
    borderRadius: '12px',
    boxShadow: 'var(--card-shadow)',
    margin: '2rem 0',
  },
  footer: {
    marginTop: '2rem',
    textAlign: 'center',
    fontSize: '0.9rem',
    color: 'var(--text-muted)',
    paddingTop: '1rem',
    borderTop: '1px solid var(--border-color)',
  },
  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
};

export default App;