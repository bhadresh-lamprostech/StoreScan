import { View, Text } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

const HomeScreen = () => {

  const navigation = useNavigation();

  useLayoutEffect(()=>{
navigation.setOptions({
  headerTitle : "Home"
});
  },[])
  return (
    <View className="bg-slate-600">
      <Text className="text-red-500">HomeScreenwerjwehrjhwje</Text>
    </View>
  )
}

export default HomeScreen