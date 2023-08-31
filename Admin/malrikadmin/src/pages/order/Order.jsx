import React, { useEffect, useState } from 'react';
import "./order.css";
import { useDispatch } from 'react-redux';
import { updateOrderStatus } from '../../redux/orderRedux';
import { userReq } from '../../reqMethod';
import { deleteOrder } from '../../redux/apiCalls';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [statusInput, setStatusInput] = useState('');

  const handleDelete = (id) => {
    deleteOrder(id,dispatch)
    };

  const dispatch = useDispatch();
  // const userOrders = useSelector(state => state.order.orders);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userReq.get("orders");
        setOrders(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getOrders();
  }, []);

  const handleStatusUpdate = async (orderId) => {
    try {
      await userReq.put(`orders/${orderId}`, { status: statusInput });
      dispatch(updateOrderStatus({ orderId, newStatus: statusInput }));
      setStatusInput('');
    } catch (error) {
      console.log(error);
    }
  };

  

  return (
    <div className='order'>
      <h1>Order Page</h1>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User ID</th>
           
            <th>Status</th>
            <th>Action</th>
          
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.userId}</td>
              
              <option style={{marginTop:"30px"}} onClick={() => handleStatusUpdate(order._id)}>{order.status}</option>
              <td>
                <select value={statusInput} onChange={(e) => setStatusInput(e.target.value)}>
                  <option value="">Select Status</option>
                  <option value="pending">Pending</option>
                  <option value="ontheway">on the way</option>
                  <option value="delivered">Delivered</option>
                </select>
                <button style={{backgroundColor:"green"
                }}  onClick={() => handleStatusUpdate(order._id)}>
                  Update Status
                </button>
                
                <DeleteOutlineRoundedIcon style={{color:"red", cursor:"pointer"}}
                      onClick={() => handleDelete(order._id)} />
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Order;

