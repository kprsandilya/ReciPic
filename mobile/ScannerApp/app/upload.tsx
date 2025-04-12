/*import React, { useState } from 'react';
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
}*/


import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
