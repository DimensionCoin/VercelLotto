import React, { useEffect } from 'react'
import NavButton from './NavButton';
import {UserCircleIcon} from "@heroicons/react/24/solid";
import {useDisconnect, useAddress, ConnectWallet, useNetwork, useNetworkMismatch, ChainId } from '@thirdweb-dev/react'
import Link from 'next/link';



function Header() {

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
    <header className='grid grid-cols-3 md:grid-cols-5 jusitfy-between items-center p-2'>
        <div className='px-1 py-2 md:px-8'> 
            <ConnectWallet />
        {isWrongNetwork ? (
            ""
        ) : (
            ''
        )}
        </div>  
        <div className='hidden md:flex md:flex-1 md:col-span-4 lg:flex lg:flex-1 lg:col-span-3 justify-center lg:space-x-4'>
            <div className=' flex bg-gradient-to-b from-gray-700 via-gray-900 to-black p-2 md:rounded-lg border-white border-2'>
            <button>
                <Link className='flex-row-2 font-bold text-lg hover:bg-gradient-to-r from-purple-400 to-red-500 text-white py-2 px-4 rounded font-bold' href={"./Swap"}>
                   Swap!
                </Link>
                </button>
                <button className='flex ml-auto text-right'>
                    <Link className='flex-row-2 font-bold text-lg hover:bg-gradient-to-r from-indigo-300 to-purple-400 text-white py-2 px-2 rounded font-bold' href={'./Lotto'}>
                 Lotto256 Raffle
                 </Link>
                </button>
                <button className='flex ml-auto text-right'>
                    <Link className='flex-row-2 font-bold text-lg hover:bg-gradient-to-tr from-purple-400 via-black to-red-500 text-white py-2 px-2 rounded font-bold' href={'./'}>
                 Lotto256
                 </Link>
                </button>
            </div>
            </div>
        
           <div className='hidden lg:flex md:items-center lg:space-x-1 lg:justify-center'>
            <div>
             <p className='text-xl text-transparent bg-gradient-to-r from-indigo-300 to-purple-400 bg-clip-text font-bold'> Lotto256 </p>
             <h1 className='text-lg text-transparent bg-gradient-to-r from-indigo-300 to-purple-400 bg-clip-text truncate'>user: {address?.substring(0,5)}...{address?.substring(address.length, address.length - 5)}</h1>
            </div>
            <div className=''>
                <UserCircleIcon className='h-10 w-10 mx-auto text-gray-500' />
            </div> 
        </div>
        
    </header>
  );
}

export default Header;
