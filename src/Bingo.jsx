import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useLocation } from 'react-router-dom';
const BingoGame = () => {
  const [playCardToken, setPlayCardToken] = useState(''); 
  const [bingoCard, setBingoCard] = useState([]);
  const [activeNumbers, setActiveNumbers] = useState([]);
  const location = useLocation();
  const gameCodeFromParent  =  location.state?.gameCode || '';

  useEffect(() => {

    if(gameCodeFromParent ){
      generateBingoCard();
    }
  }, [gameCodeFromParent]);

  const generateBingoCard = () => {
    axios.get(`http://www.hyeumine.com/getcard.php?bcode=${gameCodeFromParent }`)
      .then((response) => {
        const data = response.data;
        if(data === 0){
          alert('Game Code not found. Please try again!')
        }else{
          console.log(data);
          setPlayCardToken(data.playcard_token);
          const bingoCardArray = Object.keys(data.card).map((column) => data.card[column]);
          setBingoCard(bingoCardArray);
        }
      }).catch((error) => console.log('Error', error));
}
  const checkCard = () => {
    axios.get(`http://www.hyeumine.com/checkwin.php?playcard_token=${playCardToken}`)
      .then((response) => {
        const data = response.data;
        if(data === 1){
          alert('That\'s a BINGO. You\'ve won!');
        
          console.log(data);
        }else{
          alert('Sorry, this is not a wnning card! Try again');
         
        }
      }).catch((error) => console.log('Error', error));
  }

  const newCard = () => {generateBingoCard();}
  
  const handleButtonClick = (number) => {
    setActiveNumbers((prevActiveNumbers) =>
      prevActiveNumbers.includes(number)
        ? prevActiveNumbers.filter((num) => num !== number)
        : [...prevActiveNumbers, number]
    );
  };
  return(
    <>
          <div>
            <h1>WELCOME TO BINGO GAME!</h1>
            <h2>GAME CODE: {gameCodeFromParent }</h2>
            <div className='bingo-card'>
            <table> 
                <tbody>
                    <tr>
                      <th>B</th>
                      <th>I</th>
                      <th>N</th>
                      <th>G</th>
                      <th>O</th>
                    </tr>
                          {bingoCard &&
                            bingoCard[0] &&
                            bingoCard[0].map((_, colIndex) => (
                              <tr key={colIndex}>
                                {bingoCard.map((row, rowIndex) => (
                                  <td key={`${rowIndex}-${colIndex}`}>
                                    {row &&
                                      row[colIndex] !== undefined && (
                                        <button
                                          className={`cardBtn ${activeNumbers.includes(row[colIndex]) ? 'active' : ''}`}
                                          onClick={() => handleButtonClick(row[colIndex])}>
                                          {row[colIndex]}
                                        </button>
                                      )}
                                  </td>
                                ))}
                              </tr>
                            ))}
                   </tbody>
              </table>
            </div>
            <Stack className='bingo-card' direction='row'>
              <Button variant="contained" onClick={checkCard}>
                <div className='btn2'>
                CHECK CARD
                </div>
              </Button>
              <div className='btn-distance'></div>
              <Button variant="contained" onClick={newCard}>
                <div className='btn2'>
                  NEW CARD  
                </div>
              </Button>
            </Stack>
          </div>
    </>
  );
 
};

export default BingoGame;