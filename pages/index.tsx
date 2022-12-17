import type { NextPage } from 'next'
import Head from 'next/head'
import {useContract, useAddress, useContractRead, useContractWrite, useDisconnect} from '@thirdweb-dev/react'
import Login from "../components/Login";
import Loader from "../components/Loader";
import Headero from "../components/Headero";
import Link from 'next/link';




const Home: NextPage = () => {
  const address = useAddress();
  const {contract,isLoading}= useContract(process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS);

  if (isLoading) 
  return <Loader />

if (!address) 
  return <Login />


  return (
    <div className="bg-gradient-to-tr from-purple-600 via-black to-red-900  flex min-h-screen flex-col py-2">
      <Head>
        <title>Lotto256</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <Headero />
        <div className='items-center text-center justify-center md:px-10 md:mx-10 md:m-[100px]'>
          <div className='border-black border mt-8 mx-8 p-1 rounded-3xl bg-gradient-to-r from-indigo-400 to-red-500'>
          <div className='border-black border h-[435px] md:h-[250px] rounded-2xl bg-black items-center justify-center text-center'>
            <h1 className='text-transparent bg-gradient-to-r from-red-500 to-purple-400 bg-clip-text text-3xl px-4 mt-3 mb-7'> Lotto256 </h1>
            <h2 className='text-transparent bg-gradient-to-r from-red-500 to-purple-400 bg-clip-text mt-1 md:mt-5 mx-4 mb-4'> Lotto256 is a type of gambling game where players can purchase tickets through an online website. 
            The cost of each ticket is 1 Matic or 10 Lotto256 tokens, and all of the money from ticket sales is collected into a prize pool.
            At the end of the designated period of time a lucky winner is chosen randomly to receive the prize money from the pool. This is done through a random selection process. 
            The winners wallet address is announced along with the winning amount on the website. There is a guaranteed winner every week!</h2>
            <div className='px-10 mx-9 justify-center'>
            </div>
            </div>
          </div>
          <div className='border-black border mt-8 mx-8 p-1 rounded-3xl bg-gradient-to-r from-indigo-300 to-purple-400 mb-10 max-w-auto'>
          <div className='border-black border h-[290px] md:h-[225px] rounded-2xl bg-black items-center justify-center text-center'>
          <h1 className='text-transparent bg-gradient-to-r from-indigo-300 to-purple-400 bg-clip-text text-3xl text-center md:mt-5 mt-3 lg:mt-8'> Matic Raffle!</h1>
              <p className='text-transparent bg-gradient-to-r from-indigo-300 to-purple-400 bg-clip-text text-center mt-2 md:mt-4 px-4 mx-2'> Play the best Matic lottery in the Web3 space. Each player can buy 1-10 raffle tickets every week with a ticket price of 1 Matic. The money from the tickets will go to a pool which will be awarded to lucky winner at the end of the week</p>
              <button className="bg-gradient-to-r from-indigo-400 to-purple-400 rounded-lg px-4 py-2 max-w-auto mt-2 md:mt-5 lg:mt-7"> 
              <Link className="text-black text-2xl font-bold" href={"./Matic"}> Play! </Link>
              </button>
            </div>
          </div>
          <div className='border-black border mt-8 mx-8 p-1 rounded-3xl bg-gradient-to-r from-red-300 to-red-500 mb-10'>
          <div className='border-black border h-[270px] md:h-[225px] rounded-2xl bg-black items-center justify-center text-center'>
          <h1 className='text-transparent bg-gradient-to-r from-red-300 to-red-500 bg-clip-text text-3xl text-center mt-2 md:mt-5 lg:mt-8 '> Lotto256 Raffle!</h1>
              <p className='text-transparent bg-gradient-to-r from-red-300 to-red-500 bg-clip-text text-center mt-2 md:mt-5 lg:mt-8 px-4 mx-2'> Play the lottery with our native token Lotto256. Each player can buy up to 20 tickets. Winners will be chosen every week to take home the money pooled from the ticket sales!  </p>
              <button className="bg-gradient-to-r from-red-300 to-red-500 rounded-lg px-4 py-2 max-w-auto mt-2 md:mt-4"> 
              <Link className="text-black text-2xl font-bold" href={"./Lotto"}> Play! </Link>
              </button>
            </div>
          </div>
          <div className='border-black border mt-8 mx-8 p-1 rounded-3xl bg-gradient-to-r from-indigo-400 to-red-500 mb-10'>
          <div className='border-black border h-[250px] rounded-2xl bg-black items-center justify-center text-center'>
          <h1 className='text-transparent bg-gradient-to-r from-red-500 to-purple-400 bg-clip-text text-3xl text-center mt-5 '> Lotto Swap!</h1>
              <p className='text-transparent bg-gradient-to-r from-red-500 to-purple-400 bg-clip-text text-center mt-4 px-4 mx-2'> Swap your ERC20 tokens using our native DEX Lotto Swap!</p>
              <button className="bg-gradient-to-r from-indigo-400 to-red-500 rounded-lg px-4 py-2 max-w-auto mt-10"> 
              <Link className="text-black text-2xl font-bold" href={"./Swap"}> Swap! </Link>
              </button>
            </div>
          </div>
        </div>
     </div>
  )
}

export default Home
