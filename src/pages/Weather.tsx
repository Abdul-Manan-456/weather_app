import { WeatherApi } from "@/api/WeatherApi";
import AirConditions from "@/components/Weather/AirConditions";
import CurrentWeather from "@/components/Weather/CurrentWeather";
import TodayForcast from "@/components/Weather/TodayForcast";
import WeatherHeader from "@/components/Weather/WeatherHeader";
import WeeklyForcast from "@/components/Weather/WeeklyForcast";
import { Card } from "@/components/ui/card";
import { useWeatherContext } from "@/store/WeatherContext";
import { Microscope } from "lucide-react";
import { useEffect } from "react";

const Weather = () => {
  const { coord, state, dispatch } = useWeatherContext();

  useEffect(() => {

    if (coord.lat !== null && coord.long !== null) {

      (async () => {
        await dispatch({ type: 'IS_LOADING' })
        await WeatherApi(coord, dispatch)
      }
      )();
    }

  }, [coord, dispatch]);

  return (
    <main className="md:h-3/4 md:overflow-y-hidden lg:w-4/5 sm:w-11/12 w-screen text-white">
      <Card className="w-full overflow-y-auto  md:overflow-y-hidden md:p-2 p-0  sm:border-white sm:h-[540px] h-screen">
        <WeatherHeader />
        {
          // data => null , isLoading => false
          !state.data && !state.isLoading &&
          (<div className=" flex flex-col text-slate-300 items-center justify-center h-96">
            <Microscope className=" mb-8" width={100} height={100} />
            <h3 className="  text-xl font-bold">Search to find out the Weather Conitions</h3>
          </div>)
        }
        {
          // data => {} , isLoading => false
          state.data && state.data.length !== 0 && (<div className="md:grid md:grid-cols-2">
            <div className="xl:p-4 p-2">
              <CurrentWeather />
              <AirConditions />
              <TodayForcast />
            </div>
            <div>
              <WeeklyForcast />
            </div>
          </div>)
        }


        {
          //  data => null isLoading => true
          state.isLoading && state.data == null && (<div className=" flex flex-col text-slate-300 items-center justify-center h-96">
            <h3 className="  text-xl font-bold">Loading ...</h3>
          </div>)

        }
      </Card>
    </main>
  );
};

export default Weather;
