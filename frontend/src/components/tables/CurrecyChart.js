import React, { useState } from 'react'
import { BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	ResponsiveContainer } from 'recharts';

const CurrencyChart = props => {

	const initialRateFormState = { id: "", description: '', range: 5 };

	const [ chartRate, setChartRate ] = useState(initialRateFormState);

    const handleInputChange = event => {
		const { name, value } = event.target
		setChartRate({...chartRate, [name]: value })
		
	}

	return (
        <>
		<form
        onSubmit={event => {
            event.preventDefault()
            if (!chartRate.id || !chartRate.range) return
            props.GetCurrenciesAndRates(chartRate)
            
        }}
    >
        <select onChange={handleInputChange} name="id">
        <option key="select0" name="id" value="0">Select Currency </option>
        {props.currenciesNames.length > 0 ? (
            props.currenciesNames.map(currency => (
                <option style={{ textTransform: 'uppercase'}} key={currency.id.toString()} name="id" value={currency.id}>{currency.description.toUpperCase()} </option>
            ))
    ) : (
        <option value="">No Currencies</option>
        )}
        </select>
        <label>Enter the input range</label>
            <input type="number" name="range" placeholder='Input range' value={chartRate.range} onChange={handleInputChange} />

        <br></br>
        <button>Search Values</button>
        </form>
        <br></br>
        <div className="flex-row">
            <div className="flex-large">
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={props.dataChart} >
                    <Bar dataKey="value" fill="#8884d8" />
                    <CartesianGrid strokeDasharray="#ccc" />
                    <XAxis dataKey="date"/>
                    <YAxis />
                </BarChart>
            </ResponsiveContainer>
            </div>
        
        </div>
        </>
	)
}

export default CurrencyChart
