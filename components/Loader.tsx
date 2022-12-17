import React from 'react'
import { CircleLoader, RiseLoader } from 'react-spinners';
import PropagateLoader from "react-spinners/PropagateLoader"


function Loader() {
  return (
    <div className="bg-gradient-to-t from-gray-700 via-gray-900 to-black min-h-screen flex flex-col items-center justify-center text-center">
      <div className="flex items-center space-y-2 mb-10">
        <h1 className="text-7xl md:text-10xl lg:text-10xl text-transparent bg-gradient-to-r from-red-500 to-purple-400 bg-clip-text font-bold tracking-[6px]"> Loading Lotto256</h1>
      </div>
      <CircleLoader className="items-center justify-center py-6" color="white" size={80} />
    </div>
  );
}

export default Loader