import React from "react";
import { useConversations } from "../contexts/ConversationsProvider";
import OpenConversation from "./OpenConversation";
import Sidebar from "./Sidebar";

const DashBoard = ({ id }) => {
  const {selectedConversation}= useConversations()

  return (
    <div className="d-flex" style={{ height: "100vh" }}>
      <Sidebar id={id} />
      {selectedConversation && <OpenConversation/>}
    </div>
  );
};

export default DashBoard;
