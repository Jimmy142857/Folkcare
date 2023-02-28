// 底部按键导航+基本栈导航+自定义底部图标+相机 实现多界面切换

import React, { useState, useRef } from 'react';
import { 
  Button, 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  StatusBar, 
  Alert,
  Animated
} from 'react-native';    
import  Ionicons  from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'; // 确保显示在正常区域内
import Camera from '../../components/Camera';

import Animations from '../../components/3Dlibray/Animations';                   // react-native-gl-model-view
import GestureControl from '../../components/3Dlibray/GestureControl';



const HomeNavigation = () => {

  function HomeScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <Text>欢迎来到 Folkcare ~</Text>
        <TouchableOpacity style = {styles.button} onPress = {() => navigation.navigate('相机')}>
          <Text style={styles.text}>前往相机界面</Text>
        </TouchableOpacity>      
      </View>
    );
  }
  
  function CameraScreen({ navigation }) {
    return (                                   // <Camera />调用相机组件
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />    
        <Camera />  
      </View>
    );
  }
  
  function ProfileScreen({ navigation }) {
    return (
      // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      //   <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      // </View>
      // <Animations />
      <GestureControl/>
      );
  }
  
  
  function SettingScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <Text>数据处理</Text>

        <TouchableOpacity style = {styles.button} onPress = {() => {}}>
          <Text style={styles.text}>初始化</Text>
        </TouchableOpacity>

        <TouchableOpacity style = {styles.button} onPress = {() => {}}>
          <Text style={styles.text}>打开存储区</Text>
        </TouchableOpacity>

        <TouchableOpacity style = {styles.button} onPress = {() => {}}>
          <Text style={styles.text}>写入数据</Text>
        </TouchableOpacity>

        <TouchableOpacity style = {styles.button} onPress = {() => {}}>
          <Text style={styles.text}>查询数据</Text>
        </TouchableOpacity>

        <TouchableOpacity style = {styles.button} onPress = {() => {}}>
          <Text style={styles.text}>删除数据</Text>
        </TouchableOpacity>
        
        <Text> 用户注销</Text>

        <TouchableOpacity style = {styles.button} onPress = {() => {}}>
          <Text style={styles.text}>用户Token</Text>
        </TouchableOpacity>

        <TouchableOpacity style = {styles.button} onPress = { () => {} }>
          <Text style={styles.text}>用户退出</Text>
        </TouchableOpacity>        
      </View>
    );
  }
  
 
  
  const navigation = useNavigation();
  const Tab = createBottomTabNavigator();
  const SettingsStack = createNativeStackNavigator();
  const HomeStack = createNativeStackNavigator();
    

  return (
  <SafeAreaProvider>   
      <Tab.Navigator                               //设置个性化图标
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === '首页') {
              iconName = focused
                ? 'home-outline' : 'home-outline';
            } 
            else if (route.name === '重建') {
              iconName = focused ? 'cube-outline' : 'cube-outline';
            }
            else if (route.name === '设置') {
              iconName = focused ? 'settings' : 'settings';
            }
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          headerShown: false             //页眉不显示标题
        })}
      >

        <Tab.Screen name="首页">
          {() => (
            <SettingsStack.Navigator>
              <SettingsStack.Screen name="主页" component={HomeScreen} />
              <SettingsStack.Screen name="相机" component={CameraScreen} />
            </SettingsStack.Navigator>
          )}
        </Tab.Screen>

        <Tab.Screen name="重建">
          {() => (
            <SettingsStack.Navigator>
              <SettingsStack.Screen name="3D重建" component={ProfileScreen} />
            </SettingsStack.Navigator>
          )}
        </Tab.Screen>

        <Tab.Screen name="设置">
          {() => (
            <HomeStack.Navigator>
              <HomeStack.Screen name="设定" component={SettingScreen} />             
            </HomeStack.Navigator>
          )}
        </Tab.Screen>

      </Tab.Navigator>
  </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  text: {
    padding: 15,
    color: 'white',
    textAlign: 'center',
  },
  button: {
    alignItems: 'center',   
    backgroundColor:'#1e90ff',
    padding: 5,
    marginVertical: 5,
    width: 150,
    borderRadius:12,  
  },
})

export default HomeNavigation;