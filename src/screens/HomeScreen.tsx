import React, { useState } from 'react';
import {
  View,
  Alert,
  useColorScheme,
} from 'react-native';

import { LightTheme, DarkTheme } from '../utills/colors';
import { createStyles } from '../styles/HomeStyles';

import Header from '../components/Header';
import AddTask from '../components/AddTask';
import EditTask from '../components/EditTask';
import TaskList from '../components/TaskList';
import SaveButton from '../components/SaveButton';

import { logout } from '../services/firebase';
import { showToast } from '../utills/showToast';

import { useTasks } from '../customHooks/useTasks';
import { useUserProfile } from '../customHooks/useUserProfile';
import { useSaveCompletedTasks } from '../customHooks/useSaveCompletedTask';

const HomeScreen: React.FC = ({ navigation, route }: any) => {
  const colorScheme = useColorScheme();

  const theme =
    colorScheme === 'dark'
      ? DarkTheme
      : LightTheme;

  const styles = createStyles(theme);

  const displayName = useUserProfile(route);

  const {
    tasks,
    pendingCompleted,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
  } = useTasks();

  const { saveCompletedTasks } =
    useSaveCompletedTasks(
      tasks,
      pendingCompleted
    );

  const [text, setText] = useState('');
  const [editingId, setEditingId] =
    useState<number | null>(null);
  const [editingText, setEditingText] = useState('');

  const handleAdd = async () => {
    const title = text.trim();

    if (!title) return;

    try {
      await addTask(title);
      setText('');
    } catch (error) {
      console.log(error);

      showToast(
        'Unable to add task. Please try again.',
        'error',
        'bottom'
      );
    }
  };

  const handleEditSave = async () => {
    if (editingId == null) return;

    const title = editingText.trim();

    if (!title) return;

    try {
      await updateTask(editingId, title);

      setEditingId(null);
      setEditingText('');

    } catch (error) {
      console.log(error);

      showToast(
        'Unable to edit task. Please try again.',
        'error',
        'bottom'
      );
    }
  };

  const handleDelete = (id: number) => {
    Alert.alert(
      'Delete',
      'Delete this task?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteTask(id);
            } catch (error) {
              console.log(error);

              showToast(
                'Unable to delete task. Please try again.',
                'error',
                'bottom'
              );
            }
          },
        },
      ]
    );
  };

  const handleLogout = async () => {
    try {
      await logout();

      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
      Alert.alert(
        'Logout Successful',
        'You have been logged out.'
      );

    } catch (error: any) {
     Alert.alert("Logout Failed", error.message || "An error occurred during logout.");
    }
  };

  const handleEdit = (task: any) => {
    setEditingId(task.id);
    setEditingText(task.title);
  };

  return (
    <View style={styles.container}>

      <Header
        styles={styles}
        displayName={displayName}
        onLogout={handleLogout}
      />

      <View style={styles.listContainer}>

        <AddTask
          styles={styles}
          theme={theme}
          text={text}
          setText={setText}
          onAdd={handleAdd}
        />

        <EditTask
          styles={styles}
          editingId={editingId}
          editingText={editingText}
          setEditingText={setEditingText}
          onSave={handleEditSave}
        />

        <TaskList
          tasks={tasks}
          styles={styles}
          pendingCompleted={pendingCompleted}
          onToggle={toggleTask}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

      </View>

      <SaveButton
        styles={styles}
        visible={pendingCompleted.length > 0}
        onPress={saveCompletedTasks}
      />

    </View>
  );
};

export default HomeScreen;