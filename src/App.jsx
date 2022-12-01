/* eslint-disable react-hooks/exhaustive-deps */
// import logo from './logo.svg';

import { FaLocationArrow } from "react-icons/fa";
import "./App.css";
import { useEffect, useState } from "react";

import Forecast from "./Forecast";
import { getGeoCoding } from "./geocoding";

function App() {
  const [location, setLocation] = useState({ lat: "", long: "" });
  const [error, setError] = useState({});
  const [zip, setZip] = useState("");
  const [zipMsg, setZipMsg] = useState("");
  const [weatherData, setWeatherData] = useState({});
  // const [gcTest, setgcTest] = useState({});

  const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  };

  function validateZip(str) {
    return /^\d{5}(-\d{4})?$/.test(str);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateZip(zip)) {
      // console.log(zip);
      const geocoded = await getGeoCoding(zip);
      // console.log("**from handleSubmit!");
      // console.log(geocoded);
      if (geocoded.latitude) {
        setLocation({
          lat: geocoded.latitude,
          long: geocoded.longitude,
        });
      }
      // console.log(JSON.stringify(geocoded));
      // setgcTest(geocoded);
    } else {
      setZip("");
      setZipMsg("invalid zip code!");
      setTimeout(() => {
        setZipMsg("");
      }, 3000);
    }
    // console.log(e.target.value);
  };

  const getLocation = () => {
    window.navigator.geolocation.getCurrentPosition(
      (position) =>
        setLocation({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        }),
      (error) => {
        setError({ msg: error.message });
        setTimeout(() => {
          setError("");
        }, 3000);
      }
    );
  };

  const getWeather = async () => {
    const result = await fetch(
      `https://api.weather.gov/points/${location.lat},${location.long}`
    );
    const data = await result.json();
    // console.log(result);
    // console.log(data);
    // return data;
    setWeatherData(data);
  };
  // useEffect(() => {
  //   getLocation();
  // }, []);

  useEffect(() => {
    // console.log(location.lat);
    if (location.lat !== "") {
      getWeather();
    }
  }, [location]);

  if (!isEmpty(weatherData)) {
    return (
      <div className="container">
        <h1 className="headTitle">Karmatronix Weather</h1>
        <p className="headP">Powered by the National Weather Service API</p>
        <Forecast props={weatherData} />
      </div>
    );
  } else {
    return (
      <>
        <div className="container">
          <h1 className="headTitle">Karmatronix Weather</h1>
          <p className="headP">Powered by the National Weather Service API</p>
          <p className="setLocation">
            <button className="locationBtn" onClick={getLocation}>
              Use browser location
              <FaLocationArrow />
            </button>
            <br />
            {error.msg && <span className="locationError">{error.msg}</span>}
          </p>
          or
          <form action="" onSubmit={handleSubmit}>
            <input
              onChange={(e) => setZip(e.target.value)}
              type="text"
              name="zip"
              id="zip"
              value={zip}
              placeholder="Enter US zip code"
              className="zipInput"
            />
            <button className="zipInput" type="submit">
              Submit
            </button>
            <br />
            {zipMsg && <span className="locationError">{zipMsg}</span>}
          </form>
        </div>
      </>
    );
  }
}

export default App;

// https://api.weather.gov/points/{latitude},{longitude}
