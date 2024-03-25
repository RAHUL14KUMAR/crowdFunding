"use client"
import React,{useState,useEffect} from 'react'
import { useStateValue } from '@/stateProvider'
import { Logo,Menu } from './index'

function Navbar() {
    const [{accounts},dispatch]=useStateValue();
    const [isMenuOpen,setIsMenuOpen]=useState(false)

    const connect=async(e)=>{
        e.preventDefault();
    }

    const menuList=["white paper","Project","Donations","Members"]
  return (
    <div className='backgroundMain'>
      <div className='px-4 py-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8'>
        <div className='relative flex items-center justify-between'>
            <div className='flex items-center'>
                <a href="/" aria-label="company" title="compnay" className='inline-flex items-center mr-8'>
                    <Logo color='text-white'/>
                    <span className='ml-2 text-xl font-bold tracking-wide text-white uppercase'>Company</span>
                </a>
                <ul className='flex items-center hidden space-x-8 lg:flex'>
                    {
                        menuList.map((item,index)=>(
                            <li key={index+1}>
                                <a href="/" className='font-semibold tracking-wide text-white transition-colors duration-200 hover:text-teal-accent-400'>{item}</a>
                            </li>
                        ))
                    }
                </ul>
            </div>
            {
                accounts=='' && (
                    <ul className=' flex items-center hidden space-x-8 lg:flex'>
                        <li>
                            <button
                            className='inline-flex items-center justify-center h-12 px-6 font-semibold tracking-wide text-white transition duration-200 bg-teal-accent-400 rounded shadow-md hover:bg-violet-700 focus:shadow-outline focus:outline-none'
                            onClick={(e)=>connect(e)}> Connect Wallet</button>
                        </li>
                    </ul>
                )
            }
            <div className='lg:hidden z-40'>
                <button 
                aria-label="open menu"
                title="Open Menu"
                className='p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline'
                onClick={()=>setIsMenuOpen(!isMenuOpen)}>
                    <Menu/>
                </button>
                {isMenuOpen && (
                    <div className='absolute top-0 left-0 w-full'>
                        <div className='p-5 bg-white border rounded shadow-sm'>
                            <div className='flex items-center justify-between mb-4'>
                                <div>
                                    <a href="/" aria-label="company" title="company" className='inline-flex items-center'>
                                        <Logo color='text-teal-accent-400'/>
                                        <span className='ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase'>Company</span>
                                    </a>
                                </div>
                                <div>
                                    <button
                                    aria-label="close menu"
                                    title="close menu"
                                    className='p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:outline-none focus:shadow-outline'
                                    onClick={()=>setIsMenuOpen(!isMenuOpen)}
                                    >
                                        <svg className='w-5 text-gray-600' viewBox='0 0 24 24'>
                                            <path
                                            fill="currentColor" 
                                            d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <nav>
                                <ul className='space-y-4'>
                                    {
                                        menuList.map((item,index)=>(
                                            <li key={index+1}>
                                                <a href="/" className='font-semibold tracking-wide text-gray-800 transition-colors duration-200 hover:text-teal-accent-400'>{item}</a>
                                            </li>
                                        ))
                                    }
                                    <li>
                                        <button
                                        className='inline-flex items-center justify-center w-full h-12 px-6 font-semibold tracking-wide text-white transition duration-200 bg-black rounded shadow-md hover:bg-violet-700 focus:shadow-outline focus:outline-none'
                                        onClick={(e)=>connect(e)}> Connect Wallet</button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
