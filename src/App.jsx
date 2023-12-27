import GameCode from './GameCode';
import Bingo from './Bingo';
import { Routes, Route } from 'react-router-dom';
function App() {
 
  return (
    <>
      
      <Routes>
          <Route path='/' element={<GameCode/>} />
          <Route path='/bingo' element={<Bingo/>}/>
      </Routes>
      
    </>
  )
}

export default App;
