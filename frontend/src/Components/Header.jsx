import {
  Box,
  Button,
  Input,
  Textarea,
  Container,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";

import React, { useState } from "react";
import API from "../api";

function Header({ changer }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ name, setName ] = useState("");
  const [ desc, setDesc ] = useState("");
  const createTask = (setState) => {
    axios({
      method: "post",
      url: API + "/todos",
      headers: {
          "Content-Type": "application/json",
      },
      data: {
        "task_name": name,
        "task_description": desc
      }
  })
      .then(function (response) {
          changer(response);
          onClose()
      })
      .catch(function (error) {
      });
  }
  return (
    <Container paddingTop="5" maxW="8xl" color="white">
      <Flex
        minWidth="max-content"
        justifyContent="space-between"
        alignItems="center"
        gap="2"
      >
        <Box p="2">
          <Heading size="md">Управление задачами</Heading>
        </Box>
        <Button onClick={onOpen} colorScheme="blue">
          Создать задачу
        </Button>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Создание задачи</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              variant="filled"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Наименование задачи"
              marginBottom={2}
            />
            <Textarea value={desc} variant="filled" placeholder="Описание задачи" onChange={(e) => setDesc(e.target.value)} />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Закрыть
            </Button>
            <Button colorScheme="blue" mr={3} onClick={createTask}>
              Создать
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
}

export default Header;
