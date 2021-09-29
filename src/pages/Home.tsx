import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

interface EditTaskArguments {
  taskId: number;
  taskNewTitle: string;
}
export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskAlreadyExists = tasks.filter(
      (task) => task.title === newTaskTitle
    );

    if (taskAlreadyExists.length > 0) {
      Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome"
      );

      return;
    }

    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };

    setTasks((oldTasks) => [...oldTasks, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            done: !task.done,
          }
        : task
    );

    setTasks([...updatedTasks]);
  }

  function handleEditTask({ taskId, taskNewTitle }: EditTaskArguments) {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId
        ? {
            ...task,
            title: taskNewTitle,
          }
        : task
    );

    setTasks([...updatedTasks]);
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "sim",
          onPress: () =>
            setTasks((oldTasks) => oldTasks.filter((task) => task.id !== id)),
          style: "default",
        },
      ]
    );
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
