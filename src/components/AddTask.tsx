import React from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";

const AddTask = ({
  styles,
  theme,
  text,
  setText,
  onAdd,
}: any) => {
  return (
    <View style={styles.taskCard}>
      <Text style={styles.title}>Create New Task</Text>
      <Text style={styles.subtitle}>
        Add a task to keep track of your work.
      </Text>

      <View style={styles.inputRow}>
       <TextInput
  style={styles.input}
  placeholder="Enter your task..."
  placeholderTextColor={theme.subText}
  value={text}
  onChangeText={setText}
  returnKeyType="done"
/>

        <TouchableOpacity
          style={styles.addButton}
          onPress={onAdd}
          activeOpacity={0.8}
        >
          <Text style={styles.addButtonText}>＋ Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddTask;