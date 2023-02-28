import React,{ useState } from 'react';
import {View, Text, Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// import SignInScreen from '../screens/SignInScreen';           // 后续安装Firebase后再加入
// import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';


/** 
  如何实现页面跳转？ token 监听？ （本界面设置函数不会自动刷新无法跳转，用Hook也是）
  暂时将所有界面放在一起，使用AGC的异步函数then实现界面跳转（逻辑Bug存在）
*/

/** 
   考虑填充APP功能
   1. 文件的选择(图片)
   2. 3D格式文件的展示（什么库？）
*/

/**
 * 完全移除 Huawei AGC
 * 后续考虑 Firebase
 */


const Stack = createNativeStackNavigator();

const Navigation = () => {

  return ( 
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
          {/* <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} /> */}
          <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}


export default Navigation;