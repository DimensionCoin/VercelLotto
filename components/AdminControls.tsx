import React from 'react'
import {StarIcon, CurrencyDollarIcon, ArrowPathIcon, ArrowUturnDownIcon} from "@heroicons/react/24/solid"
import { useContract, useContractRead, useContractWrite } from '@thirdweb-dev/react'
import { ethers } from 'ethers';
import { currency } from '../constants';
import toast from 'react-hot-toast';


function AdminControls() {
    const {contract} = useContract(
        process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS
    );

    const {data: totalCommission} = useContractRead(
        contract,
        "operatorTotalCommission"
    );

    const {mutateAsync: DrawWinnerTicket}= useContractWrite(
        contract,
        "DrawWinnerTicket"
    );

    const {mutateAsync: WithdrawCommission} = useContractWrite(
        contract,
        "WithdrawCommission"
    );

    const {mutateAsync: RefundAll} = useContractWrite(
        contract,
        "RefundAll"
    );
    const { mutateAsync: restartDraw } = useContractWrite(
        contract, 
        "restartDraw"
    );


    const drawWinner=async () => {
        const notification = toast.loading("Picking The Winner...");

        try{
            const data = await DrawWinnerTicket([{}]);

            toast.success("A winner has been selected", {
                id:notification,
            });
            console.info("contract call success", data);
        } catch (err) {
            toast.error("Whoops somthing went wrong", {
                id:notification,
            });
            console.error("contract call failure")
        }
    };

    const onWithdrawCommision=async () => {
        const notification = toast.loading("Withdrawing Commission");

        try{
            const data = await WithdrawCommission([{}]);

            toast.success("Commission Withdrawled", {
                id:notification,
            });
            console.info("contract call success", data);
        } catch (err) {
            toast.error("Whoops somthing went wrong", {
                id:notification,
            });
            console.error("contract call failure")
        }
    };

    const onRestartDraw=async () => {
        const notification = toast.loading("Restarting The Draw...");

        try{
            const data = await restartDraw([{}]);

            toast.success("Draw restarted", {
                id:notification,
            });
            console.info("contract call success", data);
        } catch (err) {
            toast.error("Whoops somthing went wrong", {
                id:notification,
            });
            console.error("contract call failure")
        }
    };

    const onRefundAll=async () => {
        const notification = toast.loading("Refunding Ticket Holders");

        try{
            const data = await RefundAll([{}]);

            toast.success("A refund was issued", {
                id:notification,
            });
            console.info("contract call success", data);
        } catch (err) {
            toast.error("Whoops somthing went wrong", {
                id:notification,
            });
            console.error("contract call failure")
        }
    };



  return (
    <div className='bg-gradient-to-tr from-indigo-400 via-purple-500 black text-white text-center px-5 py-3 rounded-md border-purple-500 border-2 shadow-xl shadow-purple-300'>
        <h2 className='font-bold text-black'>Admin Controls!</h2>
        <p className='mb-5 text-black'>Total commission to be withdrawn:{" "}
            {totalCommission &&
            ethers.utils.formatEther(totalCommission?.toString())}{" "}
            {currency}
        </p>

        <div className='flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2'>
            <button onClick={drawWinner} className='admin-button text-black'>
                <StarIcon className='h-6 mx-auto md-2'/>
                Draw Winner
            </button>
            <button onClick={onWithdrawCommision} className='admin-button text-black'>
                < CurrencyDollarIcon className='h-6 mx-auto mb-2'/>
                Withdraw Commission 
            </button>
            <button onClick={onRestartDraw} className='admin-button text-black'>
                <ArrowPathIcon className='h-6 mx-auto mb-2'/>
                Restart Draw
            </button>
            <button onClick={onRefundAll} className='admin-button text-black'>
                <ArrowUturnDownIcon className='h-6 mx-auto mb-2' />
                Refund All
            </button>
        </div>
    </div>
  )
}

export default AdminControls