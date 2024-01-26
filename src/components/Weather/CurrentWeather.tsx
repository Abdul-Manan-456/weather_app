"use client";

import { useWeatherContext } from "@/store/WeatherContext";
import Image from "next/image";
import moment from "moment";
import { WeatherApi } from "@/api/WeatherApi";
import { useEffect } from "react";

const CurrentWeather = () => {

  const { state, coord, dispatch } = useWeatherContext();
  const { current, location } = state?.data;

  const timeFormat = location?.localtime
    ? moment(location.localtime).format("[Today] Do MMMM")
    : "";
  const currentData = {
    city: location?.name,
    time: timeFormat,
    temp: Math.round(current?.temp_c),
    cond: current?.condition?.text,
    icon: current?.condition.icon,
  };
  return (
    <div className="flex w-full md:mt-0 mt-4 flex-col items-center justify-center">
      <h1 className={`primaryTextH4`}>Current Weather</h1>

      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col items-center ">
          <p className="primaryTextH3">{currentData.city}</p>
          <p className=" primaryTextP">{currentData?.time}</p>
        </div>
        <div className="flex flex-col items-center ">
          <h1 className="primaryTextH3">{currentData?.temp} C</h1>
          <p className="primaryTextP">{currentData?.cond}</p>
        </div>
        <Image
          src={currentData?.icon && `https:${currentData?.icon}`}
          width={60}
          height={60}
          alt="cloud_image"
        />
      </div>
    </div>
  );
};

export default CurrentWeather;
