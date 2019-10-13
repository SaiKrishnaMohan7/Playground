/*jshint ignore: start*/
const axios = require('axios');

const getExchangeRate = async (currFrom, currTo) => {
    let response = await axios.get('http://data.fixer.io/api/latest?access_key=f6739229b9748bf669576ecbf7cb5dfb');
    let euro = 1 / response.data.rates[currFrom];
    let rate = euro * response.data.rates[currTo];
    return rate;
};

const getCountries = async (currCode) => {
    let response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currCode}`);
    return response.data.map((country) => country.name);
};

async function currencyConverter(from, to, amt) {
    try{
        let rate = await getExchangeRate(from, to);
        let countries = await getCountries(to);
        let convertedAmount = (rate * amt).toFixed();
        
        if (isNaN(rate)){
            throw new Error();
        }
        return `${amt} ${from} is worth ${convertedAmount} ${to}, accepted in ${countries.length} \n ${countries.join('\n')}`;
    } catch (e) {
        throw new Error(`Unable to get exchange rate`)
    }

}

currencyConverter('CAD', 'USD', 2000).then((message) => console.log(message))
    .catch((e) => console.log(e.message));

// const getExchangeRate = (currFrom, currTo) => {
//     return axios.get('http://data.fixer.io/api/latest?access_key=f6739229b9748bf669576ecbf7cb5dfb')
//         .then((res) => {
//             let euro = 1 / res.data.rate[currFrom];
//                 let rate = euro * res.data.rate[currTo];
//                 return rate;
//         });
// };