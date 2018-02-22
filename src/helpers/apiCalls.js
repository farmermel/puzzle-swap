import { locationKey } from './apiKeys';
const geoUrl = 'https://www.googleapis.com/geolocation/v1/geolocate?key=';
const geoCodeUrl = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';

export const getGeoLocation = async () => {
  try { 
    const initialFetch = await fetch(`${geoUrl}${locationKey}`, {
      body: JSON.stringify({considerIp:'true'}), 
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
      mode: 'cors'
    });
    if (initialFetch.status <= 200) {
      const latLngResponse = await initialFetch.json();
      return await getCities(latLngResponse);
    } else {
      throw new Error('Bad status code');
    }
  } catch (error) {
    throw Error(`failed to retrieve geolocation: ${error}`);
  }
};

const getCities = async locationResponse => {
  const { lat, lng } = locationResponse.location;
  const initialFetch = 
    await fetch(`${geoCodeUrl}${lat},${lng}&key=${locationKey}`);
  const cityResponse = await initialFetch.json();
  return cleanCitiesData(cityResponse.results);
};

const cleanCitiesData = address => {
  const findType = type => type.types[0] === 'locality';
  const location = address.map(addressObj => addressObj);
  const placeName = location.filter(findType);

  return placeName[0].address_components[0].short_name;
};