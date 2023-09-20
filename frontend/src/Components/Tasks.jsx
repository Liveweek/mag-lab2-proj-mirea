import React from "react";
import { Container, SimpleGrid, Text } from "@chakra-ui/react";
import TaskBlock from "./TaskBlock";

function Tasks({data, changer}) {
  return (
    <Container paddingTop="5" maxW="8xl" color="white">
      {data && data.length > 0 ? (
        <SimpleGrid columns={4} spacing="40px">
          {data.map((e) => (
            <TaskBlock info={e} flagState={changer} />
          ))}
        </SimpleGrid>
      ) : (
        <Text color="gray" w="100%" textAlign="center" fontSize="4xl">
          Пока нет задач
        </Text>
      )}
    </Container>
  );
}

export default Tasks;
