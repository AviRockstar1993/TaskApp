import React from "react";
import { TouchableOpacity, Text } from "react-native";

const SaveButton = ({
  styles,
  visible,
  onPress,
}: any) => {

  if (!visible) return null;

  return (
    <TouchableOpacity
      style={styles.checkedView}
      onPress={onPress}
    >
      <Text style={styles.itemText}>
        Save Completed Tasks
      </Text>
    </TouchableOpacity>
  );
};

export default SaveButton;