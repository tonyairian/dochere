// import "./messanger.css";
// import UserNavbar from "../../components/UserNavbar";
// import Conversations from "../../components/conversations/Conversations";
// import Message from "../../components/message/Message";
// import ChatOnline from "../../components/chatOnline/ChatOnline";
// import { useSelector } from "react-redux";
// import { useEffect, useRef, useState } from "react";
// import axios from "axios";
// import { io } from "socket.io-client";
// import jwtDecode from "jwt-decode";
// import Cookies from "universal-cookie";
// const Messanger = () => {
//   const User = useSelector((store) => store.user);
//   const doctorRedux = useSelector((store) => store.doctor);
//   console.log(doctorRedux);
//   const [conversations, setConversations] = useState([]);
//   const [currentChat, setCurrentChat] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [onlineUsers, setOnlineUsers] = useState([]);
//   const [arrivalMessage, setArrivalMessage] = useState(null);
//   const scrollRef = useRef();
//   const socket = useRef(io("ws://localhost:4000"));

//   useEffect(() => {
//     socket.current = io("ws://localhost:4000");
//     socket.current.on("getMessage", (data) => {
//       setArrivalMessage({
//         sender: data.senderId,
//         text: data.text,
//         createdAt: Date.now(),
//       });
//     });
//   }, []);

//   useEffect(() => {
//     arrivalMessage &&
//       currentChat?.members.includes(arrivalMessage.sender) &&
//       setMessages((prev) => [...prev, arrivalMessage]);
//   }, [arrivalMessage, currentChat]);

//   useEffect(() => {
//     socket.current.emit("addUser", User.id);
//     socket.current.on("getUsers", (users) => {
//       // console.log(users);
//       // setOnlineUsers(
//       //   user.followings.filter((f) => users.some((u) => u.userId === f))
//       // );
//     });
//   }, [User]);

//   // useEffect(()=>{
//   // socket?.on("welcome",message=>{
//   // console.log(message);
//   // })
//   // },[socket])

//   useEffect(() => {
//     const getConversations = async () => {
//       try {
//         const res = await axios.get(
//           "http://localhost:4000/conversation/" + User.id
//         );

//         setConversations(res.data);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     getConversations();
//   }, [User.id]);

//   useEffect(() => {
//     const getMessages = async () => {
//       try {
//         const res = await axios.get(
//           "http://localhost:4000/message/" + currentChat?._id
//         );
//         setMessages(res.data);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     getMessages();
//   }, [currentChat]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const message = {
//       sender: User.id,
//       text: newMessage,
//       conversationId: currentChat._id,
//     };

//     const receiverId = currentChat.members.find((member) => member !== User.id);

//     socket.current.emit("sendMessage", {
//       senderId: User.id,
//       receiverId,
//       text: newMessage,
//     });

//     try {
//       const res = await axios.post("http://localhost:4000/message", message);
//       setMessages([...messages, res.data]);
//       setNewMessage("");
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     scrollRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   return (
//     <>
//       <UserNavbar />
//       <div className="messenger">
//         <div className="chatMenu">
//           <div className="chatMenuWrapper">
//             {conversations.map((c, i) => (
//               <div onClick={() => setCurrentChat(c)}>
//                 <Conversations conversation={c} currentUser={User} key={i} />
//               </div>
//             ))}

//           </div>
//         </div>
//         <div className="chatBox">
//           <div className="chatBoxWrapper">
//             {currentChat ? (
//               <>
//                 <div className="chatBoxTop">
//                   {messages.map((m, i) => (
//                     <div ref={scrollRef}>
//                       <Message message={m} own={m.sender === User.id} key={i} />
//                     </div>
//                   ))}
//                 </div>
//                 <div className="chatBoxBottom">
//                   <textarea
//                     className="chatMessageInput"
//                     placeholder="write something..."
//                     onChange={(e) => setNewMessage(e.target.value)}
//                     value={newMessage}
//                   ></textarea>
//                   <button className="chatSubmitButton" onClick={handleSubmit}>
//                     Send
//                   </button>
//                 </div>
//               </>
//             ) : (
//               <span className="noConversationText">
//                 Open a conversation to start a chat.
//               </span>
//             )}
//           </div>
//         </div>
//         <div className="chatOnline">
//           <div className="chatOnlineWrapper">
//             <ChatOnline
//               onlineUsers={onlineUsers}
//               currentId={User.id}
//               setCurrentChat={setCurrentChat}
//             />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Messanger;

import "./messanger.css";
import UserNavbar from "../../components/UserNavbar";
import Conversations from "../../components/conversations/Conversations";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import axios from "../../utils/axios/axios";
import { io } from "socket.io-client";
const Messanger = () => {
  const User = useSelector((store) => store.user);
  const Doctor = useSelector((store) => store.doctor);
  let commonUser;
  if (User.name !== "") {
    commonUser = User;
  }
  if (Doctor.name !== "") {
    commonUser = Doctor;
  }

  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();
  // const socket = useRef(io("ws://localhost:4000"));
  const socket = useRef(io("ws://server.dochere.online"));

  useEffect(() => {
    // socket.current = io("ws://localhost:4000");
    socket.current = io("ws://server.dochere.online");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", User.id);
    socket.current.on("getUsers", (users) => {
      // console.log(users);
      // setOnlineUsers(
      //   user.followings.filter((f) => users.some((u) => u.userId === f))
      // );
    });
  }, [User]);

  // useEffect(()=>{
  // socket?.on("welcome",message=>{
  // console.log(message);
  // })
  // },[socket])

  useEffect(() => {
    const getConversations = async () => {
      try {
        // const res = await axios.get(
        //   "http://localhost:4000/conversation/" + commonUser.id
        // );

        const res = await axios.get("/conversation/" + commonUser.id);

        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [commonUser.id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        // const res = await axios.get(
        //   "http://localhost:4000/message/" + currentChat?._id
        // );
        const res = await axios.get("/message/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: User.id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find((member) => member !== User.id);

    socket.current.emit("sendMessage", {
      senderId: User.id,
      receiverId,
      text: newMessage,
    });

    try {
      // const res = await axios.post("http://localhost:4000/message", message);
      const res = await axios.post("/message", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <UserNavbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            {conversations.map((c, i) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversations conversation={c} currentUser={User} key={i} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m, i) => (
                    <div ref={scrollRef}>
                      <Message message={m} own={m.sender === User.id} key={i} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={User.id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Messanger;
