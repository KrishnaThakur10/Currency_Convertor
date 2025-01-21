import { useCallback, useEffect, useState } from "react"

const CurrencyConvertor = ()=> {
    // Currency -->  https://api.frankfurter.app/currencies
    // https://api.frankfurter.dev/v1/latest?amount=2&base=USD&symbols=INR
     const [currencies, setcurrencies] = useState([]);
     const [amount,setamount] = useState(5);

     const fetchCurrencies = async () =>{
        try {
            const res = await fetch("https://api.frankfurter.dev/v1/currencies");
            const data = res.json();
            setcurrencies(data);
        } catch (error) {
            console.error("error fetching:" ,error);
            
        }
     }

     useEffect(()=>{
        fetchCurrencies()
     },[])

     console.log(currencies);
     

    // const fetchCurrencies = useCallback(()=>{
    //     fetch("https://api.frankfurter.app/currencies")
    //     .then((res)=>res.json())
    //     .then(()=>setcurrencies(res))
    //     .catch((error)=> console.log("error fetching:",error))
    // },[setcurrencies])

    return (
    <div className="max-w-xl bg-white shadow-md mx-auto my-10 p-8 rounded-lg">
      <h2 className="mb-4 text-2xl text-gray-600 font-semibold">Curreny Convertor</h2>

      <div>Dropdown</div>
      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount:</label>
        <input value={amount} onChange={(e)=>setamount(e.target.value)} type="number" className="w-full p-2 border border-gray-300 rounded-md  mt-2  focus:ring-2 focus:outline-none focus:ring-indigo-500" />
      </div>
      <div className="flex justify-end mt-6">
        <button  className="px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Convert</button>
      </div>
      <div className="text-lg text-green-600 font-medium mt-5 text-right">
        Converted Amount: 49 USD
      </div>
    </div>
  )
}

export default CurrencyConvertor
