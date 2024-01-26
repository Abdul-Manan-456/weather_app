import axios from 'axios';

export const GEO_URI_OPTIONS ='https://wft-geo-db.p.rapidapi.com/v1/geo'
export const getLocationCities = async  (param:string) => {
  const geoApiOptions = {
    method: 'GET',
    url: `${GEO_URI_OPTIONS}/cities`,
    DelayNode: false,
    params : {namePrefix :param ,minPopulation:1000000},
    headers: {
      'X-RapidAPI-Key': '45a5098012msh6512399b35acb6fp1d79aejsn04654d261b9f',
      'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
    }
  };
  try {
    const response = await axios.request(geoApiOptions);
  const citiesData = response.data.data
  return citiesData
    // console.log(response.data);
  } catch (error) {
    console.error(error);
    return error
  }
}

