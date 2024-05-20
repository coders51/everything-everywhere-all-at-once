import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";
import { TouchableOpacity } from "react-native";
import uuid from "react-native-uuid";
import { lowerCase } from "lodash";

const uuidV4 = uuid.v4();

const QuizScreen = ({ route }) => {
  const [numberOfUsers, setNumberOfUsers] = useState(null);
  const { name } = route.params;
  const userName = `${lowerCase(name)}-${uuidV4}`;
  const userStatus = {
    user: userName,
    online_at: new Date().toISOString(),
  };
  useEffect(() => {
    const channel = supabase.channel("users");
    channel
      .on("presence", { event: "sync" }, () => {
        const newState = channel.presenceState();
        console.log("sync", newState);
        setNumberOfUsers(Object.keys(newState).length);
      })
      .on("presence", { event: "join" }, ({ key, newPresences }) => {
        console.log("join", key, newPresences);
      })
      .on("presence", { event: "leave" }, ({ key, leftPresences }) => {
        console.log("leave", key, leftPresences);
      })
      .subscribe(async (status) => {
        if (status !== "SUBSCRIBED") {
          return;
        }
        await channel.track(userStatus);
      });
  }, []);

  const onPress = async (answer) => {
    const { error } = await supabase
      .from("users")
      .insert({ name: userName, answer });
    console.log(error);
  };
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
        <View
          style={{
            paddingBottom: 50,
            alignItems: "center",
            gap: 4,
            marginTop: -50,
          }}
        >
          <Text
            style={{
              ...styles.title,
            }}
          >
            Ciao {name}!
          </Text>
          {numberOfUsers !== null && (
            <Text style={{ color: "white", fontSize: 20 }}>
              Numero giocatori: {numberOfUsers}
            </Text>
          )}
        </View>

        <View style={styles.buttonsContainer}>
          <View style={styles.row}>
            <TouchableOpacity
              style={{ ...styles.button, backgroundColor: "#E2001A" }}
              onPress={() => onPress("a")}
            >
              <Text style={{ ...styles.buttonLabel, color: "white" }}>A</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onPress("b")}
              style={{ ...styles.button, backgroundColor: "#0076BF" }}
            >
              <Text style={{ ...styles.buttonLabel, color: "white" }}>B</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => onPress("c")}
              style={{ ...styles.button, backgroundColor: "#08FA24" }}
            >
              <Text style={{ ...styles.buttonLabel, color: "black" }}>C</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onPress("d")}
              style={{ ...styles.button, backgroundColor: "#F9EF63" }}
            >
              <Text style={{ ...styles.buttonLabel, color: "black" }}>D</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    color: "#fff",
  },
  buttonsContainer: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    gap: 10,
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: "row",
    minHeight: 150,
    gap: 10,
  },
  button: {
    minWidth: 0,
    flexShrink: 0,
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    height: "200",
    borderRadius: 10,
  },
  buttonLabel: {
    fontSize: 50,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default QuizScreen;
