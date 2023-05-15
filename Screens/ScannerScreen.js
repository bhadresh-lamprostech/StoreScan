import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { Feather } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { ImageManipulator } from "expo-image-manipulator";
// import { ImageManipulator } from "expo";

const Scanner = () => {
  const cameraRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [capturedImage, setCapturedImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      const { uri } = await cameraRef.current.takePictureAsync();
      setCapturedImage(uri);
    }
  };

  const pickImageFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });
      if (!result.cancelled) {
        setCapturedImage(result.uri);
      }
    }
  };

  const retakePicture = () => {
    setCapturedImage(null);
    setCroppedImage(null);
  };
  const cropImage = async () => {
    if (capturedImage) {
      Image.getSize(
        capturedImage,
        async (width, height) => {
          const cropData = {
            originX: 0,
            originY: 0,
            width: width,
            height: height,
          };
  
          const manipResult = await ImageManipulator.manipulateAsync(
            capturedImage,
            [{ crop: cropData }],
            { compress: 1, format: ImageManipulator.SaveFormat.PNG }
          );
          setCroppedImage(manipResult.uri);
        },
        error => {
          console.log("Error getting image size: ", error);
        }
      );
    }
  };
  const saveImage = () => {
    // Implement the save functionality here
    // You can use the croppedImage URI to save or upload the image
    // Example: Call an API to save the image on a server
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      {croppedImage ? (
        <View style={{ flex: 1 }}>
          <Image
            source={{ uri: croppedImage }}
            style={{ flex: 1 }}
            resizeMode="contain"
          />
          <TouchableOpacity style={styles.button} onPress={retakePicture}>
            <Text style={styles.buttonText}>Retake</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={saveImage}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      ) : capturedImage ? (
        <View style={{ flex: 1 }}>
                   <Image
            source={{ uri: capturedImage }}
            style={{ flex: 1 }}
            resizeMode="contain"
          />
          <TouchableOpacity style={styles.button} onPress={cropImage}>
            <Text style={styles.buttonText}>Crop</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={retakePicture}>
            <Text style={styles.buttonText}>Retake</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Camera ref={cameraRef} style={{ flex: 1 }} type={type}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}
        >
          <TouchableOpacity style={{ alignItems: 'center', marginHorizontal: 10 }} onPress={() => {
            setType(
              type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            );
          }}>
            <Feather name="refresh-cw" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={{ alignItems: 'center', marginHorizontal: 20 }} onPress={takePicture}>
            <Feather name="camera" size={50} color="red" />
          </TouchableOpacity>
          <TouchableOpacity style={{ alignItems: 'center', marginHorizontal: 20 }} onPress={pickImageFromGallery}>
            <Feather name="image" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </Camera>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
    margin: 10,
  },
  buttonText: {
    color: "#000",
    textAlign: "center",
    fontSize: 16,
  },
});

export default Scanner;

