"use client"

import React, { useState } from 'react';
import Header from './components/Header/page';
import Footer from './components/Footer/page';

const WeatherFeature = () => {
  const [values, setValues] = useState({
    farmCity: "Hyderabad",
    temperature: 22,
    wind: 10,
    humidity: 10,
    pressure: 1000,
    weatherCondition: "Cloudy",

  });

  const [image, setImage] = useState("../images/cloudy.png");

  const apiKey = "3d0e630e51aa3bd87587abd4c91015b3";
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

  async function handleWeather() {

    console.log("Inside checkweather");
    const response = await fetch(apiUrl + values.farmCity + `&appid=${apiKey}`);

    var data = await response.json();
    console.log(data);

    if (data.cod == "404") {
      alert("city not found");
      return;
    }
    setValues({
      ...values, humidity: data.main.humidity,
      pressure: data.main.pressure,
      temperature: data.main.temp,
      wind: data.wind.speed,
      weatherCondition: data.weather[0].main,
    })

    if (data.weather[0].main == "Snow") {
      setImage("../images/snow.png");
    }
    else if (data.weather[0].main == "Smoke") {
      setImage("../images/smoke.png");
    }
    else if (data.weather[0].main == "Clear") {
      setImage("../images/sun.png");
    }
    else if (data.weather[0].main == "Mist") {
      setImage("../images/mist.png");
    }
    else if (data.weather[0].main == "Fog") {
      setImage("../images/fog.png");
    }
    else if (data.weather[0].main == "Drizzle") {
      setImage("../images/drizzle.png");
    }
    else if (data.weather[0].main == "Rain") {
      setImage("../images/raining.png");
    }
    else if (data.weather[0].main == "Thunderstorm") {
      setImage("../images/storm.png");
    }
    else {
      setImage("../images/cloudy.png");
    };
  }

  return (<>
    <Header />
    <p className='flex justify-center font-bold font-serif text-gray-500 ' >
      Hello User you can check the Weather here
    </p>
    <div className="border-2 border-gray-500 mt-20 sm:mt-20 rounded mx-auto text-center max-w-xs shadow-md p-2 mt-2 space-y-4  ">
      <h2 className="text-2xl font-semibold mb-4">Weather Feature</h2>

      <div className="items-center space-x-2">
        <label htmlFor="cityInput">Search your farm city weather</label>
        <div className="flex justify-center items-center">
          <input
            type="text"
            id="cityInput"
            spellCheck="false"
            placeholder="Enter Farm City"
            className="border-2 rounded border-gray-300 px-2 py-1"
            onChange={(e) => setValues({ ...values, farmCity: e.target.value })}
          />
          <button onClick={handleWeather} className="ml-2">
            <img
              src="../images/icons8-search-50.png"
              className="w-7 h-7 border-1 shadow-md rounded bg-blue-100 "
              alt="Search Icon"
            />
          </button>
        </div>
      </div>

      <div className="flex justify-center items-center space-x-4">
        <img src={image} className="w-10 h-10" alt="Weather Icon" />
        <div className="text-left">
          <p className="text-xl">{values.weatherCondition}</p>
          <h1 className="text-3xl">{values.temperature}°C</h1>
          <h2 className="text-lg">{values.farmCity}</h2>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="flex items-center space-x-2">
          <img src="../images/humidity.png" className="w-10 h-10" alt="Humidity Icon" />
          <div>
            <p className="text-sm">{values.humidity} %</p>
            <p className="text-xs">Humidity</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <img src="../images/wind.png" className="w-10 h-10" alt="Wind Icon" />
          <div>
            <p className="text-sm">{values.wind} Km/h</p>
            <p className="text-xs">Wind Speed</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <img
            src="../images/pressure-gauge.png"
            className="w-10 h-10"
            alt="Pressure Icon"
          />
          <div>
            <p className="text-sm">{values.pressure} pa</p>
            <p className="text-xs">Pressure</p>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </>
  );
};

export default WeatherFeature;