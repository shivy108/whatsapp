import React, { useState } from "react";
import { Button, Modal, Nav, Tab } from "react-bootstrap";
import Contacts from "./Contacts";
import Converstations from "./Converstations";
import NewContactModal from "./NewContactModal";
import NewConversationModal from "./NewConversationModal";

const CONTACTS_KEY = "contacts";
const CONVERSTATION_KEY = "conversations";

function Sidebar({ id }) {
  const [activeKey, setActiveKey] = useState(CONVERSTATION_KEY);
  const [modalOpen,setModalOpen]=useState(false)
  const converstationOpen = activeKey === CONVERSTATION_KEY;

const closeModal=()=>{
setModalOpen(false)
}

  return (
    <div style={{ width: "250px" }} className="d-flex flex-column">
      <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
        <Nav variant="tabs" className="justify-content-center">
          <Nav.Item>
            <Nav.Link eventKey={CONTACTS_KEY}>Contacts</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={CONVERSTATION_KEY}>Conversations</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content className="border-right overflow-auto flex-grow-1">
          <Tab.Pane eventKey={CONVERSTATION_KEY}>
            <Converstations />
          </Tab.Pane>
          <Tab.Pane eventKey={CONTACTS_KEY}>
            <Contacts />
          </Tab.Pane>
        </Tab.Content>
        <div className="p-2 borde-top border-right small ">
          <span className="text-muted">{id}</span>
        </div>
        <Button onClick={()=>setModalOpen(true)} className="rounded-0">
          New {converstationOpen ? "Converstaion" : "Contact"}
        </Button>
      </Tab.Container>
      <Modal show={modalOpen} onHide={closeModal}>
        {converstationOpen ? <NewConversationModal closeModal={closeModal}/> : <NewContactModal closeModal={closeModal}/>}
      </Modal>
    </div>
  );
}

export default Sidebar;
