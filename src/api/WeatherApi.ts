import axios from "axios";

const WEATHER_API_KEY = "143147f285694383850112641241601";
const WEATHER_API_URL = "http://api.weatherapi.com/v1/forecast.json";
interface CoordProps {
  lat: number| null;
  long: number| null;
}
export const WeatherApi = async (coord:CoordProps,dispatch: any) => {
    const WeatherApiOptions = {
      method: "GET",
      url: WEATHER_API_URL,
      params: {
        key: `${WEATHER_API_KEY}`,
        q: `${coord.lat},${coord.long}`,
        days: 5,
        aqi: "no",
        alerts: "no",
      },
    };
    axios
      .request(WeatherApiOptions)
      .then((responce) => {
      return dispatch({ type: "FETCH_SUCCESS", payload: responce?.data })
       
      }   
      ).catch( (error) => {
        console.log(error)
          dispatch({ type: "FETCH_ERROR", })
      }); 
};
