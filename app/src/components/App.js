import React from "react";
import ContactsProvider from "../contexts/ContactsProvider";
import ConversationsProvider from "../contexts/ConversationsProvider";
import { SocketProvider } from "../contexts/SocketProvider";
import useLocalStorgae from "../hooks/useLocalStorage";
import DashBoard from "./DashBoard";
import Login from "./Login";

function App() {
  const [id, setId] = useLocalStorgae("id");

  const dashboard = (
    <SocketProvider id={id}>
      <ContactsProvider>
        <ConversationsProvider id={id}>
          <DashBoard id={id} />
        </ConversationsProvider>
      </ContactsProvider>
    </SocketProvider>
  );

  return <>{id ? dashboard : <Login onIdSubmit={setId} />}</>;
}

export default App;
