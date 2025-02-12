import { Button, StyleSheet,TextInput, View } from "react-native";
import React, { useState } from "react";

export default function AddForm({add}) {
  const [task, setTask] = useState("");

  const save = () => {
    add(task)
    setTask("")
  }

  return (
    <View style={styles.container}>
      <TextInput
        value={task}
        onChangeText={(text) => setTask(text)}
        placeholder="New task"
      />
      <Button title="Save" onPress={save}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 8,
  },
});
