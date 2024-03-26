"use client"
import React, { useState ,useEffect} from 'react'
import { useStateValue } from '@/stateProvider'

function Popup({setOpenModal,donate,donateFunction,getDonations}) {
  const [{id,title},dispatch]=useStateValue();

  const [amount,setAmount]=useState("")
  const [allDonationData,setAllDoantionData]=useState()

  const createDonation=async()=>{
    try{
      const data=await donateFunction(id,amount)
      console.log("donate",data);
      // return data;

    }catch(error){
      console.log(error)
    }
  }

  useEffect(()=>{
    const donationsListData=getDonations();
    return async()=>{
      const data=await donationsListData;
      // console.log("data",data)
      setAllDoantionData(data)
    } 
  },[])
  return (
    <div>
      <div className='justify-center items-center flex overflow-x-hidden overfow-y-auto fixed inset-0 z-50 outline-none focus:outine-none'>
        <div className='relative w-auto my-6 mx-auto max-w-3xl'>
          <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
            <div className='flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t'>
              <h3 className='text-3xl font-semibold'>{title}</h3>
              <button className='p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right tetx-3xl leading-none font-semibod outline-none focus:outline-none'onClick={()=>setOpenModal(false)}>
                <span className='bg-transparent tet-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none'>X</span>
              </button>
            </div>
            <div className='relative p-6 flex-auto'>
              <p className='my-4 text-slate-500 text-lg leading-relaxed'>
                {donate.decription?donate.decription:"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae soluta ipsum autem!"}
              </p>

              <input
              onChange={(e)=>setAmount(e.target.value)}
              type="text" name="amount" placeholder="Enter amount" className='flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outine' id="amount"required />
              {
                allDonationData?.map((item,i)=>(
                  <p className='my-4 text-slate-500 text-lg leading-relaxed'>{i+1}:{item.donation} {""}
                    {item.donator.slice(0,35)}
                  </p>
                )
              )}
            </div>

            <div className='flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b'>
              <button className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-nne mr-1 mb-1 ease-linear transition-all duration-150' type="button"
              onClick={()=>setOpenModal(false)}>Close</button>
              <button className='bg-green-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150' type="button" onClick={()=>createDonation()}>Donate</button>
            </div>
          </div>
        </div>
      </div>
      <div className='opacity-25 fixed inset-0 z-40 bg-black'>
      </div>
    </div>
  )
}

export default Popup
