import React, {useState} from 'react';
import {
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Alert,
  StatusBar,
} from 'react-native';
import AGCAuth, { PhoneAuthProvider, VerifyCodeSettings, VerifyCodeAction, AGCUser, SignInResult} from '@react-native-agconnect/auth';
import {useNavigation} from '@react-navigation/core';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';


const SignUpScreen = () => {
  
  const countryCode = "86";
  const [phoneNumber, setPhoneNumber] = useState(''); 
  const [verifyCode, setVerityCode] = useState('');
  
  const settings = new VerifyCodeSettings(                        // 验证码设置
  VerifyCodeAction.REGISTER_OR_LOGIN,
  "zh_CN",
  30
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

  async function rigister()                                        // 用户注册
  { try {
    const signInResult = await AGCAuth.getInstance() 
      .createPhoneUser(
        countryCode,
        phoneNumber,
        null,
        verifyCode
        );
    if (signInResult && signInResult.user) 
      { }
      { navigation.navigate('Home') }                             // 暂时用这种方式跳转。。。
  } catch (error) { Alert.alert("提示", "注册失败，请检查您填写的信息") }
  };


  const navigation = useNavigation();

  const onSignInPress = () => {
    navigation.navigate('SignIn');
  };

  const onTermsOfUsePressed = () => {
    console.warn('条款被点击');
  };

  const onPrivacyPressed = () => {
    console.warn('隐私政策被点击');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
      <StatusBar  backgroundColor={"whitesmoke"} barStyle={"dark-content"} />

        <Text style={styles.title}>用户注册界面</Text>

        <CustomInput
          placeholder="请输入手机号"
          value={phoneNumber}
          setValue={setPhoneNumber}
        />

        <CustomInput 
          placeholder="请输入验证码" 
          value={verifyCode} 
          setValue={setVerityCode} 
        />
        
        <CustomButton 
          text="发送验证码" 
          onPress={ () => {sendmessage()} } 
        />

        <CustomButton
          text="点击注册"
          onPress={ () => {rigister()} } 
        />

        <Text style={styles.text}>
          注册账户意味着您接受了我们提供的{' '}
          <Text style={styles.link} onPress={onTermsOfUsePressed}>
            条款
          </Text>{' '}
          和{' '}
          <Text style={styles.link} onPress={onPrivacyPressed}>
            隐私政策
          </Text>
        </Text>

        <SocialSignInButtons />

        <CustomButton
          text="拥有账户？点此登录"
          onPress={onSignInPress}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051C60',
    margin: 10,
  },
  text: {
    color: 'gray',
    marginVertical: 10,
  },
  link: {
    color: '#FDB075',
  },
});

export default SignUpScreen;
