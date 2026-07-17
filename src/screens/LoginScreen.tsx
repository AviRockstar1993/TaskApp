import React, { useCallback, useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "react-native";

import { login, getUserDetails } from "../services/firebase";
import { LightTheme, DarkTheme } from "../utills/colors";
import { createStyles } from "../styles/LoginStyles";
import CustomLoader from "../utills/CustomLoader";
import { getCredentials, saveCredentials } from "../utills/secureStorage";
import { useFocusEffect } from "@react-navigation/native";
import Ionicons from "@react-native-vector-icons/ionicons";
import { showToast } from "../utills/showToast";

const LoginScreen: React.FC = ({ navigation }: any) => {
  const colorScheme = useColorScheme();

  const theme = colorScheme === "dark" ? DarkTheme : LightTheme;
  const styles = createStyles(theme);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);


  useFocusEffect(
    useCallback(() => {
      const loadCredentials = async () => {
        const credentials = await getCredentials();

        if (credentials) {
          setEmail(credentials.email || "");
          setPassword(credentials.password || "");
          setName(credentials.name || "");
        } else {
          setEmail("");
          setPassword("");
          setName("");
        }
      };

      loadCredentials();
    }, [])
  );

  const validateEmail = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const passwordRegex = /(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+/;

  const handleLogin = async () => {
    const validationErrors: Record<string, string> = {};

    if (!email.trim()) {
      validationErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      validationErrors.email = "Enter a valid email address";
    }

    if (!password) {
      validationErrors.password = "Password is required";
    } else if (!passwordRegex.test(password)) {
      validationErrors.password =
        "Password must contain at least one uppercase letter, one number and one special character";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);


    try {
      const userCredential = await login(email, password);
      const uid = userCredential.user?.uid;

      const dbUser = uid ? await getUserDetails(uid) : null;
      setName(dbUser?.name || "");
      const userData = {
        uid,
        name: dbUser?.name || "",
        email: dbUser?.email || "",
        phone: dbUser?.phone || "",
        address: dbUser?.address || "",
        ...dbUser,
      };

      // Save encrypted credentials
      await saveCredentials(email, password, name);

      showToast("Login Successful", "success","bottom");

      navigation.navigate("Home", {
        user: userData,
      });
    } catch (error: any) {
     showToast(error.message || "Login failed", "error","bottom");
    } finally {
      setLoading(false);
    }
  };

  const moveToRegister = () => {
    navigation.navigate("Register");
  };



  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Welcome Back</Text>

        <Text style={styles.subtitle}>
          Login to continue
        </Text>

        {/* Email */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={(val) => {
            setEmail(val);

            if (errors.email && validateEmail(val)) {
              const newErrors = { ...errors };
              delete newErrors.email;
              setErrors(newErrors);
            }
          }}
        />

        {errors.email ? (
          <Text style={styles.errorText}>{errors.email}</Text>
        ) : null}

        {/* Password */}
        <View style={styles.input}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={(val) => {
            setPassword(val);

            if (errors.password && passwordRegex.test(val)) {
              const newErrors = { ...errors };
              delete newErrors.password;
              setErrors(newErrors);
            }
          }}
        />

        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.eyeIcon}
        >
          <Ionicons
            name={showPassword ? "eye-outline" : "eye-off-outline"}
            size={22}
            color="#777"
          />
        </TouchableOpacity>
        </View>

      {errors.password ? (
        <Text style={styles.errorText}>{errors.password}</Text>
      ) : null}

      {/* Login Button */}
      <TouchableOpacity
        style={[
          styles.button,
          loading ? styles.buttonDisabled : null,
        ]}
        onPress={handleLogin}
        activeOpacity={0.8}
        disabled={loading}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Forgot Password */}
      <TouchableOpacity>
        <Text style={styles.forgotPassword}>
          Forgot Password?
        </Text>
      </TouchableOpacity>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Don't have an account?
        </Text>

        <TouchableOpacity onPress={moveToRegister}>
          <Text style={styles.signup}> Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>

      {/* Custom Loader */ }
  <CustomLoader
    visible={loading}
    text="Logging in..."
  />
    </SafeAreaView >
  );
};

export default LoginScreen;