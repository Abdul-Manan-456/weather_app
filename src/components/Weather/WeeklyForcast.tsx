import { useWeatherContext } from '@/store/WeatherContext'
import { Cloud, Droplets, Thermometer, Wind } from 'lucide-react'
import moment from 'moment'
import Image from 'next/image'

interface ForcastItem {
  day: string;
  temp: number;
  wind: number;
  humidity: number;
  cond: string;
  icon: string;
  cloud: number
}
const WeeklyForcast = () => {
  const { state } = useWeatherContext()
  const { current, location, forecast } = state?.data
  const weeklyForecast: ForcastItem[] = forecast.forecastday.map((day: any) => {
    return {
      day: moment(day.date).format('dddd'),
      temp: Math.round(day.day.avgtemp_c),
      wind: Math.round(day.day.maxwind_kph),
      humidity: Math.round(day.day?.avghumidity),
      cond: day?.day?.condition.text,
      icon: day?.day?.condition.icon,
      cloud: day?.day?.daily_chance_of_rain,
    }
  })
  // console.log("forecast--------------", weeklyForecast)
  const styles = {
    fontWeight: '600',
    display: 'flex',
    fontSize: '14px',
    alignItems: 'center',
    justifyContent: 'center',
  }
  const iconStyles = {
    width: '16px',
    height: '16px',
    fontWeight: 'none',
    marginRight: '4px',
  }

  return (
    <main>
      <div className='flex flex-col items-center xl:p-4 p-2 md:mt-0 mt-8 box-border'>
        <h4 className='primaryTextH4 xl:mb-3 mb-1'>Weekly Forcast</h4>
        {/* First Data */}
        {weeklyForecast.map((forcast, index) => {
          const strLeng = forcast.cond.length;
          // if (forcast.cond.length >= 14 ){

          //   }
          return (
            <div
              key={index}
              className='grid my-1 grid-rows-2 gap-3 rounded-sm bg-teal-700 hover:bg-teal-800 w-full items-center  lg:px-8 px-4 py-2'
            >
              <div className='grid grid-cols-3  w-full'>
                <h4 className='xl:font-bold font-medium text-sm'>{forcast.day}</h4>
                <div style={styles}><Thermometer style={iconStyles} /> {forcast.temp} C</div>
                <div style={styles} className='xl:pl-16 pl-4'>
                  <Wind style={iconStyles} /> {forcast.wind} Km/h
                </div>
              </div>
              <div className='grid grid-cols-3 items-center justify-between'>
                <div className={`flex items-center justify-start font-light  ${strLeng >= 12 ? 'text-xs' : 'text-sm'}`}>
                  <Image alt='weather_icons' width={20} height={20} src={`https:${forcast.icon}`} /> {`${forcast.cond}`}
                </div>
                <div style={styles}>{<Cloud style={iconStyles} />} {forcast.cloud}</div>
                <div style={styles} className='xl:pl-16 pl-4'>
                  <Droplets style={iconStyles} />
                  {forcast.cloud} %
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </main>
  )
}

export default WeeklyForcast
