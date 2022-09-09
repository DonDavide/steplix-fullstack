import React, { useState } from 'react'

const AddRateForm = props => {

	const initialRateFormState = { id: "", description: '', value: '' }
	const initialMessage = [{ type: "", text: "", color:""}]

	const [ rate, setRate ] = useState(initialRateFormState);
	const [ message, setMessage] = useState(initialMessage)

	const handleInputChange = event => {
		const { name, value } = event.target
		setRate({ ...rate, [name]: value })
		
	}

	return (
		<form
			onSubmit={event => {
				event.preventDefault()
				if (!rate.id || !rate.value) return

				props.addRate(rate)
				.then(res => {
					if(res.meta.status === 200){
						setMessage([{ type: "ok", text: "The value of the currency was changed", color:"green"}])
					}else{
						setMessage([{ type: "error", text: res.meta.message, color:"red"}])
					};
				});
				setRate(initialRateFormState);
			}}
		>
			<label>Select Currency</label>
			<select onChange={handleInputChange} name="id" value={rate.id}>
			<option key="select0" name="id" value="0">Select One Currency </option>
			{props.currencies.length > 0 ? (
				props.currencies.map(currency => (
					<option style={{ textTransform: 'uppercase'}} key={currency.id.toString()} name="id" value={currency.id}>{currency.description.toUpperCase()} </option>
				))
		) : (
			<option value="">No Currencies</option>
      		)}
			</select>			
			<label>Enter a new currency value</label>
			<input type="number" name="value" placeholder='New currency value' value={rate.value} onChange={handleInputChange} />
			{message.type !== "" ? (
				<label style={{color : message[0].color}}>{message[0].text}</label>

		) : (
			<br></br>
      		)}
			<button>Add new value</button>
		</form>
	)
}

export default AddRateForm
