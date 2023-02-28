import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  Alert,
  StatusBar,
} from 'react-native';
import AGCAuth, { 
  PhoneAuthProvider, 
  VerifyCodeSettings, 
  VerifyCodeAction, 
  AGCUser, 
  SignInResult 
} from '@react-native-agconnect/auth';
import { useNavigation } from '@react-navigation/native';

import Logo from '../../../assets/images/Logo_1.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';


const SignInScreen = () => {
  const countryCode = "86";
  const [phoneNumber, setPhoneNumber] = useState(''); 
  const [verifyCode, setVerityCode] = useState('');
  
  const { height } = useWindowDimensions();
  const navigation = useNavigation();
  
  const settings = new VerifyCodeSettings(                        // 验证码参数设置
    VerifyCodeAction.REGISTER_OR_LOGIN,
    "zh_CN",
    30
  ); 

  const credential = PhoneAuthProvider.credentialWithVerifyCode(  // 登录参数设置
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
    if (verifyCodeResult){
      Alert.alert("提示", "验证码发送成功");}
  } catch (error) { Alert.alert("提示", "验证码发送失败，请检查您的手机号") }
  };

  async function login()                                           // 用户登录
  { try {
    const signInResult = await AGCAuth.getInstance() 
      .signIn(credential);
    if (signInResult && signInResult.user) 
    { }
      { navigation.navigate('Home') }                              // 此处暂时使用这种方式跳转。。。
  } catch (error) { Alert.alert("提示", "登录失败，请确认您填写的信息") }
  };

  // Alert.alert("提示", "登录失败，请确认您填写的信息")

  async function getTokenResult()                                 // 获取用户token
    { try { 
        const user = await AGCAuth.getInstance()   
            .currentUser();
        user.getToken()
        .then( TokenResult => { 
          Alert.alert( "用户Token", JSON.stringify(TokenResult.token)) })
        .catch((error) => {  });
      } catch(error) { Alert.alert("提示", "用户未登录无法获取Token")}
  };
  
  async function logout()                                          // 用户登出
  { try { AGCAuth.getInstance()
          .signOut();
  } catch (error) { } 
  };
  
  const onSignUpPress = () => {                                   // 导航到注册界面
    navigation.navigate('SignUp');
  };
  
  

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
      <StatusBar  backgroundColor={"whitesmoke"} barStyle={"dark-content"} />

        <Image
          source={Logo}
          style={[styles.logo, {height: height * 0.3}]}
          resizeMode="contain"
        />

        <CustomInput
          placeholder="请输入手机号"
          value={ phoneNumber }
          setValue={ setPhoneNumber }
        />
        
        <CustomInput
          placeholder="请输入验证码"
          value={ verifyCode }
          setValue={ setVerityCode }
        />

        <CustomButton 
          text="发送验证码" 
          onPress={ () => { sendmessage() } } 
        />

        <CustomButton 
          text="登录" 
          onPress={ () => { login() } } 
        />

        <CustomButton 
          text="进入主界面" 
          onPress={ () => {  navigation.navigate('Home') } } 
        />
        
        <SocialSignInButtons />

        <CustomButton
          text="没有账户？点击这里创建一个"
          onPress={onSignUpPress}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    // flex: 1,
    alignItems: 'center',
    padding: 20,   
  },
  logo: {
    width: '40%',
    maxWidth: 300,
    maxHeight: 200,
  },
  text: {
    color: 'gray',
    marginVertical: 5,
  },
});

export default SignInScreen;
