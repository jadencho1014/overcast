import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=fd4b226313eccfec60d764e4a4833256`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(URL).then((res) => {
        setData(res.data);

        if (res.data.weather && res.data.weather[0].id < 800) {
          toast.error("The weather is not suitable for construction!");
        } else if (res.data.weather) {
          toast.success("The weather is suitable for construction!");
        }
      });

      setLocation("");
    }
  };

  return (
    <div className="App">
      <div className="title">
        <h1>Overcast</h1>
      </div>
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              searchLocation(event);
            }
          }}
          placeholder="Search Location"
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temperature">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
            {data.weather ? <p>({data.weather[0].description})</p> : null}
          </div>
        </div>
        {data.name !== undefined && (
          <div className="bottom">
            <div className="feelsLike">
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed()}°C</p>
              ) : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="windSpeed">
              {data.wind ? (
                <p className="bold">{data.wind.speed.toFixed()} km/h</p>
              ) : null}
              <p>Wind Speed</p>
            </div>
            <div className="pressure">
              {data.main ? (
                <p className="bold">{data.main.pressure} hPa</p>
              ) : null}
              <p>Pressure</p>
            </div>
          </div>
        )}
      </div>
      <ToastContainer position="top-right" />
    </div>
  );
}

export default App;
