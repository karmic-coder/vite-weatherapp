/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useState, useEffect } from "react";
import DailyWeather from "./DailyWeather";

const ForecastError = ({ forecastError }) => {
  const [timer, setTimer] = useState(5);
  function myTimer() {
    var timeleft = 5;
    var downloadTimer = setInterval(function () {
      if (timeleft <= 0) {
        clearInterval(downloadTimer);
        // getForecast();
        console.log(timer);
      } else {
        // console.log(timeleft);
        setTimer(timeleft);
      }
      timeleft -= 1;
    }, 1000);
  }
  useEffect(() => {
    myTimer();
  }, []);
  if (timer > 1) {
    return (
      <div className="forecast-error">
        <h3>{forecastError}</h3>
        <p>Trying again in {timer} seconds</p>
      </div>
    );
  } else {
    return;
  }
};

const Forecast = (props) => {
  // console.log(props);
  const { city, state } = props.props.properties.relativeLocation.properties;
  const { forecast } = props.props.properties;

  const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  };

  const [localWeather, setLocalWeather] = useState({});
  const [forecastError, setForecastError] = useState("");

  const getForecast = async () => {
    try {
      const result = await fetch(`${forecast}`);
      const data = await result.json();
      // const data = {};
      // data.status = 500; // force trigger error
      if (data.status || data.status == 500) {
        setForecastError("National Weather Service - server error");
      }
      setLocalWeather(data);
    } catch (error) {
      console.error("Forecast error: " + error);
      setForecastError(error);
      console.log("Fc error:", forecastError);
    }
    // console.log(result);
    // console.log(data);
    // return data;
  };
  useEffect(() => {
    getForecast();
    // console.log("LOCATION STATUS");
  }, []);

  // console.log(localWeather);
  // console.log(localWeather.properties.periods);
  // console.log(localWeather.properties);

  // const days = localWeather.properties.periods;
  // console.log(days);
  // const day = days.map((day) => {
  //   const { icon } = day;
  //   return icon;
  // });
  // console.log(day);
  if (!isEmpty(forecastError)) {
    setTimeout(() => {
      // console.log(localWeather);
      getForecast();
      setForecastError({});
    }, 6000);
    return <ForecastError forecastError={forecastError} />;
  }

  if (!isEmpty(localWeather) && localWeather.status !== 500) {
    const dailyDetails = localWeather.properties.periods;
    return (
      <>
        <h2 className="headerH2">
          Forecast for {city}, {state}
        </h2>
        <br />

        {dailyDetails.map((dailyDetail) => {
          return <DailyWeather key={dailyDetail.number} {...dailyDetail} />;
        })}
      </>
    );
  }
};
export default Forecast;
