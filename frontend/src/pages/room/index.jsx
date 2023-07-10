import React from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

const RoomPage = () => {
  const { roomId } = useParams();
  console.log(roomId);
  const myMeeting = (element) => {
    const appID = 942082111;
    const serverSecret = "ea73d32cbcc47884c6a7fa46afe3fd87";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,
      Date.now().toString(),
      "tony"
    );

    //store this url in the appointment collection and use it when use click the active session

    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: element,
      // sharedLinks: [
      //   {
      //       name:"Copy Link",
      //       url:`localhost:3000/room/${roomId}`
      //   }
      // ],
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
       },
       showScreenSharingButton:false,
    })
  };

  return (
    <div
      className="myCallContainer"
      ref={myMeeting}
      style={{ width: '100vw', height: '100vh' }}
    ></div>
  );
};

export default RoomPage;
