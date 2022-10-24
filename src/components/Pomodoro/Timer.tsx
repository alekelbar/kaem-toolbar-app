import { Box, ButtonGroup, Typography } from '@mui/material';
import { useContext, useEffect, useRef, useState } from 'react';
import { buildStyles, CircularProgressbar, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { ClockContext } from './context/ClockContext';
import { PauseButton } from './PauseButton';
import { PlayButton } from './PlayButton';

const red = '#1976d2';
const green = '#42a5f5';

export const Timer = () => {

  const clockConfig = useContext(ClockContext);
  const [mode, setMode] = useState('rest')
  const [secondLeft, setsecondLeft] = useState(0)
  const [pause, setPause] = useState(false);

  const secondsLeftRef = useRef(secondLeft);
  const modeRef = useRef(mode);
  const pauseRef = useRef(pause)


  const tick = () => {
    secondsLeftRef.current--;
    setsecondLeft(secondsLeftRef.current);
  }

  const swicthMode = () => {
    const nextMode = modeRef.current == 'work' ? 'rest' : 'work';
    const nextSeconds = nextMode == 'work' ? (clockConfig?.work ?? 1) * 60 : (clockConfig?.rest ?? 1) * 60;
    setMode(nextMode);
    modeRef.current = nextMode;
    setsecondLeft(nextSeconds);
    secondsLeftRef.current = nextSeconds;
  }


  const initTimer = () => {
    setsecondLeft((clockConfig?.work ?? 1) * 60);
  }

  useEffect(() => {

    initTimer();

    const interval = setInterval(() => {

      if (pauseRef.current) {
        return;
      }

      if (secondsLeftRef.current === 0) {
        return swicthMode();
      }

      tick();

    }, 10)
    return () => clearInterval(interval);

  }, [clockConfig])

  const onPause = () => {
    setPause(!pause);
  }


  const totalSeconds = mode == 'work' ? (clockConfig?.work ?? 1) * 60 : (clockConfig?.rest ?? 1) * 60;
  const percentaje = Math.floor(secondLeft / totalSeconds * 100);
  let minutes: string | number = Math.floor(secondLeft / 60);
  let seconds: string | number = secondLeft % 60;

  if (seconds < 10) seconds = '0' + seconds;
  if (minutes < 10) minutes = '0' + minutes;


  return (
    <>
      <Typography
        textAlign={'center'}
        variant='h5'
        padding='10px'
        color={'secondary'}>{minutes}:{seconds} {mode == 'work' ? 'Trabajando' : 'Descansando'} </Typography>
      <CircularProgressbarWithChildren
        value={percentaje}
        // text={`${percentaje}%`}
        styles={buildStyles({
          textColor: '#fff',
          pathColor: mode === 'work' ? red : green,
          textSize: '90%',
          trailColor: '#d6d6d6',
        })}
      >
        <img style={{ width: '30%' }} src="https://i.imgur.com/b9NyUGm.png" alt="doge" />
        <Box sx={{ fontSize: '2em', color: 'white' }}>
          <Typography variant='h6'>{percentaje}%</Typography>
        </Box>
      </CircularProgressbarWithChildren>

      <ButtonGroup sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
        {/* buttons */}
        {pause
          ? <PlayButton pause={() => { onPause(); pauseRef.current = false; }} />
          : <PauseButton pause={() => { onPause(); pauseRef.current = true; }} />
        }
      </ButtonGroup>
    </>
  )
}
