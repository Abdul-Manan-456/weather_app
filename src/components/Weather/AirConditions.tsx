import React from "react";
import HumiIcon from "./../../../public/icons/airConditions/humiPer.svg";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Cloud, Droplets, Thermometer, Wind } from "lucide-react";
import { useWeatherContext } from "@/store/WeatherContext";
const AirConditions = () => {
  const styles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "8px",
  };
  const iconStyles = {
    width: "20px",
    height: "20px",
    marginRight: "4px",
  };
  const { state } = useWeatherContext();
  const { current } = state?.data;

  const currentData = {
    feel: Math.round(current?.feelslike_c),
    wind: current?.wind_kph,
    humidity: current?.humidity,
    cloud: current?.cloud,
  };
  return (
    <div>
      <Table>
        <TableCaption className="mt-8 mb-4">Air Conditions</TableCaption>
        <TableHeader className="h-8">
          <TableRow>
            <TableHead>
              <div style={styles}>
                {<Thermometer style={iconStyles} />}Real Feel
              </div>
            </TableHead>
            <TableHead>
              <div style={styles}>{<Wind style={iconStyles} />}Winds</div>
            </TableHead>
            <TableHead>
              <div style={styles}>{<Cloud style={iconStyles} />} Clouds</div>
            </TableHead>
            <TableHead>
              <div style={styles}>
                {<Droplets style={iconStyles} />}
                Humidity
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="h-8">
          <TableRow>
            <TableCell>{currentData.feel}</TableCell>
            <TableCell> {currentData.wind} m/s</TableCell>
            <TableCell>{currentData.cloud} %</TableCell>
            <TableCell>{currentData.humidity} %</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default AirConditions;
