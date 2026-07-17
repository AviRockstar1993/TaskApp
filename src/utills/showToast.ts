import Toast from 'react-native-toast-message';

// type is success, error, info - default is success
// position is top or bottom - default is bottom
export const showToast = (text: string, type: string, position: string) => {
  Toast.show({
    text1: text,
    type: type === '' ? 'success' : type,
    position: position === '' ? 'bottom' : 'top',
  });
};
