import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {ListItem} from 'react-native-elements';
import {connect} from 'react-redux';
import Swipeout from 'react-native-swipeout';
import AsyncStorage from '@react-native-async-storage/async-storage';



const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
   });



export function POIScreen(props) {

 
  

  var listPOIFromRedux = props.POI.map ((poiFromRedux, i) => {
    return (

     
     

<Swipeout right={[
    {
      text: 'Supprimer',
      onPress: () => {props.handledeletePOI(poiFromRedux.titre); 
       var suppStorage = props.POI.filter(e => e.titre != poiFromRedux.titre) ;
       AsyncStorage.setItem("POIstorage", JSON.stringify(suppStorage))},

      type:'solid',
      backgroundColor : '#130f40',
      color : '#eb4d4b',
  

    }
  ]} >

      <ListItem key={i}>
      <ListItem.Content>
        <ListItem.Title>Point d'intérêt : {poiFromRedux.titre}</ListItem.Title>
        <ListItem.Subtitle>Description : {poiFromRedux.description} </ListItem.Subtitle>
      </ListItem.Content>
     
  
    </ListItem>
    </Swipeout>
 
    )
  })

    return (
        <View style={{flex:1}}>
      <ScrollView style={{flex:1, marginTop: 50}}>
         {listPOIFromRedux}
        </ScrollView>       
          
      </View>
    );
  }
   
function mapStateToProps(state) { 
     return { POI : state.POIList }} 

  
function mapDispatchToProps(dispatch) {
  return {
    handledeletePOI: function(titrePOI) {
       dispatch( {type: 'deletePOI', titrePOI })

    }
  }
 }
     
     export default connect( 
       mapStateToProps,  
       mapDispatchToProps)
       (POIScreen);