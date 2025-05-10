
# 🌤️ Weather App

A simple and responsive weather app built using **React** and **Vite**, powered by the [OpenWeatherMap API](https://openweathermap.org/). This app allows users to search for weather forecasts, view current conditions, toggle between Celsius and Fahrenheit, and check weather data for popular cities.

---

## 🚀 Features

- **Search weather by city**: Easily check the weather by typing in the city name.
- **Current weather and 3-day forecast**: Get real-time weather data, including temperature, humidity, and wind speed.
- **Switch between Celsius and Fahrenheit**: Toggle between metric and imperial units for temperature.
- **Popular cities quick access**: Quickly view the weather for popular cities like New York, London, etc.
- **Light/Dark mode toggle**: Switch between light and dark themes for better user experience.

---

## 📦 Tech Stack

- **React**: For building the user interface.
- **Vite**: A fast build tool for modern web projects.
- **OpenWeatherMap API**: Provides weather data.
- **CSS** (or **Tailwind CSS**/**Styled Components**, if used): For styling and layout.

---

## 🖥️ Demo

> https://weather-app-delta-teal-97.vercel.app/

---

## 🔧 Getting Started

To set up and run the project locally:

### 1. Clone the repository

```bash
git clone https://github.com/KingSajxxd/Weather-App.git
cd weather-app
```

### 2. Install dependencies

Make sure you have **Node.js** and **npm** installed. Then, run:

```bash
npm install
```

### 3. Set up your OpenWeatherMap API key

You need an API key from OpenWeatherMap to fetch weather data.

1. Create a `.env` file in the root of the project.
2. Add your API key to the `.env` file as follows:

```bash
VITE_WEATHER_API_KEY=your_api_key_here
```

Replace `your_api_key_here` with your actual OpenWeatherMap API key.

### 4. Run the development server

Start the development server by running:

```bash
npm run dev
```

The app should now be running locally. Open your browser and navigate to `http://localhost:3000` to see it in action.

---

## 📂 Folder Structure

The project is organized as follows:

```bash
src/
├── components/         # Reusable components (SearchBar, Forecast, etc.)
├── App.jsx             # Main app component
├── main.jsx            # Entry point
├── index.css           # Global styles
```

---

## ⚙️ Configuration

### API Key

Your OpenWeatherMap API key must be added to the `.env` file for proper functioning. You can sign up at [OpenWeatherMap](https://openweathermap.org/) to get a free API key.

---

## 💡 Features & Improvements

Future updates could include:

- **Hourly weather forecasts**: Display weather data for each hour of the day.
- **Geolocation support**: Automatically detect and display weather for the user's current location.
- **Unit preferences**: Save the user's unit preferences (Celsius or Fahrenheit).
- **Error handling**: Show friendly error messages when the user enters an invalid city or when the API call fails.

---

## 📜 License

This project is open-source and available under the MIT License.

---

## 🙌 Acknowledgements

- [OpenWeatherMap API](https://openweathermap.org/) for providing free weather data.
- [React + Vite starter templates](https://vitejs.dev/).
