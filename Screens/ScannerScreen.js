import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { Feather } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import FileManager from "./Filemanager";
import * as FileSystem from "expo-file-system";

// import * as Permissions from "expo-permissions";


const Scanner = () => {
  const cameraRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [capturedImage, setCapturedImage] = useState(null);
  const [scannedFiles, setScannedFiles] = useState([]);
  const [folderPath, setFolderPath] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");

      const folderName = "scanned_files";
      const folderInfo = await FileSystem.getInfoAsync(
        FileSystem.documentDirectory + folderName
      );
      console.log(folderInfo);
      
      if (!folderInfo.exists) {
        await FileSystem.makeDirectoryAsync(
          FileSystem.documentDirectory + folderName
        );
      }
      setFolderPath(FileSystem.documentDirectory + folderName);
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
        const { uri } = result;
        setCapturedImage(uri);
      }
    }
  };

  const retakePicture = () => {
    setCapturedImage(null);
  };
  const saveScannedFile = async () => {
    if (capturedImage) {
      try {
        // const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY_WRITE_ONLY);
  
        // if (status !== "granted") {
        //   throw new Error("Permission denied to write to media library");
        // }
  
        const fileInfo = await FileSystem.getInfoAsync(capturedImage);
        const fileName = fileInfo.uri.split("/").pop();
        const destinationDirectory = FileSystem.documentDirectory + "custom_directory/";
        await FileSystem.makeDirectoryAsync(destinationDirectory, { intermediates: true });
        const destinationPath = destinationDirectory + fileName;
        console.log("Source Path:", capturedImage);
        console.log("Destination Path:", destinationPath);
        await FileSystem.moveAsync({
          from: capturedImage,
          to: destinationPath,
        });
        console.log("File moved successfully!");
        setScannedFiles((prevScannedFiles) => [...prevScannedFiles, destinationPath]);
        setCapturedImage(null);
      } catch (error) {
        console.log("Error saving scanned file:", error);
      }
    }
  };
  
  
  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <FileManager scannedFiles={scannedFiles} />
      {capturedImage ? (
        <View style={{ flex: 1 }}>
          <Image
            source={{ uri: capturedImage }}
            style={{ flex: 1 }}
            resizeMode="contain"
          />
          <TouchableOpacity style={styles.button} onPress={retakePicture}>
            <Text style={styles.buttonText}>Retake</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={saveScannedFile}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Camera ref={cameraRef} style={{ flex: 1 }}>
          <View
            style={{
              flex: 1,
              backgroundColor: "transparent",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            <TouchableOpacity
              style={{ alignItems: "center", marginHorizontal: 10 }}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            >
              <Feather name="refresh-cw" size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ alignItems: "center", marginHorizontal: 20 }}
              onPress={takePicture}
            >
              <Feather name="camera" size={50} color="red" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ alignItems: "center", marginHorizontal: 20 }}
              onPress={pickImageFromGallery}
            >
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
