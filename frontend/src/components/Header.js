import React from 'react';
import { styled } from 'styled-components';

const Container = styled.div`
  text-align: center;
  margin-top: 100px;
  margin-bottom: 20px;
  font-weight: 900;
  font-size: 32px;
  background-image: linear-gradient(45deg, #fff82b, #dc1a51);
  background-clip: text;
  text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-background-clip: text;
  -moz-text-fill-color: transparent;
`;

const Header = () => {
  return <Container>TODO LIST</Container>;
};

export default Header;
