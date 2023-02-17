import { theme } from 'antd';
import React, { useState, useEffect } from 'react';
import Filmcard from './Filmcard';
import { Select, Space } from 'antd';
import { Pagination } from 'antd';
import { useSelector, useStore } from "react-redux";
import { fetchOrUpdateFilms } from './store';

const { Option } = Select;



// Fonction de filtre  des films par catégories
function searchbykeyword(fillmlist, keyword) {
  //retourner la liste intacte s'il n'ya aucun filtre
  if (fillmlist.length == 0) return fillmlist;
  if (keyword.length == 0) return fillmlist; 

  // filtrer avec le mot cle
  let resultat = fillmlist.filter(film => stringContainsSubstring(film.title, keyword));
  return resultat;
}
function stringContainsSubstring(mystring, keyword) {
  const myArray = keyword.split(" ");
  for (let i = 0; i < myArray.length; i++) {
    if (mystring.toLowerCase().match(myArray[i].toLowerCase()) != null) return true;
  }
  return false;
}

function Searchcontent() {

  const [mycurrent, setMycurrent] = useState(1); // state page actuelle
  const [mypageSize, setMypageSize] = useState(4); // state taille de la page actuelle
  const [indexstart, setIndexstart] = useState(0); // state index debut pour affichage
  const [indexEnd, setIndexEnd] = useState(3); // state index de fin pour affichage  

  const loadstatus = useSelector((state) => state.status); //statut dans state global
  const originlist = useSelector((state) => state.data); //liste des films dans state global 
  const globalkeyword = useSelector((state) => state.searchkeyword);
 
 

  //calcul du filtrage des films par mot cle
  const data = searchbykeyword(originlist, globalkeyword);
  //console.log(data);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (

    <div key={"div-principal"} style={{ padding: 24, textAlign: 'center', background: colorBgContainer }}>

      <h2> Resultats de recherche :</h2>
      <h1>Mot cle: "{globalkeyword}" </h1>
      <h1>Nombre de résultats: {data.length} </h1>
      <br />  <br />
      {(data.length == 0 ? (null) : (
        <Pagination
          showSizeChanger
          key={"pagination-1"}
          pageSizeOptions={[4, 8, 12]}
          current={mycurrent}
          pageSize={mypageSize}
          onChange={(current, pageSize) => {
            //en cas de changement de page
            //calcul de l'index de début et de fin pour la pagination
            let endp = 0;
            let startp = (current - 1) * pageSize;
            if ((startp + pageSize) <= data.length) {
              endp = startp + pageSize - 1;
            } else {
              endp = startp + data.length % pageSize - 1;
            }
            setIndexstart(startp);
            setIndexEnd(endp);
            setMycurrent(current);
            setMypageSize(pageSize);

          }}
          onShowSizeChange={(current, pageSize) => {
            //en cas de changement de la taille d'une page
            //calcul de l'index de début et de fin pour la pagination
            let endp = 0;
            let startp = (current - 1) * pageSize;
            if ((startp + pageSize) <= data.length) {
              endp = startp + pageSize - 1;
            } else {
              endp = startp + data.length % pageSize - 1;
            }
            setIndexstart(startp);
            setIndexEnd(endp);
            setMycurrent(current);
            setMypageSize(pageSize);
          }}
          defaultCurrent={1}
          defaultPageSize={4}
          total={data.length}
        />
      ))}
      <br />  <br />
      <Space key={"Space-1"}  wrap direction="horizontal">
        {(loadstatus === 'void' || loadstatus === 'pending' || loadstatus === 'updating') ? (
          <h1>Loading...</h1>
        ) : (

          //affichage des films en fonction du système de pagination void pending pending resolved
          data.map((film, index) => (
            (index >= indexstart && index <= indexEnd) ? (
              <Filmcard key={"card-"+film.id} id={film.id} title={film.title} category={film.category} likes={film.likes} dislikes={film.dislikes} />
            ) : (null)

          ))
        )}



      </Space>
      <br />  <br />
      {(data.length == 0 ? (null) : (
        <Pagination
          showSizeChanger
          key={"pagination-2"}
          pageSizeOptions={[4, 8, 12]}
          current={mycurrent}
          pageSize={mypageSize}
          onChange={(current, pageSize) => {
            //en cas de changement de page
            //calcul de l'index de début et de fin pour la pagination
            let endp = 0;
            let startp = (current - 1) * pageSize;
            if ((startp + pageSize) <= data.length) {
              endp = startp + pageSize - 1;
            } else {
              endp = startp + data.length % pageSize - 1;
            }
            setIndexstart(startp);
            setIndexEnd(endp);
            setMycurrent(current);
            setMypageSize(pageSize);

          }}
          onShowSizeChange={(current, pageSize) => {
            //en cas de changement de la taille d'une page
            //calcul de l'index de début et de fin pour la pagination
            let endp = 0;
            let startp = (current - 1) * pageSize;
            if ((startp + pageSize) <= data.length) {
              endp = startp + pageSize - 1;
            } else {
              endp = startp + data.length % pageSize - 1;
            }
            setIndexstart(startp);
            setIndexEnd(endp);
            setMycurrent(current);
            setMypageSize(pageSize);
          }}
          defaultCurrent={1}
          defaultPageSize={4}
          total={data.length}
        />
      ))}


<br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    </div>

  );

}

export default Searchcontent