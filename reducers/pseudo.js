//Reducer Pseudo pour envoyer à toutes les pages


export default function(pseudo = '', action) {
    if(action.type == 'savePseudo') {
        return action.pseudo;
    } else {
        return pseudo;
    }
  }