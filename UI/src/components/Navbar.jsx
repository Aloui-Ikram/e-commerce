import { ShoppingCartOutlined } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Badge } from '@mui/material';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { mobile } from "../responsive";
import { useSelector } from 'react-redux';
import { Link, useNavigate} from 'react-router-dom';
import axios from "axios";
import LogoutButton from '../components/LogoutButton';

const Container = styled.div`
  height: 60px;
  margin-bottom: 10px;
  ${mobile({ height: "50px" })};
`;

const Warpper = styled.div`
  padding: 15px 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mobile({ padding: "10px 0px" })};
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Right = styled.div`
  flex: 1;
  align-items: center;
  display: flex;
  justify-content:flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })};
`;

const MenuItem = styled.span`
  font-size: 14px;
  font-family: 'Urbanist';
  cursor: pointer;
  margin-left: 20px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })};
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Lng = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })};
`;

const SearchContainer = styled.div`
  border: 2px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 15px;
  padding: 7px;

  
  ${mobile({ marginLeft: "2px", padding: "3px" })};
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "45px" })};
`;

const Logo = styled.h1`
  font-weight: bold;
  text-align: center;
  font-size: 45px;
  color: #C58940;
  ${mobile({ fontSize: "4vh", marginLeft: "5px" })};
`;

const Navbar = () => {
  const Navigate = useNavigate();
  const quantity = useSelector(state => state.cart.quantity);
  const currentUser = useSelector((state) => state.user.currentUser) || null;

  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${window.location.origin}/api/products/${query}`);
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    Navigate(`/products/${query}`);
    setQuery('');
  };

  return (
    <Container>
      <Warpper>
        <Left>
          <Lng>EN</Lng>
          <form onSubmit={handleSearch}>
            <SearchContainer style={{ color: "#C58940", fontSize: 15 }}>
              <Input
                value={query}
              
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search"
              />
              <SearchIcon onClick={handleSearch} />
            </SearchContainer>
          </form>
        </Left>

        <Center>
          <Link style={{ textDecoration: "none", color:"black" }}  to="/">
            <Logo>Malrik</Logo>
          </Link>
        </Center>

   
      <Right>
        {currentUser ? (
          <div>
            <MenuItem>
              <LogoutButton />
            </MenuItem>
            <MenuItem>
              <Link to='/account'>
                <AccountCircleIcon style={{color:"#3C2A21"}} color='action' />
              </Link>
            </MenuItem>
          </div>
        ) : (
          <div>
            <Right>
              <MenuItem>
                <Link style={{ textDecoration: "none", color:"black" }}  to="/login">Sign In</Link>
              </MenuItem>
              <MenuItem>
                <Link style={{ textDecoration: "none", color:"black" }}  to="/register">Sign Up</Link>
              </MenuItem>
            </Right>
          </div>
        )}
        <Link to="/cart">
          <MenuItem>
            <Badge style={{color:"#3C2A21"}} badgeContent={quantity} color="primary" >
              <ShoppingCartOutlined />
            </Badge>
          </MenuItem>
        </Link>
      </Right>
    </Warpper>
  </Container>
);
};

export default Navbar;
