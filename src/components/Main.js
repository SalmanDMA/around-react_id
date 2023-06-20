import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';
import { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Main(props) {
 const currentUser = useContext(CurrentUserContext) || {};
 const { name, about, avatar } = currentUser;

 return (
  <>
   <section className='profile'>
    <div className='profile__avatar'>
     <div className='profile__edit-avatar' onClick={props.onEditAvatarClick}>
      <button type='button' aria-label='edit avatar' className='profile__button-avatar'></button>
      <img alt='profile' className='profile__image' src={avatar} />
     </div>
     <div className='profile__info'>
      <div className='profile__header'>
       <h2 className='profile__title'>{name}</h2>
       <button className='hover-icon profile__edit' onClick={props.onEditProfileClick}></button>
      </div>
      <p className='profile__text'>{about}</p>
     </div>
    </div>

    <div className='profile__cta'>
     <button className='profile__add hover-icon' onClick={props.onAddPlaceClick}></button>
    </div>
   </section>

   <PopupWithForm
    name='form-confirm-container'
    title='Apakah Anda Yakin ?'
    isOpen={props.isDeleteConfirmPopupOpen}
    onClose={props.onCloseAllPopups}
    titleClass='form-confirm-container__title'
    refFormContainer={props.refFormContainer}
    refOverlay={props.refOverlay}
   >
    <button type='submit' className='form__button form-confirm-container__button hover-icon' aria-label='Ya' onClick={props.onDeleteCard}>
     {props.isLoading ? 'Deleting...' : 'Ya'}
    </button>
   </PopupWithForm>

   <ImagePopup isOpen={props.selectedCard} card={props.selectedCard} onClose={props.onCloseAllPopups} refFormContainer={props.refFormContainer} refOverlay={props.refOverlay} />

   <section className='card'>
    {props.cardList.map((card) => (
     <Card key={card._id} card={card} onCardClick={() => props.onCardClick(card)} onCardDelete={() => props.onCardDeleteOpen(card)} onLikeClick={() => props.onLikeClick(card)} />
    ))}
   </section>
  </>
 );
}