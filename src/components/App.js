import React, { createContext, useState } from 'react';
import Main from './Main';

// Membuat konteks
const CurrentUserContext = createContext();

function App() {
 // Mendefinisikan state di komponen App
 const [currentUser, setCurrentUser] = useState(null);

 // Membuat variabel untuk provider konteks
 const currentUserProvider = {
  currentUser,
  setCurrentUser,
 };

 return (
  <div>
   {/* Membungkus bagian yang relevan dari struktur komponen dengan provider konteks */}
   <CurrentUserContext.Provider value={currentUserProvider}>
    <Main />
   </CurrentUserContext.Provider>
  </div>
 );
}

export default App;
