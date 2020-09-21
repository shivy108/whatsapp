import React, { useCallback, useContext, useEffect, useState } from "react";
import useLocalStorgae from "../hooks/useLocalStorage";
import { useContacts } from "./ContactsProvider";
import { useSocket } from "./SocketProvider";

const ConversationsContext = React.createContext();

export function useConversations() {
  return useContext(ConversationsContext);
}

const ConversationsProvider = ({ id, children }) => {
  const [conversations, setConversations] = useLocalStorgae(
    "conversations",
    []
  );
  const { contacts } = useContacts();
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);
  const socket  = useSocket();

  function createConversations(recipients) {
    setConversations((prevConversations) => {
      return [...prevConversations, { recipients, messages: [] }];
    });
  }

  const formattedConversations = conversations.map((conversation, index) => {
    const recipients = conversation.recipients.map((recipient) => {
      const contact = contacts.find((contact) => {
        return contact.id === recipient;
      });
      const name = (contact && contact.name) || recipient;
      return { id: recipient, name };
    });
    const messages = conversation.messages.map((message) => {
      const contact = contacts.find((contact) => {
        return contact.id === message.sender;
      });
      const name = (contact && contact.name) || message.sender;
      const fromMe = id === message.sender;
      return { ...message, senderName: name, fromMe };
    });

    const selected = index === selectedConversationIndex;
    return { ...conversation, messages, recipients, selected };
  });

  const addMessageToConversation = useCallback(
    ({ recipients, text, sender }) => {
      setConversations((prevConversations) => {
        let madeChange = false;
        const newMessage = { sender, text };
        const newConversations = prevConversations.map((c) => {
          if (arrayEquality(c.recipients, recipients)) {
            madeChange = true;
            return {
              ...c,
              messages: [...c.messages, newMessage],
            };
          }
          return c;
        });
        if (madeChange) {
          return newConversations;
        } else {
          return [...prevConversations, { recipients, messages: [newMessage] }];
        }
      });
    },
    [setConversations]
  );

  useEffect(() => {
    if (socket == null) return

    socket.on('receive-message', addMessageToConversation)

    return () => socket.off('receive-message')
  }, [socket, addMessageToConversation])


  function sendMessage(recipients, text) {
    socket.emit('send-message', { recipients, text })

    addMessageToConversation({ recipients, text, sender: id })
  }

  const value = {
    conversations: formattedConversations,
    createConversations,
    selectConversationIndex: setSelectedConversationIndex,
    selectedConversation: formattedConversations[selectedConversationIndex],
    sendMessage,
  };
  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  );
};

export default ConversationsProvider;

const arrayEquality = (a, b) => {
  if (a.length !== b.length) return false;

  a.sort();
  b.sort();
  return a.every((el, index) => {
    return el === b[index];
  });
};
