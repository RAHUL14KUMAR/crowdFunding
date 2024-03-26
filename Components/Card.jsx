"use client"
import React from 'react'

import { useStateValue } from '@/stateProvider';

function Card({setOpenModal,title}) {
  const [{get},dispatch]=useStateValue();
  const card=get;

  const daysLeft=(deadline)=>{
    const diff=new Date(deadline).getTime()-Date.now();
    const remaingDays=diff/(1000*60*60*24);
    return remaingDays.toFixed(0);
  }

  const set=async(e,title,pid)=>{
    e.preventDefault();

    console.log(title,pid);
    setOpenModal(true);
    dispatch({
      type:'SET_DONATE',
      donate:pid
    })

    dispatch({
      type:'SET_TITLE',
      title:title
    })
  }
  return (
    <div className='px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl mdLpx-24 lg:px-8 lg:py-20'>
      <p className='py-16 text-2xl font-bold leading-5'>{title}</p>
      <div className='grid gap-5 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full'>
        {
          card.map((item,i)=>(
            <div
            onClick={(e)=>(set(e,item.title,item.pid))}
            key={i+1}
            className='cursor-pointer border overflow-hidden transition-shadow duration-300 bg-white rounded'
            >

            <div className='py-5 pl-2'>
              <p className='mb-2 text-xs font-semibold text-gray-600 uppercase'>
                Days Left: {daysLeft(item.deadline)}
              </p>
              <a
              href="/"
              aria-label="Article"
              className='inline-block mb-3 text-blck transitions-colors duration-200 hover:text-deep-purple-accent-400'
              >
                <p className='text-2xl font-bold leading-5'>{item.title}</p>
              </a>
              <p className='mb-4 text-gray-700'>{item.description}</p>
              <div className='flex space-x-4'>
                <p className='font-semibold'>
                  Target:{item.target} ETH
                </p>
                <p className='font-semibold'>
                  Raised:{item.raised} ETH
                </p>
              </div>
            </div>

            </div>
          )
        )}
      </div>
    </div>
  )
}

export default Card
