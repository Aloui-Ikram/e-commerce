import"./sidebar.css"

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';

import LocalMallRoundedIcon from '@mui/icons-material/LocalMallRounded';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';

import { Link } from "react-router-dom";
const Sidebar = () => {
    return (
        <div className="sidebar">
           <div className="sidebarwrapper">
               <div className="sidebarmenu">
                   <h3 className="sidebarTitle">DASHBORD</h3>
                   <ul className="sidebarlist">
                   <Link to="/"  className="link">
                        <li className="sliderlistitem">
                        
                          <HomeRoundedIcon className="Icon" style={{color:'#C58940'}}/>
                          Home
                          
                        </li>
                </Link>      
                   
                
                   </ul>
                   

      
                </div>
         <div className="sidebarmenu">
                   <h3 className="sidebarTitle">QUICK  MENU</h3>
                   <ul className="sidebarlist">
                   
                        <Link to="/products"  className="link">
                        <li className="sliderlistitem">
                        <LocalMallRoundedIcon  className="Icon" style={{color:'#C58940'}}/>
                        Products
                      </li>
                      </Link>
                      <Link to="/orders"  className="link">
                      <li className="sliderlistitem">
                      <AttachMoneyRoundedIcon className="Icon"style={{color:'#C58940'}}/>
                      Orders
                    </li>
                    </Link>
                   
                   </ul>
                   

      
                </div>
                

            


          </div>
            </div>
       
    );
}

export default Sidebar;
