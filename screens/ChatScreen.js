import React, {useState, useEffect} from 'react';
import {View, ScrollView, KeyboardAvoidingView, StyleSheet, Platform } from 'react-native';
import {Button, ListItem, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';


import socketIOClient from "socket.io-client"

// Pensez à changer l'adresse ci-dessous avec votre IP locale !
var socket = socketIOClient ("http://IP")


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
   });

export function ChatScreen(props) {

const [currentMessage, setCurrentMessage] = useState('')
const [listMessages, setListMessages] = useState([])

useEffect(() => {
  socket.on('sendMessageToAll', (newMessageData) => {
    setListMessages([...listMessages, newMessageData])
   })
}, [listMessages])



    return (
     
 
        <View style={{flex:1}}>
       
        <ScrollView style={{flex:1, marginTop: 50}}>
        
        {listMessages?  listMessages.map((messageData, i) => {
          var msg = 
          messageData.message.replace(/:\)/g, '\u263A');
          msg = msg.replace(/:\(/g, '\u2639');
          msg = msg.replace(/:p/g, '\uD83D\uDE1B');
          msg = msg.replace(/[a-z]*fuck[a-z]*/gi, '\u2022\u2022\u2022');
      
         return  (
        <ListItem>
        <ListItem.Content>
          <ListItem.Title key ={i}>{messageData.pseudo}</ListItem.Title>
          <ListItem.Subtitle key={i} >{msg}</ListItem.Subtitle>
        </ListItem.Content></ListItem>)
        }) 
        : <ListItem.Title>Vous n'avez pas encore de message</ListItem.Title> }
           
        
        </ScrollView>
  
        <KeyboardAvoidingView behavior={Platform.OS === 'ios'? "padding" : "height" }>
            <Input
                containerStyle = {{marginBottom: 5}}
                placeholder='Your message'
                editable = {true}   
                onChangeText = {(val) => setCurrentMessage(val)}
                value={currentMessage}        
                 />
            <Button
                icon={
                    <Icon
                    name="envelope-o"
                    size={20}
                    color="#ffffff"
                    />
                } 
                title="Envoyer"
                buttonStyle={{backgroundColor: "#eb4d4b"}}
                type="solid"
                onPress={()=>{
        socket.emit("sendMessage",{message : currentMessage, pseudo:props.pseudo}), setCurrentMessage('')}}           
            />
        </KeyboardAvoidingView>
          
      </View>
    );
   }
   
   function mapStateToProps(state) {
    return { pseudo: state.pseudo };
   }
    
   export default connect(
    mapStateToProps, 
    null
   )(ChatScreen);