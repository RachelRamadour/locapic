
import React, {useEffect, useState} from 'react';
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import {Button, Overlay, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import MapView from 'react-native-maps'
import {Marker} from 'react-native-maps';

import * as Location from 'expo-location'

import AsyncStorage from '@react-native-async-storage/async-storage';

import socketIOClient from "socket.io-client";

// Pensez à changer l'adresse ci-dessous avec votre IP locale !
var socket = socketIOClient("http://IP");


export function MapScreen(props) {

const [addPOI, setAddPOI] = useState(false);
const [listPOI, setListPOI] = useState([]);
const [tempPOI, setTempPOI] = useState()
const [isVisible, setIsVisible] = useState(false); 
const [text, setText] = useState('')
const [description, setDescription] = useState('')
const [listUser, setListUser] = useState([]);


var selectPOI = (newPOI) => {
    if (addPOI){
  setAddPOI(false);
  setIsVisible(true);
  setTempPOI({ latitude: newPOI.nativeEvent.coordinate.latitude, longitude: newPOI.nativeEvent.coordinate.longitude  } );
}
}

const toggleOverlay = () => { setVisible(!visible)}; 

var handleSubmit = () => {
  setIsVisible(false);
  setListPOI([...listPOI, { latitude: tempPOI.latitude, longitude: tempPOI.longitude, titre:text, description:description } ] );
  
  var sendNewPOIList =  {latitude: tempPOI.latitude, longitude: tempPOI.longitude, titre:text, description:description}
  props.handleSavePOI(sendNewPOIList)
  AsyncStorage.setItem("POIstorage", JSON.stringify(([...listPOI, { latitude: tempPOI.latitude, longitude: tempPOI.longitude, titre:text, description:description } ] )))

}

var markerPOI = props.POI.map((POI, i)=>{
  return <Marker key={i} 
  pinColor="#130f40" 
  coordinate={{latitude: POI.latitude, 
    longitude: POI.longitude}} 
    title={POI.titre} 
    description={POI.description} />
});

var isDisabled = false;
if(addPOI) {
 isDisabled = true;
}


useEffect(() => {
async function askPermissions() {
var { status } = await Location.requestPermissionsAsync();
if (status === 'granted') {
      Location.watchPositionAsync({distanceInterval: 2}, // la distance Interval capte les changements de 2m
        (location) => {
        socket.emit("userLocation", { pseudo: props.pseudo, longitude: location.coords.longitude, latitude: location.coords.latitude });
      }
      );
    }
  }
  askPermissions();

 AsyncStorage.getItem("POIstorage", (err, value) => {
    if (value) {
      var POIstorage = JSON.parse(value)

for (var i = 0 ; i < POIstorage.length; i++) {
  props.handleSavePOI(POIstorage[i])

}
     
    }
    
         })

}, []);


useEffect(() => {
  socket.on('userLocationToAll', (newUser) => {
    var listUserCopy = [...listUser];
    listUserCopy = listUserCopy.filter(user => user.pseudo != newUser.pseudo);
    listUserCopy.push(newUser)
    setListUser(listUserCopy);
  });
}, [listUser]);

var markerUser = listUser.map((user, i) => {
  return <Marker key={i} pinColor="red" coordinate={{ latitude: user.latitude, longitude: user.longitude }}
    title={user.pseudo}
    
  />
});

 return (
<View style={styles.container}>
<MapView style={styles.map}

  onPress = {(newPOI) => {selectPOI(newPOI)}}
  initialRegion={{
     latitude: 48.866667,
     longitude: 2.333333,
     latitudeDelta: 0.0922,
     longitudeDelta: 0.0421,
   }}
 >
{markerUser}
 {markerPOI}

 
   </MapView>

 <Button   
 disabled={isDisabled}
icon={<Icon name="map-marker" size={25} style = {{margin : 10}} color="#ffffff" />} 
 title="Ajouter un lieu favori"
 buttonStyle={{backgroundColor: "#eb4d4b"}}
 type="solid"

 onPress={()=>setAddPOI(true)} 
    /> 

<Overlay
     isVisible={isVisible}
     onBackdropPress={() => {setIsVisible(false)}}>

<KeyboardAvoidingView behavior="padding" enabled>
            <Input
                containerStyle = {{marginBottom: 25}}
                placeholder='Titre'
                editable = {true} 
                
                onChangeText={(txt) => setText(txt)}
                
                 />

            <Input
                containerStyle = {{marginBottom: 25}}
                placeholder='Description'
                editable = {true} 
                
                onChangeText={(desc) => setDescription(desc)}
               
                 />
            <Button
                title="Ajouter point d'intérêt"
                buttonStyle={{backgroundColor: "#eb4d4b"}}
                type="solid"
                onPress={()=>handleSubmit()}
            />
        </KeyboardAvoidingView>



 </Overlay>


    </View>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
  
 },

 map : {
   flex: 1
 },
});


function mapStateToProps(state) { 
  return { POI : state.POIList, pseudo: state.pseudo }} 


function mapDispatchToProps(dispatch) {
  return {
    handleSavePOI: function(POI) {
       dispatch( {type: 'savePOI', POI })

    }
  }
 }
 export default connect(
  mapStateToProps,
  mapDispatchToProps
 )(MapScreen);
