import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import trashIcon from "../assets/icons/trash/trash.png";
import pencil from "../assets/icons/pencil/pencil.png";

interface EditTaskArguments {
  taskId: number;
  taskNewTitle: string;
}

interface TaskItemProps {
  task: {
    id: number;
    title: string;
    done: boolean;
  };
  index: number;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: ({ taskId, taskNewTitle }: EditTaskArguments) => void;
}

export function TaskItem({
  task,
  index,
  toggleTaskDone,
  removeTask,
  editTask,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [taskNewTitle, setTaskNewTitle] = useState(task.title);

  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setIsEditing(true);
  }

  function handleCancelEditing() {
    setTaskNewTitle(task.title);

    setIsEditing(false);
  }

  function handleSubmitEditing() {
    editTask({
      taskId: task.id,
      taskNewTitle: taskNewTitle,
    });
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current?.focus();
      } else {
        textInputRef.current?.blur();
      }
    }
  }, [isEditing]);

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
        >
          <View
            testID={`marker-${index}`}
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {task.done && <Icon name="check" size={12} color="#FFF" />}
          </View>
          {isEditing ? (
            <TextInput
              value={taskNewTitle}
              onChangeText={setTaskNewTitle}
              editable={isEditing}
              onSubmitEditing={handleSubmitEditing}
              style={task.done ? styles.taskTextDone : styles.taskText}
              ref={textInputRef}
            />
          ) : (
            <Text style={task.done ? styles.taskTextDone : styles.taskText}>
              {task.title}
            </Text>
          )}
        </TouchableOpacity>
      </View>

      <View>
        <View>
          {isEditing ? (
            <TouchableOpacity onPress={handleCancelEditing}>
              <Icon name="x" size={24} color="#b2b2b2" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleStartEditing}>
              <Image source={pencil} />
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          testID={`trash-${index}`}
          style={{ paddingHorizontal: 24 }}
          disabled={isEditing}
          onPress={() => removeTask(task.id)}
        >
          <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  iconsContainer: {
    display: "flex",
  },
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskText: {
    color: "#666",
    fontFamily: "Inter-Medium",
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskTextDone: {
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter-Medium",
  },
  iconsDivider: {
    width: 1,
    height: 24,
    color: "rgba(196, 196, 196, 0.24)",
  },
});
