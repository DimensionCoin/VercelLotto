import React from 'react'

interface Props {
    title: string;
    isActive?: boolean;
    onClick?: () => void;
}

function NavButton({title, isActive, onClick}: Props) {
  return (
    <button 
    onClick={onClick}
    className={'${isActive && "bg-[#4A707A]" } hover:bg-gradient-to-tr from-indigo-400 via-black to-red-500 text-white py-2 px-4 rounded font-bold'}>
        {title}
    </button>
  
  )
}

export default NavButton;