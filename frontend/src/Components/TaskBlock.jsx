import React from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Flex,
  Heading,
  Highlight,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import API from "../api";

function TaskBlock({ info, flagState }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const deleteTodosById = (id) => {
    axios({
      method: "delete",
      url: API + `/todos/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        flagState(response)
      })
      .catch(function (error) {});
  };
  const postTodosByIdComplete = (id) => {
    axios({
      method: "post",
      url: API + `/todos/${id}/complete`,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        onOpen();
        flagState(response)
      })
      .catch(function (error) {});
  };
  return (
    <Box borderRadius={10} padding={3} bg="blue.600">
      <Heading as="h4" textAlign="center" size="md">
        {info.task_name}
      </Heading>
      <Text marginBottom={2} textAlign="justify" fontSize="md">
        {info.task_description}
      </Text>
      {info.is_completed ? (
        <Highlight
          fontSize="md"
          query={"Выполнено"}
          styles={{ px: "1", py: "1", bg: "green.200", rounded: "lg" }}
        >
          Выполнено
        </Highlight>
      ) : (
        <Highlight
          fontSize="md"
          query={"В процессе"}
          styles={{ px: "1", py: "1", bg: "yellow.200", rounded: "lg" }}
        >
          В процессе
        </Highlight>
      )}
      <Flex alignItems="center" justifyContent="space-between" marginTop={2}>
        <Button
          onClick={() => deleteTodosById(info.id)}
          colorScheme="red"
        >
          Удалить
        </Button>
        {!info.is_completed && (
          <Button
            onClick={() => postTodosByIdComplete(info.id)}
            colorScheme="blue"
          >
            Выполнить
          </Button>
        )}
      </Flex>
      <AlertDialog isOpen={isOpen} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Успех
            </AlertDialogHeader>
            <AlertDialogBody>Действие успешно совершено</AlertDialogBody>
            <AlertDialogFooter>
              <Button colorScheme="blue" onClick={onClose}>
                Закрыть
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
}

export default TaskBlock;
