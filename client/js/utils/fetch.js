/**
 * Controlla che la chiamata sia andata a buon fine (status code tra 200 e 300),
 * in caso contrario genera e lancia un'eccezione
 *
 * @param {any} response
 * @returns
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    var message = response.statusText;
    var error = new Error(message);
    throw error;
  }
}

export const fetchWrapper = url => {
  return fetch(url)
    .then(checkStatus)
    .catch(error => console.log('Si è verificato un errore!'));
};
