import { theme } from 'antd';
import React, { useState } from 'react';
import Filmcard from './Filmcard'; 
import { Select, Space } from 'antd';
import { Pagination } from 'antd';
import { useSelector } from "react-redux";

const { Option } = Select;



// Fonction de filtre  des films par catégories
function fitrecategorie(fillmlist, categorielist) {
  //retourner la liste intacte s'il n'ya aucun filtre
  if(fillmlist==null) return fillmlist;
  if (categorielist.length == 0) return fillmlist;

  //retourner la liste des films dont les cattégories sont dans categorielist
  let resultat = fillmlist.filter(film => categorielist.includes(film.category));
  return resultat;
}


function Maincontent() {

  const [mycurrent, setMycurrent] = useState(1); // state page actuelle
  const [mypageSize, setMypageSize] = useState(4); // state taille de la page actuelle
  const [indexstart, setIndexstart] = useState(0); // state index debut pour affichage
  const [indexEnd, setIndexEnd] = useState(3); // state index de fin pour affichage 
  const [filtre, setFiltre] = useState([]); 
  const loadstatus = useSelector((state) => state.status); //statut dans state global
  const originlist = useSelector((state) => state.data); //liste des films dans state global 
 

  //calcul de la liste des catégories
  const listcathegory =originlist.map(({ category }) => category).filter(function (x, i, a) {
    return a.indexOf(x) === i;
  }).sort();

    //calcul du filtrage des films par catégorie
 const data=fitrecategorie(originlist, filtre);

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (

    <div key={"div-principal"} style={{ padding: 24, textAlign: 'center', background: colorBgContainer }}>

      <Select
        //code du multiselect
        mode="multiple"
        key={"select-all"}
        style={{
          width: '100%',
        }}
        placeholder="Filtrer les films par catégorie"
        defaultValue={[]}
        onChange={(value) => {
          // en cas de changement de valeur on lance le filtre
          setFiltre(value);
          //setData(fitrecategorie(originlist, value));
        }}
        //onChange={handleChange}
        optionLabelProp="label"
      >
        {listcathegory.map((categorie) => (
          // Affichage de la liste des catégories
          <Option key={"option-"+categorie} value={categorie} label={categorie}>
            <Space key={"space-"+categorie}>
              <span key={"span-"+categorie} role="img" aria-label={categorie}>
                🎞️
              </span>
              {categorie}
            </Space>
          </Option>
        ))}


      </Select>
      <br />  <br />

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
      <br />  <br />
      <Space key={"Space-1"} wrap direction="horizontal">
        {(loadstatus === 'void'||loadstatus === 'pending'|| loadstatus === 'updating') ? (
          <h1>Loading...</h1>
        ) : (
          
          //affichage des films en fonction du système de pagination void pending pending resolved
          (data.length==0?originlist: data).map((film, index) => (
            (index >= indexstart && index <= indexEnd) ? (
              <Filmcard key={"card-"+film.id} id={film.id} title={film.title} category={film.category} likes={film.likes} dislikes={film.dislikes} />
            ) : (null)

          ))
        )}



      </Space>
      <br />  <br />

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

<br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    </div>

  );

}

export default Maincontent