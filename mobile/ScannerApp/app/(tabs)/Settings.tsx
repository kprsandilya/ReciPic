import React, { useState } from "react";
import {
  SafeAreaView,
  Image,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { auth } from "../../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useRouter } from "expo-router";

import banana from "../../assets/images/banana.png";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Redirect } from "expo-router";


interface RegisterScreenProps {
  navigation: any;
}
export default function RegisterScreen({navigation}: RegisterScreenProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signout = async () => {
    try {
      await signOut(auth);
      router.replace("../LoginScreen");
    } catch (error) {
      Alert.alert("Sign out failed", (error as any)?.message || "");
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

        <TouchableOpacity onPress={(signout)} style={{backgroundColor: '#eed365', padding: 20, borderRadius:10, marginBottom:30}}>
                    <Text style={{textAlign:'center', fontWeight:'700', fontSize:16, color:'#fff'}}>Sign Out</Text>
                </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => navigation.navigate('Register')} style={{backgroundColor: '#eed365', padding: 20, borderRadius:10, marginBottom:30}}>
            <Text style={{textAlign:'center', fontWeight:'700', fontSize:16, color:'#fff'}}>Register</Text>
        </TouchableOpacity> */}
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
