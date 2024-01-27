import React, { useState } from "react";
import { default as ModalProvider } from "react-modal";

import { Button, CheckBox, Img, Input, Line, Text } from "components";
import axiosInstance from "api/axios";
import { toast } from "react-toastify";

const CreateAccountModal = (props) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const createAccount = async () => {
    try {
      const accountData = { email, name, password }
      const response = await axiosInstance.post('api/register/', accountData);
      console.log(response.data)
      props.onRequestClose()
      toast.success('Account created succefully.')
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        toast.error(error.response.data)

      }else{
        console.log(`Error: ${error.message}`)
      }
    }
  }

  return (
    <ModalProvider
      appElement={document.getElementById("root")}
      className="m-auto !w-[48%]"
      overlayClassName="bg-gray-900_cc fixed flex h-full inset-y-[0] w-full"
      {...props}
    >
      <div className="sm:h-auto md:h-auto max-h-[97vh] overflow-y-auto sm:w-full md:w-full">
        <div className="bg-white-A700 border border-bluegray-100 border-solid flex flex-col items-start justify-start md:px-5 px-[30px] py-10 rounded-[10px] w-full">
          <div className="flex flex-col gap-8 items-center justify-center w-full">
            <div className="flex flex-col gap-4 items-start justify-start w-full">
              <div className="flex flex-col gap-6 items-start justify-start w-full">
                <div className="flex flex-row gap-2 items-center justify-start w-full">
                  <Text
                    className="flex-1 text-4xl sm:text-[32px] md:text-[34px] text-gray-900 tracking-[-0.72px] w-auto"
                    size="txtManropeExtraBold36"
                  >
                    Create Account
                  </Text>
                  <Img
                    className="common-pointer h-[30px] w-[30px]"
                    src="images/img_close_gray_900.svg"
                    alt="close"
                    onClick={props.onRequestClose}
                  />
                </div>
                <div className="flex md:flex-col flex-row gap-5 items-start justify-start w-full">
                  <div className="flex flex-1 flex-col gap-5 items-start justify-start w-full">
                    <Input
                      name="textfieldlarge"
                      placeholder="username"
                      className="font-semibold p-0 placeholder:text-gray-600 sm:pr-5 text-gray-600 text-left text-lg w-full"
                      wrapClassName="bg-white-A700 border border-bluegray-100 border-solid flex pl-4 pr-[35px] py-[17px] rounded-[10px] w-full"
                      type="name"
                      onChange={(value) => setName(value)}
                      prefix={
                        <Img
                          className="mt-auto mb-px h-6 mr-3.5"
                          src="images/img_user.svg"
                          alt="user"
                        />
                      }
                    ></Input>
                    <Input
                      name="textfieldlarge_One"
                      placeholder="Password"
                      className="font-semibold p-0 placeholder:text-gray-600 text-gray-600 text-left text-lg w-full"
                      wrapClassName="bg-white-A700 border border-bluegray-100 border-solid flex px-4 py-[17px] rounded-[10px] w-full"
                      type="password"
                      onChange={(value) => setPassword(value)}
                      prefix={
                        <Img
                          className="mt-auto mb-px h-6 mr-3.5"
                          src="images/img_user_gray_600.svg"
                          alt="user"
                        />
                      }
                      suffix={
                        <Img
                          className="mt-auto mb-px h-6 ml-[35px]"
                          src="images/img_airplane.svg"
                          alt="airplane"
                        />
                      }
                    ></Input>
                  </div>
                  <div className="flex flex-1 flex-col gap-5 items-start justify-start w-full">
                    <Input
                      name="textfieldlarge_Two"
                      placeholder="email address"
                      className="font-semibold p-0 placeholder:text-gray-600 sm:pr-5 text-gray-600 text-left text-lg w-full"
                      wrapClassName="bg-white-A700 border border-bluegray-100 border-solid flex pl-4 pr-[35px] py-[17px] rounded-[10px] w-full"
                      type="email"
                      onChange={(value) => setEmail(value)}
                      prefix={
                        <Img
                          className="mt-auto mb-px h-6 mr-3.5"
                          src="images/img_user.svg"
                          alt="user"
                        />
                      }
                    ></Input>
                    <Input
                      name="textfieldlarge_Three"
                      placeholder="Confirm Password"
                      className="font-semibold p-0 placeholder:text-gray-600 text-gray-600 text-left text-lg w-full"
                      wrapClassName="bg-white-A700 border border-bluegray-100 border-solid flex px-4 py-[17px] rounded-[10px] w-full"
                      type="password"
                      onChange={(value) => setConfirmPassword(value)}
                      prefix={
                        <Img
                          className="mt-auto mb-px h-6 mr-3.5"
                          src="images/img_user_gray_600.svg"
                          alt="user"
                        />
                      }
                      suffix={
                        <Img
                          className="mt-auto mb-px h-6 ml-[35px]"
                          src="images/img_airplane.svg"
                          alt="airplane"
                        />
                      }
                    ></Input>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-start w-full">
                <CheckBox
                  className="font-bold text-gray-600 text-left text-lg"
                  inputClassName="border-2 border-gray-900 border-solid h-[18px] mr-[5px] rounded w-[18px]"
                  name="iagreetoallterm_One"
                  id="iagreetoallterm_One"
                  label="I agree to all Terms & Conditions"
                ></CheckBox>
              </div>
            </div>
            <div className="flex flex-col gap-[18px] items-start justify-start w-full">
              <Button className="bg-gray-900 cursor-pointer font-bold py-4 rounded-[10px] text-center text-lg text-white-A700 w-full"
                onClick={() => createAccount()}>
                            
                Create Account
              </Button>
              <Button
                className="bg-white-A700 border border-gray-600 border-solid cursor-pointer flex items-center justify-center min-w-[620px] md:min-w-full px-[34px] py-[17px] rounded-[10px]"
                leftIcon={
                  <Img
                    className="h-5 mb-[5px] mr-2.5"
                    src="images/img_refresh_gray_900.svg"
                    alt="refresh"
                  />
                }
              >
                <div className="font-bold sm:px-5 text-gray-900 text-left text-lg">
                  Create Account with Google
                </div>
              </Button>
            </div>
            <Line className="bg-bluegray-100 h-px w-full" />
            <div className="flex flex-row gap-2 items-start justify-center w-full">
              <Text
                className="text-center text-gray-600 text-xl tracking-[-0.40px] w-auto"
                size="txtManropeSemiBold20Gray600"
              >
                Have an account?
              </Text>
              <Text
                className="text-gray-900 text-xl tracking-[-0.40px] w-auto cursor-pointer"
                size="txtManropeSemiBold20Gray900"
                onClick={props.onToggleLoginModal}
              >
                Log in
              </Text>
            </div>
          </div>
        </div>
      </div>
    </ModalProvider>
  );
};

export default CreateAccountModal;