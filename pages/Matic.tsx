import Head from "next/head";
import Header from "../components/Header";
import Login from "../components/Login";
import {useContract, useAddress, useContractRead, useContractWrite, useDisconnect} from '@thirdweb-dev/react'
import Loader from "../components/Loader";
import { useEffect, useState } from "react";
import {ethers} from "ethers";
import { currency } from "../constants";
import CountdownTimer from "../components/CountdownTimer";
import toast from "react-hot-toast"
import Marquee from "react-fast-marquee";
import AdminControls from "../components/AdminControls";
import Link from "next/link";
import Modal from "../components/Modal";





const Matic = () => {
  const address = useAddress();
  const [userTickets, setUserTickets] = useState(0);
  const [count,setCount] = useState <number>(1);
  const {contract,isLoading}= useContract(process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS);
  const [isDisabled, setIsDisabled] = useState(false);
  
  const {data: expiration} = useContractRead(
    contract,
    "expiration"
  );
  
  const { data: remainingTickets } = useContractRead(
    contract,
    "RemainingTickets"
  );
  const {data: currentWinningReward } = useContractRead(
    contract,
    "CurrentWinningReward"
  );
  const {data: ticketPrice} = useContractRead(
    contract,
    "ticketPrice"
  );
  const {data: ticketCommission} = useContractRead(
    contract,
    "ticketCommission"
  );
  const {data: tickets} = useContractRead(
    contract, 
    "getTickets"
  );
  const { mutateAsync: BuyTickets} = useContractWrite(
    contract,
    "BuyTickets"
  );
  const {data: winnings} = useContractRead(
    contract,
    "getWinningsForAddress", address
  );
  const {mutateAsync: WithdrawWinnings}= useContractWrite(
    contract,
    "WithdrawWinnings"
  );
  const {data: lastWinner} = useContractRead(
    contract,
    "lastWinner"
  );
  const {data: lastWinnerAmount} = useContractRead(
    contract,
    "lastWinnerAmount"
  );  
  const {data: isLotteryOperator} = useContractRead(
    contract,
    "lotteryOperator"
  );

  useEffect(() => {
    if (!tickets) return;

    const totalTickets: string[] = tickets;

    const noOfUserTickets = totalTickets.reduce((total, ticketAddress) =>
    (ticketAddress === address ? total + 1: total),
     0
     );
     setUserTickets(noOfUserTickets);
  }, [tickets, address]
  );

  const handleClick = async () => {
    setIsDisabled(true);
    setTimeout(() => setIsDisabled(false), 25500);
    if (!ticketPrice) return;

    const notification = toast.loading("Processing transaction");

    try {

      const data = await BuyTickets([
        {
          value: ethers.utils.parseEther(
            (
            Number(ethers.utils.formatEther(ticketPrice)) * count
            ).toString()
          ),
        },
      ]);


      toast.success("Tickets purchased successfully!", {
        id:notification,
      });
      console.info("contract call successfull", data);

    } catch(err) {
      toast.error("whoops something went wrong!",{
        id: notification,
      });
      console.error("contract call failure", err);
    }
  };

  const onWithdrawWinnings = async () => {
    const notification = toast.loading("withdrawing winnings...");

    try {
      const data = await WithdrawWinnings([{}]);

      toast.success("Winnings withdrawn successfully!", {
        id:notification
      })
    } catch(err) {
      toast.error("Whoops somthing went wrong!", {
        id:notification
      });
    }
  };

  if (isLoading) 
    return <Loader />
  
  if (!address) 
    return <Login />

  return (
    <div className="bg-gradient-to-t from-black via-purple-900 to-black min-h-screen flex flex-col">

      <Head >
        <title> Lotto256</title>
      </Head>

      <div className="flex-1">
        <Modal/>
        <Header />

            <Marquee className="p-4 mb-5" gradient={false} speed={25}>
              <div className="flex space-x-2 mx-10">
               <h4 className="text-indigo-300 font-bold animate-pulse"> Last winner:  {lastWinner?.toString()} {"  "}</h4>
               <h4 className="text-purple-200 font-bold animate-pulse"> {"  "}Previous winning: {" "}
                {lastWinnerAmount &&
                ethers.utils.formatEther(lastWinnerAmount?.toString())}
                {" "}
                {currency}
              </h4>
             </div>
            </Marquee>

        {isLotteryOperator === address && (
          <div className="flex justify-center py-2">
            <AdminControls />
          </div>
        )}
        
        {winnings > 0 && (
          <div className="flex-1 mb-10 p-4 px-10">
          <div className=" sm:px-2 md:px-20 lg:px-20">
          <div className="max-w-md md:max-w-2xl lg:max-w-4xl mx-auto mt-5 rounded-xl shadow-xl shadow-purple-400">
            <button onClick={onWithdrawWinnings} className="p-5 bg-gradient-to-tr from-indigo-400 via-purple-400 to-black text-center rounded-xl w-full border-2 border-purple-500">
              <p className="font-bold animate-bounce text-xl text-black">WINNER!</p>
              <p className="italic text-lg font-bold text-black">Total winnings: {ethers.utils.formatEther(winnings.toString())}{""} {currency}</p>
              <p className="italic text-sm font-semibold underline text-black"> *Total pool minus commission*
              </p>
              <br />
              <p className="font-semibold text-lg text-black"> Click HERE to withdraw winnings </p>
            </button>
          </div>
          </div>
          </div>
        )}

          {/*the next draw box*/}
          <div className="space-y-5 md:space-y-0 m-5 md:flex md:items-start justify-center md:space-x-5">
            <div className="stats-container">
              <h1 className="text-5xl text-transparent bg-gradient-to-r from-indigo-300 to-purple-400 bg-clip-text font-bold text-center">Matic Lottery</h1>
            <div className="flex justify-between p-3 space-x-6 max-w-auto">
              <div className="stats">
                <h2 className="text-sm text-black text-center "> Total Pool</h2>
                <p className="text-xl text-black text-center ">
                  {currentWinningReward && ethers.utils.formatEther 
                  (currentWinningReward.toString())} {" "}
                  {currency}
                  </p>
                </div>
                <div className="stats">
                  <h2 className="text-sm text-black text-center "> Tickets remaining </h2>
                  <p className="text-xl text-black text-center "> {remainingTickets?.toNumber()} </p>
                </div>
              </div>

              {/*countdowntimer*/}
              <div className="mt-5 mb-3">
                <CountdownTimer />

              </div>
            </div>
          
            <div className="stats-container space-y-2">
                <div className="stats-container1">
                  <div className="flex justify-between items-center text-white pb-2">
                    <h2 className="text-white text-lg font-bold">Price Per Ticket</h2>
                    <p className="text-sm text-white font-bold">
                      {ticketPrice && ethers.utils.formatEther(ticketPrice?.toString())} {" "}
                      {currency}
                      </p>
                </div>

                <div className="flex text-black items-center space-x-2 bg-gradient-to-r from-indigo-300 to-purple-400 border-black border p-4">
                  <p>TICKETS</p>
                  <input className="flex w-full bg-transparent text-right outline-none" 
                    type="number" 
                    min={1} 
                    max={10}
                    value={count} 
                    onChange={(e) => setCount (Number (e.target.value))
                    }
                  />
                  
                </div>

                <div className="space-y-2 mt-5">
                  <div className="flex items-center justify-between text-white text-sm italic font-extrabold">
                    <p>total cost of tickets</p>
                    <p> 
                      {ticketPrice &&
                        Number(
                          ethers.utils.formatEther(ticketPrice?.toString())
                        ) * count} {" "}
                        {currency}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-white text-xs italic">
                    <p>Commission fees</p>
                    <p>
                    {ticketCommission && ethers.utils.formatEther(ticketCommission?.toString())} {" "}
                      {currency}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-white text-xs italic">
                    <p>+ Network fees</p>
                    <p>TBC</p>
                  </div>
              </div>
              <button 
              disabled={
                expiration < Date.now().toString() ||
                remainingTickets?.toNumber() == 0 ||
                userTickets >= 10 || 
                count >= 11 || 
                userTickets + count >= 11 ||
                isDisabled || 
                count <= 0}  
              onClick= {handleClick}
              className="mt-5 w-full bg-purple-400/90 hover:bg-gradient-to-r from-purple-500 to-red-600
              px-10 py-5 rounded-md  font-semibold text-black text-sm shadow-xl disabled:from-gray-600 
              disabled:text-white disabled:bg-gray-600 disabled:cursor-not-allowed">
                Buy {count} tickets for {" "}
                {ticketPrice && Number(ethers.utils.formatEther(ticketPrice.toString())) * count} {" "}
                {currency}
              </button>
              <p className="text-white text-center text-sm mt-3 italic"> *Max 10 tickets*</p>
              <p className="text-white text-center text-xs mt-1 italic"> *No refunds after transaction processed*</p>
            </div>

            {userTickets > 0 && (
              <div className="stats items-center justify-center">
                <p className="text-lg md-2 text-center text-black"> You have {userTickets} Tickets in this pool</p>

                <div className="flex max-w-sm flex-wrap gap-x-4 gap-y-3 ">
                  {Array(userTickets)
                  .fill("")
                  .map((_, index) => (
                    <p key={index}  
                    className='text-white font-bold h-20 w-10 bg-black/80 rounded-lg flex flex-shrink-0 items-center justify-center text-xs italic'> {index + 1}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="py-4">
        <div className="px-4">
          <div className="md:hidden lg:hidden stats-container">
            <h1 className="text-xl text-center justify-center font-bold text-white">Back to the Home page.</h1>
            <div className="flex space-y-1 md:space-y-1 m-5 md:flex md:flex-row items-center justify-center md:space-x-5 max-w-auto ">
              <button className="bg-gradient-to-tr from-purple-400 to-red-500 rounded-lg px-3 py-3 max-w-auto">
                <Link className="text-black text-2xl font-bold" href={"./"}>Lotto256</Link>
              </button>
            </div>
          </div>
        </div>
        </div>
        <div className="py-4">
        <div className="px-4">
          <div className="md:hidden lg:hidden stats-container">
            <h1 className="text-xl text-center justify-center font-bold text-white"> Maybe Buy some Lotto256 token and play in the fast pace Lotto256 Raffle</h1>
            <div className="flex space-y-1 md:space-y-1 m-5 md:flex md:flex-row items-center justify-center md:space-x-5 max-w-auto ">
              <button className="bg-gradient-to-tr from-purple-400 to-red-500 rounded-lg px-3 py-3 max-w-auto">
                <Link className="text-black text-2xl font-bold" href={"./Swap"}>Lotto Swap</Link>
              </button>
            </div>
            <h1 className="text-white text-center text-sm italic font-semibold mt-4 mb-4">*Visit the page to track progress!*</h1>
          </div>
        </div>
        </div>
        <div className="py-4 ">
          <div className="px-4">
            <div className="md:hidden lg:hidden stats-container">
              <h1 className="text-xl text-center justify-center font-bold text-white">After purchasing Lotto256 token you can participate in the Lotto256 Raffle</h1>
                <div className="flex space-y-1 md:space-y-1 m-5 md:flex md:flex-row items-center justify-center md:space-x-5 max-w-auto ">
                  <button className="bg-gradient-to-tr from-red-300 to-red-500 rounded-lg px-3 py-3 max-w-auto">
                    <Link className="text-black text-2xl font-bold" href={"./Lotto"}> Lotto Raffle </Link>
                  </button>
                </div>
              <h1 className="text-white text-center text-sm italic font-semibold mt-4 mb-4">*Visit the page to track progress!*</h1>
            </div>
          </div>
        </div>
      </div>

      <footer className="border-2 border-purple-500/20 items-center text-white justify-between p-5">
        <p className="text-xl text-transparent bg-gradient-to-r from-indigo-300 to-purple-400 bg-clip-text pl-5 text-center flex-1">
        Hello User: {address?.substring(0,5)}...{address?.substring(address.length - 5)}. </p>
        <p className="text-sm text-transparent bg-gradient-to-r from-indigo-300 to-purple-400 bg-clip-text pl-5 text-center flex-1">Lotto256 is intended for entertainment purposes only. By participating in this lottery, you acknowledge and agree to the following:

The lottery is not affiliated with any government or regulatory agency, and it is not subject to any laws or regulations governing lotteries.
The lottery is a form of gambling, and it does not offer any guarantees of winnings or payouts.
The lottery is operated solely for the purpose of providing entertainment to its users.
The lottery is not responsible for any errors, omissions, or inaccuracies in the information provided or the results of the lottery.
The lottery is not responsible for any loss or damage that may result from your participation in the lottery, including any loss of funds.
The lottery is not responsible for any unauthorized access to your account or personal information.
The lottery is not responsible for any delays, interruptions, or disruptions in the operation of the lottery.
By participating in this lottery, you acknowledge and agree to these terms and conditions, and you release the lottery and its operators from any and all liability arising from your participation in the lottery.
        </p>
        
        <p className="text- text-transparent bg-gradient-to-r from-indigo-300 to-purple-400 bg-clip-text pl-5 text-center flex-1">DO NOT SPEND MORE THEN YOU ARE ARE WILLING TO LOSE.</p>
        <p className="text- text-transparent bg-gradient-to-r from-indigo-300 to-purple-400 bg-clip-text pl-5 text-center flex-1">KNOW YOUR LIMIT, STAY WITHIN IT!</p>
      </footer>
    </div>
  );
};

export default Matic;