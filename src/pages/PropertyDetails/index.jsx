import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, GoogleMap, Img, Input, Line, List, Text } from "components";
import LandingPageCard from "components/LandingPageCard";
import LandingPageFooter from "components/LandingPageFooter";
import animation from '../../assets/lottei/animation.json';
import LandingPageHeader from "components/LandingPageHeader";
import axios from "axios";
import { useSelector } from "react-redux";
import Lottie from 'lottie-react'
import ScheduleVisitModal from "modals/ScheduleVisit";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import BookNowModal from "modals/BookNowModal/BookNowModal";
import { Carousel } from "@material-tailwind/react";
import axiosInstance from "api/axios";

// import { LocalizationProvider } from '@mui/x-date-pickers';
// import AdapterDayjs from '@date-io/dayjs';

const handleDragStart = (e) => e.preventDefault();


const PropertyDetailsPage = () => {
  const [property, setProperty] = useState("");
  const [properties, setProperties] = useState([])
  const [isScheduleVisitModalOpen, setisScheduleVisitModalOpen] = useState(false)
  const [isBookNowModalOpen, setIsBookNowModalOpen] = useState(false)
  const [isBookNowClicked, setIsBookNowClicked] = useState(false)

  const { id } = useParams();
  const navigate = useNavigate()
  const userId = useSelector(state => state.auth.userId)


  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8004/api/properties/${id}`
        );
        console.log(response.data.city);
        setProperty(response.data);
      } catch (error) {
        console.error('error fetchig properties', error)
      }
    };
    fetchPropertyDetails();
  }, []);


  useEffect(() => {
    const fetchProperties = async () => {
        try {
            const response = await axiosInstance.get('/api/properties');
            setProperties(response.data);
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

  const handleBookNow = async () => {
    try {
      const roomDetails = {
        room_id: property.id,
        tenant_id: userId,
        no_of_rooms: 1
      }
      console.log(roomDetails)
      const response = await axios.post('http://127.0.0.1:8005/api/book/', roomDetails);
    
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

  const closeScheduleVisitModal = () => {
    setisScheduleVisitModalOpen(false)
  }

  const landingPageCardPropList = [
    {},
    { image: "images/img_image_1.png" },
    { image: "images/img_image_2.png" },
  ];

  const itemsArray = [
    <img className="h-96 px-2" src={property.image} onDragStart={handleDragStart} role="presentation" />,
    <img className="h-96 px-2" src={property.image} onDragStart={handleDragStart} role="presentation" />,
    <img className="h-96 px-2" src={property.image} onDragStart={handleDragStart} role="presentation" />,
    <img className="h-96 px-2" src={property.image} onDragStart={handleDragStart} role="presentation" />,
    <img className="h-96 px-2" src={property.image} onDragStart={handleDragStart} role="presentation" />,
    <img className="h-96 px-2" src={property.image} onDragStart={handleDragStart} role="presentation" />,
    <img className="h-96 px-2" src={property.image} onDragStart={handleDragStart} role="presentation" />,
    <img className="h-96 px-2" src={property.image} onDragStart={handleDragStart} role="presentation" />,
    <img className="h-96 px-2" src={property.image} onDragStart={handleDragStart} role="presentation" />,
    <img className="h-96 px-2" src={property.image} onDragStart={handleDragStart} role="presentation" />,
    
  ];

  const items = itemsArray.map((item, index) => {
    const style = { height: 340, width: 500 };
    return (<div className="item" style={style}>{item}</div>);
});

  return (
    <>
      <div className="bg-gray-51 flex flex-col font-markoone sm:gap-10 md:gap-10 gap-[100px] items-start justify-start mx-auto w-auto sm:w-full md:w-full">
        <div className="flex flex-col md:gap-10 gap-[60px] items-start justify-start w-full">
          <div className="flex flex-col gap-10 items-start justify-start w-full">
            <LandingPageHeader className="bg-white-A700 flex gap-2 h-20 md:h-auto items-center justify-between md:px-5 px-[120px] py-[19px] w-full" />

            {/* <div className="flex flex-col font-manrope items-center justify-center md:px-10 sm:px-5 px-[120px] w-full">
             
            </div> */}
            <div className="flex flex-col font-manrope items-center justify-center md:px-10 sm:px-5 px-[120px] w-full">
              <div className="flex md:flex-col flex-row gap-6 items-start justify-center max-w-[1200px] mx-auto w-full">
                <div className="flex flex-1 flex-col gap-6 items-start justify-start w-full">

                {/* <div className="bg-white-A700 border border-bluegray-100 border-solid flex flex-col items-start justify-start p-10 sm:px-5 rounded-none w-full">
                    <div className="flex flex-col gap-4 items-start justify-start w-full">
                          <Text
                            className="leading-[120.00%] max-w-[900px] font-bold md:max-w-full sm:text-xl md:text-[26px] text-[28px] text-gray-900 tracking-[-0.56px]"
                            // size="txtManropeExtraBold28"
                          >
                            {property.name}
                          </Text>
                          <Text
                            className="text-gray-900 text-xl tracking-[-0.40px] w-full"
                            size="txtManropeSemiBold20Gray900"
                          >
                            {property.address}, {property.city}
                          </Text>
                      </div></div> */}
                      <Carousel className="rounded-none">
                        <img
                          src={property.image}
                          alt="image 1"
                          className="h-full w-full object-cover"
                        />
                        <img
                          src={property.image}
                          alt="image 2"
                          className="h-full w-full object-cover"
                        />
                        <img
                          src={property.image}
                          alt="image 3"
                          className="h-full w-full object-cover"
                        />
                      </Carousel>
                  <div className="bg-white-A700 border border-bluegray-100 border-solid flex flex-col items-start justify-start p-10 sm:px-5   rounded-[0px] w-full">
                    <div className="flex flex-col gap-11 items-start justify-start w-full">
                      <div className="flex flex-col gap-6 items-start justify-start w-full">
                        <div className="flex flex-col gap-4 items-start justify-start w-full">
                          <Text
                            className="leading-[135.00%] max-w-[712px] md:max-w-full sm:text-2xl md:text-[26px] text-[28px] text-gray-900 tracking-[-0.56px]"
                            size="txtManropeExtraBold28"
                          >
                            {property.name}
                          </Text>
                          <Text
                            className="text-gray-900 text-xl tracking-[-0.40px] w-full"
                            size="txtManropeSemiBold20Gray900"
                          >
                            {property.address}, {property.city}
                          </Text>
                        </div>
                        <div className="flex sm:flex-col flex-row gap-4 items-start justify-start md:pr-10 sm:pr-5 pr-[180px] w-full">
                          {/* <div className="bg-white-A700 border border-gray-600 border-solid flex flex-1 flex-col items-center justify-center sm:px-5 px-6 py-[7px] rounded-[10px] w-full">
                            <div className="flex flex-col gap-1 items-start justify-start w-full">
                              <Text
                                className="text-2xl md:text-[22px] text-gray-900 sm:text-xl tracking-[-0.48px] w-full"
                                size="txtManropeBold24Gray900"
                              >
                                $649,900
                              </Text>
                              <Text
                                className="text-gray-600 text-xs w-full"
                                size="txtManropeSemiBold12"
                              >
                                Online / Cash Payment
                              </Text>
                            </div>
                          </div> */}
                          <div className="bg-white-A700 border border-bluegray-100 border-solid flex flex-1 flex-col items-center justify-center sm:px-5 px-6 py-[7px] rounded-[0px] w-full">
                            <div className="flex flex-col gap-1 items-start justify-start w-full">
                              <Text
                                className="text-2xl md:text-[22px] text-gray-900 sm:text-xl tracking-[-0.48px] w-full"
                                size="txtManropeBold24Gray900"
                              >
                                10000 / month
                              </Text>
                              <Text
                                className="text-gray-600 text-xs w-full"
                                size="txtManropeSemiBold12"
                              >
                                Security deposit: Just 2 months rent
                              </Text>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-4 items-start justify-start w-full">
                        <Text
                          className="text-gray-900 text-xl tracking-[-0.40px] w-full"
                          size="txtManropeSemiBold20Gray900"
                        >
                          Well-constructed 1562 Sq Ft Home Is Now Offering To
                          You In Uttara For Sale
                        </Text>
                        <Text
                          className="leading-[180.00%] max-w-[712px] md:max-w-full text-gray-600 text-lg"
                          size="txtManropeRegular18Gray600"
                        >
                          <>
                            A slider is great way to display a slideshow
                            featuring images or videos, usually on your
                            homepage.Adding sliders to your site is no longer
                            difficult. You don’t have to know coding anymore.
                            Just use a slider widget and it will automatically
                            insert the slider on your web page.So, the Elementor
                            slider would be a great tool to work with when
                            building a WordPress site.
                          </>
                        </Text>
                      </div>
                      {/* <div className="flex flex-col gap-6 items-start justify-start w-full">
                        <div className="flex flex-col gap-6 items-start justify-start w-full">
                          <Text
                            className="sm:text-2xl md:text-[26px] text-[28px] text-gray-900 tracking-[-0.56px] w-full"
                            size="txtManropeExtraBold28"
                          >
                            Local Information
                          </Text>
                          <div className="gap-3 grid sm:grid-cols-1 md:grid-cols-2 grid-cols-4 items-center justify-start md:pr-10 sm:pr-5 pr-[200px] w-full">
                            <Button className="border border-bluegray-100 border-solid cursor-pointer flex-1 font-semibold py-[11px] rounded-[10px] text-base text-center text-gray-900 w-full">
                              Map
                            </Button>
                            <Button className="bg-yellow-50 cursor-pointer flex-1 font-semibold py-[11px] rounded-[10px] text-base text-center text-white-A700 w-full">
                              Schools
                            </Button>
                            <Button className="border border-bluegray-100 border-solid cursor-pointer flex-1 font-semibold py-[11px] rounded-[10px] text-base text-center text-gray-900 w-full">
                              Crime
                            </Button>
                            <Button className="border border-bluegray-100 border-solid cursor-pointer flex-1 font-semibold py-[11px] rounded-[10px] text-base text-center text-gray-900 w-full">
                              Shop & Eat
                            </Button>
                          </div>
                        </div>
                        <div className="h-[400px] relative w-full">
                          <GoogleMap
                            className="h-[400px] m-auto rounded-[10px] w-full"
                            showMarker={false}
                          ></GoogleMap>
                          <Img
                            className="absolute h-[54px] inset-[0] m-auto w-[389px]"
                            src="images/img_frame1000001425.svg"
                            alt="frame1000001425"
                          />
                        </div>
                      </div>*/}
                    </div>
                  </div> 
                  <div className="bg-white-A700 border border-bluegray-100 border-solid flex flex-col items-start justify-start p-10 sm:px-5 rounded-[0px] w-full">
                    <div className="flex flex-col gap-6 items-start justify-start w-full">
                      <Text
                        className="sm:text-2xl md:text-[26px] text-[28px] text-gray-900 tracking-[-0.56px] w-auto"
                        size="txtManropeExtraBold28"
                      >
                        Home Highlights
                      </Text>
                      <List
                        className="sm:flex-col flex-row md:gap-10 gap-[150px] grid md:grid-cols-1 grid-cols-2 justify-start w-full"
                        orientation="horizontal"
                      >
                        <div className="flex flex-1 flex-col gap-2.5 items-start justify-start w-full">
                          <div className="flex flex-row gap-[55px] items-start justify-start w-full">
                            <div className="flex flex-1 flex-row gap-2.5 items-center justify-start w-full">
                              <div className="bg-gray-600 h-2 rounded-[50%] w-2"></div>
                              <Text
                                className="flex-1 text-gray-600 text-lg w-auto"
                                size="txtManropeRegular18Gray600"
                              >
                                Parking
                              </Text>
                            </div>
                            <Text
                              className="flex-1 text-gray-900 text-lg text-right w-auto"
                              size="txtManropeSemiBold18"
                            >
                              No Info
                            </Text>
                          </div>
                          <div className="flex flex-row gap-[47px] items-start justify-start w-full">
                            <div className="flex flex-1 flex-row gap-2.5 items-center justify-start w-full">
                              <div className="bg-gray-600 h-2 rounded-[50%] w-2"></div>
                              <Text
                                className="flex-1 text-gray-600 text-lg w-auto"
                                size="txtManropeRegular18Gray600"
                              >
                                Outdoor
                              </Text>
                            </div>
                            <Text
                              className="flex-1 text-gray-900 text-lg text-right w-auto"
                              size="txtManropeSemiBold18"
                            >
                              No Info
                            </Text>
                          </div>
                          <div className="flex flex-row gap-[85px] items-start justify-start w-full">
                            <div className="flex flex-1 flex-row gap-2.5 items-center justify-start w-full">
                              <div className="bg-gray-600 h-2 rounded-[50%] w-2"></div>
                              <Text
                                className="flex-1 text-gray-600 text-lg w-auto"
                                size="txtManropeRegular18Gray600"
                              >
                                A/C
                              </Text>
                            </div>
                            <Text
                              className="flex-1 text-gray-900 text-lg text-right w-auto"
                              size="txtManropeSemiBold18"
                            >
                              No Info
                            </Text>
                          </div>
                          <div className="flex flex-row gap-10 items-start justify-start w-full">
                            <div className="flex flex-1 flex-row gap-2.5 items-center justify-start w-full">
                              <div className="bg-gray-600 h-2 rounded-[50%] w-2"></div>
                              <Text
                                className="flex-1 text-gray-600 text-lg w-auto"
                                size="txtManropeRegular18Gray600"
                              >
                                Year Built
                              </Text>
                            </div>
                            <Text
                              className="flex-1 text-gray-900 text-lg text-right w-auto"
                              size="txtManropeSemiBold18"
                            >
                              2021
                            </Text>
                          </div>
                        </div>
                        <div className="flex flex-1 flex-col gap-2.5 items-start justify-start w-full">
                          <div className="flex flex-row gap-20 items-start justify-start w-full">
                            <div className="flex flex-1 flex-row gap-2.5 items-center justify-start w-full">
                              <div className="bg-gray-600 h-2 rounded-[50%] w-2"></div>
                              <Text
                                className="flex-1 text-gray-600 text-lg w-auto"
                                size="txtManropeRegular18Gray600"
                              >
                                HOA
                              </Text>
                            </div>
                            <Text
                              className="flex-1 text-gray-900 text-lg text-right w-auto"
                              size="txtManropeSemiBold18"
                            >
                              None
                            </Text>
                          </div>
                          <div className="flex flex-row gap-8 items-start justify-start w-full">
                            <div className="flex flex-1 flex-row gap-2.5 items-center justify-start w-full">
                              <div className="bg-gray-600 h-2 rounded-[50%] w-2"></div>
                              <Text
                                className="flex-1 text-gray-600 text-lg w-auto"
                                size="txtManropeRegular18Gray600"
                              >
                                Price/Sqft
                              </Text>
                            </div>
                            <Text
                              className="flex-1 text-gray-900 text-lg text-right w-auto"
                              size="txtManropeSemiBold18"
                            >
                              $560
                            </Text>
                          </div>
                          <div className="flex flex-row gap-[66px] items-start justify-start w-full">
                            <div className="flex flex-1 flex-row gap-2.5 items-center justify-start w-full">
                              <div className="bg-gray-600 h-2 rounded-[50%] w-2"></div>
                              <Text
                                className="flex-1 text-gray-600 text-lg w-auto"
                                size="txtManropeRegular18Gray600"
                              >
                                Listed
                              </Text>
                            </div>
                            <Text
                              className="flex-1 text-gray-900 text-lg text-right w-auto"
                              size="txtManropeSemiBold18"
                            >
                              No Info
                            </Text>
                          </div>
                        </div>
                      </List>
                    </div>
                  </div>
                  <div className="bg-white-A700 border border-bluegray-100 border-solid flex flex-col items-start justify-start p-10 sm:px-5 rounded-[0px] w-full">
                    <div className="flex flex-col gap-[26px] items-start justify-start w-full">
                      <Text
                        className="sm:text-2xl md:text-[26px] text-[28px] text-gray-900 tracking-[-0.56px] w-full"
                        size="txtManropeExtraBold28"
                      >
                        Owner Information
                      </Text>
                      <div className="flex flex-row gap-6 items-center justify-start w-full">
                        <Img
                          className="h-[150px] md:h-auto object-cover rounded-[10px] w-[150px]"
                          src="images/img_rectangle5599.png"
                          alt="rectangle5599"
                        />
                        <div className="flex flex-col gap-[3px] items-start justify-start w-auto">
                          <Text
                            className="text-gray-900 text-xl tracking-[-0.40px] w-auto"
                            size="txtManropeSemiBold20Gray900"
                          >
                            Bruno Fernandes
                          </Text>
                          <div className="flex flex-row gap-3.5 items-center justify-start w-full">
                            <div className="flex flex-row gap-1 items-start justify-start w-auto">
                              <Img
                                className="h-4 w-4"
                                src="images/img_star.svg"
                                alt="star"
                              />
                              <Img
                                className="h-4 w-4"
                                src="images/img_star.svg"
                                alt="star_One"
                              />
                              <Img
                                className="h-4 w-4"
                                src="images/img_star.svg"
                                alt="star_Two"
                              />
                              <Img
                                className="h-4 w-4"
                                src="images/img_star.svg"
                                alt="star_Three"
                              />
                              <Img
                                className="h-4 w-4"
                                src="images/img_star_gray_600.svg"
                                alt="star_Four"
                              />
                            </div>
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
                              bruno@relasto .com
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
                          <div className="flex flex-row gap-2.5 items-center justify-start w-full pt-4">
                            <Button className="bg-gray-900 cursor-pointer font-semibold py-[12px] rounded-[10px] text-base text-center text-white-A700 w-full"
                              onClick={() => navigate(`/chat/${property.owner_id}`)}>
                                Chat
                            </Button>
                          </div>
                         
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white-A700 border border-bluegray-100 border-solid flex sm:flex-1 flex-col items-start justify-start  sm:px-5 rounded-[5px] w-auto sm:w-full px-2 sticky top-6">
                  <div  className="flex flex-row justify-evenly w-full items-center">
                    <div className={`w-full flex justify-center cursor-pointer sticky items-center ${!isBookNowClicked ? 'border-b-2 border-gray-500 text-gray-900' : 'border-b-2 text-gray-500'}`} onClick={() => setIsBookNowClicked(false)}>
                      <div
                        className="sm:text-2xl md:text-[26px] text-[17px] font-bold tracking-[-0.56px] py-4"
                        // size="txtManropeExtraBold28"
                      >
                        Schdedule Visit
                      </div>
                    </div>
                    
                    <div className={`w-full flex justify-center cursor-pointer  items-center ${isBookNowClicked ? 'border-b-2 border-gray-500 text-gray-900' : 'border-b-2 text-gray-500'}`} onClick={() => setIsBookNowClicked(true)}>
                      <div
                        className="sm:text-2xl font-manrope md:text-[26px] text-[17px] font-bold tracking-[-0.56px] py-4"
                        size="txtManropeExtraBold28"
                      >
                        Book Now
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-0 items-start justify-start p-6 w-[336px]">
                    <div className="flex flex-col gap-0 items-start justify-start w-full">
                      <div className="flex flex-col gap-0 md:h-auto items-start justify-start w-full">
                      {!isBookNowClicked ? 
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
                            className="text-center font-manrope text-gray-900 text-xl tracking-[0px] w-auto"
                            size="txtManropeSemiBold20Gray600"
                          >
                            FREE Guided Tour.
                          </Text>
                        </div>
                        <div className="flex items-center justify-center w-full pt-1">
                          <Text
                            className="text-center text-gray-600 text-[15px] tracking-[0px] w-auto"
                            size="txtManropeSemiBold20Gray600"
                          >
                            Schedule Visit for a assisted house visit
                          </Text>
                        </div>
                        <div className="flex items-center justify-center w-full pt-8">
                          <Button className="bg-gray-900 cursor-pointer font-thin py-[13px] rounded-[3px] text-base text-center text-white-A700 w-full"
                          onClick={() => setisScheduleVisitModalOpen(true)}>
                            Pick a time slot
                          </Button>
                          <ScheduleVisitModal isOpen={isScheduleVisitModalOpen} onRequestClose={closeScheduleVisitModal} propertyId={id}/>

                        </div>
                      </div> : 
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
                            className="text-center font-manrope text-gray-900 text-xl tracking-[0px] w-auto"
                            size="txtManropeSemiBold20Gray600"
                          >
                            Pay security amount and book the room.
                          </Text>
                        </div>
                        <div className="flex items-center justify-center w-full pt-1">
                          <Text
                            className="text-center text-gray-600 text-[15px] tracking-[0px] w-auto"
                            size="txtManropeSemiBold20Gray600"
                          >
                            Schedule Visit for a assisted house visit
                          </Text>
                        </div>
                        <div className="flex items-center justify-center w-full pt-8">
                          <Button className="bg-gray-900 cursor-pointer font-thin py-[13px] rounded-[3px] text-base text-center text-white-A700 w-full"
                           onClick={() => setIsBookNowModalOpen(true)}>
                            Book Now
                          </Button>
                          {/* <LocalizationProvider dateAdapter={AdapterDayjs}> */}
                            <BookNowModal isOpen={isBookNowModalOpen} onRequestClose={() => setIsBookNowModalOpen(false)} property={property}/>
                          {/* </LocalizationProvider> */}

                        </div>
                      </div>
                      }
                        
                      </div>
                    </div>





                   
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col font-manrope items-center justify-center md:px-10 sm:px-5 px-[120px] w-full">
            <div className="flex flex-col gap-10 items-center justify-center max-w-[1200px] mx-auto w-full">
              <div className="flex sm:flex-col flex-row gap-5 items-center justify-start w-full">
                <Text
                  className="flex-1 sm:text-2xl md:text-[26px] text-[28px] text-gray-900 tracking-[-0.56px] w-auto"
                  size="txtManropeExtraBold28"
                >
                  Latest Property Listings
                </Text>
                <Button
                  className="bg-transparent cursor-pointer flex items-center justify-center min-w-[124px]"
                  rightIcon={
                    <Img
                      className="h-6 mb-[3px] ml-2"
                      src="images/img_arrowright.svg"
                      alt="arrow_right"
                    />
                  }
                >
                  <div className="font-bold text-left text-lg text-orange-A700">
                    Explore All
                  </div>
                </Button>
              </div>
              <List
                className="sm:flex-col flex-row gap-6 grid sm:grid-cols-1 md:grid-cols-2 grid-cols-3 justify-start w-full"
                orientation="horizontal"
              >
                  {properties.slice(0, 3).map((props, index) => (

                  <React.Fragment key={`LandingPageCard${index}`}>
                    <LandingPageCard
                      className="flex flex-1 flex-col h-full items-start justify-start w-full"
                      {...props}
                    />
                  </React.Fragment>
                ))}
              </List>
            </div>
          </div>
        </div>
        <LandingPageFooter className="bg-white-A700 flex gap-2 items-center justify-center md:px-5 px-[120px] py-20 w-full" />
      </div>
    </>
  );
};

export default PropertyDetailsPage;
