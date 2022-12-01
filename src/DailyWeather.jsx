import React from "react";
// import "./App.css";

const DailyWeather = (props) => {
  const {
    name,
    startTime,
    shortForecast,
    temperature,
    temperatureUnit,
    windDirection,
    windSpeed,
    detailedForecast,
    icon,
    // isDaytime,
  } = props;
  //   console.log(typeof startTime);
  return (
    <>
      <div className="gridContainer">
        <div className="card">
          <div className="mainCard">
            <h4 className="date">
              {name}, {startTime.slice(5, 10).replace("-", "/")}/
              {startTime.slice(0, 4)}
            </h4>
            <h2 className="shortCast">{shortForecast}</h2>
            <p>{detailedForecast}</p>
          </div>
          <div>
            <p className="temp">
              {temperature} {temperatureUnit}
            </p>
            <p>
              {windSpeed} {windDirection}
            </p>
            <img src={icon} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default DailyWeather;
