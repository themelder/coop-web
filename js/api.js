/**
 *
 * @type {string}
 */
const API_BASE = 'https://themachine.jeremystucki.com/coop/api/v2'

const encode = encodeURIComponent

/**
 *
 * @param {string} location
 * @returns {Promise}
 */
export function fetchLocation (location) {
  return fetch(`${API_BASE}/locations/${encode(location)}`)
    .then((resp) => resp.json())
}


/**
 *
 * @param {string} location
 * @returns {Promise}
 */
export function fetchLocationMenus (location) {
  return fetch(`${API_BASE}/locations/${encode(location)}/menus`)
    .then((resp) => resp.json())
}

/**
 *
 * @returns {Promise}
 */
export function fetchLocations () {
  return fetch('https://themachine.jeremystucki.com/coop/api/v2/locations')
    .then((resp) => resp.json())
}
