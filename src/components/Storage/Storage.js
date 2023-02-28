import react from "react";
import { View, Text } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const storeString = async (value) => {
    //存储字符串
    try {
      await AsyncStorage.setItem('@storage_Key', value)
    } catch (e) {
      // saving error
    }
  }

const storeObject = async (value) => {
    //存储对象
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@storage_Key', jsonValue)
    } catch (e) {
      // saving error
    }
}

const getString = async () => {
    //读取字符串
    try {
      const value = await AsyncStorage.getItem('@storage_Key')
      if(value !== null) {
        // value previously stored
      }
    } catch(e) {
      // error reading value
    }
}

const getObject = async () => {
    //读取对象
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Key')
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      // error reading value
    }
  }