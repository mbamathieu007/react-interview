import { AudioOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
import { useStore } from "react-redux";
import { useDispatch } from "react-redux";
import { filmsearching, filmsearch } from "./store";


const { Search } = Input;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#8C8C8C',
    }}
  />
);



function Searchbar() {
  // Code du formulaire de recherche 
  const dispatch = useDispatch();

  return (

    <Space wrap size={50} style={{
      float: 'right',
      position: "relative",
      left: "100%",
      top: '13px',
    }}>
      <Search
        placeholder="Chercher un film"
        allowClear
        //action de la validation du formulaire de recherche
        onSearch={(value) => {
          if (value.length == 0) {
            //desactiver la recherche en cas de mot clé vide
            dispatch(filmsearching(false));
            //console.log("Reinitialiser la recherche ...")
          } else {
            //Activer la recherche au cas contraire
            dispatch(filmsearch(value));
            dispatch(filmsearching(true));

            //console.log("Rechercher: " + value)
          }


        }}
        size="large"
        suffix={suffix}
        style={{
          width: "90%",
        }}
      />

    </Space>



  );

}

export default Searchbar