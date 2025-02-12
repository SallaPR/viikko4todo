import { Pressable, StyleSheet, Text } from "react-native";
import React from "react";

export default function Row({ item, select, taskCompleted }) {
  const textDecorationLine = item.completed ? "line-through" : "none";
  return (
    <Pressable
      onPress={() => {
        select(item.id);
        taskCompleted(item.id);
      }}
    >
      <Text style={[styles.row, { textDecorationLine }]}>{item.task}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    fontSize: 20,
    marginBottom: 8,
  },
});
