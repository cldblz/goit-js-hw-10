import { Notify } from 'notiflix/build/notiflix-notify-aio';
import emptyСontent from './index'

const BASE_URL = 'https://restcountries.com/v3.1';

export default class CountriesApiService {
    constructor() {
        this.searchQuery = '';
    }

    fetchCountries() {
        const url = `${BASE_URL}/name/${this.searchQuery}?fields=name,capital,population,flags,languages`

        return fetch(url)
            .then(this.onResponse)
            .then(data => {
                if (data.length > 10) {
                    return Notify.info("Too many matches found. Please enter a more specific name.");
                }

                return data
            })
            .catch(console.log);
    }

    onResponse(response) {
        if (response.status === 404) {
            emptyСontent()
            Notify.failure("Oops, there is no country with that name");
            throw new Error("Not found")
        }
        return response.json()
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }

}