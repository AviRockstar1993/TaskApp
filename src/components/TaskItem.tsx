import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import CheckBox from "@react-native-community/checkbox";

const TaskItem = ({
  item,
  styles,
  pendingCompleted,
  onToggle,
  onEdit,
  onDelete,
}: any) => {
  return (
    <View style={styles.taskItem}>

      <View
        style={{
          transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }],
        }}
      >
        <CheckBox
          value={pendingCompleted.includes(item.id)}
          onValueChange={() => onToggle(item.id)}
          tintColors={{
            true: "#4CAF50",
            false: "#999",
          }}
        />
      </View>

      <Text
        style={[
          styles.taskText,
          item.completed ? styles.completedText : {},
        ]}
      >
        {item.title}
      </Text>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => onEdit(item)}
        >
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => onDelete(item.id)}
        >
          <Text style={styles.actionText}>Delete</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

export default TaskItem;