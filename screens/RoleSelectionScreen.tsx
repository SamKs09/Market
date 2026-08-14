import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../types";
import ProgressStepBar from "../components/ProgressStepBar";

const RoleSelectionScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const selectRole = (role: "Proprietaire" | "Buyer") => {
    // Navigate to PropertyIntent screen first
    navigation.navigate("PropertyIntent", { userRole: role });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ProgressStepBar
          currentStep={1}
          totalSteps={3}
          labels={["Role", "Intent", "Preferences"]}
        />

        <Text style={styles.title}>Select Your Role</Text>
        <Text style={styles.subtitle}>
          Tell us how you'll be using HomeSwipe
        </Text>

        <View style={styles.cardsContainer}>
          <TouchableOpacity
            style={styles.roleCard}
            onPress={() => selectRole("Proprietaire")}
          >
            <View style={styles.iconContainer}>
              <Text style={styles.iconText}>🏘️</Text>
            </View>
            <Text style={styles.roleTitle}>Property Owner</Text>
            <Text style={styles.roleDescription}>
              I want to list my properties for rent or sale
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.roleCard}
            onPress={() => selectRole("Buyer")}
          >
            <View style={styles.iconContainer}>
              <Text style={styles.iconText}>🔍</Text>
            </View>
            <Text style={styles.roleTitle}>Property Seeker</Text>
            <Text style={styles.roleDescription}>
              I'm looking for properties to rent or buy
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#1e1e1e",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#D4AF37",
    marginTop: 20,
    textAlign: "center",
    fontFamily: "serif",
  },
  subtitle: {
    fontSize: 16,
    color: "#aaa",
    textAlign: "center",
    marginBottom: 40,
    fontFamily: "serif",
  },
  cardsContainer: {
    flex: 1,
    justifyContent: "center",
    maxHeight: 400,
  },
  roleCard: {
    backgroundColor: "#2e2e2e",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#3e3e3e",
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#3e3e3e",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  iconText: {
    fontSize: 30,
  },
  roleTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
    fontFamily: "serif",
  },
  roleDescription: {
    fontSize: 16,
    color: "#aaa",
    textAlign: "center",
    fontFamily: "serif",
  },
});

export default RoleSelectionScreen;
