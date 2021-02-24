//Reducer desc et titre pour envoyer à la page des POIs


export default function(POIList = [], action) {
    if(action.type == 'savePOI') {
    var newPOIList = [...POIList, action.POI]

    console.log('new', newPOIList)
        return newPOIList;

    } else if (action.type =="deletePOI") {
       console.log('titrePOI',action.titrePOI) 
            var newPOIList = POIList.filter(e => {
        // Va renvoyer true ou false si le titre courant est différent du titre à supprimer dans le store
                return (e.titre != action.titrePOI)
            }
       )
       
       return newPOIList

    }
    
    
    
    else {
        return POIList;
    }
  }