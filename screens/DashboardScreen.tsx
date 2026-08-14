import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import FindHomesScreen from "./FindHomesScreen";
import FeedScreen from "./FeedScreen";
import FavoritesScreen from "./FavoritesScreen";
import MyHomeScreen from "./MyHomeScreen";
import ProfileScreen from "./ProfileScreen";
import { TabParamList } from "../types";

// Define valid icon names for TypeScript
type IconName = "search" | "newspaper" | "heart" | "home" | "person";

const Tab = createBottomTabNavigator<TabParamList>();

const DashboardScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: IconName = "home"; // Default fallback

          if (route.name === "Find Homes") {
            iconName = "search";
          } else if (route.name === "Feed") {
            iconName = "newspaper";
          } else if (route.name === "Favorites") {
            iconName = "heart";
          } else if (route.name === "My Home") {
            iconName = "home";
          } else if (route.name === "My Profile") {
            iconName = "person";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#FAAD08FF", // Red color similar to the Redfin app
        tabBarInactiveTintColor: "#666",
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
        },
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: "#e0e0e0",
          height: 60,
          paddingBottom: 5,
          paddingTop: 5,
        },
      })}
    >
      <Tab.Screen name="Find Homes" component={FindHomesScreen} />
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="My Home" component={MyHomeScreen} />
      <Tab.Screen name="My Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default DashboardScreen;
