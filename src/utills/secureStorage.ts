import EncryptedStorage from "react-native-encrypted-storage";

const LOGIN_KEY = "LOGIN_CREDENTIALS";

export interface LoginCredentials {
  email: string;
  password: string;
  name?: string;
}

export const saveCredentials = async (
  email: string,
  password: string,
  name?: string,
): Promise<void> => {
  try {
    const credentials: LoginCredentials = {
      email,
      password,
      name,
    };

    await EncryptedStorage.setItem(
      LOGIN_KEY,
      JSON.stringify(credentials),
    );
  } catch (error) {
    console.log("Error saving credentials:", error);
  }
};

export const getCredentials = async (): Promise<LoginCredentials | null> => {
  try {
    const session = await EncryptedStorage.getItem(LOGIN_KEY);

    if (!session) {
      return null;
    }

    return JSON.parse(session) as LoginCredentials;
  } catch (error) {
    console.log("Error getting credentials:", error);
    return null;
  }
};

export const removeCredentials = async (): Promise<void> => {
  try {
    await EncryptedStorage.removeItem(LOGIN_KEY);
  } catch (error) {
    console.log("Error removing credentials:", error);
  }
};