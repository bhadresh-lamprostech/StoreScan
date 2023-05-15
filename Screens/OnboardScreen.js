import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";

export class OnboardScreen extends Component {
  handleRedirect = () => {
    this.props.navigation.navigate("Main");
  };

  render() {
    return (
      <View className="flex-1 items-center justify-center">
      <Text className="text-2xl mb-4">OnboardScreen</Text>
      <TouchableOpacity onPress={this.handleRedirect} className="bg-blue-500 py-2 px-4 rounded">
        <Text className="text-white">Go to Main Screen</Text>
      </TouchableOpacity>
    </View>
    );
  }
}

export default OnboardScreen;
