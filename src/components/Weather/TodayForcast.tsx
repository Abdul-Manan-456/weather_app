import { Sun } from "lucide-react";
import React from "react";
import { Card } from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import TodayForecastDetails from "./TodayForecastDetails";
import { useWeatherContext } from "@/store/WeatherContext";
import moment from "moment";

const TodayForcast = () => {
  const { state } = useWeatherContext();
  const { current, location, forecast } = state?.data;

  const dayForeCastData =
    forecast &&
    forecast?.forecastday[0]?.hour.map((value: any) => {
      return {
        time: moment(value?.time).format("h:mm"),
        icon: value?.condition?.icon,
        temp: Math.round(value?.temp_c),
      };
    });

  return (
    <div className="flex flex-col my-1 mt-6 items-center justify-center">
      <h4 className="primaryTextH4 mb-4">Today Forcast</h4>
      {/* <p className="secondaryTextP">6 available forcasts</p> */}

      <div className="flex flex-row items-center justify-between w-full">
        <Carousel className="w-full h-28 flex items-center box-border rounded-sm blur-border">
          <CarouselContent>
            {dayForeCastData &&
              dayForeCastData.map((item: any, index: number) => (
                <div key={index}>
                  <TodayForecastDetails item={item} />
                </div>
              ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default TodayForcast;
