import React from 'react'

export default function Consultation() {
  return (
    <div className='py-20 w-full px-20 flex space-x-28 justify-center'>
          <img 
            src='/assets/conso1.png'
            className='w-96'
          />
          <div className='flex flex-col space-y-6'>
             <h5 className='text-5xl poppins-bold leading-[1.6]'>Need Assistance?<br></br> We’re Here to Help!</h5>
             <p className='w-[60%] text-lg leading-[1.7]'>We’re here to support you! Reach out anytime for quick assistance or answers to your questions. Your success is our priority—let us make things easier for you.</p>

          </div>

    </div>
  )
}
