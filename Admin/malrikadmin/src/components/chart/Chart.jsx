import React from 'react'
import'./chart.css'
import { LineChart, Line, XAxis,  CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Chart({title , data , dataKey ,grid}) {
    

  
  return (
    <div className='chart'>
       <h3 className='chartTitle'>{title}</h3>
       <ResponsiveContainer width="100%" aspect={4  /1}>
       <LineChart data={data} >
         <XAxis dataKey="name" stroke="#3C2A21"/>
         <Line type='monotone' dataKey={dataKey} stroke="#C58940"/>
         <Tooltip/>
         {grid  &&<CartesianGrid stroke="#D5CEA3" strokeDasharray="5 5" />}
     </LineChart>
     </ResponsiveContainer>
    </div>
  );
};
