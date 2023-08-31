import { EmailOutlined, Facebook, Instagram, LocalPhoneOutlined, Pinterest, RoomOutlined } from "@mui/icons-material";


import { Link  } from 'react-router-dom';
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  
  background-color:#C58940 ;
  ${mobile({ flexDirection: "column" })};

`;
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-left: 20px;
`;
const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })};
`;
  
 const ContactItem = styled.div`
   margin-bottom:25px ;
   display: flex;
   align-items :center;
   color :#FAF8F1;
  font-size:23px;
  margin-left: 20px;
 `;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })};
`;
const Title = styled.h3`
margin-bottom: 25px;
margin-top: 0px;
color :#FAF8F1;
font-size:25px;

`;
const List = styled.ul`
 margin-left: 20px;
 list-style:none;
 padding: 0;
 display: flex;
 flex-wrap: wrap;
`;
const ListItem = styled.li`
//for applaying flex warp
width: 50%;
margin-bottom:30px ;
font-size: 23px;
font-family: 'Urbanist', sans-serif;
color :#FAF8F1;
cursor: pionter;
text-decoration: none;
`;
const Logo = styled.h1`
color: #${(props) => props.color};
`;
const Desc = styled.p`
  margin: 20px 0px;
  color :#FAF8F1;;
  font-family: 'Urbanist', sans-serif;
  font-size: 23px;
  text-align: left;
  line-height: 1.5;
`;
const SocialContainer = styled.div`
  display: flex;
`;
const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  justify-content: center;
  margin-right: 20px;
  align-items: center;
`;

function Footer() {
  return (
    <Container>
      <Left>
      <Logo color="FAF8F1">
        `Malrik`
        </Logo>

        <Desc>
          Welcome to our online shop! We offer a wide range of top-quality
          products at competitive prices. Our user-friendly interface and
          reliable shipping make it easy for you to find and purchase the
          products you need. Thank you for choosing our store.
        </Desc>
        <SocialContainer>
          <SocialIcon color="2B3467">
            <Facebook />
          </SocialIcon>
          <SocialIcon color="F94A29">
            <Instagram />
          </SocialIcon>
          <SocialIcon color="E21818">
            <Pinterest />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
      <Title>Useful Links</Title>
      <List>
        <ListItem > < Link style={{textDecoration:"none" ,color:"white"}}  to="/"> Home </Link> </ListItem> 
        
         <ListItem > < Link style={{textDecoration:"none" ,color:"white"}}  to="/cart"> Cart  </Link></ListItem> 
         <ListItem>< Link style={{textDecoration:"none" ,color:"white"}}  to="/products/men" > Men fashion  </Link> </ListItem>
         <ListItem> < Link style={{textDecoration:"none" ,color:"white"}}  to="/products/women" > Women fashion  </Link> </ListItem>
         <ListItem> < Link style={{textDecoration:"none" ,color:"white"}}  to="/products/headphone" >Headphone </Link>  </ListItem>
         <ListItem>< Link style={{textDecoration:"none" ,color:"white"}}  to="/products/home" > Decor & Lights </Link></ListItem>
         <ListItem>< Link style={{textDecoration:"none" ,color:"white"}}  to="/order" > Order tracking</Link></ListItem>
        
      </List>
      
      </Center>
      <Right>
        <Title>Contact Us</Title>
           <ContactItem> <RoomOutlined style={{marginRight:"9px"}}/>
           city 240 , Boumerdès , Algeria </ContactItem> 
           <ContactItem> <LocalPhoneOutlined style={{marginRight:"9px"}}/>    +213 558909329 </ContactItem>
           <ContactItem><EmailOutlined style={{marginRight:"9px"}}/> malrik12@gmail.com </ContactItem>
     </Right>
    </Container>
  );
}

export default Footer;
