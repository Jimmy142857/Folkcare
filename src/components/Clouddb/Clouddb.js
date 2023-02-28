import React, { useState }from "react";
import { Button, Text, TextInput, View, Image, Alert } from 'react-native';
import AGCAuth, { PhoneAuthProvider, VerifyCodeSettings, VerifyCodeAction, AGCUser, SignInResult } from '@react-native-agconnect/auth';
import AGCCloudDB, { AGCCloudDBZoneConfig, AGCCloudDBQuery }from "@react-native-agconnect/clouddb";

const Clouddb = () =>{  

  const [dbZone, setDbZone] = useState(null)
  const className = "BookInfo";
  const zoneName = "QuickStartDemo";
  const showResult = (res) => Alert.alert("Result", JSON.stringify(res, null, 4));
  const listener = (value) => Alert.alert("Listener", JSON.stringify(value, null, 4));
  const book1 = {
      id: 1,
      bookName: "myBook",
      author: "RDJ",
      price: 123.99,
      publisher: "Huawei",
  }
  const book2 = {
      id: 2,
      bookName: "myBook",
      price: 12
  }
  const book3 = {
      id: 3,
      bookName: "myBook",
      price: 125.32
  }
  const book4 = {
      id: 4,
      bookName: "MyTransactionBook",
      author: "King Arthur",
      price: 54,
      publisher: "Huawei",
  }

  const initCloudDB = () => {                    // 初始化
    AGCCloudDB.getInstance().createObjectType() 
       .then(res => showResult(res)) 
       .catch(err => showResult(err.message)) 
  }; 

  const openCloudDBZone = () => {                // 打开存储区
    let config = new AGCCloudDBZoneConfig(
        zoneName,
        AGCCloudDBZoneConfig.CloudDBZoneSyncProperty.CLOUDDBZONE_CLOUD_CACHE,
        AGCCloudDBZoneConfig.CloudDBZoneAccessProperty.CLOUDDBZONE_PUBLIC
    );
    AGCCloudDB.getInstance().openCloudDBZone2(config, true).then(response => {
        setDbZone(response);
    }).catch(error => {
        Alert.alert("error: ", JSON.stringify(error.message))
    })
    AGCCloudDB.getInstance().addEventListener(listener)
    AGCCloudDB.getInstance().addDataEncryptionKeyListener(listener)
  };

  const writeData = async () => {                 // 写数据
    let user = await AGCAuth.getInstance().currentUser();
    if (user) {
        dbZone.executeUpsert(className, [book1, book2, book3, book4])
            .then(res => showResult(res))
            .catch(err => showResult(err.message))
    } else {
        Alert.alert("Error", "用户未登录，请先登录")
    }
  };

  const queryData = () => {                     // 读数据
    let query = AGCCloudDBQuery.where(className)
        .greaterThanOrEqualTo("price", 12)
        .isNotNull("id")
        .build()
    dbZone.executeQuery(query, AGCCloudDBQuery.CloudDBZoneQueryPolicy.POLICY_QUERY_FROM_CLOUD_ONLY)
        .then(res => showResult(res))
        .catch(err => showResult(err.message))
  }

  const deleteData = async () => {             // 删数据
    let user = await AGCAuth.getInstance().currentUser();
    if (user) {
        dbZone.executeDelete(className, [book1, { id: 2 }, { id: 3 }])
            .then(res => showResult(res))
            .catch(err => showResult(err.message))
    } else {
        Alert.alert("Error", "用户未登录，请先登录")
    }
  }

  return (
    <View >
      <Button
        title = "初始化"
        onPress = { () => { initCloudDB()} }
      />

      <Button
        title = "打开存储区"
        onPress = {() => { openCloudDBZone() }}
      />

      <Button
        title = "写入数据"
        onPress = {() => { writeData() }}
      />
      
      <Button
        title = "查询数据"
        onPress = {() => { queryData() }}
      />

      <Button
        title = "删除数据"
        onPress = {() => { deleteData() }}
      />
      
    </View>
  )
}

export default Clouddb;
