import React from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";

const EditTask = ({
  styles,
  editingId,
  editingText,
  setEditingText,
  onSave,
}: any) => {
  if (editingId == null) return null;

  return (
    <View style={styles.inputRow}>
      <TextInput
        style={styles.input}
        value={editingText}
        onChangeText={setEditingText}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={onSave}
      >
        <Text style={styles.addButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditTask;