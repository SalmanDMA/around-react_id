import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import { useState } from 'react';

function App() {
 const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
 const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
 const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
 const [isDeleteConfirmPopupOpen, setisDeleteConfirmPopupOpen] = useState(false);
 const [selectedCard, setSelectedCard] = useState(null);

 const handleEditAvatarClick = () => {
  setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
 };

 const handleEditProfileClick = () => {
  setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
 };

 const handleAddPlaceClick = () => {
  setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
 };

 const handleCardClick = (card) => {
  setSelectedCard(card);
 };

 const handleDeleteClick = () => {
  setisDeleteConfirmPopupOpen(!isDeleteConfirmPopupOpen);
 };

 const closeAllPopups = () => {
  setIsEditAvatarPopupOpen(false);
  setIsEditProfilePopupOpen(false);
  setIsAddPlacePopupOpen(false);
  setisDeleteConfirmPopupOpen(false);
  setSelectedCard(null);
 };

 return (
  <>
   <div className='root'>
    <Header />
    <Main
     onEditProfileClick={handleEditProfileClick}
     onAddPlaceClick={handleAddPlaceClick}
     onEditAvatarClick={handleEditAvatarClick}
     onCloseAllPopups={closeAllPopups}
     onCardClick={handleCardClick}
     onDeleteClick={handleDeleteClick}
     selectedCard={selectedCard}
     isEditProfilePopupOpen={isEditProfilePopupOpen}
     isAddPlacePopupOpen={isAddPlacePopupOpen}
     isEditAvatarPopupOpen={isEditAvatarPopupOpen}
     isDeleteConfirmPopupOpen={isDeleteConfirmPopupOpen}
    />
    <Footer />
   </div>
  </>
 );
}

export default App;
