import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import { useEffect, useRef, useState } from 'react';
import { CurrentUserContext } from './contexts/CurrentUserContext';
import api from './utils/api';
import EditAvatarPopup from './components/EditAvatarPopup';
import EditProfilePopup from './components/EditProfilePopup';
import AddPlacepopup from './components/AddPlacePopup';

function App() {
 const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
 const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
 const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
 const [isDeleteConfirmPopupOpen, setisDeleteConfirmPopupOpen] = useState(false);
 const [selectedCard, setSelectedCard] = useState(null);
 const [currentUser, setCurrentUser] = useState(null);
 const avatarInputRef = useRef();
 const inputJudul = useRef();
 const inputTautanGambar = useRef();
 const inputName = useRef();
 const inputJob = useRef();
 const buttonElement = useRef();
 const refFormAddPlaceElement = useRef();
 const refFormAvatarElement = useRef();
 const refFormProfileElement = useRef();
 const [cardList, setCardList] = useState([]);
 const [deletingCard, setDeletingCard] = useState(null);
 const [isLoading, setIsLoading] = useState(false);
 const [buttonDisabled, setButtonDisabled] = useState(false);

 useEffect(() => {
  const fetchUserInfo = async () => {
   try {
    const userInfo = await api.getUserInfo();
    setCurrentUser(userInfo);
   } catch (error) {
    console.log('Failed to fetch user info:', error);
   }
  };

  fetchUserInfo();
 }, []);

 const handleEditAvatarClick = () => {
  setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  setButtonDisabled(true);
 };

 const handleEditProfileClick = () => {
  setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  setButtonDisabled(true);
 };

 const handleAddPlaceClick = () => {
  setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  setButtonDisabled(true);
 };

 const handleCardClick = (card) => {
  setSelectedCard(card);
 };

 const closeAllPopups = () => {
  setIsEditAvatarPopupOpen(false);
  setIsEditProfilePopupOpen(false);
  setIsAddPlacePopupOpen(false);
  setisDeleteConfirmPopupOpen(false);
  setSelectedCard(null);

  resetValuesPopupForm();
 };

 const handleUpdateUser = (userInfo) => {
  const { name, about } = userInfo;
  setIsLoading(true);
  api
   .patchUserInfo({ name, about })
   .then((updatedUser) => {
    setCurrentUser(updatedUser);
    setIsLoading(false);
    closeAllPopups();
   })
   .catch((error) => {
    console.log(error);
   });
 };

 const handleUpdateAvatar = (avatarInfo) => {
  setIsLoading(true);
  api
   .patchAvatarUser(avatarInfo)
   .then((updatedUser) => {
    setCurrentUser(updatedUser);
    avatarInputRef.current.value = '';
    setIsLoading(false);
    closeAllPopups();
   })
   .catch((error) => {
    console.log(error);
   });
 };

 const handleSubmitAvatar = (e) => {
  e.preventDefault();
  handleUpdateAvatar({
   avatar: avatarInputRef.current.value,
  });
 };

 useEffect(() => {
  api
   .getInitialCards()
   .then((cards) => {
    setCardList(cards);
   })
   .catch((error) => {
    console.log(error);
   });
 }, []);

 const handleDeleteClick = () => {
  setisDeleteConfirmPopupOpen(!isDeleteConfirmPopupOpen);
 };

 const handleCardDelete = (e) => {
  e.preventDefault();
  setIsLoading(true);

  if (deletingCard) {
   api
    .deleteCard(deletingCard._id)
    .then(() => {
     setCardList((prevState) => prevState.filter((c) => c._id !== deletingCard._id));
     setDeletingCard(null);
     setIsLoading(false);
     closeAllPopups();
    })
    .catch((error) => {
     console.log(error);
    });
  }
 };

 const handleCardDeletePopupOpen = (card) => {
  setDeletingCard(card);
  handleDeleteClick();
 };

 const handleLikeClick = (card) => {
  const isLiked = card.likes.some((like) => like._id === currentUser._id);

  api
   .updateLikeCard(card._id, isLiked)
   .then((newCard) => {
    setCardList((state) => state.map((c) => (c._id === card._id ? newCard : c)));
   })
   .catch((error) => {
    console.log(error);
   });
 };

 const handleAddPlaceSubmit = (cardInfo) => {
  setIsLoading(true);

  api
   .postNewCard(cardInfo)
   .then((newCard) => {
    setCardList([newCard, ...cardList]);
    inputJudul.current.value = '';
    inputTautanGambar.current.value = '';
    setIsLoading(false);
    closeAllPopups();
   })
   .catch((error) => {
    console.log(error);
   });
 };

 const handleSubmitAddPlace = (e) => {
  e.preventDefault();

  handleAddPlaceSubmit({
   inputJudul: inputJudul.current.value,
   inputTautanGambar: inputTautanGambar.current.value,
  });
 };

 const resetValuesPopupForm = () => {
  inputJudul.current.value = '';
  inputTautanGambar.current.value = '';
  inputName.current.value = '';
  inputJob.current.value = '';
  avatarInputRef.current.value = '';

  const judulErrorElement = inputJudul.current.nextElementSibling;
  judulErrorElement.textContent = '';

  const tautanGambarErrorElement = inputTautanGambar.current.nextElementSibling;
  tautanGambarErrorElement.textContent = '';

  const nameErrorElement = inputName.current.nextElementSibling;
  nameErrorElement.textContent = '';

  const jobErrorElement = inputJob.current.nextElementSibling;
  jobErrorElement.textContent = '';

  const avatarErrorElement = avatarInputRef.current.nextElementSibling;
  avatarErrorElement.textContent = '';
 };

 function validateInput(inputElement, formElement) {
  const errorElement = inputElement.nextElementSibling; // Ambil elemen <span> berikutnya

  // Periksa validitas input dalam konteks form yang bersangkutan
  const isValid = Array.from(formElement.querySelectorAll('.form__input')).every((input) => input.checkValidity());

  if (!inputElement.checkValidity()) {
   const errorMessage = inputElement.validationMessage;
   errorElement.textContent = errorMessage;
   buttonElement.current.classList.add('form__button_inactive');
  } else {
   errorElement.textContent = '';
   if (isValid) {
    buttonElement.current.classList.remove('form__button_inactive');
    setButtonDisabled(false);
   }
  }
 }

 return (
  <>
   <div className='root'>
    <CurrentUserContext.Provider value={currentUser}>
     <Header />
     <Main
      onEditProfileClick={handleEditProfileClick}
      onAddPlaceClick={handleAddPlaceClick}
      onEditAvatarClick={handleEditAvatarClick}
      onCloseAllPopups={closeAllPopups}
      onCardClick={handleCardClick}
      onCardDeleteOpen={handleCardDeletePopupOpen}
      onLikeClick={handleLikeClick}
      onDeleteClick={handleDeleteClick}
      onDeleteCard={handleCardDelete}
      cardList={cardList}
      selectedCard={selectedCard}
      isDeleteConfirmPopupOpen={isDeleteConfirmPopupOpen}
      isLoading={isLoading}
     />
     <EditProfilePopup
      isOpen={isEditProfilePopupOpen}
      onClose={closeAllPopups}
      onUpdateUser={handleUpdateUser}
      refName={inputName}
      refJob={inputJob}
      refButtonElement={buttonElement}
      buttonDisabled={buttonDisabled}
      refFormElement={refFormProfileElement}
      isLoading={isLoading}
      validateInput={validateInput}
     />
     <AddPlacepopup
      isOpen={isAddPlacePopupOpen}
      onClose={closeAllPopups}
      onSubmit={handleSubmitAddPlace}
      refJudul={inputJudul}
      refTautanGambar={inputTautanGambar}
      refButtonElement={buttonElement}
      buttonDisabled={buttonDisabled}
      refFormElement={refFormAddPlaceElement}
      isLoading={isLoading}
      validateInput={validateInput}
     />
     <EditAvatarPopup
      isOpen={isEditAvatarPopupOpen}
      onClose={closeAllPopups}
      onSubmit={handleSubmitAvatar}
      avatar={avatarInputRef}
      refButtonElement={buttonElement}
      buttonDisabled={buttonDisabled}
      refFormElement={refFormAvatarElement}
      isLoading={isLoading}
      validateInput={validateInput}
     />
     <Footer />
    </CurrentUserContext.Provider>
   </div>
  </>
 );
}

export default App;
