import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import './App.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const GameCode = () => { 
  const [gameCode, setGameCode] = React.useState('');
  const navigate = useNavigate();

  const getCard = () => {
    axios.get(`http://www.hyeumine.com/getcard.php?bcode=${gameCode}`)
      .then((response) => {
        const data = response.data;  
        if(data === 0){
          alert('Game code not found. Please try again!');
        }else{
          navigate('/bingo', {state: {gameCode}});
          console.log(gameCode);
        }
      }).catch((error) => console.error('Error:', error));
  }; 
  return (
    <>
      <div className='getCard'> 
      <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '34ch' },
            }}
            noValidate
            autoComplete="off"
            > 
            <div className='label'>ENTER GAME CODE HERE:</div>
            <TextField id="standard-basic" 
              label="Game Code" 
              variant="standard" 
              onChange={(e) => setGameCode(e.target.value)}
            />
            <Stack direction="row"> 
            <Button variant="contained" onClick={getCard}><div className='btn'>GET CARD</div></Button>
            </Stack>
        </Box>
      </div>
    </>
  );
};

export default GameCode;
