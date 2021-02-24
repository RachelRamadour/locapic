import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import { View, ImageBackground, StyleSheet, Text } from 'react-native';
import {Button, Input} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const image = require('../public/images/home.jpg')

function HomeScreen(props) {
    const [pseudo, setPseudo] = useState('');
    const [pseudoSubmited, setPseudoSubmited] = useState(false)

useEffect(() => {

var getPseudo = async function() {
await AsyncStorage.getItem("pseudo", (err, value) => {
  setPseudo(value)
 
      }) }
getPseudo()
        }, []);

var homeContent;

 if (pseudoSubmited) {
  homeContent = 
     <Text style={styles.text}> Welcome back {pseudo} !</Text>
  
  } else {

homeContent = <Input
           containerStyle = {{marginBottom: 25, width: '70%'}}
           style={styles.inputStyle}
           placeholder='Votre pseudo'
           placeholderTextColor= '#130f40'

           editable = {true}
           leftIcon={
               <Icon
               style={styles.icon}
               name='user'
               size={24}
               color="#130f40"
            
               />
           }  
           onChangeText={(username) => setPseudo(username)}
           />

  
}




 return (
   <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
       <ImageBackground source = {image} style={styles.image}>


{homeContent}   

<Button 
      buttonStyle={{backgroundColor: "#130f40"}}
  icon = {
      <Icon style={styles.icon} name = "arrow-right" size={20} color='#eb4d4b'/>
  }
  
  title="Go to Map"
  type="solid"
 
  onPress={() => { 
    setPseudoSubmited(true)
    props.onSubmitPseudo(pseudo); 
    AsyncStorage.setItem("pseudo", pseudo)
  props.navigation.navigate('BottomNav', { screen: 'Map' })}}

/>
     </ImageBackground>
  </View>
 );
}

function mapStateToProps(state) { 
  return { pseudo : state.pseudo }} 


function mapDispatchToProps(dispatch) {
    return {
      onSubmitPseudo: function(pseudo) {
         dispatch( {type: 'savePseudo', pseudo: pseudo })
      }
    }
   }
   export default connect(
    mapStateToProps,
    mapDispatchToProps
   )(HomeScreen);
  

   const styles = StyleSheet.create({
    image: {
         flex: 1,
         width: '100%',
         height: '100%',
         alignItems: 'center',
         justifyContent : 'center',
         opacity: 1
      
     },
     container: {
         flex: 1,
         alignItems: 'center',
         justifyContent: 'center',
     
       },
       text: {
         fontSize : 25,
         fontWeight: 'bold',
         paddingBottom: 30,
         color: '#130f40'
       },
       inputStyle: {
       marginLeft: 10,
       
 
       },
       icon :{
         marginRight: 10
       }
 
 
 });