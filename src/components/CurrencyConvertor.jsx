import { useCallback, useEffect, useState } from "react"
import CurrencyDropdown from "./Dropdown";
import { HiArrowsRightLeft } from "react-icons/hi2";
import { useActionState } from "react";
import { use } from "react";

const CurrencyConvertor = ()=> {
    // Currency -->  https://api.frankfurter.app/currencies
    const [currencies, setcurrencies] = useState([]);
    const [amount, setamount] = useState(2);
    const[fromcurrency ,setfromcurrency] = useState("USD");
    const[tocurrency ,settocurrency] = useState("INR");
    const[convertedAmount,setConvertedAmount] = useState(null)
    const[convertingAmount,setConvertingAmount] = useState(false)
    const[favorites,setFavorites] = useState(JSON.parse(localStorage.getItem("favorites"))||["INR","USD"])
    

     //  const fetchCurrencies = async () =>{
      //     try {
        //         const res = await fetch("https://api.frankfurter.dev/v1/currencies");
    //         const data = res.json();
    //         setcurrencies(data);
    //     } catch (error) {
    //         console.error("error fetching:" ,error);
    
    //     }
    //  }
     
    const fetchCurrencies = useCallback(()=>{
      fetch("https://api.frankfurter.app/currencies")
       .then((res)=>res.json())
       .then((res)=>setcurrencies(Object.keys (res)))
       .catch((error)=> console.log("error fetching:",error))
      },[setcurrencies])
      
      useEffect(()=>{
        fetchCurrencies()
      },[fetchCurrencies])
      

      // https://api.frankfurter.dev/v1/latest?amount=2&base=USD&symbols=INR
      const convertcurrency = useCallback(()=>{
        if(!amount) return;
        setConvertingAmount(true)
        fetch(`https://api.frankfurter.dev/v1/latest?amount=${amount}&base=${fromcurrency}&symbols=${tocurrency}`)
         .then((res)=>res.json())
         .then((res)=>setConvertedAmount(res.rates[tocurrency]+ " " + tocurrency))
         .catch((error)=> console.log("error fetching:",error))
         .finally(()=> setConvertingAmount(false))
         console.log(convertedAmount);
        },[setConvertedAmount, setConvertingAmount, amount, tocurrency, fromcurrency])

      const handlefavourite = (currency)=>{
         // add to favourite
      }
      const swapCurrencies = ()=>{
        setfromcurrency(tocurrency)
        settocurrency(fromcurrency)
      }
      return (
        <div className="max-w-xl bg-white shadow-md mx-auto my-10 p-8 rounded-lg">
      <h2 className="mb-4 text-2xl text-gray-600 font-semibold">Curreny Convertor</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
        <CurrencyDropdown  favorites={favorites} currencies={currencies} title="FROM" handlefavourite={handlefavourite} currency={fromcurrency} setcurrency={setfromcurrency}/>
        <div  className="flex justify-center items-center -mb-5 sm:mb-0">
          <button onClick={swapCurrencies} className="p-2 bg-gray-200 hover:bg-gray-400 rounded-full cursor-pointer">
            <HiArrowsRightLeft className="text-xl text-gray-700"/>
          </button>
        </div>
        <CurrencyDropdown favorites={favorites} currencies={currencies} title="TO" handlefavourite={handlefavourite} currency={tocurrency} setcurrency={settocurrency}/>
      </div>
      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount:</label>
        <input value={amount} onChange={(e)=>setamount(e.target.value)} type="number" className="w-full p-2 border border-gray-300 rounded-md  mt-2  focus:ring-2 focus:outline-none focus:ring-indigo-500" />
      </div>
      <div className="flex justify-end mt-6">
        <button onClick={convertcurrency}  className={`px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${convertingAmount?"animate-pulse":""}`}>Convert</button>
      </div>

      {convertedAmount && ( <div className="text-lg text-green-600 font-medium mt-5 text-right">
        Converted Amount: {convertedAmount}
      </div>)}
    </div>
  )
}

export default CurrencyConvertor
