# 🌤️ Weather App

A simple responsive **React + Tailwind CSS** weather app that shows the current weather and 4-day forecast for any city.  
Background images switch for **mobile and desktop views**. Data is fetched from the [OpenWeather API](https://openweathermap.org/).

---

## ✨ Features
- Search weather by city 🌍
- Current temperature, condition, humidity, wind, feels like
- 4-day forecast (daily at 12:00)
- Mobile and desktop responsive backgrounds
- Built with **React**, **Tailwind CSS**, and **Axios**

---

## ⚙️ Setup

### 1. Clone the repo
```bash
git clone https://github.com/yourusername/weather-app.git
cd weather-app
```
### 2. Install dependencies
```bash
npm install or yarn install
```
### 3. API Key
Sign up at [OpenWeather API](https://openweathermap.org/) and get a free API key.

#### If you used Create React App (CRA):

Create a file named .env in the root of the project:
```env
REACT_APP_WEATHER_API_KEY=your_api_key_here
```
In your code, access it like:
```js
const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
```
If you used Vite:

Create a file named .env in the root of the project:

```env
VITE_WEATHER_API_KEY=your_api_key_here
```
In your code, access it like:
```js
const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
```
