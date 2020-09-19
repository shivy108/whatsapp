import React from "react";
import ContactsProvider from "../contexts/ContactsProvider";
import useLocalStorgae from "../hooks/useLocalStorgae";
import DashBoard from "./DashBoard";
import Login from "./Login";



function App() {
  const [id, setId] = useLocalStorgae("id");

  const dashboard=(
    <ContactsProvider>
      <DashBoard id={id}/>
    </ContactsProvider>
  )

  return <>{id ? dashboard : <Login onIdSubmit={setId} />}</>;
}

export default App;
