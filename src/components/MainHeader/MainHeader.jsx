import React, { useEffect, useState } from "react";
import LogInModal from '../../modals/LogIn'
import { Button, Img, List, Text } from "components";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { FaBell } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { IoChatbubble } from "react-icons/io5";
import axios from "axios";
import CreateAccountModal from "modals/CreateAccount";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from "api/axios";

function MainHeader(props) {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isCreateAccountModalOpen, setIsCreateAccountModalOpen] = useState(false);
  const userId = useSelector(state => state.auth.userId)
  const [socket, setSocket] = useState(null)
  const [notifications ,setNotifications] =useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = async () => {
    setDropdownOpen(!isDropdownOpen);
    setUnreadCount(0)
    try {
      const response = await axiosInstance.post(`/api/mark-all-unread-notifications-as-read/${userId}/`)
      console.log(response.data)
    } catch (error) {
      console.error('error while marking notifications read',error)
    }
  };

  useEffect(() => {
    if (userId) {
      console.log(userId)
      const roomName = `room_${userId}`;
      console.log(roomName)
      const notificationSocket = new WebSocket(
          `wss://rentezy.homes/ws/notification/${roomName}/`
      );
      setSocket(notificationSocket);
    }
  }, [userId])


  useEffect(() => {
    if (socket) {
        socket.onopen = () => {
            console.log('notification websocket connetion opened')
        };

        socket.onmessage = (e) => {
            const data = JSON.parse(e.data);
            const message = data.message_content;
            console.log(data, 'return message user');
            setUnreadCount(prevUnreadCount => prevUnreadCount + 1);
            setNotifications((prevNotifications) => [data, ...prevNotifications]);
            console.log('onmessage worked:', data)
        };
    
        socket.onclose = (e) => {
            console.error('Notification socket closed unexpectedly');
        };

    return () => {
        // Cleanup WebSocket connection when component unmounts
        socket.close();
    };
    }
  }, [socket])

  useEffect(() => {
    const fetchNotifaications = async () => {
      try {
        const response = await axiosInstance.get(`/api/notificationmessages/${userId}`)
        console.log(response.data)
        setNotifications(response.data.messages)
        setUnreadCount(response.data.unread_count)
      } catch (error) {
        console.error('error',error)
      }
    }
    fetchNotifaications();
  }, [])

  const notify = () => toast("Wow so easy!");


  const handleToggleCreateAccountModal = () => {
    setIsLoginModalOpen(false);
    setIsCreateAccountModalOpen(true);
  };

  const handleToggleLoginModal = () => {
    setIsCreateAccountModalOpen(false);
    setIsLoginModalOpen(true);
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeCreateAccountModal = () => {
    setIsCreateAccountModalOpen(false);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };
  return (
    <>
      <header className={props.className}>
        <div className="flex md:flex-col flex-row md:gap-10 items-center justify-between w-full">
          <div className="header-row my-px">
            <div className="flex flex-row gap-[11px] items-center justify-start">
              {/* <Img className="h-10 w-10" src="images/img_home.svg" alt="home" /> */}
              <Text
                className="text-white-A700 text-xl w-auto"
                size="txtManropeExtraBold20"
              >
                RentEzy.
              </Text>
            </div>
            <div className="mobile-menu">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          <div className="flex sm:flex-1 sm:flex-col flex-row sm:hidden items-center justify-between w-[492px] sm:w-full">
            <List
              className="sm:flex-col flex-row gap-10 grid grid-cols-3"
              orientation="horizontal"
            >
              <div className="flex flex-row gap-1.5 items-start justify-start w-[77px]">
                <Text
                  className="text-base text-white-A700 w-auto"
                  size="txtManropeSemiBold16"
                >
                  Landlords
                </Text>
              </div>
              <div className="flex flex-row gap-1.5 items-start justify-start w-[77px]">
                <Text
                  className="text-base text-white-A700 w-auto"
                  size="txtManropeSemiBold16"
                >
                  Tenants
                </Text>
              </div>
              <div className="flex flex-row gap-1.5 items-start justify-start w-[77px]">
                <Text
                  className="text-base text-white-A700 w-auto"
                  size="txtManropeSemiBold16"
                >
                  About Us
                </Text>
              </div>
            </List>
            <Text
              className="text-base text-center text-white-A700 w-auto"
              size="txtManropeSemiBold16"
            >
              Property{" "}
            </Text>
            <Text onClick={notify}
              className="text-base text-white-A700 w-auto"
              size="txtManropeSemiBold16"
            >
              Blog
            </Text>
            <ToastContainer position="bottom-right"
              autoClose={1500}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"/>
          </div>
          <div className="flex flex-row gap-4 h-[42px] md:h-auto sm:hidden items-center justify-start w-[228px]">
          {/* <button class="relative bg-blue-700 hover:bg-blue-800 duration-300 py-2 px-4 text-blue-100 rounded">Secondary
         <span class="absolute bg-gray-600 text-gray-100 px-2 py-1 text-xs font-bold rounded-full -top-3 -right-3">99+</span>
      </button> */}
            <Button
              className="bg-transparent cursor-pointer flex items-center justify-center min-w-[94px]"
              leftIcon={
                <Img
                  className="h-6 mb-px mr-2"
                  src="images/img_search.svg"
                  alt="search"
                />
              }
            >
              <Link to={'/scheduled-visits'} className="font-light font-manrope text-white-A700 text-left text-sm">
                Scheduled Visits
              </Link>
            </Button>
            <Link to={'chat'} 
              onClick={() => (true)}
              className="bg-gray-900 cursor-pointer font-manrope px-3 font-semibold py-3 rounded-full text-base text-center text-white-A700 w-full">
              <IoChatbubble />
            </Link>
            <Button
              onClick={toggleDropdown}
              className="relative bg-gray-900 cursor-pointer font-manrope font-semibold p-3 rounded-full text-base text-center text-white-A700 w-full"
            >
              <FaBell className=""/>
              {unreadCount > 0 && (
                  <span className="absolute bg-red-500 text-white-A700 px-1.5 py-0.5 text-xs font-bold rounded-full -top-2 -right-2">
                      {unreadCount}
                  </span>
              )}                
                {isDropdownOpen && (
                <div className="absolute bg-white-A700 max-h-[80vh] overflow-y-auto right-0 mt-2 bg-white rounded-md shadow-lg overflow-hidden z-20" style={{ width: '20rem' }}>
                  <div className="py-2">
                    {notifications.map((notification, index) => (
                      <div key={index} className="flex bg-white-A700 text-gray-900 text-[15px] items-center px-4 py-3 border-b hover:bg-gray-100 -mx-2">
                        <span>{notification.message}</span>
                      </div>
                    ))}
                  </div>
                  <Link to="#" className="block bg-gray-800 text-white text-center font-bold py-2">
                    See all notifications
                  </Link>
                </div>
            )}
          </Button>    
            <Button 
            onClick={() => setIsLoginModalOpen(true)}
            className="bg-gray-900 cursor-pointer font-manrope px-3 font-semibold py-3 rounded-full text-base text-center text-white-A700 w-full">
            <FaUserAlt />
            </Button>
          </div>
        </div>
      </header>
      
       {/* Login Modal */}
       <LogInModal isOpen={isLoginModalOpen} onRequestClose={closeLoginModal} 
        onToggleCreateAccountModal={handleToggleCreateAccountModal}
        />
       <CreateAccountModal isOpen={isCreateAccountModalOpen} onToggleLoginModal={handleToggleLoginModal} 
       onRequestClose={closeCreateAccountModal} /> 
    </>
  )
}

export default MainHeader
