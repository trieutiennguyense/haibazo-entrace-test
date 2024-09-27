import React from 'react';
import styled from 'styled-components';

const Circle = ({ x, y, index, handleActive, activeCircles }: {x: number, y: number, index: number, handleActive: (index: number) => void, activeCircles: number[]}) => (
  <CircleStyled
    isActive={activeCircles.includes(index)}  
    style={{ top: y + 50, left: x + 50, bottom: 50, right: 50 }}
  >
    <div onClick={() => handleActive(index)} style={{ textAlign: 'center', lineHeight: '50px' }}>
      {index} 
    </div>
  </CircleStyled>
);

interface CircleStyledProps {
  isActive: boolean
}

const CircleStyled = styled.div<CircleStyledProps>`
  position: absolute; 
  width: 50px;
  height: 50px;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer; 
  border: 1px solid black;  
  color: ${props => (props.isActive ? 'white' : 'black')};
  opacity: ${props => (props.isActive ? 0 : 1)}; 
  transition: opacity 0.5s ease; 
  background: ${props => (props.isActive ? 'red' : 'white')}; 
`;

export default Circle;
