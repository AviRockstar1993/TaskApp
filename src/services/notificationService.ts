import notifee, {
  AndroidImportance,
  AuthorizationStatus,
} from '@notifee/react-native';

export async function initializeNotification() {
  const settings = await notifee.requestPermission();

  if (
    settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED
  ) {
    console.log('Permission Granted');
  }

  await notifee.createChannel({
    id: 'task-channel',
    name: 'Task Reminder',
    importance: AndroidImportance.HIGH,
  });
}