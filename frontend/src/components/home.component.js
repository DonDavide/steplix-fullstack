import React, { useState, useEffect ,Fragment} from 'react'

import CurrencyTable from './tables/CurrencyTable'
import CurrencyDataService from '../services/currency.service'
import AddRateForm from './forms/AddRateForm'
import CurrencyChart from './tables/CurrecyChart';

const Home  = () => {
	// Data
    const currenciesInitialData = [{ id: "", created_at: "", id_currency: "", value: "", currency:{
		id: "", decription: "", symbol : "" } }];

    const currenciesNamesInitialData = [{ id: "", description: '', value: '' }];
	const initialDataChart = [{date: 'Date', value: 0}];
	const [ currencies, setCurrencies ] = useState(currenciesInitialData)
	const [ currenciesNames, setCurrenciesNames ] = useState(currenciesNamesInitialData)
	const [ dataChart, setDataChart ] = useState(initialDataChart);



	// Setting state

    useEffect(
        () => {
            viewCurrencies()
            .then(res => res.data)
            .then(data => {
              setCurrencies(data);
            });

            viewCurrenciesNames()
            .then(res => res.data)
            .then(data => {
              setCurrenciesNames(data);
            });
        },
        [])


	// CRUD operations


    const viewCurrenciesNames = async()=>{
        let result = await CurrencyDataService.getAll();
		return result;
    }

    const viewCurrencies = async()=>{
        let result = await CurrencyDataService.getRates();
		return result;
    }

	const viewCurrenciesAndRates = async(rate)=>{
        let result = await CurrencyDataService.getCurrencieAndRates(rate);
		result !== undefined ? setDataChart(result) : setDataChart(initialDataChart);
		return result;
    }

    const changeCurrencyRate = async(rate)=>{
		if(isNaN(rate.value)){
			let response = {
				meta:{
					status : 201,
					state : "error",  
					message : "Only numerical values"            
				},
				data : {}
			}
			return response
		}
        let result = await CurrencyDataService.changeCurrencyRate(rate);
        
		viewCurrencies()
            .then(res => res.data)
            .then(data => {
              setCurrencies(data);
            });

		return result;
    }

	const formatDate = (dateDB)=>{
		let dateShort = dateDB.substr(0,19);
		if(dateShort.includes("T")){
			let date = dateShort.split('T');
			let dateArray 	= date[0].split('-');
			return (dateArray[2] + '-' + dateArray[1] + '-' + dateArray[0] + ' ' + date[1]);
		}else{
			return dateDB;
		}
	}

	return (
		<div className="container">
			<h1>BITCOINS RATESs</h1>
			<div className="flex-row">
				<div className="flex-large">
					<Fragment>
						<h2>Add rate</h2>
						<AddRateForm addRate={changeCurrencyRate} currencies = {currenciesNames}/>
					</Fragment>
				</div>
				<div className="flex-large">
					<h2>View Currencies</h2>
                    <CurrencyTable currencies={currencies} formatDate={formatDate}/>
				</div>
			</div>
			<h2>Values Variation Chart</h2>
			<CurrencyChart GetCurrenciesAndRates={viewCurrenciesAndRates} dataChart = {dataChart}  currenciesNames = {currenciesNames}/>
			
		</div>
	)
}

export default Home
