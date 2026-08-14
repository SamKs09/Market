import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../types";
import { Ionicons } from "@expo/vector-icons";
import ProgressStepBar from "../components/ProgressStepBar";

const PropertyIntentScreen = () => {
  const [selectedIntent, setSelectedIntent] = useState<
    "rent" | "purchase" | null
  >(null);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { userRole } = (navigation
    .getState()
    .routes.find((r) => r.name === "PropertyIntent")?.params as {
    userRole: "Proprietaire" | "Buyer";
  }) || { userRole: "Buyer" };

  const handleContinue = () => {
    if (selectedIntent) {
      navigation.navigate("Preferences", {
        userRole,
        propertyIntent: selectedIntent,
      });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#1e1e1e" />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <ProgressStepBar
          currentStep={2}
          totalSteps={3}
          labels={["Role", "Intent", "Preferences"]}
        />

        <Text style={styles.headerText}>What are you looking to do?</Text>
        <Text style={styles.subtitle}>Select your property intention</Text>

        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={[
              styles.optionCard,
              selectedIntent === "rent" && styles.selectedCard,
            ]}
            onPress={() => setSelectedIntent("rent")}
          >
            <View style={styles.iconContainer}>
              <Text style={styles.icon}>🏠</Text>
            </View>
            <Text
              style={[
                styles.optionTitle,
                selectedIntent === "rent" && styles.selectedText,
              ]}
            >
              Rent
            </Text>
            <Text
              style={[
                styles.optionDescription,
                selectedIntent === "rent" && styles.selectedText,
              ]}
            >
              I'm looking to rent a property
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.optionCard,
              selectedIntent === "purchase" && styles.selectedCard,
            ]}
            onPress={() => setSelectedIntent("purchase")}
          >
            <View style={styles.iconContainer}>
              <Text style={styles.icon}>🔑</Text>
            </View>
            <Text
              style={[
                styles.optionTitle,
                selectedIntent === "purchase" && styles.selectedText,
              ]}
            >
              Purchase
            </Text>
            <Text
              style={[
                styles.optionDescription,
                selectedIntent === "purchase" && styles.selectedText,
              ]}
            >
              I'm looking to buy a property
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[
            styles.continueButton,
            !selectedIntent && styles.disabledButton,
          ]}
          onPress={handleContinue}
          disabled={!selectedIntent}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#1e1e1e",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#2e2e2e",
    borderWidth: 1,
    borderColor: "#D4AF37",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 28,
    fontWeight: "700",
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
  optionsContainer: {
    flex: 1,
    maxHeight: 300,
    justifyContent: "space-around",
  },
  optionCard: {
    backgroundColor: "#2e2e2e",
    borderRadius: 12,
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#3e3e3e",
  },
  selectedCard: {
    borderColor: "#D4AF37",
    backgroundColor: "#D4AF37",
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#3e3e3e",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  icon: {
    fontSize: 24,
  },
  optionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 5,
    fontFamily: "serif",
  },
  optionDescription: {
    fontSize: 14,
    color: "#aaa",
    fontFamily: "serif",
  },
  selectedText: {
    color: "#1e1e1e",
  },
  continueButton: {
    backgroundColor: "#D4AF37",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  disabledButton: {
    opacity: 0.5,
  },
  continueButtonText: {
    color: "#1e1e1e",
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "serif",
  },
});

export default PropertyIntentScreen;
