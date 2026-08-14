import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Card, Title, Paragraph, ProgressBar } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

const MyHomeScreen = () => {
  // Sample property data
  const homeData = {
    address: "123 Coastal Avenue, Sousse",
    purchaseDate: "March 15, 2024",
    purchasePrice: "450,000 TND",
    currentValue: "470,000 TND",
    appreciation: 4.4,
    mortgage: {
      lender: "Bank of Tunisia",
      principal: "350,000 TND",
      interestRate: 3.75,
      term: 25,
      monthlyPayment: "1,800 TND",
      remainingBalance: "338,500 TND",
      equity: "131,500 TND",
      equityPercentage: 28,
    },
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Home</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <Card style={styles.homeCard}>
          <Card.Content>
            <Title style={styles.addressTitle}>{homeData.address}</Title>
            <View style={styles.valueContainer}>
              <View style={styles.valueItem}>
                <Text style={styles.valueLabel}>Current Value</Text>
                <Text style={styles.valueAmount}>{homeData.currentValue}</Text>
              </View>
              <View style={styles.valueItem}>
                <Text style={styles.valueLabel}>Appreciation</Text>
                <Text style={styles.valueAmount}>
                  +{homeData.appreciation}%
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Mortgage Overview</Title>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Lender</Text>
              <Text style={styles.infoValue}>{homeData.mortgage.lender}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Monthly Payment</Text>
              <Text style={styles.infoValue}>
                {homeData.mortgage.monthlyPayment}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Interest Rate</Text>
              <Text style={styles.infoValue}>
                {homeData.mortgage.interestRate}%
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Term</Text>
              <Text style={styles.infoValue}>
                {homeData.mortgage.term} years
              </Text>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Equity</Title>
            <Text style={styles.equityAmount}>
              {homeData.mortgage.equity}
              <Text style={styles.equityPercentage}>
                {" "}
                ({homeData.mortgage.equityPercentage}%)
              </Text>
            </Text>
            <ProgressBar
              progress={homeData.mortgage.equityPercentage / 100}
              color="#FAAD08FF"
              style={styles.progressBar}
            />
            <View style={styles.equityBreakdown}>
              <View style={styles.equityItem}>
                <View style={[styles.colorIndicator, styles.equityColor]} />
                <Text style={styles.equityLabel}>Equity</Text>
              </View>
              <View style={styles.equityItem}>
                <View style={[styles.colorIndicator, styles.mortgageColor]} />
                <Text style={styles.equityLabel}>Mortgage</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Nearby Properties</Title>
            <Paragraph>
              Recent sales and listings in your neighborhood
            </Paragraph>
          </Card.Content>
          <Card.Actions>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionText}>View Market Report</Text>
            </TouchableOpacity>
          </Card.Actions>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Home Value Estimate</Title>
            <Text style={styles.estimateRange}>450,000 TND - 490,000 TND</Text>
            <Text style={styles.estimateDate}>
              Last updated: April 10, 2025
            </Text>
          </Card.Content>
          <Card.Actions>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionText}>
                Get a Professional Valuation
              </Text>
            </TouchableOpacity>
          </Card.Actions>
        </Card>
      </ScrollView>
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
  scrollView: {
    flex: 1,
    padding: 16,
  },
  homeCard: {
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: "#FAAD08FF",
  },
  addressTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  valueContainer: {
    flexDirection: "row",
    marginTop: 16,
  },
  valueItem: {
    marginRight: 24,
  },
  valueLabel: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 14,
  },
  valueAmount: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 4,
  },
  card: {
    marginBottom: 16,
    borderRadius: 8,
  },
  cardTitle: {
    fontSize: 16,
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: "#666",
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  equityAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  equityPercentage: {
    fontSize: 16,
    fontWeight: "normal",
    color: "#666",
  },
  progressBar: {
    height: 12,
    borderRadius: 6,
    marginVertical: 12,
  },
  equityBreakdown: {
    flexDirection: "row",
    marginTop: 8,
  },
  equityItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 24,
  },
  colorIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  equityColor: {
    backgroundColor: "#FAAD08FF",
  },
  mortgageColor: {
    backgroundColor: "#e0e0e0",
  },
  equityLabel: {
    fontSize: 12,
    color: "#666",
  },
  actionButton: {
    padding: 8,
  },
  actionText: {
    color: "#FAAD08FF",
    fontWeight: "bold",
  },
  estimateRange: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 8,
  },
  estimateDate: {
    fontSize: 12,
    color: "#999",
  },
});

export default MyHomeScreen;
