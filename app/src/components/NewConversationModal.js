import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useContacts } from "../contexts/ContactsProvider";
import { useConversations } from "../contexts/ConversationsProvider";

const NewConversationModal = ({ closeModal }) => {
  const { contacts } = useContacts();
  const { createConversations } = useConversations();
  const [selectedContactIds, setSelectedContactIds] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();
    createConversations(selectedContactIds);
    closeModal();
  };

  const handleCheckBoxChange = (contactId) => {
    setSelectedContactIds((prevContactIds) => {
      if (prevContactIds.includes(contactId)) {
        return prevContactIds.filter((prevId) => {
          return prevId !== contactId;
        });
      } else {
        return [...prevContactIds, contactId];
      }
    });
  };

  return (
    <>
      <Modal.Header closeButton>Create Conversation</Modal.Header>
      <Modal.Body>
        <Form onSubmit={submitHandler}>
          {contacts.map((contact) => (
            <Form.Group controlId={contact.id} key={contact.id}>
              <Form.Check
                type="checkbox"
                value={selectedContactIds.includes(contact.id)}
                label={contact.name}
                onChange={() => handleCheckBoxChange(contact.id)}
              />
            </Form.Group>
          ))}
          <Button type="submit">Create</Button>
        </Form>
      </Modal.Body>
    </>
  );
};

export default NewConversationModal;
