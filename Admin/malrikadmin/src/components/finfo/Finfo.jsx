import React, { useEffect, useState } from 'react'
import './finfo.css'
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import { userReq } from '../../reqMethod';
function Finfo() {
  const [income, setIncome] = useState([]);
  const [perc, setPerc] = useState(0);
 
  useEffect(() => {
    const getIncome = async () => {
      try {
        const res = await userReq.get("orders/income");
        setIncome(res.data);
        setPerc((res.data[1].total * 100) / res.data[0].total - 100);
      } catch {}
    };
    getIncome();
  }, []);


  return (
    <div className='featured'>
      <div className='featuredItem'>
      <span className='featuredTitle'>Revenue</span>
      <div className='featuredMoneyContainer'>
        <span className='featuredMoney'> {income[1]?.total} DA</span>
        <span className='featuredMoneyRate'>
          %{Math.floor(perc)}{" "}
        {perc < 0 ? (
          <ArrowDownwardRoundedIcon className="featuredIcon negative" />
        ) : (
          <ArrowUpwardRoundedIcon className="featuredIcon" />
        )} </span>
      </div>
      <span className='featureSub'> Compared  to last month</span>
      </div>
      
      
    </div>
  )
}

export default Finfo
