"use client"
import React, { useState, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import Circle from './components/Circle';
import { generateRandomPosition } from './utils/random-number';
import useTimer from './hooks/use-timer';

const App = () => {

  const [isPlay, setIsPlay] = useState<boolean>(false);

  const [circleLength, setCircleLength] = useState<{length: number}>({length: 0});

  const [prevNumber, setPrevNumber] = useState<number | null>(1);

  const [circleValue, setCircleValue] = useState<number>(0);

  const [isActive, setIsActive] = useState(false); 

  const [time, resetTimer] = useTimer(isActive); 

  const [activeCircles, setActiveCircles] = useState<number[]>([]);

  const [isResult, setIsResult] = useState<boolean | null>(null)

  const circles = useMemo(() => {
    return Array.from({ length: circleLength.length}, () => generateRandomPosition());
  }, [circleLength]);

  const handlePlay = useCallback(() => {
    if (!circleValue) return;
    
    else if(circleValue < 1) return;  

    setIsPlay(true)
    setActiveCircles([])
    setIsResult(null)
    setCircleLength(() => {
      return {
        ...{ length: circleValue}
      }
    })
    setIsActive(true);
    setPrevNumber(1);
    resetTimer(); 
  }, [circleValue, resetTimer]);

  const handleActive = (index: number) => {
    if(!isActive) return;

    else if (index !== prevNumber) {
      setIsResult(false)
      setIsActive(false)
      return;
    }
    else if (index === circleLength.length) {
      setTimeout(() => {
        setIsResult(true)
        setIsActive(false)
      }, 700)
    }
    setPrevNumber(index + 1)
    setActiveCircles(prev => {
      return prev.includes(index) ? prev : [...prev, index]
    })
  }

  return (
    <Container>
      <h1 style={{ color: isResult === null ? "black" : isResult === false ? "red" : "green" }}>
        {isResult === null ? "Let's play" : isResult === false ? "GAME OVER" : "ALL CLEARED"}
      </h1>

      <PointSession>
        <Text>Points</Text>
        <input type='number' onChange={e => setCircleValue(+e.target.value)} placeholder='Enter your point'></input>
      </PointSession>

      <PointSession>
        <Text>Time</Text>
        <div>{`${time}s`}</div>
      </PointSession>

      <PointSession>
        <button onClick={handlePlay}>{`${!isPlay ? "Play" : "Restart"}`}</button> 
      </PointSession>

      <CircleSession>
        {circles.map((pos, index) => (
          <Circle activeCircles={activeCircles} handleActive={handleActive} index={index + 1} key={index} x={pos.x} y={pos.y} />
        ))}
      </CircleSession>

    </Container>
  );
};

const Container = styled.div`
  border: 1px solid black;
  overflow: hidden;
  width: 60%;
  padding: 0 100px 0 100px;
  margin: 0 auto;
`;

const CircleSession = styled.div`
  position: relative;
  border: 1px solid black;
  display: flex;
  height: 700px;
  overflow: hidden;
  margin-top: 20px;
`;

const PointSession = styled.div`
  display: flex;
  align-items: center;
  width: 100px;
  justify-content: space-between;
  margin-bottom: 30px;
`;

const Text = styled.div`
  font-size: 18px;
  margin-right: 20px;
`;

export default App;
