import React from 'react'
import { useDisconnect } from '@thirdweb-dev/react';
import { useState } from 'react';
import {HiOutlineXCircle} from 'react-icons/hi'


function Modal() {
    const [showModal, setShowModal] = useState(true);
    const disconnect = useDisconnect();

    const handleClose = () => {
        setShowModal(false);
    };

    return (
        <div>
            {showModal && (
            <div className="bg-black/90 fixed inset-0 z-50 items-center justify-center flex">
            <div className="stats-container">
            <div className="stats-container1 justify-center text-center">
                <div className='flex fixed'>
                <div className='px-10 mx-10'></div>
                <div className='px-10 mx-10'></div>
                <div className='px-10 mx-5'></div>
                <div className='px-10 mx-4'></div>
                <HiOutlineXCircle className='text-white hover:bg-purple-400 rounded-3xl' onClick={disconnect}/>
                </div>
                <h1 className="mt-5 mb-5 text-3xl text-white text-center">Confirm that you are 18 years of age or older</h1>
                <button className="flex-1 mx-2 bg-purple-400 rounded-lg py-1 px-2 hover:bg-purple-300"
                onClick={handleClose} >Yes!</button>
                <button className="flex-1 bg-purple-400 rounded-lg py-1 px-3 hover:bg-purple-300" onClick={disconnect}>No</button>
            </div>
            </div>
            </div>
            
            )}
        </div>
    )
    }

export default Modal;


