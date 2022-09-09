import Helpers from './helpers/helpers'
const URL_BASE = "http://localhost:8080/"
var CurrencyDataService = {
  async getAll(){
    try {
      let url = URL_BASE +'api/currencies';
      let response = await fetch(url, {
          method: "GET",
          headers: {
              accept: 'application/json',
            },
          });
      let data = await response.json();
      return data;

    } catch (error){
        console.log(error);
    }
  },
  async getCurrencieAndRates(rate){
    try {
      let url = URL_BASE +'api/currencieAndRates/'+rate.id + '/' + rate.range;
      let response = await fetch(url, {
          method: "GET",
          headers: {
              accept: 'application/json',
            },
          });
      let data = await response.json();
      let rates = Helpers.mapperToChart(data.data);
      return rates;

    } catch (error){
        console.log(error);
    }
  },
  async getRates(){
    try {
      let url = URL_BASE +'api/rates';
      let response = await fetch(url, {
          method: "GET",
          headers: {
              accept: 'application/json',
            },
          });
      let data = await response.json();
      return data;
    } catch (error){
        console.log(error);
    }
  },
  async getCurrencyBySymbol(symbol){
    try {
      let url = URL_BASE +'api/rates';
      let response = await fetch(url + symbol, {
          method: "GET",
          headers: {
              accept: 'application/json',
            },
          });
      let data = await response.json();
      
      return data;

    } catch (error){
        console.log(error);
    }
  },
  async changeCurrencyRate(rate){
    let dto = {
      id_currency : Number(rate.id),
      value : Number(rate.value)
    }
    try {
      let url = URL_BASE +'api/rates';
      let response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dto),
        });
        let data = await response.json();

        return data;
      } catch (error){
        console.log(error);
      }
  },

}
  
export default CurrencyDataService;