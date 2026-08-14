import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../types";
import LottieView from "lottie-react-native";

const SetupCompletionScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const animationRef = useRef<LottieView>(null);

  useEffect(() => {
    if (animationRef.current) {
      setTimeout(() => {
        animationRef.current?.play();
      }, 100);
    }
  }, []);

  const handleContinue = () => {
    navigation.navigate("MainApp");
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.animationContainer}>
          <LottieView
            ref={animationRef}
            source={require("../assets/animations/done-animation.json")}
            style={styles.animation}
            loop={false}
            autoPlay={false}
          />
        </View>

        <Text style={styles.title}>All Set!</Text>
        <Text style={styles.subtitle}>
          Your profile is complete and ready to go. Start exploring properties
          that match your preferences.
        </Text>

        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Start Exploring</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1e1e",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  content: {
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
  },
  animationContainer: {
    width: 200,
    height: 200,
    marginBottom: 40,
  },
  animation: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#D4AF37",
    marginBottom: 16,
    textAlign: "center",
    fontFamily: "serif",
  },
  subtitle: {
    fontSize: 16,
    color: "#aaa",
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 24,
    fontFamily: "serif",
  },
  button: {
    backgroundColor: "#D4AF37",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    width: "100%",
  },
  buttonText: {
    color: "#1e1e1e",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "serif",
  },
});

export default SetupCompletionScreen;
