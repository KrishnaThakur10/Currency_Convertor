import React from "react";
import CurrencyConvertor from "./components/CurrencyConvertor";

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-black bg-gray-100">
      <div className="container mb-8">
        <CurrencyConvertor />
      </div>
    </div>
  );
}

export default App;
