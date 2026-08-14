import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

// Define types for the feed items
interface BaseFeedItem {
  id: string;
  type: string;
  title: string;
  summary: string;
  image: string;
}

interface NewsItem extends BaseFeedItem {
  type: "news";
  date: string;
  source: string;
}

interface RecommendationItem extends BaseFeedItem {
  type: "recommendation";
  price: string;
  location: string;
}

interface MarketInsightItem extends BaseFeedItem {
  type: "marketInsight";
}

type FeedItem = NewsItem | RecommendationItem | MarketInsightItem;

const feedItems: FeedItem[] = [
  {
    id: "1",
    type: "news",
    title: "Housing Market Update: Prices Rising in Coastal Areas",
    summary:
      "Recent data shows a 5.2% increase in property values along the Tunisian coast in Q1 2025",
    image: "https://example.com/image1.jpg",
    date: "2 hours ago",
    source: "Real Estate Journal",
  },
  {
    id: "2",
    type: "recommendation",
    title: "New Listing in Sousse",
    summary: "Modern 3-bedroom apartment with sea view",
    price: "450,000 TND",
    image: "https://example.com/image2.jpg",
    location: "Sahloul, Sousse",
  },
  {
    id: "3",
    type: "marketInsight",
    title: "Neighborhood Spotlight: Hammam Sousse",
    summary: "Emerging area with strong investment potential",
    image: "https://example.com/image3.jpg",
  },
];

const FeedScreen = () => {
  const renderFeedItem = ({ item }: { item: FeedItem }) => {
    switch (item.type) {
      case "news":
        return (
          <Card style={styles.card}>
            <Card.Cover source={{ uri: item.image }} />
            <Card.Content>
              <Title style={styles.title}>{item.title}</Title>
              <Paragraph style={styles.paragraph}>{item.summary}</Paragraph>
              <View style={styles.metaInfo}>
                <Text style={styles.source}>{item.source}</Text>
                <Text style={styles.date}>{item.date}</Text>
              </View>
            </Card.Content>
          </Card>
        );
      case "recommendation":
        return (
          <Card style={styles.card}>
            <Card.Cover source={{ uri: item.image }} />
            <Card.Content>
              <Title style={styles.title}>{item.title}</Title>
              <Paragraph style={styles.paragraph}>{item.summary}</Paragraph>
              <Text style={styles.price}>{item.price}</Text>
              <View style={styles.locationContainer}>
                <Ionicons name="location" size={16} color="#666" />
                <Text style={styles.location}>{item.location}</Text>
              </View>
            </Card.Content>
            <Card.Actions>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionText}>View Details</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <Ionicons name="heart-outline" size={20} color="#FAAD08FF" />
              </TouchableOpacity>
            </Card.Actions>
          </Card>
        );
      case "marketInsight":
        return (
          <Card style={styles.card}>
            <Card.Cover source={{ uri: item.image }} />
            <Card.Content>
              <Title style={styles.title}>{item.title}</Title>
              <Paragraph style={styles.paragraph}>{item.summary}</Paragraph>
            </Card.Content>
            <Card.Actions>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionText}>Learn More</Text>
              </TouchableOpacity>
            </Card.Actions>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Feed</Text>
      </View>
      <FlatList
        data={feedItems}
        renderItem={renderFeedItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
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
  listContainer: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
    borderRadius: 8,
    overflow: "hidden",
  },
  title: {
    fontSize: 18,
    marginTop: 8,
  },
  paragraph: {
    marginVertical: 8,
    fontSize: 14,
    color: "#666",
  },
  metaInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  source: {
    fontSize: 12,
    color: "#666",
    fontWeight: "bold",
  },
  date: {
    fontSize: 12,
    color: "#999",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FAAD08FF",
    marginVertical: 8,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  location: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
  actionButton: {
    flex: 1,
    padding: 8,
    alignItems: "center",
  },
  actionText: {
    color: "#FAAD08FF",
    fontWeight: "bold",
  },
  iconButton: {
    padding: 8,
  },
});

export default FeedScreen;
