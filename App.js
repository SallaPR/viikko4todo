import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import Row from "./components/Row";
import AddForm from "./components/AddForm";
import { useCallback, useEffect, useState } from "react";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem("tasks");
        if (storedTasks) {
          setTasks(JSON.parse(storedTasks));
        }
      } catch (error) {
        console.log(error);
      }
    };
    loadTasks();
  }, []);

  const saveTasks = async (newTasks) => {
    try {
      await AsyncStorage.setItem("tasks", JSON.stringify(newTasks));
    } catch (error) {
      console.log(error);
    }
  };

  const add = useCallback(
    (task) => {
      const newTask = {
        id: uuid.v4(),
        task: task,
        completed: false,
      };
      const tempTasks = [...tasks, newTask];
      setTasks(tempTasks);
      saveTasks(tempTasks);
    },
    [tasks]
  );

  const taskCompleted = useCallback(
    (id) => {
      const updatedTasks = tasks.map((task) => {
        if (task.id === id) {
          return { ...task, completed: !task.completed };
        }
        return task;
      });
      setTasks(updatedTasks);
      saveTasks(updatedTasks);
    },
    [tasks]
  );

  return (
    <SafeAreaView style={styles.container}>
      <AddForm add={add} />
      <FlatList
        style={styles.list}
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Row
            item={item}
            select={setSelectedId}
            taskCompleted={taskCompleted}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingTop: 40,
  },
  list: {
    marginLeft: 8,
    marginTop: 16,
  },
});
