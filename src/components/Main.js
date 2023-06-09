import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';
import api from '../utils/api';
import { useState, useEffect } from 'react';
import Card from './Card';

export default function Main(props) {
 const [userName, setUserName] = useState();
 const [userDescription, setUserDescription] = useState();
 const [userAvatar, setUserAvatar] = useState();
 const [cardList, setCardList] = useState([]);

 useEffect(() => {
  api.getInitialCardsAndUserInfo().then(([cards, data]) => {
   console.log(cards);
   setUserName(data.name);
   setUserDescription(data.about);
   setUserAvatar(data.avatar);
   setCardList(cards);
  });
 }, []);

 return (
  <>
   <section className='profile'>
    <div className='profile__avatar'>
     <div className='profile__edit-avatar' onClick={props.onEditAvatarClick}>
      <button type='button' aria-label='edit avatar' className='profile__button-avatar'></button>
      <img alt='profile' className='profile__image' src={userAvatar} />
     </div>
     <div className='profile__info'>
      <div className='profile__header'>
       <h2 className='profile__title'>{userName}</h2>
       <button className='hover-icon profile__edit' onClick={props.onEditProfileClick}></button>
      </div>
      <p className='profile__text'>{userDescription}</p>
     </div>
    </div>

    <div className='profile__cta'>
     <button className='profile__add hover-icon' onClick={props.onAddPlaceClick}></button>
    </div>
   </section>

   <div className='overlay'></div>
   <PopupWithForm name='form-edit' title='Edit profile' titleClass='form__header' isOpen={props.isEditProfilePopupOpen} onClose={props.onCloseAllPopups}>
    <input id='text-input' type='text' className='form__input form__name' name='inputName' required minLength='2' maxLength='40' placeholder='Nama' />
    <span className='text-input-error form__input-error'></span>
    <input id='text-input-dua' type='text' className='form__input form__job' name='inputJob' required minLength='2' maxLength='200' placeholder='Tentang' />
    <span className='text-input-dua-error form__input-error'></span>
    <button type='submit' className='form__button form__button-save hover' aria-label='simpan'>
     Simpan
    </button>
   </PopupWithForm>

   <PopupWithForm name='form-add' title='Tempat Baru' titleClass='form__header' isOpen={props.isAddPlacePopupOpen} onClose={props.onCloseAllPopups}>
    <input id='text-input-tiga' type='text' name='inputJudul' className='form__input form__name' placeholder='Judul' required minLength='2' maxLength='30' />
    <span className='text-input-tiga-error form__input-error'></span>
    <input id='input-url' type='url' name='inputTautanGambar' className='form__input form__job' placeholder='Tautan gambar' required />
    <span className='input-url-error form__input-error'></span>
    <button type='submit' className='form__button form__button-create hover' aria-label='buat'>
     Buat
    </button>
   </PopupWithForm>

   <PopupWithForm name='form-avatar' title='Ubah Foto Profil' titleClass='form-avatar__title' isOpen={props.isEditAvatarPopupOpen} onClose={props.onCloseAllPopups}>
    <input id='input-url-avatar' name='inputAvatar' type='url' className='form__input form__avatar' placeholder='Isi link disini...' required />
    <span className='input-url-avatar-error form__input-error form__input-avatar'></span>
    <button type='submit' className='form__button form__button-avatar hover' aria-label='Simpan'>
     Simpan
    </button>
   </PopupWithForm>

   <PopupWithForm name='form-confirm-container' title='Apakah Anda Yakin ?' isOpen={props.isDeleteConfirmPopupOpen} onClose={props.onCloseAllPopups} titleClass='form-confirm-container__title'>
    <button type='submit' className='form__button form-confirm-container__button hover-icon' aria-label='Ya'>
     Ya
    </button>
   </PopupWithForm>

   <ImagePopup isOpen={Boolean(props.selectedCard)} card={props.selectedCard} onClose={props.onCloseAllPopups} />

   <section className='card'>
    {cardList.map((card) => (
     <Card key={card._id} card={card} onCardClick={props.onCardClick} onCardDelete={props.onDeleteClick} />
    ))}
   </section>
  </>
 );
}
