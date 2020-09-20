import HTTP from '.'
import axios from 'axios'


export default {
    fetchCurrencies() {
        return HTTP.get('https://currencyexchangerv1.herokuapp.com/');
    },


    exchangeCurrency(currencyFrom,CurrencyTo,CurrencyToAmount) {
        let data = new FormData();
        data.append("CurrencyFrom",currencyFrom);
        data.append("CurrencyTo",CurrencyTo);
        data.append("CurrencyToAmount",CurrencyToAmount.user);
        return axios.post('https://currencyexchangerv1.herokuapp.com/getconvertedcurrency',data);
    }
}