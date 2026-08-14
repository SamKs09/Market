import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

interface ProgressStepBarProps {
  currentStep: number;
  totalSteps: number;
  labels: string[];
}

const { width } = Dimensions.get("window");

const ProgressStepBar: React.FC<ProgressStepBarProps> = ({
  currentStep,
  totalSteps,
  labels,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        {/* Progress bar */}
        <View style={styles.progressBackground} />
        <View
          style={[
            styles.progressFill,
            { width: `${(currentStep / totalSteps) * 100}%` },
          ]}
        />

        {/* Step circles */}
        <View style={styles.stepsContainer}>
          {Array.from({ length: totalSteps }).map((_, index) => (
            <View
              key={index}
              style={[
                styles.stepCircle,
                index < currentStep ? styles.completedStep : {},
              ]}
            >
              {index < currentStep ? (
                <Text style={styles.stepCompleteText}>✓</Text>
              ) : (
                <Text style={styles.stepText}>{index + 1}</Text>
              )}
            </View>
          ))}
        </View>
      </View>

      {/* Labels */}
      <View style={styles.labelsContainer}>
        {labels.map((label, index) => (
          <Text
            key={index}
            style={[
              styles.label,
              index < currentStep ? styles.completedLabel : {},
              index === currentStep - 1 ? styles.currentLabel : {},
            ]}
          >
            {label}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  progressContainer: {
    height: 40,
    position: "relative",
    justifyContent: "center",
  },
  progressBackground: {
    position: "absolute",
    height: 4,
    backgroundColor: "#E0E0E0",
    width: "100%",
    top: 20,
  },
  progressFill: {
    position: "absolute",
    height: 4,
    backgroundColor: "#D4AF37",
    top: 20,
  },
  stepsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    width: "100%",
  },
  stepCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
  },
  completedStep: {
    backgroundColor: "#D4AF37",
    borderColor: "#D4AF37",
  },
  stepText: {
    color: "#666",
    fontSize: 16,
  },
  stepCompleteText: {
    color: "#fff",
    fontSize: 16,
  },
  labelsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    paddingHorizontal: 5,
  },
  label: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    width: 80,
  },
  completedLabel: {
    color: "#D4AF37",
  },
  currentLabel: {
    fontWeight: "bold",
  },
});

export default ProgressStepBar;
