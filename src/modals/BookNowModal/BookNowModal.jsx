import React, { useState } from 'react'
import { default as ModalProvider } from "react-modal";
import { Button, Img, Input, Text } from "components";
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useSelector } from "react-redux";
import axios from 'axios';
import axiosInstance from 'api/axios';


function BookNowModal(props) {
    const [moveInDate, setMoveInDate] = useState(null);
    const { property } = props;
    const userId = useSelector(state => state.auth.userId)


    const handleBookNow = async () => {
      try {
        const roomDetails = {
          room_id: property.id,
          tenant_id: userId,
          no_of_rooms: 1,
          move_in_date: moveInDate
        }
        console.log(roomDetails)
        const response = await axiosInstance.post('/api/book/', roomDetails);
      
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
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        }else{
          console.log(`Error: ${error.message}`)
      }}
    } 

  return (
    <ModalProvider
    appElement={document.getElementById("root")}
    className="m-auto !w-[312px]"
    overlayClassName="bg-gray-900_cc fixed flex h-full inset-y-[0] w-full"
    {...props}
  >
    <div className="sm:h-auto md:h-auto sm:w-full md:w-full  max-h-screen">
      <div className="bg-white-A700 border border-bluegray-100 border-solid w-full rounded-md">
        <div className="flex flex-row gap-2 items-center justify-start w-full p-5 bg-gray-50">
          <Text
            className="flex-1 text-2xl sm:text-[32px] md:text-[34px] text-gray-900 tracking-[-0.72px] w-auto"
            size="txtManropeExtraBold36"
          >
            Book My Home
          </Text>
          <Img
            className="common-pointer h-[28px] w-[28px]"
            src="images/img_close_gray_900.svg"
            alt="close"
            onClick={props.onRequestClose}
          />
        </div>
        <div className="sm:h-auto md:h-full  sm:w-full md:w-full  max-h-[76vh] overflow-y-auto">
          <div className="bg-white-A700 flex flex-col items-start justify-start  rounded-[5px] w-full">
            <div className="flex flex-col gap-0 items-center justify-center w-full md:px-5 px-7 py-0 ">
              <div className="flex flex-col gap-0 items-start justify-start w-full "> 

              <Text className='font-manrope font-medium pt-10'>When do you want to move in?</Text>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker', 'DatePicker']}>
                  <DatePicker
                    value={moveInDate}
                    onChange={(newValue) => setMoveInDate(newValue)}
                  />
                </DemoContainer>
              </LocalizationProvider>

              <Text className='font-manrope text-sm pb-9 pt-2'>Your rent will start from this date</Text>
            
            </div>
          </div>
        </div>
          </div>
              <div className="p-1">
                  <Button className="bg-gray-900 cursor-pointer font-semibold py-[17px] rounded-[5px] text-base text-center text-white-A700 w-full"
                    onClick={handleBookNow}>
                      Proceed to payment
                  </Button>
              </div>
          </div>
    </div>
  </ModalProvider>
  )
}

export default BookNowModal
