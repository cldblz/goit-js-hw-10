import './css/styles.css';
import debounce from 'lodash.debounce'
import CountriesApiService from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const input = document.querySelector("input#search-box")
const countryListRef = document.querySelector(".country-list")
const countryInfoRef = document.querySelector(".country-info")
const countriesApiService = new CountriesApiService()

input.addEventListener("input", debounce(onInput, DEBOUNCE_DELAY))

function onInput(e) {
    emptyСontent()

    const newQuery = input.value.trim()

    if (newQuery === "") {
        return
    }

    countriesApiService.query = newQuery
    countriesApiService.fetchCountries().then(createMarkup)
}

function createMarkup(data) {
    if (data) {
        if (data.length === 1) {
            const { flags, name, capital, population, languages } = data[0]
            const languagesList = Object.values(languages).join(", ")

            const markup = `<h1><img src="${flags.svg}" alt="${name.official} flag" width="45" height="30"/>${name.official}</h1><p><b>Capital:</b> ${capital}</p><p><b>Population:</b> ${population}</p><p><b>Languages:</b> ${languagesList}</p>`

            return countryInfoRef.innerHTML = markup
        }

        const markup = data.map(({ flags, name }) => {
            return `<li><img src="${flags.svg}" alt="${name.official} flag" width="36" height="24">${name.official}</li>`
        }).join("")

        countryListRef.innerHTML = markup
    }
}

export default function emptyСontent() {
    countryListRef.innerHTML = ""
    countryInfoRef.innerHTML = ""
}
