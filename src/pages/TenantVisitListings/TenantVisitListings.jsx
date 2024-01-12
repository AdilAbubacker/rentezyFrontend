import React, { useEffect, useState } from 'react'
import { Button, GoogleMap, Img, Input, List, SelectBox, Text } from "components";
import LandingPageCard from "components/LandingPageCard";
import LandingPageFooter from "components/LandingPageFooter";
import LandingPageHeader from "components/LandingPageHeader";
import axios from 'axios';
import ScheduleVisitCard from 'components/ScheduleVisitCard/ScheduleVisitCard';



function TenantVisitListings() {
  const [properties, setProperties] = useState([])
  const [previousVisits, setPreviousVisits] = useState([])
  const [upcomingVisits, setUpcomingVisits] = useState([])


  useEffect(() => {
    const fetchProperties = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8007/api/scheduled_visits/65');
            setUpcomingVisits(response.data.upcoming_visits);
            setPreviousVisits(response.data.previous_visits);
        } catch (error) {
            if (error.response) {
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.headers);
            }else{
                console.log(`Error: ${error.message}`)
            }
        }
    }
    fetchProperties();
}, []);
    const landingPageCardPropList = [
        {},
        { image: "images/img_image_1.png" },
        { image: "images/img_image_3.png" },
        { image: "images/img_image_4.png" },
        { image: "images/img_image_5.png" },
        { image: "images/img_image_2.png" },
        { image: "images/img_image_1.png" },
        { image: "images/img_image_3.png" },
      ];
    
  return (
    <>
      <div className="bg-gray-51 flex flex-col font-markoone sm:gap-10 md:gap-10 gap-[100px] items-start justify-start mx-auto w-auto sm:w-full md:w-full">
        <div className="flex flex-col md:gap-10 gap-[60px] items-center justify-center w-full">
          <LandingPageHeader className="bg-deep_orange-900 flex gap-2 h-20 md:h-auto items-center justify-between md:px-5 px-[120px] py-[19px] w-full" />
          <div className="flex flex-col font-manrope items-center justify-start md:px-10 sm:px-5 px-[120px] w-full">
            <div className="flex flex-col gap-6 items-center justify-center max-w-[1200px] mx-auto w-full">
              <Text
                className="text-3xl sm:text-[32px] md:text-[34px] text-gray-900 tracking-[-0.72px] w-full"
                size="txtManropeExtraBold36"
              >
                Upcoming Visits
              </Text>

              <div className="flex flex-1 flex-col md:gap-10 gap-[60px] items-start justify-start w-full">
                <div className="flex flex-col items-start justify-start w-full">
                  <div className="md:gap-5 gap-6 grid md:grid-cols-1 grid-cols-3 justify-center min-h-[auto] w-full">
                    {upcomingVisits.map((props, index) => (
                      <React.Fragment key={`upcomingVisits${index}`}>
                        <ScheduleVisitCard
                          className="flex flex-1 flex-col h-[512px] md:h-auto items-start justify-start w-full"
                          {...props}
                        />
                      </React.Fragment>
                    ))}
               
                  </div>
                </div>
              </div>               
            </div>
            <div className="flex flex-col gap-6 items-center justify-center max-w-[1200px] mx-auto w-full">
              <Text
                className="text-3xl sm:text-[32px] md:text-[34px] text-gray-900 tracking-[-0.72px] w-full pb-4 pt-7"
                size="txtManropeExtraBold36"
              >
                Previous Visits
              </Text>

              <div className="flex flex-1 flex-col md:gap-10 gap-[60px] items-start justify-start w-full">
                <div className="flex flex-col items-start justify-start w-full">
                  <div className="md:gap-5 gap-6 grid md:grid-cols-1 grid-cols-3 justify-center min-h-[auto] w-full">
                    {previousVisits.map((props, index) => (
                      <React.Fragment key={`previousVisits${index}`}>
                        <ScheduleVisitCard
                          className="flex flex-1 flex-col h-[512px] md:h-auto items-start justify-start w-full"
                          {...props}
                        />
                      </React.Fragment>
                    ))}
               
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

export default TenantVisitListings
