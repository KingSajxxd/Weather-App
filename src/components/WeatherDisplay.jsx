function WeatherDisplay({ weather, unit }) {
  // Check if weather data is available, if not, return null
  if (!weather || !weather.weather || weather.weather.length === 0) return null;

  // icon url and description
  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`;
  
  // Capitalize first letter of weather description
  const description = weather.weather[0].description;
  const capitalizedDescription = description.charAt(0).toUpperCase() + description.slice(1);
  
  // Convert Unix timestamp to readable time format
  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Format date into long format
  const currentDate = new Date();
  const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString(undefined, dateOptions);

  // Determine the appropriate background theme based on the weather condition
  const getWeatherBackground = () => {
    const id = weather.weather[0].id;
    const icon = weather.weather[0].icon;
    const isDay = icon.includes('d');
    
    if (id >= 200 && id < 300) return 'thunderstorm';
    if (id >= 300 && id < 400) return 'drizzle';
    if (id >= 500 && id < 600) return 'rain';
    if (id >= 600 && id < 700) return 'snow';
    if (id >= 700 && id < 800) return 'atmosphere';
    if (id === 800) return isDay ? 'clear-day' : 'clear-night';
    if (id > 800) return isDay ? 'clouds-day' : 'clouds-night';
    
    return '';
  };

  // // Render the complete weather card with temperature, description, etc
  return (
    <div className="weather-card" style={{...styles.card, ...styles[getWeatherBackground()]}}>
      {/* Header section with location and date */}
      <div style={styles.header}>
        <div style={styles.locationDate}>
          <h2 style={styles.location}>
            {weather.name}, {weather.sys.country}
          </h2>
          <p style={styles.date}>{formattedDate}</p>
        </div>
      </div>

      {/* Current weather section with temperature, description, etc */}
      <div style={styles.currentWeather}>
        <div style={styles.tempContainer}>
          <p style={styles.temp}>
            {Math.round(weather.main.temp)}°{unit === 'metric' ? 'C' : 'F'}
          </p>
          <p style={styles.feelsLike}>
            Feels like: 
            <span style={styles.feelsLikeValue}>
              {Math.round(weather.main.feels_like)}°{unit === 'metric' ? 'C' : 'F'}
            </span>
          </p>
          <p style={styles.minMax}>
            <span style={styles.tempMax}>↑ {Math.round(weather.main.temp_max)}°</span>
            <span style={styles.tempMin}>↓ {Math.round(weather.main.temp_min)}°</span>
          </p>
        </div>

        {/* Weather icon and description */}
        <div style={styles.weatherInfo}>
          <img 
            src={iconUrl} 
            alt={weather.weather[0].description} 
            style={styles.weatherIcon} 
          />
          <p style={styles.weatherDescription}>{capitalizedDescription}</p>
        </div>
      </div>

      {/* Weather details like wind, humidity, etc. */}
      <div style={styles.details}>
        <div style={styles.detailItem}>
          <span style={styles.detailIcon}>💨</span>
          <span style={styles.detailLabel}>Wind</span>
          <span style={styles.detailValue}>
            {Math.round(weather.wind.speed)} {unit === 'metric' ? 'm/s' : 'mph'}
          </span>
        </div>
        
        <div style={styles.detailItem}>
          <span style={styles.detailIcon}>💧</span>
          <span style={styles.detailLabel}>Humidity</span>
          <span style={styles.detailValue}>{weather.main.humidity}%</span>
        </div>
        
        <div style={styles.detailItem}>
          <span style={styles.detailIcon}>🌡️</span>
          <span style={styles.detailLabel}>Pressure</span>
          <span style={styles.detailValue}>{weather.main.pressure} hPa</span>
        </div>
        
        <div style={styles.detailItem}>
          <span style={styles.detailIcon}>👁️</span>
          <span style={styles.detailLabel}>Visibility</span>
          <span style={styles.detailValue}>
            {(weather.visibility / 1000).toFixed(1)} km
          </span>
        </div>
      </div>

      {/* Sunrise and sunset times */}
      <div style={styles.sunTimes}>
        <div style={styles.sunTime}>
          <span style={styles.sunIcon}>🌅</span>
          <span style={styles.sunLabel}>Sunrise</span>
          <span style={styles.sunValue}>{formatTime(weather.sys.sunrise)}</span>
        </div>
        
        <div style={styles.sunTime}>
          <span style={styles.sunIcon}>🌇</span>
          <span style={styles.sunLabel}>Sunset</span>
          <span style={styles.sunValue}>{formatTime(weather.sys.sunset)}</span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: {
    padding: '0',
    overflow: 'hidden',
    color: 'var(--text-color)',
    position: 'relative',
  },
  header: {
    padding: '20px 24px',
    borderBottom: '1px solid var(--border-color)',
  },
  locationDate: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  location: {
    margin: '0',
    fontSize: '1.7rem',
    fontWeight: '600',
    color: 'var(--heading-color)',
  },
  date: {
    margin: '0',
    fontSize: '0.95rem',
    color: 'var(--text-muted)',
  },
  currentWeather: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 24px',
    flexWrap: 'wrap',
    gap: '20px',
  },
  tempContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  temp: {
    fontSize: '3.5rem',
    fontWeight: '700',
    margin: '0',
    lineHeight: '1.1',
    color: 'var(--heading-color)',
  },
  feelsLike: {
    fontSize: '0.95rem',
    color: 'var(--text-muted)',
    margin: '0',
  },
  feelsLikeValue: {
    marginLeft: '4px',
    fontWeight: '500',
  },
  minMax: {
    display: 'flex',
    gap: '16px',
    margin: '8px 0 0 0',
    fontSize: '1rem',
  },
  tempMax: {
    color: '#ef4444',
    fontWeight: '500',
  },
  tempMin: {
    color: '#3b82f6',
    fontWeight: '500',
  },
  weatherInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  weatherIcon: {
    width: '100px',
    height: '100px',
  },
  weatherDescription: {
    margin: '0',
    fontSize: '1.1rem',
    fontWeight: '500',
    textAlign: 'center',
  },
  details: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
    gap: '16px',
    padding: '20px 24px',
    borderTop: '1px solid var(--border-color)',
    borderBottom: '1px solid var(--border-color)',
    backgroundColor: 'rgba(0,0,0,0.02)',
  },
  detailItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '12px',
  },
  detailIcon: {
    fontSize: '1.5rem',
    marginBottom: '4px',
  },
  detailLabel: {
    fontSize: '0.85rem',
    color: 'var(--text-muted)',
    margin: '4px 0',
  },
  detailValue: {
    fontSize: '1.1rem',
    fontWeight: '500',
  },
  sunTimes: {
    display: 'flex',
    justifyContent: 'space-around',
    padding: '20px 24px',
  },
  sunTime: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  sunIcon: {
    fontSize: '1.5rem',
  },
  sunLabel: {
    fontSize: '0.85rem',
    color: 'var(--text-muted)',
    margin: '4px 0',
  },
  sunValue: {
    fontSize: '1.1rem',
    fontWeight: '500',
  },
  // Weather background themes (subtle gradients)
  'clear-day': {
    background: 'linear-gradient(to bottom right, #3498db, #85c1e9)',
    color: '#fff',
  },
  'clear-night': {
    background: 'linear-gradient(to bottom right, #2c3e50, #34495e)',
    color: '#fff',
  },
  'clouds-day': {
    background: 'linear-gradient(to bottom right, #95a5a6, #bdc3c7)',
    color: '#2c3e50',
  },
  'clouds-night': {
    background: 'linear-gradient(to bottom right, #34495e, #445565)',
    color: '#fff',
  },
  'rain': {
    background: 'linear-gradient(to bottom right, #2980b9, #3498db)',
    color: '#fff',
  },
  'snow': {
    background: 'linear-gradient(to bottom right, #ecf0f1, #bdc3c7)',
    color: '#2c3e50',
  },
  'thunderstorm': {
    background: 'linear-gradient(to bottom right, #2c3e50, #34495e)',
    color: '#fff',
  },
  'drizzle': {
    background: 'linear-gradient(to bottom right, #3498db, #2980b9)',
    color: '#fff',
  },
  'atmosphere': {
    background: 'linear-gradient(to bottom right, #7f8c8d, #95a5a6)',
    color: '#fff',
  },
};

export default WeatherDisplay;