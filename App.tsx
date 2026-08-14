import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider as PaperProvider } from "react-native-paper";
import LoginScreen from "./screens/LoginScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import AppNavigator from "./navigation/AppNavigator";
import SignUpScreen from "./screens/SignUpScreen";
import VerifyPhoneScreen from "./screens/VerifyPhoneScreen";
import RoleSelectionScreen from "./screens/RoleSelectionScreen";
import PropertyIntentScreen from "./screens/PropertyIntentScreen";
import PreferencesScreen from "./screens/PreferencesScreen";
import SetupCompletionScreen from "./screens/SetupCompletionScreen";
import { luxuryTheme } from "./theme/luxuryTheme";
import { StatusBar } from "react-native";

const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider theme={luxuryTheme}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="VerifyPhone"
            component={VerifyPhoneScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RoleSelection"
            component={RoleSelectionScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PropertyIntent"
            component={PropertyIntentScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Preferences"
            component={PreferencesScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SetupCompletion"
            component={SetupCompletionScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MainApp"
            component={AppNavigator}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
