import { locationKey, sendGridKey } from './apiKeys';


export const getGeoLocation = () => {
  return fetch(`https://www.googleapis.com/geolocation/v1/geolocate?key=${locationKey}`, {
    body: JSON.stringify({considerIp:'true'}), 
    headers: {
      'content-type': 'application/json'
    },
    method: 'POST',
    mode: 'cors'
  })
  .then(response => response.json())
  .then(response => getCities(response))
}

const getCities = (locationResponse) => {
  const { lat, lng } = locationResponse.location
  return fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${locationKey}`)
  .then(response => response.json())
  .then(response => cleanCitiesData(response.results))
  // .then(response => `${getAddressCity(address_components, 'short')}, ${getAddressState(address_components, 'short')}`)
}

const cleanCitiesData = (address) => {
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
