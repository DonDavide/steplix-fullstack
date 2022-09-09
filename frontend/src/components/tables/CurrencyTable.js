import React from 'react'

const CurrencyTable = props => (
  <table>
    <thead>
      <tr>
        <th>Symbol</th>
        <th>Name</th>
        <th>Value</th>
        <th>Valuation date</th>
      </tr>
    </thead>
    <tbody>
      {props.currencies.length > 0 ? (
        props.currencies.map(currency => (
          <tr  style={{ textTransform: 'uppercase'}} key={currency.currency.id}>
            <td  style={{ textTransform: 'uppercase'}} >{currency.currency.symbol}</td>
            <td  style={{ textTransform: 'uppercase'}} >{currency.currency.description}</td>
            <td  style={{ textTransform: 'uppercase'}} >{currency.value}</td>
            <td  style={{ textTransform: 'uppercase'}} >{props.formatDate(currency.created_at)}</td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={4}>No currencies</td>
        </tr>
      )}
    </tbody>
  </table>
)

export default CurrencyTable
