import React from "react";
import { View, TouchableOpacity, Text } from "react-native";

const Header = ({ styles, displayName, onLogout }: any) => {
  console.log('././',displayName);
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>
        {displayName ? `Welcome ${ displayName}` : "Welcome"}
      </Text>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={onLogout}
      >
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Header;