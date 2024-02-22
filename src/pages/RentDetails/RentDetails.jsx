import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Button, Img, Text } from 'components'
import axios from 'axios';
import axiosInstance from 'api/axios';

function RentDetails() {
    const [myApartment, setMyApartment] = useState([])
    const [monthlyPayments, setMonthlyPayments] = useState([])
    const { rent_id } = useParams();
    

    useEffect(() => {
      const fetchRentPayments = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:8008/api/rented_properties/${rent_id}`)
          setMyApartment(response.data.rental_agreement)
          setMonthlyPayments(response.data.monthly_payments)
          console.log(response.data.monthly_payments[0].amount)
          console.log(response.data)
        } catch (error) {
          console.error('error while fetching bookings:', error)
        }
      }
      fetchRentPayments();
    }, [])

    const getMonthName = (dateString) => {
        const date = new Date(dateString);
        const monthNames = [
          'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return monthNames[date.getMonth()];
    };


    const handlePayNow = async (id) => {
        try {
          const paymentDetails = {
            monthly_payment_id: id,
          }
          console.log(paymentDetails)
          const response = await axiosInstance.post('/api/pay_monthly_rent', paymentDetails);
          console.log(response)
          // Check if the response contains the checkout_url
          if (response.data.checkout_url) {
            const checkoutUrl = response.data.checkout_url;
            console.log(checkoutUrl);
    
            // Redirect to the checkout URL
            window.location.href = checkoutUrl;
          } else {
            console.error('Error: Checkout URL not found in the response');
          }
    
        } catch (error) {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          }else{
            console.log(`Error: ${error.message}`)
        }}
      } 
  
  return (
    <>
        <div className="pb-7 w-full">
            <div className="flex flex-col border border-bluegray-100 p-5 gap-[50px] items-start justify-between w-full">

            <div className="flex flex-row gap-6 items-start justify-start w-full">
                <Img
                className="h-[180px] md:h-auto object-cover w-[210px]"
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
                    {/* <Img
                    className="h-5 w-5"
                    src="images/img_mail_gray_600.svg"
                    alt="mail"
                    /> */}
                    <Text
                    className="text-base text-gray-600 w-auto"
                    size="txtManropeMedium16"
                    >
                    Start Date: 
                    {myApartment.start_date}      
                    </Text>
                </div>
                <div className="flex flex-row gap-2.5 items-center justify-start w-full">
                    {/* <Img
                    className="h-5 w-5"
                    src="images/img_call.svg"
                    alt="call"
                    /> */}
                    <Text
                    className="text-base text-gray-600 w-auto"
                    size="txtManropeMedium16"
                    >
                    +65 0231 965 965
                    </Text>
                </div>
                
                
                </div>
              
            </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-4 py-3">
              Month
            </th>
            <th scope="col" className="px-4 py-3">
              Due date
            </th>
            <th scope="col" className="px-4 py-3">
              Amount
            </th>
            <th scope="col" className="px-4 py-3">
              Fine
            </th>

            <th scope="col" className="px-4 py-3">
              Payment Date
            </th>
            <th scope="col" className="px-4 py-3">
              Payment
            </th>
            <th scope="col" className="px-4 py-3">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
            {monthlyPayments.map((monthlyPayment, index) => (
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {getMonthName(monthlyPayment.due_date)} {new Date(monthlyPayment.due_date).getFullYear()}
            </th>
            <th scope="row" className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {monthlyPayment.due_date}
            </th>
            <td className="px-4 py-4">
            {monthlyPayment.amount}
            </td>
            <td className="px-4 py-4 text-red-400">
            {monthlyPayment.fine}
            </td>

            <td className="px-4 py-4">
            {monthlyPayment.paid_on}
            </td>
            <td className="px-4 py-4 text-right">
                {monthlyPayment.is_paid ? (
                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Paid</a>
                ) : (
                    <button onClick={() => handlePayNow(monthlyPayment.id)} className="font-medium bg-blue-100 text-green-600 py-2 px-5 dark:text-green-500 hover:underline">
                    Pay Now
                    </button>
                )}           
             </td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
        </div>
        </div>
    </>
  )
}

export default RentDetails
