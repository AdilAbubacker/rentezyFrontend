import React from "react";

import { Img, Text } from "components";

const LandingPageFooter = (props) => {
  return (
    <>
      <footer className={props.className}>
        {/* <div className="flex flex-col md:gap-10 gap-[120px] items-start justify-start w-full"> */}
          <div className="flex md:flex-col flex-row md:gap-5 items-center justify-start w-full">
            <div className="flex flex-col gap-[43px] items-start justify-start w-[341px]">
              <div className="flex flex-row gap-[11px] h-10 md:h-auto items-center justify-start w-[341px]">
                <Img
                  className="h-10 w-10"
                  src="images/img_home.svg"
                  alt="home_One"
                />
                <Text
                  className="text-orange-A700 text-xl w-auto"
                  size="txtMarkoOneRegular20"
                >
                  RentEzy
                </Text>
              </div>
              <div className="flex flex-col gap-7 h-[194px] md:h-auto items-start justify-start w-full">
                
                  
                  <Text
                    className="text-base text-gray-900 w-auto"
                    size="txtManropeSemiBold16"
                  >
                    rentezy@gmail.com
                  </Text>
                <div className="flex flex-row gap-3 items-start justify-start w-full">
                  <div className="flex flex-col h-[30px] items-center justify-start w-[30px]">
                    <Img
                      className="h-[30px] w-[30px]"
                      src="images/img_plus.svg"
                      alt="plus"
                    />
                  </div>
                  <div className="flex flex-col h-[30px] items-center justify-start w-[30px]">
                    <Img
                      className="h-[30px] w-[30px]"
                      src="images/img_twitter.svg"
                      alt="twitter"
                    />
                  </div>
                  <Img
                    className="h-[30px] w-[30px]"
                    src="images/img_instagram_orange_a700_30x30.svg"
                    alt="instagram"
                  />
                  <Img
                    className="h-[30px] w-[30px]"
                    src="images/img_linkedin.svg"
                    alt="linkedin"
                  />
                  <div className="flex flex-col h-[30px] items-center justify-start w-[30px]">
                    <Img
                      className="h-[30px] w-[30px]"
                      src="images/img_clock_orange_a700.svg"
                      alt="clock"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-1 md:flex-col flex-row md:gap-10 gap-[77px] items-start justify-start w-full">
              <div className="flex flex-1 flex-col gap-5 items-start justify-start w-full">
                <Text
                  className="text-gray-900 text-lg w-full"
                  size="txtManropeBold18Gray900"
                >
                  Features
                </Text>
                <div className="flex flex-col gap-3.5 items-start justify-start w-full">
                  
                  <Text
                    className="text-base text-gray-900 w-full"
                    size="txtManropeSemiBold16"
                  >
                    About
                  </Text>
                  <Text
                    className="text-base text-gray-900 w-full"
                    size="txtManropeSemiBold16"
                  >
                    Contact
                  </Text>
                  <Text
                    className="text-base text-gray-900 w-full"
                    size="txtManropeSemiBold16"
                  >
                    Search
                  </Text>
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-5 items-start justify-start w-full">
                <Text
                  className="text-gray-900 text-lg w-full"
                  size="txtManropeBold18Gray900"
                >
                  Information
                </Text>
                <div className="flex flex-col gap-3.5 items-start justify-start w-full">
                  
              
                  <Text
                    className="text-base text-gray-900 w-full"
                    size="txtManropeSemiBold16"
                  >
                    Property Details
                  </Text>
                  <Text
                    className="text-base text-gray-900 w-full"
                    size="txtManropeSemiBold16"
                  >
                    <>Agent List</>
                  </Text>
                  <Text
                    className="text-base text-gray-900 w-full"
                    size="txtManropeSemiBold16"
                  >
                    Agent Profile
                  </Text>
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-5 items-start justify-start w-full">
                <Text
                  className="text-gray-900 text-lg w-full"
                  size="txtManropeBold18Gray900"
                >
                  Documentation{" "}
                </Text>
                <div className="flex flex-col gap-3.5 items-start justify-start w-full">
                  <Text
                    className="text-base text-gray-900 w-full"
                    size="txtManropeSemiBold16"
                  >
                    Blog
                  </Text>
                  <Text
                    className="text-base text-gray-900 w-full"
                    size="txtManropeSemiBold16"
                  >
                    FAQ
                  
                  </Text>
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-5 items-start justify-start w-full">
                <Text
                  className="text-gray-900 text-lg w-full"
                  size="txtManropeBold18Gray900"
                >
                  Others
                </Text>
                <div className="flex flex-col gap-3.5 items-start justify-start w-full">
                  <Text
                    className="text-base text-gray-900 w-full"
                    size="txtManropeSemiBold16"
                  >
                      Privacy Policy
                  </Text>
                  <Text
                    className="text-base text-gray-900 w-full"
                    size="txtManropeSemiBold16"
                  >
                    Licence
                  </Text>
                  <Text
                    className="text-base text-gray-900 w-full"
                    size="txtManropeSemiBold16"
                  >
                    New Password
                  </Text>
                  
                </div>
              </div>
            </div>
          </div>
          
        {/* </div> */}
        {/* <div
          className="fixed bottom-0 left-0 w-full flex items-center justify-center py-4 bg-white z-50"
        >
          <Text className="text-gray-900 text-base" size="txtManropeSemiBold16">
            Built with ❤️ by Adil Abubacker
          </Text>
        </div> */}
      </footer>
    </>
  );
};

LandingPageFooter.defaultProps = {};

export default LandingPageFooter;
