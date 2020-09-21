import React, { useContext, useState } from "react";
import useLocalStorgae from "../hooks/useLocalStorage";
import { useContacts } from "./ContactsProvider";

const ConversationsContext = React.createContext()

export function useConversations() {
  return useContext(ConversationsContext)
}

const ConversationsProvider = ({ children }) => {
  const [conversations, setConversations] = useLocalStorgae("conversations", []);
  const {contacts}= useContacts()
  const [selectedConversationIndex,setSelectedConversationIndex]=useState(0)

  function createConversations(recipients) {
    setConversations(prevConversations => {
      return [...prevConversations, { recipients, messages:[] }]
    })
  }
  const formattedConversations= conversations.map((conversation,index)=>{
      const recipients = conversation.recipients.map(recipient=>{
          const contact= contacts.find(contact=>{
              return contact.id === recipient
          })
          const name = (contact && contact.name) || recipient
          return {id: recipient,name}
      })
      const selected= index === selectedConversationIndex
      return {...conversation,recipients,selected}
  })

const value = {
    conversations: formattedConversations,
    createConversations,
    selectConversationIndex:setSelectedConversationIndex,
    selectedConversation: formattedConversations[selectedConversationIndex]
}
  return (
    <ConversationsContext.Provider value={ value}>
      {children}
    </ConversationsContext.Provider>
  );
};

export default ConversationsProvider;
