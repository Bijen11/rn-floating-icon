import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import {AntDesign} from '@expo/vector-icons';

import { useColorScheme } from '@/hooks/useColorScheme';
import { Pressable, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function RootLayout() {

  return (
  
    <View style = {styles.container}>
      
      
      <View style={[styles.hearts]}>
      <AntDesign name='heart' size={40} color={'blue'}/>
      </View>
      
      <TouchableOpacity style={styles.button}>
        <AntDesign name='hearto' size={40}/>
      </TouchableOpacity>
      
    </View>

  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  button:{
    width:50,
    right:40,
    bottom:40,
    height:50,
    alignItems:'center',
    position:'absolute',
    justifyContent:'center',
  },
  hearts:{
    
  }
})
