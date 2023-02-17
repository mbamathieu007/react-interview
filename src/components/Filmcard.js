
import React from 'react';
import { LikeOutlined, DislikeOutlined, DeleteOutlined} from '@ant-design/icons';
import {Card } from 'antd';
import filimmage from '../assets/film.jpg'

import { Button,Radio} from 'antd';
import { useState } from 'react';
import { useSelector,useStore } from "react-redux";
import { useDispatch } from "react-redux";
import { filmsdelete } from "./store";
import {message, Popconfirm } from 'antd';
const { Meta } = Card;
 
function kFormatter(num) {
    return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
}


 
function Filmcard({ id, title, category,likes,dislikes }) {
    //Code du card des films
    const [choice, setChoice] = useState('null'); // default is 'middl
    const [mylike, setMylike] = useState(0); //state like de l'utilisateur en cours
    const [myunlike, setMyunlike] = useState(0); //state unlike de l'utilisateur en cours
     const dispatch = useDispatch();
 const text = 'Êtes-vous sûr de vouloir supprimer ce film ?';
const description = 'Supprimer le film: '+title;

    return (
        <Card
            style={{ width: 300 }}
            //key={id}
            cover={
                <img
                    alt="example"
                    src={filimmage}
                />
            }
            actions={[
                <Radio.Group value={choice} onChange={(e) => {
                    
                    if(e.target.value==="like"){
                        setMylike(1)
                        setMyunlike(0)
                    }else{
                        setMylike(0)
                        setMyunlike(1)
                    }
                    setChoice(e.target.value)

                    }}>
    <Radio.Button value="like"><LikeOutlined/>{kFormatter(likes+mylike)}</Radio.Button> 
    <Radio.Button value="unlike"><DislikeOutlined/>{kFormatter(dislikes+myunlike)}</Radio.Button>
  </Radio.Group>,
  <Popconfirm
  placement="top"
  title={text}
  description={description}
  onConfirm={() => {
    //envoyer la requête de suppression du film
    dispatch(filmsdelete(id)) ;
    message.success("Le film '"+title+"' a été supprimé!");
  }}
  okText="Oui"
  cancelText="Non"
>
<Button icon={<DeleteOutlined />}>Supprimer</Button> 
</Popconfirm>
  
            ]}
        >
            <Meta
                title={title}
                description={category}
            />
        </Card>
    );

}

export default Filmcard