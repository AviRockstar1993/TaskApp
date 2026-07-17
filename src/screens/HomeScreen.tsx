import React, { useEffect, useState } from 'react';
import { View, Alert, FlatList } from "react-native";
import { useColorScheme } from 'react-native';
import { LightTheme, DarkTheme } from '../utills/colors';
import { createStyles } from '../styles/HomeStyles';
import { isTaskAlreadySaved, logout, saveTasksToFirestore } from '../services/firebase';
import { initDB, Task } from '../services/db';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loadTasks, addTask as addTaskThunk, editTask, removeTask } from '../store/tasksSlice';
import EncryptedStorage from "react-native-encrypted-storage";
import Header from '../components/Header';
import AddTask from '../components/AddTask';
import EditTask from '../components/EditTask';
import TaskItem from '../components/TaskItem';
import SaveButton from '../components/SaveButton';
import { getCredentials } from '../utills/secureStorage';
import NetInfo from '@react-native-community/netinfo';
import { showToast } from '../utills/showToast';



const HomeScreen: React.FC = ({ navigation, route }: any) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? DarkTheme : LightTheme;
  const styles = createStyles(theme);

  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks.items) as Task[];
  const [text, setText] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState('');
  const [displayName, setDisplayName] = useState<string>('');
  const [pendingCompleted, setPendingCompleted] = useState<number[]>([]);

  useEffect(() => {
    const initialize = async () => {
      await initDB();
      dispatch(loadTasks());
    };

    initialize();
  }, [dispatch]);

  useEffect(() => {
    if (tasks.length > 0) {
      const completedIds = tasks
        .filter(task => task.completed === 1)
        .map(task => task.id);

      setPendingCompleted(completedIds);
    } else {
      setPendingCompleted([]);
    }
  }, [tasks]);

 useEffect(() => {
  const loadDisplayName = async () => {
    // First preference: Navigation params
    if (route.params?.user?.name) {
      setDisplayName(route.params.user.name);
      return;
    }
   
  };

  loadDisplayName();
}, [route.params?.user?.name]);

  useEffect(() => {
    loadCompletedTasks();
  }, []);

  useEffect(() => {
  const loadDisplayName = async () => {
   
    const credentials = await getCredentials();

    if (credentials?.name) {
      setDisplayName(credentials.name);
    }
  };

  loadDisplayName();
}, []);

  const loadCompletedTasks = async () => {
    try {
      const data = await EncryptedStorage.getItem('completedTasks');

      if (data) {
        setPendingCompleted(JSON.parse(data));
      }
    } catch (e) {
      console.log(e);
    }
  };

 const handleAdd = async () => {
  const title = text.trim();

  if (!title) {
    return;
  }

  try {
    console.log("Adding:", title);

    const result = await dispatch(addTaskThunk(title)).unwrap();

    console.log("Thunk Result:", result);

    setText("");
  } catch (error) {
    console.log("Add Error:", error);

   showToast('Unable to add task. Please try again.', 'error', 'bottom');
  }
};

  const handleEditSave = async () => {
    if (editingId == null) return;
    const title = editingText.trim();
    if (!title) return;

    try {
      await dispatch(editTask({ id: editingId, title })).unwrap();
      setEditingId(null);
      setEditingText('');
    } catch (error) {
      console.log('Edit task failed:', error);
     showToast('Unable to edit task. Please try again.', 'error', 'bottom');
    }
  };

  const handleDelete = (id: number) => {
    Alert.alert('Delete', 'Delete this task?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await dispatch(removeTask(id)).unwrap();
          } catch (error) {
            console.log('Delete task failed:', error);
           showToast('Unable to delete task. Please try again.', 'error', 'bottom');
          }
        },
      },
    ]);
  };

  const handleToggle = (id: number) => {
    setPendingCompleted(prev => {
      if (prev.includes(id)) {
        return prev.filter(taskId => taskId !== id);
      }
      return [...prev, id];
    });
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
    } catch (error: any) {
      showToast(error.message || 'An error occurred during logout', 'error', 'bottom');
    }
  };

 const handleSaveCompleted = async () => {
  try {
    const netState = await NetInfo.fetch();

    if (!netState.isConnected || !netState.isInternetReachable) {
      Alert.alert(
        "No Internet",
        "Due to the loss of internet connectivity, the task list could not be stored. Please check your connection and try again."
      );
      return;
    }

    // Tasks selected by checkbox
    const selectedTasks = tasks.filter(task =>
      pendingCompleted.includes(task.id)
    );

    if (selectedTasks.length === 0) {
      Alert.alert(
        "No Task Selected",
        "Please select at least one task."
      );
      return;
    }

    const tasksToSave = [];

    for (const task of selectedTasks) {
      const alreadyExists = await isTaskAlreadySaved(task.title);

      if (!alreadyExists) {
        tasksToSave.push({
          ...task,
          completed: 0,
        });
      }
    }

    if (tasksToSave.length === 0) {
      Alert.alert(
        "No New Tasks",
        "The selected task(s) have already been saved."
      );
      return;
    }

    await saveTasksToFirestore(tasksToSave);

    await EncryptedStorage.setItem(
      "completedTasks",
      JSON.stringify(pendingCompleted)
    );

    Alert.alert(
      "Success",
      `${tasksToSave.length} task(s) saved successfully.`
    );
  } catch (error) {
    console.log(error);

    Alert.alert(
      "Error",
      "Unable to store the task list. Please try again later."
    );
  }
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

        <FlatList
          data={tasks}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <TaskItem
              item={item}
              styles={styles}
              pendingCompleted={pendingCompleted}
              onToggle={handleToggle}
              onEdit={(task: any) => {
                setEditingId(task.id);
                setEditingText(task.title);
              }}
              onDelete={handleDelete}
            />
          )}
        />

      </View>

      <SaveButton
        styles={styles}
        visible={pendingCompleted.length > 0}
        onPress={handleSaveCompleted}
      />

    </View>
  );
}

export default HomeScreen;