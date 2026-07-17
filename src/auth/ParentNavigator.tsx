import { StatusBar } from "react-native";
import { useTheme } from '../context/ThemeContext';
import AuthNavigator from "./AuthNavigator";

const ParentNavigator = () => {
     const { isDark } = useTheme();
     return (
    <>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />

      <AuthNavigator />
    </>
  );
}
export default ParentNavigator;