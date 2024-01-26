import { CarouselItem } from "../ui/carousel";
import React from "react";
import Image from "next/image";

interface todyForcastDetailsProps {
  key?: number;
  item: {
    time: string;
    temp: string;
    icon: string;
  };
}

const TodayForecastDetails: React.FC<todyForcastDetailsProps> = ({ item }) => {
  return (
    <CarouselItem className="box-border w-20 h-24">
      <div className=" px-2 h-full flex flex-col py-1 rounded-sm bg-[#2029a7bd]  items-center justify-between">
        <p className="primaryTextP text-xs">{item.time}</p>
        <Image
          src={item?.icon && `https:${item?.icon}`}
          width={35}
          height={35}
          alt="icon_weather"
        />
        <p className="primaryTextH3">{item.temp} C</p>
      </div>
    </CarouselItem>
  );
};

export default TodayForecastDetails;
