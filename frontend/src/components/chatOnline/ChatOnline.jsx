import "./chatOnline.css";

const ChatOnline = () => {
  return (
    <div className="chatOnline">
      <div className="chatOnlineFriend">
        <div className="chatOnlineImgContainer">
          <img
            // className="chatOnlineImg"
            // src={
            //   o?.profilePicture
            //     ? PF + o.profilePicture
            //     : PF + "person/noAvatar.png"
            // }
            alt=""
          />
          <div className="chatOnlineBadge"></div>
        </div>
        <span className="chatOnlineName">.</span>
      </div>
    </div>
  );
};

export default ChatOnline;
