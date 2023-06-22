import React, { createContext } from 'react';
import Main from './Main';

// Membuat konteks
const CurrentUserContext = createContext();

function App() {
 return (
  <div>
   {/* Membungkus bagian yang relevan dari struktur komponen dengan provider konteks */}
   <CurrentUserContext.Provider>
    <Main />
   </CurrentUserContext.Provider>
  </div>
 );
}

export default App;
