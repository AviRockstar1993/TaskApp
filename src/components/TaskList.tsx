import React from 'react';
import { FlatList } from 'react-native';
import TaskItem from './TaskItem';
import { Task } from '../services/db';

interface Props {
  tasks: Task[];
  styles: any;
  pendingCompleted: number[];
  onToggle: (id: number) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

const TaskList: React.FC<Props> = ({
  tasks,
  styles,
  pendingCompleted,
  onToggle,
  onEdit,
  onDelete,
}) => {
  return (
    <FlatList
      data={tasks}
      keyExtractor={item => String(item.id)}
      renderItem={({ item }) => (
        <TaskItem
          item={item}
          styles={styles}
          pendingCompleted={pendingCompleted}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
    />
  );
};

export default TaskList;