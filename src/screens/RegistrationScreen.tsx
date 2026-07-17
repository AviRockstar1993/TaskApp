import { useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from 'react-native';
import { LightTheme, DarkTheme } from '../utills/colors';
import { createStyles } from '../styles/RegistrationStyles';
import { signup } from "../services/firebase";
import CustomLoader from "../utills/CustomLoader";
import { saveCredentials } from "../utills/secureStorage";
import Ionicons from "@react-native-vector-icons/ionicons";
import { showToast } from "../utills/showToast";


const RegistrationScreen: React.FC = ({ navigation }: any) => {
  const colorScheme = useColorScheme();

  const theme = colorScheme === 'dark' ? DarkTheme : LightTheme;
  const styles = createStyles(theme);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const validateEmail = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const passwordRegex = /(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+/;

  const handleRegister = async () => {
    const validationErrors: Record<string, string> = {};

    if (!name.trim()) {
      validationErrors.name = 'Full name is required';
    }
    if (!email.trim()) {
      validationErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      validationErrors.email = 'Enter a valid email address';
    }

    if (!password) {
      validationErrors.password = 'Password is required';
    } else if (!passwordRegex.test(password)) {
      validationErrors.password =
        'Password must contain at least one uppercase letter, one number and one special character';
    }

    if (!phone.trim()) {
      validationErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(phone)) {
      validationErrors.phone = 'Enter a valid 10-digit phone number';
    }

    if (!address.trim()) {
      validationErrors.address = 'Address is required';
    }

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      await signup(name, email, password, phone, address);
      await saveCredentials(email, password, name);
     showToast('Account created successfully!', 'success', 'bottom');
      navigation.navigate('Login');
    } catch (error: any) {
      showToast(error.message || 'An error occurred during registration', 'error', 'bottom');
    } finally {
      setLoading(false);
    }
  };
  const moveToLogin: () => void = () => {
    navigation.navigate('Login');
  }

  return (
    <SafeAreaView style={styles.container}>
      <CustomLoader
        visible={loading}
        text="Creating Account..."
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>
            Register to get started
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={name}
            onChangeText={(val) => {
              setName(val);
              if (errors.name && val.trim()) {
                const newErrors = { ...errors };
                delete newErrors.name;
                setErrors(newErrors);
              }
            }}
          />
          {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}

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
          {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

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

          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            keyboardType="phone-pad"
            maxLength={10}
            value={phone}
            onChangeText={(val) => {
              setPhone(val);
              if (errors.phone && /^\d{10}$/.test(val)) {
                const newErrors = { ...errors };
                delete newErrors.phone;
                setErrors(newErrors);
              }
            }}
          />
          {errors.phone ? <Text style={styles.errorText}>{errors.phone}</Text> : null}

          <TextInput
            style={[styles.input, styles.addressInput]}
            placeholder="Address"
            multiline
            numberOfLines={4}
            value={address}
            onChangeText={(val) => {
              setAddress(val);
              if (errors.address && val.trim()) {
                const newErrors = { ...errors };
                delete newErrors.address;
                setErrors(newErrors);
              }
            }}
          />
          {errors.address ? <Text style={styles.errorText}>{errors.address}</Text> : null}

          <TouchableOpacity
            style={styles.button}
            onPress={handleRegister}
          >
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Already have an account?
            </Text>

            <TouchableOpacity onPress={moveToLogin}>
              <Text style={styles.loginText}> Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
export default RegistrationScreen;