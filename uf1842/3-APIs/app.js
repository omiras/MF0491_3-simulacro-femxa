const button = document.querySelector("#btn");
const citySelect = document.querySelector("#citySelect");

const weatherCodes = {
  0: "Despejado",
  1: "Mayormente despejado",
  2: "Parcialmente nublado",
  3: "Nublado",
  45: "Niebla",
  48: "Niebla con escarcha",
  51: "Llovizna ligera",
  53: "Llovizna moderada",
  55: "Llovizna intensa",
  56: "Llovizna helada ligera",
  57: "Llovizna helada intensa",
  61: "Lluvia ligera",
  63: "Lluvia moderada",
  65: "Lluvia fuerte",
  66: "Lluvia helada ligera",
  67: "Lluvia helada fuerte",
  71: "Nevada ligera",
  73: "Nevada moderada",
  75: "Nevada fuerte",
  77: "Granizo",
  80: "Chubascos",
  81: "Lluvia intensa",
  82: "Lluvia muy intensa",
  85: "Nevadas leves",
  86: "Nevadas intensas",
  95: "Tormenta",
  96: "Tormenta con granizo",
  99: "Tormenta con granizo fuerte",
};

button.addEventListener("click", getWeather);
citySelect.addEventListener("change", getWeather);

loadInitialWeather();

async function loadInitialWeather() {
  const city = citySelect.value;
  await getWeather(city);
}

async function getWeather() {
  const city = citySelect.value;
  button.disabled = true;
  button.textContent = "Consultando...";

  try {
    const geocodingUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=es&format=json`;
    const geocodingResponse = await fetch(geocodingUrl);
    const geocodingData = await geocodingResponse.json();

    if (!geocodingData.results || geocodingData.results.length === 0) {
      throw new Error("No se encontró la ciudad seleccionada.");
    }

    const { latitude, longitude, name, country } = geocodingData.results[0];
    const forecastUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,weather_code&daily=temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=1`;
    const forecastResponse = await fetch(forecastUrl);
    const weatherData = await forecastResponse.json();

    const current = weatherData.current;
    const daily = weatherData.daily;
    const weatherCode = current.weather_code;
    const summary = weatherCodes[weatherCode] || "Condición variable";
    const maxToday = Math.round(daily.temperature_2m_max[0]);
    const minToday = Math.round(daily.temperature_2m_min[0]);

    document.querySelector("#city").textContent = `${name}, ${country}`;
    document.querySelector("#temp").textContent = `${current.temperature_2m}°C`;
    document.querySelector("#feels").textContent = `${current.apparent_temperature}°C`;
    document.querySelector("#summary").textContent = summary;
    document.querySelector("#range").textContent = `${minToday}°C / ${maxToday}°C`;

    console.log("Datos meteorológicos", weatherData);
  } catch (error) {
    document.querySelector("#city").textContent = "Error";
    document.querySelector("#temp").textContent = "--";
    document.querySelector("#feels").textContent = "--";
    document.querySelector("#summary").textContent = "No se pudo cargar el tiempo";
    document.querySelector("#range").textContent = "--";
    document.querySelector("#forecast").textContent = error.message;
    console.error(error);
  } finally {
    button.disabled = false;
    button.textContent = "Consultar clima";
  }
}