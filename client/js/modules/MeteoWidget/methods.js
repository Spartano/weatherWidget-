import { fetchWrapper } from '../../utils/fetch';

function showPosition(position) {
  let pos = null;

  pos = {
    lat: position.coords.latitude,
    lng: position.coords.longitude
  };

  return pos;
}

export function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    var error = new Error('Geolocation is not supported by this browser.');
    throw error;
  }
}

export function getForecast(lat, long) {
  /* For building querys with escaped char visit https://developer.yahoo.com/weather/ */

  let yqlEndpoint = `https://query.yahooapis.com/v1/public/yql?q=select%20`;
  let fields = ` location.city%2C%20item.condition%2C%20items.forecast%2C%20atmosphere.humidity%2C%20%20wind.speed%20`;
  let query = `from%20weather.forecast%20where%20woeid%20in%20`;
  let yqlStatement = `(SELECT%20woeid%20FROM%20geo.places(1)%20WHERE%20text%3D%22(${lat}%2C${long})%22)`;
  let params = `&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`;

  let url = yqlEndpoint + fields + query + yqlStatement + params;

  //////////////////////get the json/////////////////

  return fetchWrapper(url)
    .then(response => response.json())
    .then(response => response.query.results.channel);
}
