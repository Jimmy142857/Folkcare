// 底部按键导航+基本栈导航+自定义底部图标+相机 实现多界面切换

import * as React from 'react';
import { Button, View, Text, StatusBar, } from 'react-native';           //状态栏控件StatusBar
import  Ionicons  from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'; //确保显示在正常区域内
import Camera from './camera.js';


function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Text>欢迎来到 Folkscare</Text>
      <Button
        title="前往相机界面"
        onPress={() => navigation.navigate('相机')}
      />
    </View>
  );
}

function FunctionScreen({ navigation }) {
  return (                //调用相机组件
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />    
      <Camera />  
    </View>
  );
}

function ProfileScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Text>我的文件</Text>
    </View>
  );
}


function SettingScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Text>设置页面</Text>
      <Button
        title="前往详细界面"
        onPress={() => navigation.navigate('详细')}
      />
    </View>
  );
}

function DetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Text>详细页面</Text>
      <Button
        title="再次前往详细界面"
        onPress={() => navigation.push('详细')}
      />
    </View>
  );
}

const Tab = createBottomTabNavigator();
const SettingsStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();


function Navigation() {
  return (
  <SafeAreaProvider>
    <NavigationContainer>    
      <Tab.Navigator                  //设置个性化图标
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === '首页') {
              iconName = focused
                ? 'home-outline'
                : 'home-outline';
            } 
            else if (route.name === '文件') {
              iconName = focused ? 'folder-outline' : 'folder-outline';
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
              <SettingsStack.Screen
                name="主页"
                component={HomeScreen}
              />
              <SettingsStack.Screen name="相机" component={FunctionScreen} />
            </SettingsStack.Navigator>
          )}
        </Tab.Screen>

        <Tab.Screen name="文件">
          {() => (
            <SettingsStack.Navigator>
              <SettingsStack.Screen name="我的文件" component={ProfileScreen} />
            </SettingsStack.Navigator>
          )}
        </Tab.Screen>

        <Tab.Screen name="设置">
          {() => (
            <HomeStack.Navigator>
              <HomeStack.Screen name="设定" component={SettingScreen} />
              <HomeStack.Screen name="详细" component={DetailsScreen} />
            </HomeStack.Navigator>
          )}
        </Tab.Screen>

      </Tab.Navigator>
    </NavigationContainer>
  </SafeAreaProvider>
  );
}

export default Navigation;