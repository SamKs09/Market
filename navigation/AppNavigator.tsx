import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import ProfileScreen from "../screens/ProfileScreen";
import DashboardScreen from "../screens/DashboardScreen";
import FindHomesScreen from "../screens/FindHomesScreen";
import FeedScreen from "../screens/FeedScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import MyHomeScreen from "../screens/MyHomeScreen";
import { TabParamList } from "../types";

// Define the type for the icons object
interface IconsMap {
  [key: string]: string;
}

const Tab = createBottomTabNavigator<TabParamList>();

export default function AppNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Find Homes"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const icons: IconsMap = {
            "Find Homes": "search",
            Feed: "newspaper",
            Favorites: "heart",
            "My Home": "home",
            "My Profile": "person",
          };
          return (
            <Ionicons
              name={icons[route.name] as any}
              size={size}
              color={color}
            />
          );
        },
        tabBarActiveTintColor: "#FAAD08FF", // Red color like in the Redfin app
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
          paddingHorizontal: 10,
          paddingLeft: 20,
          paddingRight: 20,
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
}
