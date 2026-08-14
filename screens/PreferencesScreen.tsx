import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  useNavigation,
  NavigationProp,
  useRoute,
} from "@react-navigation/native";
import { RootStackParamList } from "../types";
import { Ionicons } from "@expo/vector-icons";
import ProgressStepBar from "../components/ProgressStepBar";

const realEstateOptions = [
  "Apartment",
  "Condo",
  "House",
  "Villa",
  "Office",
  "Shop",
  "Warehouse",
  "Land",
  "Plot",
];

const mechaniqesOptions = [
  "Car",
  "Sedan",
  "SUV",
  "Hatchback",
  "Pickup",
  "Motorcycle",
  "Scooter",
  "Truck",
  "Van",
  "Tractor",
  "Harvester",
  "Excavator",
  "Bulldozer",
];

const PreferencesScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute();
  const { userRole, propertyIntent } = route.params as {
    userRole: "Proprietaire" | "Buyer";
    propertyIntent?: "rent" | "purchase";
  };

  const [selectedRealEstate, setSelectedRealEstate] = useState<string[]>([]);
  const [selectedMechaniqes, setSelectedMechaniqes] = useState<string[]>([]);

  const toggleSelection = (
    option: string,
    category: "realEstate" | "mechaniqes"
  ) => {
    if (category === "realEstate") {
      setSelectedRealEstate((prev) =>
        prev.includes(option)
          ? prev.filter((item) => item !== option)
          : [...prev, option]
      );
    } else {
      setSelectedMechaniqes((prev) =>
        prev.includes(option)
          ? prev.filter((item) => item !== option)
          : [...prev, option]
      );
    }
  };

  // Splits the option text into lines (one word per line)
  const renderOption = (
    option: string,
    category: "realEstate" | "mechaniqes"
  ) => {
    const isSelected =
      category === "realEstate"
        ? selectedRealEstate.includes(option)
        : selectedMechaniqes.includes(option);
    const optionTextLines = option.split(" ").join("\n");
    return (
      <TouchableOpacity
        key={option}
        style={[styles.optionButton, isSelected && styles.optionButtonSelected]}
        onPress={() => toggleSelection(option, category)}
      >
        <View style={styles.optionInner}>
          <View style={styles.textContainer}>
            <Text
              style={[
                styles.optionText,
                isSelected && styles.optionTextSelected,
              ]}
            >
              {optionTextLines}
            </Text>
          </View>
          <View style={styles.closeIconContainer}>
            {isSelected ? <Text style={styles.closeIcon}>✕</Text> : null}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const handleSavePreferences = () => {
    // Navigate to completion screen
    navigation.navigate("SetupCompletion");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#D4AF37" />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <ProgressStepBar
          currentStep={3}
          totalSteps={3}
          labels={["Role", "Intent", "Preferences"]}
        />

        <Text style={styles.headerText}>Set Your Property Preferences</Text>
        <Text style={styles.subheader}>
          {userRole === "Proprietaire"
            ? "Select what you have to offer"
            : `Select what you're looking to ${propertyIntent || "find"}`}
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Real Estate</Text>
          <View style={styles.optionsContainer}>
            {realEstateOptions.map((option) =>
              renderOption(option, "realEstate")
            )}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mechaniqes</Text>
          <View style={styles.optionsContainer}>
            {mechaniqesOptions.map((option) =>
              renderOption(option, "mechaniqes")
            )}
          </View>
        </View>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSavePreferences}
        >
          <Text style={styles.saveButtonText}>Save Preferences</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#1e1e1e", // Dark background for a luxurious feel
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
    padding: 20,
    paddingBottom: 40,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "700",
    color: "#D4AF37", // Gold accent color
    marginTop: 20,
    textAlign: "center",
    fontFamily: "serif",
  },
  subheader: {
    fontSize: 16,
    color: "#aaa",
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "serif",
  },
  section: {
    width: "100%",
    marginVertical: 10,
    backgroundColor: "#2e2e2e",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 10,
    color: "#D4AF37",
    textAlign: "center",
    fontFamily: "serif",
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  optionButton: {
    borderWidth: 1,
    borderColor: "#D4AF37",
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginVertical: 5,
    width: "48%",
    backgroundColor: "#2e2e2e",
  },
  optionButtonSelected: {
    backgroundColor: "#D4AF37",
  },
  optionInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    flex: 1,
    alignItems: "center",
  },
  optionText: {
    fontSize: 14,
    color: "#D4AF37",
    textAlign: "center",
    fontFamily: "serif",
  },
  optionTextSelected: {
    color: "#1e1e1e",
    fontWeight: "600",
  },
  closeIconContainer: {
    width: 24,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  closeIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#1e1e1e",
    borderWidth: 1,
    borderColor: "#D4AF37",
    textAlign: "center",
    lineHeight: 20,
    fontSize: 12,
    color: "#D4AF37",
  },
  saveButton: {
    backgroundColor: "#D4AF37",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
    marginTop: 10,
  },
  saveButtonText: {
    color: "#1e1e1e",
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "serif",
  },
});

export default PreferencesScreen;
