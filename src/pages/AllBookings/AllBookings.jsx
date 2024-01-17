import axios from 'axios'
import { Button, Img, Text } from 'components'
import React, { useEffect, useState } from 'react'

function AllBookings() {
    const [bookings, setBookings] = useState([])
  
    useEffect(() => {
      const fetchBookings = async () => {
        try {
          const response = await axios.get('http://127.0.0.1:8005/api/booking_listings')
          setBookings(response.data)
          console.log(response.data)
        } catch (error) {
          console.error('error while fetching bookings:', error)
        }
      }
      fetchBookings();
    }, [])

  return (
    <>
        {bookings.map((booking, index) => (
               <div className="pb-7 w-full">
                  <div className="flex flex-col border border-bluegray-100 shadow-sm hover:shadow-xl cursor-pointer p-5 gap-[50px] items-start justify-between w-full">

                    <div className="flex flex-row gap-6 items-start justify-start w-full">
                      <Img
                        className="h-[180px] md:h-auto object-cover rounded-[10px] w-[180px]"
                        src={booking.room.image}
                        alt="rectangle5599"
                      />
                      <div className="flex flex-col gap-[3px] items-start justify-start w-1/2  h-full">
                        <Text
                          className="text-gray-900 text-xl tracking-[-0.40px] w-auto"
                          size="txtManropeSemiBold20Gray900"
                        >
                          {booking.room.property_name}
                        </Text>
                        <div className="flex flex-row gap-3.5 items-start justify-start w-full">
                          
                          <Text
                            className="text-base text-gray-900 w-auto"
                            size="txtManropeSemiBold16"
                          >
                            4 review
                          </Text>
                        </div>
                        <div className="flex flex-row gap-2.5 items-center justify-start w-full">
                          <Img
                            className="h-5 w-5"
                            src="images/img_mail_gray_600.svg"
                            alt="mail"
                          />
                          <Text
                            className="text-base text-gray-600 w-auto"
                            size="txtManropeMedium16"
                          >
                            Move in Date: {booking.move_in_date}
                          </Text>
                        </div>
                        <div className="flex flex-row gap-2.5 items-center justify-start w-full">
                          <Img
                            className="h-5 w-5"
                            src="images/img_call.svg"
                            alt="call"
                          />
                          <Text
                            className="text-base text-gray-600 w-auto"
                            size="txtManropeMedium16"
                          >
                            +65 0231 965 965
                          </Text>
                        </div>
                        
                       
                      </div>
                      <div className="flex flex-col gap-2.5 items-end justify-end h-full w-64 pt-28">
                          <Button className="bg-gray-900 cursor-pointer font-semibold py-[12px] rounded-[10px] text-base text-center text-white-A700 w-full"
                            // onClick={() => navigate(`/chat/${property.owner_id}`)}
                            >
                              {booking.status}
                          </Button>
                         
                         
                        </div>
                          {/* <Button className="bg-gray-900 cursor-pointer font-semibold py-[12px] rounded-[10px] text-base text-center text-white-A700 w-full"
                            // onClick={() => navigate(`/chat/${property.owner_id}`)}
                            >
                              Chat
                          </Button> */}
                         
                    </div>
                  </div>
</div>
                  ))} 
                  </>
  )
}

export default AllBookings
