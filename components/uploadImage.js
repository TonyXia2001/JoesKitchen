import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
	Constants,
	Camera,
	Permissions,
} from 'expo';
import ImagePicker from 'react-native-image-picker'
import {Ionicons} from '@expo/vector-icons';

export default function App() {
  useEffect(() => {
    console.log('Joe is uploading joes');
  });
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
	return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={styles.text}> Flip </Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

takePicture = async => {
	if (this.camera) {
			this.camera.takePictureAsync({
			base64: true,
			quality: 0,
			skipProcessing: true
			}).then(image => {
			//detectLabels Function
			});
	}
}

async function getCameraAsync() {
  // permissions returns only for location permissions on iOS and under certain conditions, see Permissions.LOCATION
  const { status, permissions } = await Permissions.askAsync(Permissions.CAMERA);
  if (status !== 'granted') {
    throw new Error('Camera permission not granted');
  } 
}

async function getCameraRollAsync() {
  // permissions returns only for location permissions on iOS and under certain conditions, see Permissions.LOCATION
  const { status, permissions } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
  if (status !== 'granted') {
    throw new Error('Camera Roll permission not granted');
  } 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});