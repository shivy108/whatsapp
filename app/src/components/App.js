import React from "react";
import ContactsProvider from "../contexts/ContactsProvider";
import ConversationsProvider from "../contexts/ConversationsProvider";
import useLocalStorgae from "../hooks/useLocalStorage";
import DashBoard from "./DashBoard";
import Login from "./Login";

function App() {
  const [id, setId] = useLocalStorgae("id");

  const dashboard = (
    <ContactsProvider>
      <ConversationsProvider>
        <DashBoard id={id} />
      </ConversationsProvider>
    </ContactsProvider>
  );

  return <>{id ? dashboard : <Login onIdSubmit={setId} />}</>;
}

export default App;
