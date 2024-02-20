import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Img, Input, Line, List, Text } from 'components';
import { formatRelativeTime } from '../../utils/TimeUtils'
import axiosInstance from 'api/axios';

function UserChat() {
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [socket, setSocket] = useState(null)
    const [chattedUsers, setChattedUser] = useState([])
    const userId = useSelector(state => state.auth.userId)
    const { ownerId } = useParams() 
    const navigate = useNavigate()
    const [selectedChatterId, setSelectedChatterId] = useState(ownerId);
    
    useEffect(() => {
      console.log(userId)
      const roomName = `${userId}_${ownerId}`;
      console.log(roomName)
      const chatSocket = new WebSocket(
        `ws://127.0.0.1:8006/ws/chat/${roomName}/`
        );
        setSocket(chatSocket);
      }, [userId, ownerId])
      
      
    useEffect(() => {
      if (socket) {
        socket.onopen = () => {
          console.log('websocket connetion opened')
        };
        
        socket.onmessage = (e) => {
          const data = JSON.parse(e.data);
              console.log('onmessage worked:',data);
              setMessages((prevMessages) => [...prevMessages, data]);
              console.log()
            };
            
            socket.onclose = (e) => {
              console.error('Chat socket closed unexpectedly');
            };
            
            return () => {
              // Cleanup WebSocket connection when component unmounts
              socket.close();
            };
          }
        }, [socket])
      
      
      useEffect(() => {
        const loadMessages = async () => {
          try {
            const response = await axiosInstance.get(`/chat/chatmessages/${userId}/${ownerId}/`)
            console.log('messages loaded:', response.data)
            setMessages(response.data)
          } catch (error) {
            console.log('error retrieving messages', error)
          }
        }
        loadMessages();
      }, [userId, ownerId])

      useEffect(() => {
        const fetchUsersChattedWith = async () => {
          try {
            console.log('userid:',userId)
            const response = await axiosInstance.get(`/chat/users_chatted_with/${userId}`)
            console.log('chatted users loaded:',response.data)
            setChattedUser(response.data)
          } catch (error) {
            console.log('error retrieving messages', error)
          }
        }
        fetchUsersChattedWith();
      }, [ownerId])
          

      const handleSendMessage = async () => {
        try {
            const newMessage = {
                sender: userId,
                receiver: ownerId,
                message_content: messageInput,
            };
            const response = await axiosInstance.post('/chat/create/', newMessage);
            console.log(response.data)

            if (socket) {
                socket.send(JSON.stringify(newMessage));
                console.log('message send')

                setMessageInput('');    
            }
        } catch (error) {
            console.error('error sending messages:', error);
        }

        setMessageInput('');
    };

    
    
  return (
  <div>
    <div class="flex h-screen antialiased font-manrope text-gray-800 ">
      <div class="flex flex-row h-full w-full overflow-y-hidden">
        <div class="flex flex-col py-8 pl-6 pr-1 w-72 bg-white ">
          <div class="flex flex-row items-center justify-center h-12 w-full">
            <div
              class="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              ></path>
            </svg>
          </div>
          <div class="ml-2 font-extrabold font-manrope text-2xl">RentEzy Chat</div>
        </div>
       
        <div class="flex flex-col mt-8">
          <div class="flex flex-row items-center justify-between text-xs">
            <span class="font-bold">Active Conversations</span>
            <span
              class="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">4</span>
          </div>
          <div class="flex flex-col space-y-1 mt-4 -mx-2 h-[28rem] overflow-y-auto">

          {chattedUsers.map((chattedUser, index) => (
            <button 
            className={`flex flex-row items-center rounded-xl p-2 ${
              selectedChatterId === chattedUser.id ? 'bg-gray-100' : 'hover:bg-gray-100'
            }`}            
            onClick={() => {
              setSelectedChatterId(chattedUser.id);
              navigate(`/chat/${chattedUser.id}`);
            }}
            >
            <div class="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                     {chattedUser.username.charAt(0).toUpperCase()}
             </div>
              <div class="ml-2 text-sm font-semibold">{chattedUser.username}</div>
            </button>
          ))}
          
           
            {/* <button class="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
              <div class="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full" > H</div>
              <div class="ml-2 text-sm font-semibold">Henry Boyd</div>
          <div class="flex items-center justify-center ml-auto text-xs text-white bg-red-500 h-4 w-4 rounded leading-none">
            2
          </div>
          </button> */}

           
          </div>
        </div>
      </div>
      <div class="flex flex-col flex-auto h-full p-6">
        <div class="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-50 h-full p-4">
          <div class="flex flex-col h-full overflow-x-auto mb-4">
            <div class="flex flex-col h-full">
              <div class="grid grid-cols-12 gap-y-2">

              {messages.map((message, index) => (
                <>
                  {message.sender === userId ? (
                <div class="col-start-6 col-end-13 p-3 rounded-lg">
                  <div class="flex items-center justify-start flex-row-reverse">
                    <div class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">A</div>
                    <div class="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                      <div>{message.message_content}</div>
                      <div class="absolute text-[9px] w-3 bottom-0 right-0 -mb-5 mr-9 text-gray-500 whitespace-nowrap">{formatRelativeTime(message.timestamp)}</div>
                    </div>
                  </div>
                </div>

                  ) : (

                <div class="col-start-1 col-end-8 p-3 rounded-lg">
                  <div class="flex flex-row items-center">
                    <div class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">A</div>
                    <div class="relative ml-3 text-sm font-manrope bg-white-A700 py-2 px-4 shadow rounded-xl" >
                      <div>{message.message_content}</div>
                      <div class="absolute text-[9px] w-3 bottom-0 left-0 -mb-5 ml-1 text-gray-500 whitespace-nowrap">{formatRelativeTime(message.timestamp)}</div>
                    </div>
                  </div>
                </div>
                    )}

                </>
                     ))}

              

                
              </div>
            </div>
          </div>
          <div
            class="flex flex-row items-center h-16 rounded-xl bg-white-A700 w-full px-4"
          >
            <div>
              <button
                class="flex items-center justify-center text-gray-400 hover:text-gray-600"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                  ></path>
                </svg>
              </button>
            </div>
            <div class="flex-grow ml-4">
              <div class="relative w-full">
                <input
                  type="text"
                  class="flex w-full border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                />
                <button
                  class="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600"
                >
                  <svg
                    class="w-6 h-6"

                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
            <div class="ml-4">
              <button
                class="flex items-center text-white-A700 justify-center bg-blue-400 py-2 hover:bg-indigo-600 rounded-xl text-white px-4 flex-shrink-0"
                onClick={handleSendMessage}
              >
                <span>Send</span>
                <span class="ml-2">
                  <svg
                    class="w-4 h-4 transform rotate-45 -mt-px"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    ></path>
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    </div>
  )
}

