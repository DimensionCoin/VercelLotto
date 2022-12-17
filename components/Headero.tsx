import React, { useEffect } from 'react'
import {UserCircleIcon} from "@heroicons/react/24/solid";
import {useDisconnect, useAddress, ConnectWallet, useNetwork, useNetworkMismatch, ChainId } from '@thirdweb-dev/react'




function Headero() {

    const address = useAddress();
    const disconnect = useDisconnect();
    const[, switchNetwork] = useNetwork();
    const isWrongNetwork = useNetworkMismatch();

    useEffect(() => {
        if (isWrongNetwork && switchNetwork) {
            setTimeout (() => {
                switchNetwork(ChainId.Mumbai)
            }, 2000)
        }
    }, [address, isWrongNetwork, switchNetwork]);

  return (
    <header className='grid grid-cols-2 md:grid-cols-3 jusitfy-between items-center lg:mx-10'>
        <div className='px-1 py-2 md:px-20'> 
            <ConnectWallet />
        {isWrongNetwork ? (
            ""
        ) : (
            ''
        )}
        </div>  
        <div className=''></div>
        <div className=''>
           <div className='hidden md:flex md:text-center lg:space-x-1 lg:justify-center'>
            <div className='flex-1 mx-10'>
             <p className='text-xl text-transparent bg-gradient-to-r from-indigo-300 to-purple-400 bg-clip-text font-bold '> Lotto256 </p>
             <h1 className='text-lg text-transparent bg-gradient-to-r from-indigo-300 to-purple-400 bg-clip-text'>user: {address?.substring(0,5)}...{address?.substring(address.length, address.length - 5)}</h1>
            </div>
            <div className=''>
                <UserCircleIcon className='h-10 w-10 mx-auto text-gray-500 hover:bg-white rounded-3xl' />
            </div> 
        </div>
        </div>
        
    </header>
  );
}

export default Headero;
