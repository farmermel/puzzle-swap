import { locationKey, sendGridKey } from './apiKeys';


export const getGeoLocation = async () => {
  try { 
    const initialFetch = await fetch(`https://www.googleapis.com/geolocation/v1/geolocate?key=${locationKey}`, {
      body: JSON.stringify({considerIp:'true'}), 
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
      mode: 'cors'
    })
    if(initialFetch.status <= 200) {
      const latLngResponse = await initialFetch.json()
      return await getCities(latLngResponse)
    } else {
      throw new Error('Bad status code');
    }
  } catch (error) {
    throw `failed to retrieve geolocation: ${error}`
  }
}

const getCities = async locationResponse => {
  const { lat, lng } = locationResponse.location
  const initialFetch = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${locationKey}`);
  const cityResponse = await initialFetch.json();
  return cleanCitiesData(cityResponse.results);

  // .then(response => `${getAddressCity(address_components, 'short')}, ${getAddressState(address_components, 'short')}`)
}

const cleanCitiesData = address => {
  const findType = type => type.types[0] === "locality";
  const location = address.map(obj => obj);
  const placeName = location.filter(findType);

  return placeName[0].address_components[0].short_name;
}


// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey(process.env.sendGridKey);
// const msg = {
//   to: 'test@example.com',
//   from: 'test@example.com',
//   subject: 'Sending with SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// };
// sgMail.send(msg);