//  <div className="flex flex-col h-screen bg-gray-100">
//       {/* <ChatHeader name={name} image={img} /> */}
//          {/* {userId} {doctorId} */}
//          <div className="flex-grow overflow-y-auto px-4 py-8" >
//              {messages.map((message, index) => (
//                      <div key={index} className={`flex flex-col mb-4 ${message.sender == userId ? 'items-end' : 'items-start'}`}>
//                          <div className={`rounded-lg p-2 max-w-xs ${message.sender == userId ? 'bg-blue-500 text-white-A700 rounded-2xl p-3' : 'bg-white-A700 text-gray-800 rounded-2xl p-3'}`}>{message.message_content}</div>
//                          <div className="text-xs text-gray-400 mt-1 ml-2">{/* {formatRelativeTime(message.timestamp)} */}</div>
//                      </div>
//                  ))}
//          </div>
//          <div className="bg-white p-4 border-t flex">
//              <input
//                  className="border rounded p-2 w-full"
//                  type="text"
//                  placeholder="Type your message..."
//                  value={messageInput}
//                  onChange={(e) => setMessageInput(e.target.value)}
//              />
//              <button
//                  className="ml-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                  onClick={handleSendMessage}
//              >
//                  Send
//              </button>
//          </div>
//      </div>
export default UserChat
