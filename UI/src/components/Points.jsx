import React from 'react'
import styled from 'styled-components';
import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 1vh;
  margin-top: 40px;
  margin-bottom: 40px;
  ${mobile({ display: "none" })}
`;

const Point = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #C58940;
  margin: 0 5px;
  ${mobile({ display: "none" })}
`;

function Points() {
    return (
        <Container>
          <Point />

          <Point />
          <Point />
          <Point />
          <Point />
          <Point />
          <Point />
        </Container>
      );
    }

export default Points
