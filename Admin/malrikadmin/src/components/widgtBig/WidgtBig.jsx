import React from 'react';
import'./widgtBig.css'
import{userReq} from "../../reqMethod"
import { useEffect, useState } from 'react';

export default function WidgetLg() {
  const [orders,setOrder]=useState([]) ;
//fetch our data by using useeffect

useEffect (()=>{
  const getOrder =async()=>{
    try{
    const res =await userReq.get("orders")
    setOrder(res.data)
    }catch{

    }
  };
  getOrder();
},[])
    const Button = ({ type }) => {
      return <button className={"widgetLgButton " + type}>{type}</button>;
    };
    return (
        <div className='widgtBig'>
        <h3 className="widgetLgTitle">Latest transactions</h3>
        <table className="widgetLgTable">
          <tr className="widgetLgTr">
            <th className="widgetLgTh">Customer</th>
            <th className="widgetLgTh">Price</th>
           
            <th className="widgetLgTh">Status</th>
          </tr>
          {orders.map(order=>(
          <tr className="widgetLgTr" key={order._id}>
            <td className="widgetLgUser">
              
              <span className="widgetLgName">{order.userId}</span>
            </td>
            <td className="widgetLgDate">{(order.amount)} DA</td>
            
            <td className="widgetLgStatus">
              <Button type={order.status} />
            </td>
          </tr>
          ))}
        
        </table>
      
        </div>
    );
}


