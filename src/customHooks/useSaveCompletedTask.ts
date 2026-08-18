import { Alert } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import NetInfo from '@react-native-community/netinfo';

import {
  isTaskAlreadySaved,
  saveTasksToFirestore,
} from '../services/firebase';

import { Task } from '../services/db';

export const useSaveCompletedTasks = (
  tasks: Task[],
  pendingCompleted: number[]
) => {

  const saveCompletedTasks = async () => {
    try {
      const netState = await NetInfo.fetch();

      if (!netState.isConnected || !netState.isInternetReachable) {
        Alert.alert(
          'No Internet',
          'Please check your internet connection and try again.'
        );
        return;
      }

      const selectedTasks = tasks.filter(task =>
        pendingCompleted.includes(task.id)
      );

      if (!selectedTasks.length) {
        Alert.alert(
          'No Task Selected',
          'Please select at least one task.'
        );
        return;
      }

      const tasksToSave: Task[] = [];

      for (const task of selectedTasks) {
        const exists = await isTaskAlreadySaved(task.title);

        if (!exists) {
          tasksToSave.push({
            ...task,
            completed: 0,
          });
        }
      }

      if (!tasksToSave.length) {
        Alert.alert(
          'No New Tasks',
          'The selected task(s) have already been saved.'
        );
        return;
      }

      await saveTasksToFirestore(tasksToSave);

      await EncryptedStorage.setItem(
        'completedTasks',
        JSON.stringify(pendingCompleted)
      );

      Alert.alert(
        'Success',
        `${tasksToSave.length} task(s) saved successfully.`
      );

    } catch (error) {
            console.log('========== FIRESTORE ERROR ==========');
      console.log('Error:', error);
      
      Alert.alert(
        'Error',
        'Unable to store the task list. Please try again later.'
      );
    }
  };

  return { saveCompletedTasks };
};