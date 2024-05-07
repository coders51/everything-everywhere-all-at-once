import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { TextInput } from "react-native";
import { TouchableOpacity } from "react-native";

const HomeScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#232526", "#66686a"]}
        style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }}
      />
      <View
        style={{
          position: "relative",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          style={{ width: 100, height: 100 }}
          contentFit="contain"
          source="https://d33wubrfki0l68.cloudfront.net/554c3b0e09cf167f0281fda839a5433f2040b349/ecfc9/img/header_logo.svg"
        />

        <Text style={{ fontSize: 22, marginTop: 40, color: "#fff" }}>
          Nome:
        </Text>
        <TextInput
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect={false}
          style={styles.input}
          onChangeText={(text) => setName(text)}
          value={name}
        />

        <TouchableOpacity
          style={
            name === "" ? { ...styles.button, opacity: 0.3 } : styles.button
          }
          disabled={name === ""}
          onPress={() =>
            navigation.navigate("Quiz", {
              name,
            })
          }
        >
          <Text style={{ fontSize: 22, color: "#fff" }}>Entra</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    width: "80%",
    padding: 10,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#0076BF",
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 40,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;
