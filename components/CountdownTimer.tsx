import React from 'react'
import { useContract,useContractRead} from "@thirdweb-dev/react"
import Countdown from "react-countdown";
import { render } from 'react-dom';

type Props ={
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
};


function CountdownTimer() {
  const {contract} = useContract(
    process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS
  );
  const {data: expiration, isLoading: isLoadingExpiration} = useContractRead(
    contract,
    "expiration"
  );
  const renderer = ({days, hours, minutes, seconds, completed}: Props) => {
    if (completed) {
      return(
      <div>
        <h2 className='text-white text-xl text-center italic animate-bounce'>
          Tickets are sold out! Sorry!
          </h2>
          <div className='flex space-x-6'>

        <div className='flex-1 '>
          <div className='countdown animate-pulse'>{days}</div>
          <div className='countdown-label'>days</div>
        </div>
        
        <div className='flex-1 '>
          <div className='countdown animate-pulse'>{hours}</div>
          <div className='countdown-label'>hours</div>
        </div>

        <div className='flex-1 text-white text-sm'>
          <div className='countdown animate-pulse'>{minutes}</div>
          <div className='countdown-label'>minutes</div>
        </div>

        <div className='flex-1 text-white text-sm'>
          <div className='countdown animate-pulse'>{seconds}</div>
          <div className='countdown-label'>seconds</div>
        </div>

        </div>
      </div>
    )}
    else {
      return(
      <div className='px-2'>
        <h3 className='text-white text- mb-2 text-center italic'>Time Remaining</h3>
        <div className='flex space-x-auto'>

        <div className='flex-1 px-2'>
          <div className='countdown'>{days}</div>
          <div className='countdown-label'>days</div>
        </div>

        <div className='flex-1 px-2'>
          <div className='countdown'>{hours}</div>
          <div className='countdown-label'>hours</div>
        </div>

        <div className='flex-1 px-2'>
          <div className='countdown'>{minutes}</div>
          <div className='countdown-label'>minutes</div>
        </div>

        <div className='flex-1 px-2'>
          <div className='countdown'>{seconds}</div>
          <div className='countdown-label'>seconds</div>
          </div>
        </div>
      </div>
    )}
  };

  return (
    <div>
      <Countdown date={new Date(expiration * 1000)} renderer={renderer}/>
    </div>
  );
}

export default CountdownTimer;