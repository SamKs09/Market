import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

export default function AccountsScreen() {
  // Example dynamic data
  const [accounts, setAccounts] = useState([
    { id: "1", name: "Personal Account", balance: "$1,200" },
    { id: "2", name: "Savings Account", balance: "$5,000" },
    { id: "3", name: "Business Account", balance: "$10,000" },
  ]);

  const handleAccountPress = (accountName: string) => {
    alert(`You selected: ${accountName}`);
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        {/* List of Accounts */}
        <FlatList
          data={accounts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.accountCard}
              onPress={() => handleAccountPress(item.name)}
            >
              <Text style={styles.accountName}>{item.name}</Text>
              <Text style={styles.accountBalance}>{item.balance}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  accountCard: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  accountName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  accountBalance: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
  },
});
