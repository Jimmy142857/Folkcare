import React, { useState }from "react";
import { Button, Text, TextInput, View, Image, Alert } from 'react-native';
import AGCAuth, { PhoneAuthProvider, VerifyCodeSettings, VerifyCodeAction } from '@react-native-agconnect/auth';


const [phoneNumber, setPhoneNumber] = useState(''); 
const [verifyCode, setVerityCode] = useState('');
const countryCode = "86";

const settings = new VerifyCodeSettings(                         // 验证码设置
    VerifyCodeAction.REGISTER_OR_LOGIN,
    "zh_CN",
    30
); 

const credential = PhoneAuthProvider.credentialWithVerifyCode(   // 登录设置
    countryCode,
    phoneNumber,
    null,
    verifyCode,
);

async function sendmessage()                                    // 请求验证码
{ try {
    const verifyCodeResult = await PhoneAuthProvider.requestVerifyCode(
      countryCode, 
      phoneNumber, 
      settings
      );
  } catch (error) { }
};

async function rigister()                                        // 用户注册
  { try {
    const signInResult = await AGCAuth.getInstance() 
      .createPhoneUser(
        countryCode,
        phoneNumber,
        null,
        verifyCode
        );
  } catch (error) { }
};

async function login()                                           // 用户登录
  { try {
    const signInResult = await AGCAuth.getInstance() 
      .signIn(credential);
    if (signInResult && signInResult.user) 
      { }
  } catch (error) { }
};

async function logout()                                          // 用户登出
  { try { AGCAuth.getInstance()
          .signOut();
  } catch (error) { } 
  };
     
async function getTokenResult()                                 // 获取用户token
{ try { 
    const user = await AGCAuth.getInstance()   
        .currentUser();
    user.getToken()
    .then( TokenResult => { 
      Alert.alert("User's Token", JSON.stringify(TokenResult.token)) })
    .catch((error) => { });
  } catch(error) { Alert.alert("Error", JSON.stringify(error.message))}
};  

async function userInfo()                                       // 获取用户信息
{ try {
     const user = await AGCAuth.getInstance()
        .currentUser();  
    if (user) { 
      Alert.alert( "User's Info", JSON.stringify(user) )}
    else { Alert.alert( "User's Info",'NO User Login ')}
  } catch(error)  { Alert.alert( "Error", JSON.stringify(error.message)) }
};


function listener(tokenSnapshot) {                              // 监听token 变动
    console.log("tokenSnapshot.state", tokenSnapshot.state);
    console.log("tokenSnapshot.token", tokenSnapshot.token);
}
const subscription = AGCAuth.getInstance().addTokenListener(listener);
