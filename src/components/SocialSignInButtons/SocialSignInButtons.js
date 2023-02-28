import React from 'react';
import {View, Text} from 'react-native';
import CustomButton from '../CustomButton';

const SocialSignInButtons = () => {
  const onSignInWeiXin = () => {
    console.warn('微信登录被点击');
  };

  return (
    <>
      <CustomButton
        text="使用微信登录"
        onPress={ onSignInWeiXin }
        bgColor="#09bb07"
        fgColor="white"
      />      
    </>
  );
};

export default SocialSignInButtons;
