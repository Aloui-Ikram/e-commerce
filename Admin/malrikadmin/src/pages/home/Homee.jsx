import React, { useEffect, useMemo, useState } from 'react'
import './home.css'
import Finfo from '../../components/finfo/Finfo'
import Chart from '../../components/chart/Chart'

import WidgtSmall from '../../components/widgtSmall/WidgtSmall'
import WidgtBig from '../../components/widgtBig/WidgtBig'
import { userReq } from '../../reqMethod'

function Homee() {
 
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );
  const [userStats,setUserStats]=useState([])

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userReq.post("/users/stat");
        //befor kant la courb blm9lob
        const list = res.data.sort((a,b)=>{
          return a._id -b._id
        })
        list.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id -1], "Active User": item.total },
          ])
        );
      } catch {}
    };
    getStats();
  }, [MONTHS]);

  
  return (
    <div className='home'>
     <Finfo/>
     <Chart 
     data={userStats}
     title="user Analytics"
     grid
     dataKey="Active User"
     />
     <div className='homeWidgets'>
     <WidgtSmall/>
     <WidgtBig/>
     </div>
     </div>
  )
}

export default Homee
