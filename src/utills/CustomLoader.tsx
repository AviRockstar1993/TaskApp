// components/CustomLoader.tsx

import React from 'react';
import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  View,
  Text,
  useColorScheme,
} from 'react-native';
import { LightTheme, DarkTheme } from '../utills/colors';

interface LoaderProps {
  visible: boolean;
  text?: string;
}

const CustomLoader: React.FC<LoaderProps> = ({
  visible,
  text = 'Please wait...',
}) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? DarkTheme : LightTheme;

  const styles = createStyles(theme);
  return (
    <Modal transparent animationType="fade" visible={visible}>
         <View style={styles.overlay}>
        <View style={styles.loaderContainer}>
          <ActivityIndicator
            size="large"
            color={theme.primary}
          />

          <Text style={styles.text}>
            {text}
          </Text>
        </View>
        </View>
    </Modal>
  );
};

export default CustomLoader;

const createStyles = (theme: any) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: theme.overlay,
      justifyContent: 'center',
      alignItems: 'center',
    },

    loaderContainer: {
      width: 170,
      backgroundColor: theme.card,
      borderRadius: 12,
      paddingVertical: 25,
      alignItems: 'center',
      elevation: 8,
    },

    text: {
      marginTop: 15,
      fontSize: 16,
      color: theme.text,
      fontWeight: '500',
    },
  });