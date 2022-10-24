import React, { useState } from 'react'
import { ClockContext } from './ClockContext'

const workingDefaultValue = 25;
const restDefaultValue = 5;

export const ClockProvider = (props: { children: JSX.Element }) => {

  const [work, setWorking] = useState(workingDefaultValue)

  const [rest, setRest] = useState(restDefaultValue)

  const onWork = (num: number) => {
    setWorking(num);
  }

  const onRest = (num: number) => {
    setRest(num);
  }

  const onReset = () => {
    setWorking(workingDefaultValue);
    setRest(restDefaultValue);
  }


  return (
    <ClockContext.Provider value={{ work: work, rest: rest, onWork: onWork, onRest: onRest, reset: onReset }}>
      {props.children}
    </ClockContext.Provider>
  )
}
