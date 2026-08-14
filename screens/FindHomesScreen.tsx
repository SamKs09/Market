import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Searchbar, Button, SegmentedButtons } from "react-native-paper";
import { PropertySearchFilters } from "../types";

const FindHomesScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("buy");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters, setFilters] = useState<PropertySearchFilters>({
    priceRange: [0, 1000000],
    bedrooms: 0,
    bathrooms: 0,
    propertyType: [],
    amenities: [],
    location: "",
    radius: 5,
  });

  // Mock data for placeholder list
  const mockProperties = [
    { id: 1, title: "Coastal Villa", location: "Sousse", price: "$300,000" },
    { id: 2, title: "City Apartment", location: "Tunis", price: "$150,000" },
    { id: 3, title: "Beach House", location: "Hammamet", price: "$500,000" },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.searchContainer}>
            <Searchbar
              placeholder="Search cities, neighborhoods"
              onChangeText={setSearchQuery}
              value={searchQuery}
              style={styles.searchBar}
              iconColor="#666"
            />
            <TouchableOpacity
              style={styles.filterButton}
              onPress={() => setShowFilterModal(true)}
            >
              <Ionicons name="options-outline" size={22} color="#666" />
            </TouchableOpacity>
          </View>

          <SegmentedButtons
            value={activeTab}
            onValueChange={setActiveTab}
            buttons={[
              { value: "buy", label: "Buy" },
              { value: "rent", label: "Rent" },
              { value: "sold", label: "Sold" },
            ]}
            style={styles.segmentedButtons}
          />
        </View>

        {/* Property List Placeholder */}
        <ScrollView style={styles.content}>
          {mockProperties.length > 0 ? (
            mockProperties.map((property) => (
              <View key={property.id} style={styles.propertyCard}>
                <Text style={styles.propertyTitle}>{property.title}</Text>
                <Text style={styles.propertyLocation}>{property.location}</Text>
                <Text style={styles.propertyPrice}>{property.price}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.noResults}>No properties found</Text>
          )}
        </ScrollView>

        {/* Results Bar */}
        <View style={styles.resultsBar}>
          <Text style={styles.resultsText}>
            {mockProperties.length} of {mockProperties.length} results
          </Text>
          <Button mode="contained" style={styles.saveButton}>
            Save search
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 16,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    zIndex: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  searchBar: {
    flex: 1,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    height: 44,
  },
  filterButton: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  segmentedButtons: {
    marginTop: 10,
  },
  content: {
    flex: 1,
  },
  propertyCard: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  propertyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  propertyLocation: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  propertyPrice: {
    fontSize: 16,
    color: "#FAAD08FF",
    marginTop: 4,
  },
  noResults: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 20,
  },
  resultsBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  resultsText: {
    fontSize: 16,
    color: "#333",
  },
  saveButton: {
    backgroundColor: "#FAAD08FF",
  },
});

export default FindHomesScreen;
