"use client"
import React from 'react'

function Footer() {
  const productList=["Market","ERC20 TOKEN","Donation"];

  const contactList=["support@cryptoking.com","info@example.com","Contact Us"];

  const usefulLink=["Home","About Us","Company","Bio"]
  return (
    <div className='text-center text-white backgroundMain lg:text-left'>
      <div className='mx-6 py-10 tet-center md:text-left'>
        <div className='grid-1 grid gap-8 md:grid-cols-2 lg:grid-cols-4'>
          <div className=''>
            <h6 className='mb-4 flex items-center justify-center font-semibold uppercase md:justify-start'>
              Crypto exchange
            </h6>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque, fugit quisquam ex suscipit vero perspiciatis animi sint molestiae sapiente asperiores reprehenderit esse, adipisci a quibusdam.
            </p>
          </div>
          <div className=''>
            <h6 className='mb-4 flex justify-center font-semibold uppercase md:justify-start'>
              Products
            </h6>
            {productList.map((item,index)=>(
              <p key={index+1} className='mb-4 text-white'>
                <a href='/'>{item}</a>
              </p>
              ))}
          </div>
          <div className=''>
            <h6 className='mb-4 flex justify-center font-semibold uppercase md:justify-start'>
              Useful Link
            </h6>
            {
              usefulLink.map((item,index)=>(
                <p key={index+1} className='mb-4 text-white'>
                  <a href='/'>{item}</a>
                </p>
                ))}
          </div>
          <div className=''>
            <h6 className='mb-4 flex justify-center font-semibold uppercase md:justify-start'>
              Contact
            </h6>
            {
              contactList.map((item,index)=>(
                <p key={index+1} className='mb-4 text-white'>
                  <a href='/'>{item}</a>
                </p>
            ))}
          </div>
        </div>
      </div>
      <div className='backgroundMain p-6 text-center'>
        <span> @2024 copyright:</span>
        <a className='font-semibold' href="https://tailwind-elements.com/"> Crypto Exchange</a>
      </div>
    </div>
  )
}

export default Footer
