import LandingPageFooter from 'components/LandingPageFooter'
import LandingPageHeader from 'components/LandingPageHeader'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

function UserProperties() {
    const [isBookNowClicked, setIsBookNowClicked] = useState(false)

  return (
    <>
    <div className="bg-gray-51 flex flex-col font-markoone sm:gap-10 md:gap-10 gap-[100px] items-start justify-start mx-auto w-auto sm:w-full md:w-full">
      <div className="flex flex-col md:gap-10 gap-[60px] items-start justify-start w-full">
        <div className="flex flex-col gap-10 items-start justify-start w-full">
          <LandingPageHeader className="bg-white-A700 flex gap-2 h-20 md:h-auto items-center justify-between md:px-5 px-[120px] py-[19px] w-full" />
          <div className="flex flex-col font-manrope items-center justify-center md:px-10 sm:px-5 px-[120px] w-full">
            <div className="flex md:flex-col flex-row gap-6 items-start justify-center max-w-[950px] mx-auto w-full">
              <div className="flex flex-1 flex-col gap-6 items-start justify-start w-full">
                <div className="bg-white-A700 border border-bluegray-100 border-solid flex flex-col items-start justify-start p-10 sm:px-5 w-full">
                  <div  className="flex flex-row justify-evenly w-full items-center pb-10">
                    <NavLink to="" className={`w-full flex justify-center cursor-pointer items-center ${!isBookNowClicked ? 'border-b-2 border-gray-500 text-gray-900' : 'border-b-2 text-gray-500'}`} onClick={() => setIsBookNowClicked(false)}>
                      <div
                        className="sm:text-2xl md:text-[26px] text-[20px] font-bold tracking-[-0.56px] py-4"
                        // size="txtManropeExtraBold28"
                      >
                        My Apartments
                      </div>
                    </NavLink>
                    
                    <NavLink to='all-bookings' className={`w-full flex justify-center cursor-pointer  items-center ${isBookNowClicked ? 'border-b-2 border-gray-500 text-gray-900' : 'border-b-2 text-gray-500'}`} onClick={() => setIsBookNowClicked(true)}>
                      <div
                        className="sm:text-2xl font-manrope md:text-[26px] text-[20px] font-bold tracking-[-0.56px] py-4"
                        size="txtManropeExtraBold28"
                      >
                        All Bookings
                      </div>
                    </NavLink>
                    
                  </div>
                 <Outlet/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <LandingPageFooter className="bg-white-A700 flex gap-2 items-center justify-center md:px-5 px-[120px] py-20 w-full" />
    </div>
  </>
  )
}

export default UserProperties
