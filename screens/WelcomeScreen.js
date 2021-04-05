import * as React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image, Modal ,
KeyboardAvoidingView} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import {Header} from 'react-native-elements';

export default class WelcomeScreen extends React.Component{
    constructor(){
        super()
        this.state={
            email:'',
            password:'',
            firstName:'',
            lastName:'',
            address:'',
            contact:'',
            confirmPassword:'',
            isModalVisible:'false'
        }
    }
    showModal=()=>{
      return(
        <Modal 
        animationType="fade"
        transparent={true}
        visible={this.state.isModalVisible}>
          <View style={styles.modalContainer}>
            <KeyboardAvoidingView>
            <Text>Registration Form</Text>
            <TextInput style={styles.textInput}
            placeholder={"First name"}
            maxLength={10}
            onChangeText={(text)=>{this.setState({
              firstName:text
            })}}
            />
            <TextInput style={styles.textInput}
            placeholder={"Last name"}
            maxLength={10}
            onChangeText={(text)=>{this.setState({
              lastName:text
            })}}
            />
            <TextInput style={styles.textInput}
            placeholder={"Contact number"}
            keyboardType={'numeric'}
            maxLength={10}
            onChangeText={(text)=>{this.setState({
              contact:text
            })}}
            />
            <TextInput style={styles.textInput}
            placeholder={"Address"}
            multiline={true}
            onChangeText={(text)=>{this.setState({
              address:text
            })}}
            />
            <TextInput style={styles.textInput}
            placeholder={"Email address"}
           keyboardType={'email-address'}
            onChangeText={(text)=>{this.setState({
              email:text
            })}}
            />
            <TextInput style={styles.textInput}
            placeholder={"Password"}
           secureTextEntry={true}
            onChangeText={(text)=>{this.setState({
              password:text
            })}}
            />
            <TextInput style={styles.textInput}
            placeholder={"Confirm password"}
           secureTextEntry={true}
            onChangeText={(text)=>{this.setState({
              confirmPassword:text
            })}}
            />
            <View style={{flexDirection:"row"}}>
              <TouchableOpacity style={styles.registerButton}
              onPress={()=>this.userSignUp(this.state.email,this.state.password,this.state.confirmPassword)}>
              <Text style={{color:"white"}}>Register</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton}
              onPress={()=>this.setState({isModalVisible:false})}>
              <Text style={{color:"white"}}>Cancel</Text>
              </TouchableOpacity>
            </View>
            </KeyboardAvoidingView>
          </View>
        </Modal>
      )
    }
    userSignUp=(email,password,confirmPassword)=>{
        if(password!==confirmPassword){
          alert("Password does not match.")
        }
        else{
          firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(() => {
            db.collection("Users").add({
              firstName:this.state.firstName,
              lastName:this.state.lastName,
              contact:this.state.contact,
              emailId:this.state.email,
              address:this.state.address
            })
            return alert(
              "User added successfully.",
              {text:'OK',onPress:()=>this.setState({
                isModalVisible:false
              })}
            )
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            return alert(errorMessage)
          });
        }
    }

    userLogin=(email,password)=>{
        firebase.auth().signInWithEmailAndPassword(email, password)
  .then(() => {
    alert("Successfully logged in.")
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    return alert(errorMessage)
  });
    }

  render(){
    return(
      <View style={styles.container}>
        <View style={{justifyContent:"center",alignItems:"center"}}>
          {this.showModal()}
        </View>
          <View style={styles.textBox}>
      <Text style={styles.text}>Book Santa</Text>
      </View>
      <View>
        <Image style={{width:300,height:250,alignSelf:"center",borderWidth:1,borderRadius:50,
        marginTop:20}}
        source={require('../assets/logo.png')}/>
      </View>
      <TextInput style={styles.inputBox}
      placeholder="Enter email id"
      keyboardType='email-address'
      onChangeText={(text)=>{
        this.setState({email:text})
      }}/>
      <TextInput style={styles.inputBox}
      placeholder="Enter password"
      secureTextEntry={true}
      onChangeText={(text)=>{
          this.setState({password:text})
      }}/>
      <View style={{flexDirection:"row",alignItems:"center",marginTop:20,justifyContent:"center"}}>
      <TouchableOpacity style={styles.buttons}
      onPress={()=>{this.userSignUp(this.state.email,this.state.password)}}>
          <Text>Sign up</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttons}
      onPress={()=>{this.userLogin(this.state.email,this.state.password)}}>
          <Text>Login</Text>
      </TouchableOpacity>
      </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    inputBox:{
        margin:15,
        borderBottomWidth:1,
        height:30,
        alignSelf:"center",
        width:200
    },
    buttons:{
        borderWidth:1,
        backgroundColor:"#E27D60",
        borderRadius:10,
        height:30,
        width:70,
        alignItems:"center",
        justifyContent:"center",
        margin:30
    },
    textBox:{
        flex:1,
        backgroundColor:"#41B3A3",
        justifyContent:"center",
        textAlign:"center"
    },
    text:{
        fontSize:18,
        fontWeight:"bold",
        padding:10,
    },
    textInput:{
      borderBottomWidth:1,
      height:30,
      alignSelf:"center",
      width:100
    },
    container:{
      flex:1,
      backgroundColor:"#FFE5B4",
      alignItems:"center",
      justifyContent:"center"
    },
    modalContainer:{
      backgroundColor:"#FFA500",
      flex:1,
      borderRadius:20,
      justifyContent:"center",
      alignItems:"center",
      marginTop:15
    },
    registerButton:{
      width:50,
      height:30,
      marginTop:10,
      textAlign:"center",
      backgroundColor:"green"
    },
    cancelButton:{
      width:80,
      height:30,
      marginTop:10,
      textAlign:"center",
      backgroundColor:"red"
    }
})