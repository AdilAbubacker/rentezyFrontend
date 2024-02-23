import React, { useEffect, useState } from "react";
import { default as ModalProvider } from "react-modal";
import { Button, Img, Text } from "components";
import animation from '../../assets/lottei/animation.json';
import Lottie from 'lottie-react';
import axios from "axios";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import axiosInstance from "api/axios";

function ScheduleVisitModal(props) {
  const [dates, setDates] = useState([]);
  const [times, setTimes] = useState([]);
  const [selectedDate, setSelectedDate] = useState()
  const [selectedTime, setSelectedTime] = useState()
  const [scheduleSuccess, setScheduleSuccess] = useState(false)

  const userId = useSelector(state => state.auth.userId)

  useEffect(() => {
    const fetchDates = async () => {
      try {
        const response = await axiosInstance.get('/api/dates_and_times/65')
        setDates(response.data.dates)
        setTimes(response.data.times)
      } catch (error) {
        console.error('error fetching dates',error)
      }
    };  
    fetchDates(dates);
  }, [])


  const handleScheduleVisit = async () => {
    try {
      const response = await axiosInstance.post('/api/schedule_visit', {
        "room_id":68,
        "tenant_id":userId,
        "selected_time":selectedTime,
        "selected_date":selectedDate
      })
      setScheduleSuccess(true);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }else{
        console.log(`Error: ${error.message}`)
    }
    }
  }

  return (
    <ModalProvider
    appElement={document.getElementById("root")}
    className="m-auto !w-[400px]"
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
            Schedule your visit
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
            <div className="flex flex-col gap-8 items-center justify-center w-full md:px-5 px-7 py-0 ">
              <div className="flex flex-col gap-4 items-start justify-start w-full "> 
         
                <div className="flex flex-col gap-0 items-start justify-start w-full">
                {scheduleSuccess ? (
                  <div>
                  <div className="flex items-center justify-center w-full py-0">
                    <Lottie
                      animationData={animation}
                      loop={true}
                      autoplay={true}
                    />
                  </div>
                  <div className="flex items-center justify-center w-full py-0">
                    <Text
                      className="text-center text-gray-800 font-semibold text-xl tracking-[0px] w-auto"
                      size="txtManropeSemiBold20Gray600"
                    >
                      Visit Scheduled
                    </Text>
                  </div>
                  <div className="flex items-center justify-center w-full py-0">
                      <Text
                        className="text-center text-red-800 text-lg tracking-[0px] w-auto py-5"
                        size="txtManropeSemiBold20Gray600"
                      >
                      {selectedTime} - {`${selectedDate.month} ${selectedDate.day}th, ${selectedDate.weekday}`}
                      </Text>
                    </div>
                  <Link to={'/scheduled-visits'} className="flex items-center justify-center w-full py-0">
                      <Text
                        className="text-center text-blue-500 text-lg tracking-[0px] w-auto pb-5"
                        size="txtManropeSemiBold20Gray600"
                      >
                      View Details
                      </Text>
                    </Link>
                </div>
                
                ) : (
                  <>
                    <div className="flex items-center justify-center w-full py-0">
                      <Lottie
                        animationData={animation}
                        loop={true}
                        autoplay={true}
                      />
                    </div>
                    <div className="flex items-center justify-center w-full py-0">
                      <Text
                        className="text-center text-gray-600 text-base tracking-[0px] w-auto"
                        size="txtManropeSemiBold20Gray600"
                      >
                        Pick a time for a FREE assisted house visit.
                      </Text>
                    </div>
                    <div className="flex items-center justify-center w-full pb-7">
                      <Text
                        className="text-center text-gray-600 text-sm tracking-[0px] w-auto"
                        size="txtManropeSemiBold20Gray600"
                      >
                        You can reschedule later if you are busy
                      </Text>
                    </div>
                    <div className="flex flex-col gap-0 items-start justify-start w-full overflow-y-auto scrollbar-thin">
                      <div className="flex gap-[10px] items-start justify-start w-auto pb-3">
                        {dates.map((date, index) => (
                          <Button
                            key={index}
                            className={`border border-bluegray-102 flex flex-col items-center justify-center border-solid cursor-pointer h-16 py-[13px] rounded-[10px] font-sans w-16 ${
                              selectedDate === date ? 'bg-blue-300 text-white-A700' : 'hover:bg-blue-300 hover:text-white-A700'
                            }`}
                            onClick={() => setSelectedDate(date)}
                          >
                            <div>
                              <div className="text-xs ">{date.month}</div>
                              <div className="font-medium">{date.day}th</div>
                              <div className="text-xs">{date.weekday}</div>
                            </div>
                          </Button>
                        ))}
                      </div>
                    </div>
                    {selectedDate && (
                      <div className="flex flex-col gap-0 items-start justify-start w-full  max-h-[25vh] overflow-y-auto py-4">
                        {times.map((time, index) => (
                          <div
                            key={index}
                            className={`border border-transparent font-bold font-sans text-left text-base cursor-pointer flex items-center justify-start w-full px-[13px] py-2 rounded-[3px] ${selectedTime === time ? 'bg-blue-300 text-white-A700' : 'hover:bg-blue-300 hover:text-white-A700 text-gray-700'}`}
                            onClick={() => setSelectedTime(time)}
                          >
                            {time}
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}

                </div>
                
                
              </div>
              
          {/* <Line className="bg-bluegray-100 h-px w-full" /> */}
        </div>

        </div>
          </div>
            {selectedDate && selectedTime && !scheduleSuccess &&
              (<div className="p-1">
                  <Button className="bg-gray-900 cursor-pointer font-semibold py-[17px] rounded-[5px] text-base text-center text-white-A700 w-full"
                    onClick={handleScheduleVisit}>
                      Proceed for visit
                  </Button>
              </div>)} 
          </div>
    </div>
  </ModalProvider>
  )
}

export default ScheduleVisitModal
