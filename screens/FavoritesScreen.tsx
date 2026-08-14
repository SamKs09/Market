import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SegmentedButtons } from "react-native-paper";

// Define types for the data
interface PropertyItem {
  id: string;
  title: string;
  price: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string;
  isSaved: boolean;
}

// Sample data
const favoritesData: PropertyItem[] = [
  {
    id: "1",
    title: "Modern Apartment with Sea View",
    price: "650,000 TND",
    location: "Sahloul, Sousse",
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    image: "https://example.com/image1.jpg",
    isSaved: true,
  },
  {
    id: "2",
    title: "Luxury Villa with Pool",
    price: "1,200,000 TND",
    location: "Khezama, Sousse",
    bedrooms: 4,
    bathrooms: 3,
    area: 250,
    image: "https://example.com/image2.jpg",
    isSaved: true,
  },
  {
    id: "3",
    title: "Cozy Studio in City Center",
    price: "180,000 TND",
    location: "Downtown, Sousse",
    bedrooms: 1,
    bathrooms: 1,
    area: 45,
    image: "https://example.com/image3.jpg",
    isSaved: true,
  },
];

const FavoritesScreen = () => {
  const [activeTab, setActiveTab] = useState("saved");

  const renderPropertyItem = ({ item }: { item: PropertyItem }) => (
    <TouchableOpacity style={styles.propertyCard}>
      <Image
        source={{ uri: item.image }}
        style={styles.propertyImage}
        defaultSource={require("../assets/placeholder.jpg")} // Make sure to have a placeholder image
      />
      <TouchableOpacity style={styles.favoriteButton} onPress={() => {}}>
        <Ionicons
          name={item.isSaved ? "heart" : "heart-outline"}
          size={24}
          color="#FAAD08FF"
        />
      </TouchableOpacity>
      <View style={styles.propertyContent}>
        <Text style={styles.propertyPrice}>{item.price}</Text>
        <Text style={styles.propertyTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.propertyLocation}>{item.location}</Text>
        <View style={styles.propertyDetails}>
          <View style={styles.detailItem}>
            <Ionicons name="bed-outline" size={16} color="#666" />
            <Text style={styles.detailText}>{item.bedrooms} bd</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="water-outline" size={16} color="#666" />
            <Text style={styles.detailText}>{item.bathrooms} ba</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="square-outline" size={16} color="#666" />
            <Text style={styles.detailText}>{item.area} m²</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Favorites</Text>
      </View>

      <SegmentedButtons
        value={activeTab}
        onValueChange={setActiveTab}
        buttons={[
          { value: "saved", label: "Saved Homes" },
          { value: "searches", label: "Saved Searches" },
        ]}
        style={styles.segmentedButtons}
      />

      {activeTab === "saved" ? (
        <FlatList
          data={favoritesData}
          renderItem={renderPropertyItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.emptyState}>
          <Ionicons name="search" size={64} color="#ccc" />
          <Text style={styles.emptyTitle}>No Saved Searches</Text>
          <Text style={styles.emptyText}>
            Save your searches to get notified when new properties match your
            criteria
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  segmentedButtons: {
    margin: 16,
  },
  listContainer: {
    padding: 16,
  },
  propertyCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  propertyImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  favoriteButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 20,
    padding: 8,
  },
  propertyContent: {
    padding: 16,
  },
  propertyPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  propertyTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 4,
  },
  propertyLocation: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  propertyDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
    color: "#333",
  },
  emptyText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    lineHeight: 20,
  },
});

export default FavoritesScreen;
