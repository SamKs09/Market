import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Modal,
  FlatList,
  Dimensions,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../types";
import { Snackbar } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CONSTANTS } from "../constants/index";

const { width, height } = Dimensions.get("window");
const API_URL = CONSTANTS.API_URL_PROD;

export default function LoginScreen() {
  const [inputType, setInputType] = useState<"email" | "phone">("email");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+216");
  const [isModalVisible, setModalVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const countries = [
    { name: "Tunisia", code: "+216", flag: "🇹🇳" },
    { name: "United States", code: "+1", flag: "🇺🇸" },
    { name: "France", code: "+33", flag: "🇫🇷" },
    { name: "Germany", code: "+49", flag: "🇩🇪" },
    { name: "India", code: "+91", flag: "🇮🇳" },
    { name: "United Kingdom", code: "+44", flag: "🇬🇧" },
  ];

  const handleLogin = async () => {
    setSnackbarVisible(false);
    setSnackbarMessage("");

    if (!emailOrPhone) {
      setSnackbarMessage(
        inputType === "email" ? "Email is required" : "Phone number is required"
      );
      setSnackbarVisible(true);
      return;
    }
    if (inputType === "email" && !/\S+@\S+\.\S+/.test(emailOrPhone)) {
      setSnackbarMessage("Please enter a valid email address");
      setSnackbarVisible(true);
      return;
    }
    if (inputType === "phone" && !/^\d{10,15}$/.test(emailOrPhone)) {
      setSnackbarMessage("Please enter a valid phone number");
      setSnackbarVisible(true);
      return;
    }
    if (!password) {
      setSnackbarMessage("Password is required");
      setSnackbarVisible(true);
      return;
    }
    if (inputType === "phone") {
      setSnackbarMessage("Phone login is not yet implemented");
      setSnackbarVisible(true);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailOrPhone, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }
      await AsyncStorage.setItem("jwtToken", data.token);
      navigation.navigate("RoleSelection");
    } catch (error: any) {
      setSnackbarMessage(error.message || "Something went wrong");
      setSnackbarVisible(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Sign in to your account</Text>
      {inputType === "phone" && (
        <View style={styles.phoneInputContainer}>
          <TouchableOpacity
            style={styles.countryCodeButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.countryCodeText}>{countryCode}</Text>
          </TouchableOpacity>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Phone Number"
            keyboardType="phone-pad"
            placeholderTextColor="#aaa"
            value={emailOrPhone}
            onChangeText={setEmailOrPhone}
          />
        </View>
      )}
      {inputType === "email" && (
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          placeholderTextColor="#aaa"
          value={emailOrPhone}
          onChangeText={setEmailOrPhone}
        />
      )}
      <Text
        style={styles.helperText}
        onPress={() => setInputType(inputType === "email" ? "phone" : "email")}
      >
        {inputType === "email" ? "Use phone number 📞" : "Use email 📧"}
      </Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={!isPasswordVisible}
          placeholderTextColor="#aaa"
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          onPress={() => setPasswordVisible(!isPasswordVisible)}
          style={styles.togglePassword}
        >
          <Text style={styles.togglePasswordText}>
            {isPasswordVisible ? "Hide" : "Show"}
          </Text>
        </TouchableOpacity>
      </View>
      <Text
        style={styles.helperText}
        onPress={() => navigation.navigate("ForgotPassword")}
      >
        Forgot password?
      </Text>
      {isLoading ? (
        <ActivityIndicator size="large" color="#D4AF37" />
      ) : (
        <TouchableOpacity style={styles.signInButton} onPress={handleLogin}>
          <Text style={styles.signInButtonText}>Sign In</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.divider}>Or continue with</Text>
      <View style={styles.socialButtonsContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <Ionicons name="logo-google" size={24} color="#D4AF37" />
          <Text style={styles.socialButtonText}>Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <AntDesign name="apple1" size={24} color="#D4AF37" />
          <Text style={styles.socialButtonText}>Apple</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.signUpText}>
        Don't have an account?{" "}
        <Text
          style={styles.signUpLink}
          onPress={() => navigation.navigate("SignUp")}
        >
          Sign up
        </Text>
      </Text>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={5000}
        style={styles.snackbar}
      >
        {snackbarMessage}
      </Snackbar>
      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={countries}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.countryItem}
                  onPress={() => {
                    setCountryCode(item.code);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.countryFlag}>{item.flag}</Text>
                  <Text style={styles.countryName}>{item.name}</Text>
                  <Text style={styles.countryCode}>{item.code}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.closeModalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeModalText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width * 0.05,
    justifyContent: "center",
    backgroundColor: "#1e1e1e",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#D4AF37",
    fontFamily: "serif",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#aaa",
    marginBottom: 20,
    fontFamily: "serif",
  },
  input: {
    borderWidth: 1,
    borderColor: "#D4AF37",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    fontSize: 16,
    color: "#fff",
    fontFamily: "serif",
  },
  phoneInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  countryCodeButton: {
    borderWidth: 1,
    borderColor: "#D4AF37",
    borderRadius: 8,
    padding: 12,
    marginRight: 10,
  },
  countryCodeText: {
    fontSize: 16,
    color: "#fff",
    fontFamily: "serif",
  },
  helperText: {
    fontSize: 14,
    color: "#D4AF37",
    textAlign: "right",
    marginBottom: 20,
    fontFamily: "serif",
  },
  passwordContainer: {
    position: "relative",
  },
  togglePassword: {
    position: "absolute",
    right: 10,
    top: 15,
  },
  togglePasswordText: {
    color: "#D4AF37",
    fontSize: 14,
    fontFamily: "serif",
  },
  signInButton: {
    backgroundColor: "#D4AF37",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  signInButtonText: {
    color: "#1e1e1e",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "serif",
  },
  divider: {
    textAlign: "center",
    color: "#aaa",
    marginVertical: 20,
    fontFamily: "serif",
  },
  socialButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  socialButton: {
    borderWidth: 1,
    borderColor: "#D4AF37",
    borderRadius: 8,
    padding: 12,
    width: "40%",
    alignItems: "center",
  },
  socialButtonText: {
    fontSize: 16,
    color: "#fff",
    fontFamily: "serif",
  },
  signUpText: {
    textAlign: "center",
    color: "#aaa",
    fontFamily: "serif",
  },
  signUpLink: {
    color: "#D4AF37",
    fontWeight: "bold",
    fontFamily: "serif",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#1e1e1e",
    borderRadius: 10,
    width: width * 0.8,
    maxHeight: height * 0.6,
    padding: 20,
  },
  countryItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#D4AF37",
  },
  countryFlag: {
    fontSize: 24,
    marginRight: 10,
  },
  countryName: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "serif",
  },
  countryCode: {
    fontSize: 14,
    color: "#aaa",
    fontFamily: "serif",
  },
  closeModalButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#D4AF37",
    borderRadius: 8,
    alignItems: "center",
  },
  closeModalText: {
    color: "#1e1e1e",
    fontSize: 16,
    fontFamily: "serif",
  },
  snackbar: {
    backgroundColor: "#333",
  },
});
