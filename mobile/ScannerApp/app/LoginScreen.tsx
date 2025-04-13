import React, { useState } from "react";
import {
  SafeAreaView,
  Image,
  Text,
  View,
  ScrollView,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "expo-router";

import banana from "../assets/images/banana.png";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";


// interface LoginScreenProps {
//   navigation: any;
// }

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("./RecipeScreen");
    } catch (error) {
      Alert.alert("Login failed", (error as any)?.message || "");
    }
  };

  const signup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("./upload");
    } catch (error) {
      console.error('Signup Error: ', error);
      Alert.alert("Signup failed", (error as any)?.message || "");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={{ paddingHorizontal: 25 }}>
        <View style={{ alignItems: "center" }}>
          <Image
            source={banana}
            height={300}
            width={300}
            style={{ transform: [{ rotate: "10deg" }] }}
          ></Image>
        </View>
        <Text
          style={{
            fontSize: 28,
            fontWeight: "500",
            color: "#333",
            marginBottom: 30,
          }}
        >
          ReciPic
        </Text>
        <View
          style={{
            flexDirection: "row",
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 25,
          }}
        >
          <MaterialIcons
            name="alternate-email"
            size={20}
            style={{ marginRight: 5 }}
          />
          <TextInput
            placeholder="Email ID"
            style={{ flex: 1, paddingVertical: 0 }}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 25,
          }}
        >
          <Ionicons
            name="lock-closed-outline"
            size={20}
            style={{ marginRight: 5 }}
          />
          <TextInput
            placeholder="Password"
            style={{ flex: 1, paddingVertical: 0 }}
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />

        </View>
        <TouchableOpacity onPress={(login)} style={{backgroundColor: '#eed365', padding: 20, borderRadius:10, marginBottom:30}}>
            <Text style={{textAlign:'center', fontWeight:'700', fontSize:16, color:'#fff'}}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={(signup)} style={{backgroundColor: '#eed365', padding: 20, borderRadius:10, marginBottom:30}}>
            <Text style={{textAlign:'center', fontWeight:'700', fontSize:16, color:'#fff'}}>Register</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

/*
    return (
        <View style={styles.container}>
            <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} autoCapitalize="none" keyboardType="email-address" />
            <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
            <Button title="Login" onPress={login} />
            <Button title="Sign Up" onPress={signup} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        gap: 12
    },
    input: {
        borderWidth: 1,
        padding: 10,
        marginBottom: 19,
        borderRadius: 6,
        borderColor: '#ccc',
    },
});
*/
