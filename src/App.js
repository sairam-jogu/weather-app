import React from "react";
import { useState } from "react";
import axios from "axios";
import Cloud from "./components/Cloud";
import Thunderstom from "./components/Thunderstom";
import Drizzle from "./components/Drizzle";
import Rainy from "./components/Rainy";
import Snow from "./components/Snow";

//import sunset1 from '../src/assets/sunset1.jpg';

function App() {
  const [data, setData] = useState("");
  const [location, setLocation] = useState("");

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=784f7b3fa2e3b394761162fbf50ee572&units=metric`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(data);
      });
      setLocation("");
    }
  };

  const id = data.weather ? data.weather[0].id : null;

  const findMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
      alert("Your Browser not support geo Location API");
    }
  };

  const onSuccess = (position) => {
    console.log(position);
    const { latitude, longitude } = position.coords;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=784f7b3fa2e3b394761162fbf50ee572&units=metric`;
    axios.get(url).then((response) => {
      setData(response.data);
      console.log(data);
    });
  };

  const onError = (error) => {
    alert(error.message);
  };

  return (
    <div className="app">
      {/* <Cloud></Cloud> */}
      {id >= 200 && id <= 232 ? (
        <Thunderstom />
      ) : id >= 300 && id <= 321 ? (
        <Drizzle />
      ) : id >= 500 && id <= 531 ? (
        <Rainy />
      ) : id >= 600 && id <= 631 ? (
        <Snow />
      ) : (
        <Cloud />
      )}

      <div className="search">
        <input
          className="inputClass"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          placeholder="Enter Location"
          onKeyPress={searchLocation}
          type="text"
        />
        <div className="seperator">
          <button className="buttonClass" onClick={findMyLocation}>
            Check My Location
          </button>
        </div>
      </div>

      <div className="container">
        <div className="top">
          <div className="location">
            {data.name ? <p>{data.name}</p> : <p>Heart</p>}
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp}°C</h1> : <h1>0°C</h1>}
          </div>
          <div className="description">
            {data.weather ? (
              <p>{data.weather[0].description}</p>
            ) : (
              <p>So Hot</p>
            )}
          </div>
        </div>
        <div className="bottom">
          <div className="feels">
            {data.main ? (
              <p className="val">{data.main.feels_like}</p>
            ) : (
              <p>0°C</p>
            )}

            <p className="text">Feels Like</p>
          </div>
          <div className="humidity">
            {data.main ? (
              <p className="val">{data.main.humidity}%</p>
            ) : (
              <p>0%</p>
            )}

            <p className="text">Humidity</p>
          </div>
          <div className="wind">
            {data.wind ? (
              <p className="val">{data.wind.speed}MPH</p>
            ) : (
              <p>0MPH</p>
            )}

            <p className="text">Wind</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
