
import { createStore } from "redux";
import produce from 'immer';
// Le state initial de la feature films
import films from '../data/movies';
const initialState = {
  // le statut permet de suivre l'état de la requête
  status: 'void',
  // les données lorsque la requête a fonctionné
  data: [],
  // l'erreur lorsque la requête échoue
  error: null,
  //statut pour la recherche des films
  searchstatus: false,
  //mot clé de la recherche des films
  searchkeyword: null,

}

const FETCHING = 'films/fetching'
const RESOLVED = 'films/resolved'
const REJECTED = 'films/rejected'
const DELETING = 'films/deleting'
const DELETEFILM = 'films/delete'
const SEARCHING = 'films/searching'
const SEARCHFILM = 'films/search'
// la requête est en cours
export const filmsFetching = () => ({ type: FETCHING })
// la requête a fonctionné
export const filmsResolved = (data) => ({ type: RESOLVED, payload: data })
// la requête a échoué
export const filmsRejected = (error) => ({ type: REJECTED, payload: error })
// la suppression en cours
export const filmsdeleting = () => ({ type: DELETING })
// la suppression 
export const filmsdelete = (filmid) => ({ type: DELETEFILM, payload: filmid })
// activation de la recherche
export const filmsearching = (value) => ({ type: SEARCHING, payload: value })

// mise à jour du mot clé de recherche
export const filmsearch = (keyword) => ({ type: SEARCHFILM, payload: keyword })


export async function fetchOrUpdateFilms(store) {
  // on peut lire le state actuel avec store.getState()
  const status = store.getState().status
  // si la requête est déjà en cours
  if (status === 'pending' || status === 'updating') {
    // on stop la fonction pour éviter de récupérer plusieurs fois la même donnée
    return
  }
  // On peut modifier le state en envoyant des actions avec store.dispatch()
  // ici on indique que la requête est en cours
  store.dispatch(filmsFetching())
  films.then((data) => {
    // si la requête fonctionne, on envoie les données à redux avec l'action resolved
    store.dispatch(filmsResolved(data))
  }).catch((error) => {
    // en cas d'erreur on infirme le store avec l'action rejected
    store.dispatch(filmsRejected(error))
  });
}

export default function filmsReducer(state = initialState, action) {
  // on utilise immer pour changer le state
  return produce(state, (draft) => {
    // on fait un switch sur le type de l'action
    switch (action.type) {
      // si l'action est de type FETCHING
      case FETCHING: {
        // si le statut est void
        if (draft.status === 'void') {
          // on passe en pending
          draft.status = 'pending'
          return
        }
        // si le statut est rejected
        if (draft.status === 'rejected') {
          // on supprime l'erreur et on passe en pending 
          draft.error = null
          draft.status = 'pending'
          return
        }
        // si le statut est resolved
        if (draft.status === 'resolved') {
          // on passe en updating (requête en cours mais des données sont déjà présentent)
          draft.status = 'updating'
          return
        }
        // sinon l'action est ignorée
        return
      }
      case DELETING: {
        // si le statut est void
        if (draft.status === 'void') {
          // on passe en pending
          draft.status = 'pending'
          return
        }
        // si le statut est rejected
        if (draft.status === 'rejected') {
          // on supprime l'erreur et on passe en pending 
          draft.error = null
          draft.status = 'pending'
          return
        }
        // si le statut est resolved
        if (draft.status === 'resolved') {
          // on passe en updating (requête en cours mais des données sont déjà présentent)
          draft.status = 'deleting'
          return
        }
        // sinon l'action est ignorée
        return
      }
      // si l'action est de type RESOLVED
      case RESOLVED: {
        // si la requête est en cours
        if (draft.status === 'pending' || draft.status === 'updating') {
          // on passe en resolved et on sauvegarde les données
          draft.data = action.payload
          draft.status = 'resolved'
          return
        }

        // sinon l'action est ignorée
        return
      }
      // si l'action est de type DELETEFILM
      case DELETEFILM: {
        // si les données ont déjà été chargées
        if (draft.status === 'resolved') {
          // on retire le film  ayant pour id action.payload
          //console.log("delete est exécuté");
          draft.data = [...draft.data].filter(film => film.id !== action.payload);
          draft.status = 'resolved'
          return
        }

        // sinon l'action est ignorée
        return
      }

      // si l'action est de type SEARCHING
      case SEARCHING: {
        // si les données ont déjà été chargées
        if (draft.status === 'resolved') {
          // on retire le film  ayant pour id action.payload
         // console.log("searching est exécuté");
          draft.searchstatus = action.payload;
          return
        }

        // sinon l'action est ignorée
        return
      }
      // si l'action est de type SEARCHFILM
      case SEARCHFILM: {
        // si les données ont déjà été chargées
        if (draft.status === 'resolved') {
          // on retire le film  ayant pour id action.payload
         // console.log("search est exécuté+++: " + action.payload);
          draft.searchkeyword = action.payload;
          return
        }

        // sinon l'action est ignorée
        return
      }

      // si l'action est de type REJECTED
      case REJECTED: {
        // si la requête est en cours
        if (draft.status === 'pending' || draft.status === 'updating') {
          // on passe en rejected, on sauvegarde l'erreur et on supprime les données
          draft.status = 'rejected'
          draft.error = action.payload
          draft.data = null
          return
        }
        // sinon l'action est ignorée
        return
      }
      // Sinon (action invalide ou initialisation)
      default:
        // on ne fait rien (retourne le state sans modifications)
        return
    }
  })
}

export const store = createStore(filmsReducer);