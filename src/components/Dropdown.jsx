import React from 'react'
import { HiOutlineStar } from "react-icons/hi2";
const CurrencyDropdown = ({
    currencies,
    currency, 
    setcurrency, 
    favorites, 
    handlefavourite,
    title='',

}) => {
  const uniqueCurrencies = Array.from(new Set([...favorites, ...currencies]));
  return (
    <div>
      <label htmlFor={title} className='text-sm block font-medium text-gray-700'>{title}</label>
      <div className='relative'>
        <select value={currency} onChange={(e)=>setcurrency(e.target.value)} className='w-full p-1 m-1  rounded-md border-gray-300 shadow-sm bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500'>
            {/* {favorites.map((currency)=>{
                return(
                  <option className='bg-gray-200' value={currency} key={currency}>
                    {currency}
                  </option>
                  )
            })}
            <hr />
            {currencies?.map((currency)=>{
                return(
                  <option value={currency} key={currency}>
                    {currency}
                  </option>
                  )
            })} */}

            {uniqueCurrencies?.map((currency)=>{
                return(
                  <option  value={currency} key={currency}>
                    {currency}
                  </option>
                  )
            })} 
        </select>
        <button onClick={()=>handlefavourite(currency)} className='absolute right-0 inset-y-0 pr-3 flex items-center leading-5 text-sm'>
        <HiOutlineStar />
        </button>
      </div>
    </div>
  )
}

export default CurrencyDropdown
