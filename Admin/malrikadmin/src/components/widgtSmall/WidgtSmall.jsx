
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import './widgtSmall.css'
import { useEffect, useState } from 'react';
import{userReq} from "../../reqMethod"


function WidgtSmall() {
const [users,setUsers]=useState([]) ;
//fetch our data by using useeffect

useEffect (()=>{
  const getUsers =async()=>{
    try{
    const res =await userReq.get("users/?new=true")
    setUsers(res.data)
    }catch{

    }
  };
  getUsers();
},[])


  return (
    <div className='widgtSmall'>
    <span className="widgetSmTitle">New Join Members</span>
    <ul className="widgetSmList">
    {users.map(user=>(
    <li className="widgetSmListItem" key={user._id}>
    <img
      src={user.img ||  "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"}
      alt=""
      className="widgetSmImg"
    />
    <div className="widgetSmUser">
      <span className="widgetSmUsername">{user.username}</span>
     
    </div>
    <button className="widgetSmButton">
      <VisibilityRoundedIcon className="widgetSmIcon" />
      Display
    </button>
  </li>
  ))}
  </ul>
    </div>
  )
}

export default WidgtSmall
