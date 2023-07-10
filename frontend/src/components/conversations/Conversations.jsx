// import { useEffect, useState } from "react";
// import "./conversations.css";
// import axios from "axios";
// const image_path = "http://localhost:4000/images/";
// const Conversations = ({ conversation, currentUser }) => {
//   const [user, setUser] = useState(null);
//   useEffect(() => {
//     const friendId = conversation.members.find((m) => m !== currentUser.id);
//     const getUser = async () => {
//       try {
//         const res = await axios(
//           "http://localhost:4000/conversation/chatUser/" + friendId
//         );
//         console.log(res);
//         setUser(res.data);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     getUser();
//   }, [currentUser, conversation]);

//   return (
//     <div className="conversation">
//       <img
//         className="conversationImg"
//         src={
//           user?.profilePicture
//             ? image_path + user.profilePicture
//             : "https://www.seekpng.com/png/detail/428-4287240_no-avatar-user-circle-icon-png.png"
//         }
//         alt=""
//       />
//       <span className="conversationName">{user?.name}</span>
//     </div>
//   );
// };

// export default Conversations;

import { useEffect, useState } from "react";
import "./conversations.css";
import axios from "axios";
const image_path = "http://localhost:4000/images/";
const Conversations = ({ conversation, currentUser }) => {
  const [user, setUser] = useState(null);
  const [doctor, setDoctor] = useState(null);
  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser.id);
    const getUser = async () => {
      try {
        const res = await axios(
          "http://localhost:4000/conversation/chatUser/" + friendId
        );
        setUser(res.data?.user);
        setDoctor(res.data?.doctor);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={
          user?.profilePicture
            ? image_path + user.profilePicture
            : "https://www.seekpng.com/png/detail/428-4287240_no-avatar-user-circle-icon-png.png"
        }
        alt=""
      />
      <span className="conversationName">
        {user ? user?.name : doctor?.name}
        {/* {doctor?.name} */}
      </span>
    </div>
  );
};

export default Conversations;
