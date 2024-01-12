import React from 'react'
import { Button, Img, Text } from "components";
import {  useNavigate } from "react-router-dom";


function ScheduleVisitCard(props) {
    const navigate = useNavigate()

  return (
    <>
      <div className={props.className}>
        <Img
          className="h-[260px] sm:h-auto object-cover w-full"
          alt="image"
          src={props?.image}
        />
        <div className="bg-white-A700 border border-red-101 border-solid flex flex-col items-start justify-start px-5 py-[30px] rounded-bl-[10px] rounded-br-[10px] w-full">
          <div className="flex flex-col gap-[27px] items-start justify-start w-full">
            <div className="flex flex-row gap-3 items-center justify-start w-full">
              {/* <Img className="h-6 w-6" src="images/img_eye.svg" alt="eye" /> */}
              <Text
                className="flex-1 text-xl font-semibold font-manrope text-gray-900 w-auto"
                size="txtManropeSemiBold16"
              >
                {props?.title}
              </Text>
            </div>
            
            <div className="flex flex-row gap-[31px] items-center justify-center w-full">
              <Button className="bg-white-A700 border border-solid border-gray-900 cursor-pointer flex-1 font-manrope font-semibold py-[13px] rounded-[10px] text-base text-center text-gray-900 w-full"
            //   onClick={() => navigate(`/propertydetails/${props?.room_id}`)}
              >
                Cancel
              </Button>
              <Button className="bg-gray-900 cursor-pointer flex-1 font-manrope font-semibold py-[13px] rounded-[10px] text-base text-center text-white-A700 w-full"
              onClick={() => navigate(`/propertydetails/${props?.room_id}`)}>
                Reschedule
              </Button>
              
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

ScheduleVisitCard.defaultProps = {
    image: "images/img_image_260x384.png",
    p286162ndaveoaklone: "2861 62nd Ave, Oakland, CA 94605",
    p3bedroom: "3 Bed Room",
    bathcounter: "1 Bath",
    sqftcounter: "1,032 sqft",
    p1bath: "Family",
    viewDetails: "View Details",
    price: "$649,900",
  };
  

export default ScheduleVisitCard
