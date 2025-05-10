function Forecast({ forecast, unit }) {
  if (!forecast || forecast.length === 0) return null;

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' });
  };

  return (
    <div className="weather-card" style={styles.forecastContainer}>
      <h3 style={styles.forecastTitle}>3-Day Forecast</h3>
      
      <div style={styles.forecastGrid}>
        {forecast.map((day, index) => {
          const iconUrl = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
          const description = day.weather[0].description;
          const capitalizedDescription = description.charAt(0).toUpperCase() + description.slice(1);
          
          return (
            <div key={index} style={styles.forecastDay}>
              <h4 style={styles.forecastDate}>{formatDate(day.dt_txt)}</h4>
              
              <div style={styles.forecastWeather}>
                <img 
                  src={iconUrl} 
                  alt={day.weather[0].description} 
                  style={styles.forecastIcon} 
                />
                <p style={styles.forecastTemp}>
                  {Math.round(day.main.temp)}°{unit === 'metric' ? 'C' : 'F'}
                </p>
              </div>
              
              <p style={styles.forecastDescription}>{capitalizedDescription}</p>
              
              <div style={styles.forecastDetails}>
                <div style={styles.forecastDetail}>
                  <span style={styles.detailIcon}>💧</span>
                  <span>{day.main.humidity}%</span>
                </div>
                
                <div style={styles.forecastDetail}>
                  <span style={styles.detailIcon}>💨</span>
                  <span>{Math.round(day.wind.speed)} {unit === 'metric' ? 'm/s' : 'mph'}</span>
                </div>
              </div>
              
              <p style={styles.minMax}>
                <span style={styles.tempMax}>↑ {Math.round(day.main.temp_max)}°</span>
                <span style={styles.tempMin}>↓ {Math.round(day.main.temp_min)}°</span>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  forecastContainer: {
    padding: '24px',
  },
  forecastTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    marginTop: '0',
    marginBottom: '20px',
    color: 'var(--heading-color)',
    textAlign: 'center',
  },
  forecastGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
  },
  forecastDay: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '16px',
    backgroundColor: 'rgba(0,0,0,0.02)',
    borderRadius: '12px',
    transition: 'transform 0.2s',
  },
  forecastDate: {
    margin: '0 0 10px 0',
    fontSize: '1.1rem',
    fontWeight: '500',
    color: 'var(--heading-color)',
  },
  forecastWeather: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  forecastIcon: {
    width: '70px',
    height: '70px',
  },
  forecastTemp: {
    fontSize: '1.8rem',
    fontWeight: '600',
    margin: '0',
  },
  forecastDescription: {
    margin: '8px 0',
    fontSize: '1rem',
    textAlign: 'center',
  },
  forecastDetails: {
    display: 'flex',
    justifyContent: 'center',
    gap: '16px',
    margin: '10px 0',
    width: '100%',
  },
  forecastDetail: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '0.9rem',
  },
  detailIcon: {
    fontSize: '1rem',
  },
  minMax: {
    display: 'flex',
    gap: '16px',
    margin: '8px 0 0 0',
    fontSize: '0.9rem',
  },
  tempMax: {
    color: '#ef4444',
    fontWeight: '500',
  },
  tempMin: {
    color: '#3b82f6',
    fontWeight: '500',
  },
};

export default Forecast;