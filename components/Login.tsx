import React from 'react'
import {useWalletConnect,useMetamask,useCoinbaseWallet, ConnectWallet, useConnect } from "@thirdweb-dev/react"
import Image from 'next/image';

function Login() {
    

  return (
    <div className='bg-gradient-to-tr from-purple-600 via-black to-red-500 min-h-screen flex flex-col items-center justify-center text-center'>
        <div className='flex flex-col items-center mb-10'>
            <h1 className='text-7xl md:text-10xl lg:text-10xl text-transparent bg-gradient-to-r from-red-500 to-purple-400 bg-clip-text font-bold tracking-[6px]'> Lotto256 </h1>
            <h2 className='text-white font-bold mt-3'> Connect wallet to buy lottery tickets! </h2>

            <ConnectWallet className='px-8 py-5 mt-10 rounded-lg shadow-lg font-bold'/>
        </div>
        <div className='py-10 px-10'>
          <div className='stats-container px-10 py-10'>
          <h1 className='text-sm text-white'>Please note that if using wallet connect, make sure your connection is set to the Polygon network!</h1>
          </div>
        </div>
    </div>
  )
}

export default Login;