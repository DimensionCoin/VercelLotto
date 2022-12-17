import Head from "next/head";
import EthHead from "../components/EthHead";
import Link from "next/link";
import Login from "../components/Login";
import {useAddress} from "@thirdweb-dev/react"
import Image from "next/image";

const Stake = () => {
  const address = useAddress();
  
  if (!address) 
  return (<Login />)
  
  return (
    <div className="bg-gradient-to-t from-gray-700 via-gray-900 to-black min-h-screen flex flex-col">
      <Head >
        <title> Lotto256</title>
      </Head>

      <div className="flex-1">
        <EthHead />
        <div className='hidden md:flex md:flex-1 md:col-span-2 lg:flex lg:flex-1 lg:col-span-3 justify-center lg:space-x-4 mb-8'>
            <div className=' flex bg-gradient-to-b from-gray-700 via-gray-900 to-black p-2 md:rounded-lg border-white border-2'>
            <button className="text-white px-7 py-1 text-large font-bold hover:bg-red-400 rounded-lg">
              Sawp
            </button> 
            <button className="text-white px-7 py-1 text-large font-bold hover:bg-red-400 rounded-lg">
              Pool
            </button>
          </div>
        </div>
        <div className="">
          <div className=""></div>
        </div>
        <div className="space-y-5 md:space-y-0 m-5 md:flex md:flex-row  justify-center md:space-x-5 max-w-auto">
          <div className="bg-gradient-to-b from-gray-900 to-gray-600 bg-gradient-to-r rounded-lg max-w-4 max-h-auto shadow-lg shadow-red-400">
            <h1 className="text-transparent bg-gradient-to-r from-red-300 to-red-500 bg-clip-text text-5xl text-center font-semibold px-6 py-10">
              Lotto Swap coming soon!
            </h1>
          </div>
        </div>
        <div className="m-10 md:flex md:flex-row text-center items-center justify-center">
          <button className="bg-gradient-to-tr from-red-300 to-red-500 rounded-lg px-2 py-5 max-w-auto">
            <Link className="text-black px-2 mx-2 text-sm flex text-white rounded-lg py-1 px-2 hover:bg-black/30 max-w-auto" href={"./"}>Back to Lotto265</Link>
          </button>
        </div>
        <div className="flex-1 m-10 md:flex md:flex-row text-center items-center justify-center">
          <button className="bg-gradient-to-tr from-red-300 to-red-500 rounded-lg px-2 py-5 max-w-auto ">
          <Link className="flex text-sm text-black px-2 mx-2 text-white rounded-lg py-1 px-2 hover:bg-black/30 max-w-auto" href={"./Matic"}>Back to Matic raffle</Link>
          </button>
          </div>
      </div>

      <footer className="border-2 border-red-500/20 items-center text-white justify-between p-5">
        <p className="text-xl text-transparent bg-gradient-to-r from-orange-300 to-red-400 bg-clip-text pl-5 text-center flex-1">
        Hello User: {address?.substring(0,5)}...{address?.substring(address.length - 5)}. </p>
        <p className="text-sm text-transparent bg-gradient-to-r from-red-300 to-red-500 bg-clip-text pl-5 text-center flex-1">Lotto256 is intended for entertainment purposes only. By participating in this lottery, you acknowledge and agree to the following:

The lottery is not affiliated with any government or regulatory agency, and it is not subject to any laws or regulations governing lotteries.
The lottery is a form of gambling, and it does not offer any guarantees of winnings or payouts.
The lottery is operated solely for the purpose of providing entertainment to its users.
The lottery is not responsible for any errors, omissions, or inaccuracies in the information provided or the results of the lottery.
The lottery is not responsible for any loss or damage that may result from your participation in the lottery, including any loss of funds.
The lottery is not responsible for any unauthorized access to your account or personal information.
The lottery is not responsible for any delays, interruptions, or disruptions in the operation of the lottery.
By participating in this lottery, you acknowledge and agree to these terms and conditions, and you release the lottery and its operators from any and all liability arising from your participation in the lottery.
        </p>
        
        <p className="text- text-transparent bg-gradient-to-r from-orange-300 to-red-400 bg-clip-text pl-5 text-center flex-1">DO NOT SPEND MORE THEN YOU ARE ARE WILLING TO LOSE.</p>
        <p className="text- text-transparent bg-gradient-to-r from-orange-300 to-red-400 bg-clip-text pl-5 text-center flex-1">KNOW YOUR LIMIT, STAY WITHIN IT!</p>
      </footer>
    </div>
  );
}

export default Stake;