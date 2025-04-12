import React, { useState } from 'react';
import { View, Button, Image, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { storage, db, auth } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore'

export default function UploadScreen() {
    const[image, setImage] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);

    const pickImage = async () => {
        const result = await ImagePicker.launchCameraAsync({ base64: false });
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const uploadImage = async() => {
        if (!image) return;
        setUploading(true);
        const response = await fetch(image);
        const blob = await response.blob();
        const filename = '${Date.now()}.jpg';
        const imageRef = ref(storage, 'uploads/${auth.currentUser?.uid}/${filename}');
        await uploadBytes(imageRef, blob);
        const downloadURL = await getDownloadURL(imageRef);
        await addDoc(collection(db, 'uploads'), {
            url: downloadURL,
            user: auth.currentUser?.uid,
            timestamp: new Date()
        });
        setUploading(false);
        setImage(null);
        alert('Uploaded!');
    };

    return (
        <View style={{ padding: 20 }}>
            <Button title="Take Photo" onPress={pickImage} />
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            {uploading ? <ActivityIndicator /> : image && <Button title="Upload" onPress={uploadImage} />}
        </View>
    );
}