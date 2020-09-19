import React, { useContext } from "react";
import useLocalStorgae from "../hooks/useLocalStorgae";

const ContactsContext = React.createContext();

export const useContacts = () => {
  return useContext(ContactsContext);
};

const ContactsProvider = ({ children }) => {
  const [contacts, setContacts] = useLocalStorgae("contacts", []);

  const createContact = ({ id, name }) => {
    setContacts((prevContacts) => {
      return [...prevContacts, { id, name }];
    });
  };
  return (
    <ContactsContext.Provider value={{ contacts, createContact }}>
      {children}
    </ContactsContext.Provider>
  );
};

export default ContactsProvider;
