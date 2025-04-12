import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet} from 'react-native';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'expo-router'

export default function LoginScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = async() => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push('./upload');
        } catch (error) {
            Alert.alert('Login failed', (error as any)?.message || '');
        }
    };

    const signup = async() => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            router.push('./upload');
        } catch (error) {
            Alert.alert('Signup failed', (error as any)?.message || '');
        }
    };

    return (
        <View style={{ padding: 20 }}>
            <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
            <TextInput placeholder="Password" value={password} onChangeText={setPassword} />
            <Button title="Login" onPress={login} />
            <Button title="Signup" onPress={signup} />
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