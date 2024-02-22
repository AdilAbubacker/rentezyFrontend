import axiosInstance from 'api/axios'
import axios from 'axios'
import { Button, Img, Text } from 'components'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function MyApartments() {
    const [myApartments, setMyApartments] = useState([])
    const navigate = useNavigate()
    const userId = useSelector(state => state.auth.userId)

    const today = new Date();
  
    useEffect(() => {
      const fetchMyApartments = async () => {
        try {
          const response = await axiosInstance.get(`/api/rented_properties`)
          setMyApartments(response.data)
          console.log(response.data)
        } catch (error) {
          console.error('error while fetching bookings:', error)
        }
      }
      fetchMyApartments();
    }, [])

    function getDaystoToday(targetDate) {
        // Assuming targetDate is a string representation of a date, e.g., "2022-01-17"
        const targetDateTime = new Date(targetDate).getTime();
        const today = new Date().getTime();
      
        const timeDifference = targetDateTime - today;
        const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
      
        return daysDifference;
      }

      const getMonthName = (dateString) => {
        const date = new Date(dateString);
        const monthNames = [
          'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return monthNames[date.getMonth()];
    };

  return (
    <>
        {myApartments.map((myApartment, index) => (
               <div className="pb-7 w-full">
                  <div className="flex flex-col border border-bluegray-100 p-5 gap-[50px] items-start justify-between w-full">

                    <div className="flex flex-row gap-6 items-start justify-start w-full">
                      <Img
                        className="h-[220px] md:h-auto object-cover w-[240px]"
                        src={myApartment.image}
                        alt="rectangle5599"
                      />
                      <div className="flex flex-col gap-[3px] items-start justify-start w-1/3  h-full">
                        <Text
                          className="text-gray-900 text-xl tracking-[-0.40px] w-auto"
                          size="txtManropeSemiBold20Gray900"
                            >
                            {myApartment.property_name}      
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
                            Start Date: 
                            {myApartment.start_date}      
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
                      <div className=''>
                      <div className="flex flex-col gap-7 shadow-lg border rounded-2xl items-between justify-between h-56 w-60 p-4">
                     
                {myApartment.latest_monthly_payment.is_paid ? (
                        <>
                      <div className="flex flex-col gap-[3px] items-start justify-start w-full  h-full">
                        <Text
                          className="text-gray-500 text-base tracking-[-0.40px] w-full"
                          size="txtManropeSemiBold20Gray900"
                            >
                            Your next rent will due in 
 
                            </Text>
                            
                        <div className="flex flex-row gap-1 items-start justify-start w-full">
                          
                          <Text
                            className="text-2xl text-gray-900 font-bold w-auto"
                            // size="txtManropeSemiBold16"
                          >
                             {getDaystoToday(myApartment.latest_monthly_payment.due_date) + 31} days
                          </Text>
                        </div>
                     
                        </div>

                        <div>
                       
                            <div className='pt-2'>
                        <Button className="bg-deep_orange-900 border-solid rounded-full border-gray-900 cursor-pointer font-semibold py-[9px] text-sm text-center text-white-A700 w-full"
                            onClick={() => navigate(`${myApartment.id}`)}
                            >
                            View Payments      
                          </Button>
                          </div>
                          </div>
                          </>
                ) : (
                    <>
                      <div className="flex flex-col gap-[3px] items-start justify-start w-full  h-full">
                        <Text
                          className="text-gray-500 text-sm tracking-[-0.40px] w-full"
                          size="txtManropeSemiBold20Gray900"
                            >
                            Rent for month  {getMonthName(myApartment.latest_monthly_payment.due_date)}      
                            </Text>
                            
                        <div className="flex flex-row gap-1 items-start justify-start w-full">
                          
                          <Text
                            className="text-3xl text-gray-900 font-bold w-auto"
                            // size="txtManropeSemiBold16"
                          >
                             ₹{myApartment.latest_monthly_payment.amount}
                          </Text>
                        </div>
                        <div className="flex flex-row gap-3.5 items-start justify-start w-full">
                          
                          <Text
                            className="text-sm text-gray-900 w-auto"
                            size="txtManropeSemiBold16"
                          >
                             Will be due in {getDaystoToday(myApartment.latest_monthly_payment.due_date)} days
                          </Text>
                        </div>
                        </div>

                        <div>
                          <div>
                        <Button className="bg-white-A700 border-solid rounded-full border border-deep_orange-900 cursor-pointer font-semibold py-[8px] text-sm text-center text-deep_orange-900 w-full"
                            // onClick={() => navigate(`/chat/${property.owner_id}`)}
                            >
                            Pay Rent      
                          </Button>
                          </div>
                            <div className='pt-2'>
                        <Button className="bg-deep_orange-900 border-solid rounded-full border-gray-900 cursor-pointer font-semibold py-[9px] text-sm text-center text-white-A700 w-full"
                            onClick={() => navigate(`${myApartment.id}`)}
                            >
                            View Payments      
                          </Button>
                          </div>
                          </div>
                          </>
          )}
                          
                          {/* <Button className="bg-white-A700 cursor-pointer border border-solid border-slate-900 font-semibold py-[12px] text-base text-center text-gray-900 w-full"
                            onClick={() => navigate(`${myApartment.id}`)}
                            >
                            Details     
                          </Button>
                      {!myApartment.latest_monthly_payment.is_paid &&
                          <Button className="bg-gray-900 border-solid border-gray-900 cursor-pointer font-semibold py-[12px] text-base text-center text-white-A700 w-full"
                            // onClick={() => navigate(`/chat/${property.owner_id}`)}
                            >
                            Pay Now      
                          </Button>
                        } */}
                        </div>
                        </div>
                         
                    </div>
                  </div>
</div>
                  ))} 
                  </>
  )
}

export default MyApartments
