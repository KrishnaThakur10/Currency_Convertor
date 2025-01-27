import React from 'react'

const CurrencyDropdown = ({
    currencies,
    currency, 
    setcurrency, 
    favorites, 
    setfavorites,
    title='',

}) => {
  return (
    <div>
      <label htmlFor={title}>{title}</label>
    </div>
  )
}

export default CurrencyDropdown
