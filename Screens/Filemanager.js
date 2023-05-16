import React from "react";
import { View, Text, FlatList, Image } from "react-native";

const FileManager = ({ scannedFiles }) => {
  const renderScannedFile = ({ item }) => (
    <View style={{ margin: 10 }}>
      <Image source={{ uri: item }} style={{ width: 200, height: 200 }} />
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
        Scanned Files
      </Text>
      {scannedFiles && scannedFiles.length === 0 ? (
        <Text>No scanned files</Text>
      ) : (
        <FlatList
          data={scannedFiles}
          renderItem={renderScannedFile}
          keyExtractor={(item, index) => index.toString()}
          horizontal
        />
      )}
    </View>
  );
};

export default FileManager;
