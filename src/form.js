import React from 'react';
import { Text, View, StyleSheet, TextInput, Alert, Button } from 'react-native';
// import { Button, Input } from '@rneui/base';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';

class Forms extends React.Component {
  emailInput = null;
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>注册界面</Text>
        <Formik
          initialValues={{ name: '', email: '' }}

          validationSchema={Yup.object({
            name: Yup.string()              
              .required('必填'),
            email: Yup.string()
              .email('非法邮箱格式')
              .required('必填'),
          })}

          onSubmit={(values, formikActions) => {
            setTimeout(() => {
              Alert.alert(JSON.stringify(values));
              // Important: Make sure to setSubmitting to false so our loading indicator
              // goes away.
              formikActions.setSubmitting(false);
            }, 500);
          }}>
          {props => (
            <View>
             <TextInput
                onChangeText={props.handleChange('name')}
                onBlur={props.handleBlur('name')}
                value={props.values.name}
                autoFocus
                placeholder="姓名"
                style={styles.input}
                onSubmitEditing={() => {
                  // on certain forms, it is nice to move the user's focus
                  // to the next input when they press enter.
                  this.emailInput.focus()
                }}
              />
              {props.touched.name && props.errors.name ? (
                <Text style={styles.error}>{props.errors.name}</Text>
              ) : null}

              <TextInput
                onChangeText={props.handleChange('email')}
                onBlur={props.handleBlur('email')}
                value={props.values.email}
                placeholder="邮箱"
                style={styles.input}
                ref={el => this.emailInput = el}
              />
              {props.touched.email && props.errors.email ? (
                <Text style={styles.error}>{props.errors.email}</Text>
              ) : null}

              <Button
                title='提交'
                onPress={props.handleSubmit}
                // color="red"
                // mode="contained"
                loading={props.isSubmitting}
                disabled={props.isSubmitting}
                // style={{ marginTop: 16 }} 
                style={styles.buttonStyle}
                />
                              
              <Button
                title='重置'
                onPress={props.handleReset}
                // color="red"
                // mode="outlined"
                disabled={props.isSubmitting}
                // style={{ marginTop: 16 }}
                style={styles.buttonStyle}
                />
                              
            </View>
          )}
        </Formik>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: Constants.statusBarHeight + 200,
    paddingTop: 10,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  title: {
    margin: 24,
    fontSize: 24,
    color:'#000000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  error: {
    margin: 8,
    fontSize: 14,
    color: 'red',
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    paddingHorizontal: 8,
    width: '100%',
    borderColor: '#ddd',
    borderWidth: 1,
    backgroundColor: '#fff',
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 15,
    marginVertical: 5,
    width: 250,
    borderRadius:20,  
  },
});

export default Forms;