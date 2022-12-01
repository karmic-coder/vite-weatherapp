/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useState, useEffect } from "react";
import DailyWeather from "./DailyWeather";

const Forecast = (props) => {
  // console.log(props);
  const { city, state } = props.props.properties.relativeLocation.properties;
  const { forecast } = props.props.properties;

  const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  };

  const [localWeather, setLocalWeather] = useState({});

  const getForecast = async () => {
    const result = await fetch(`${forecast}`);
    const data = await result.json();
    // console.log(result);
    // console.log(data);
    // return data;
    setLocalWeather(data);
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

  if (!isEmpty(localWeather)) {
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
