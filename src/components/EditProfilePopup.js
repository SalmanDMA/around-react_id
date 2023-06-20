import { useContext, useState, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

export default function EditProfilePopup(props) {
 const [name, setName] = useState('');
 const [about, setAbout] = useState('');
 const currentUser = useContext(CurrentUserContext) || {};

 useEffect(() => {
  setName(currentUser.name || '');
  setAbout(currentUser.about || '');
 }, [currentUser]);

 const handleChangeName = (e) => {
  setName(e.target.value);
 };

 const handleChangeAbout = (e) => {
  setAbout(e.target.value);
 };

 const handleSubmit = (e) => {
  e.preventDefault();
  props.onUpdateUser({
   name,
   about,
  });
 };

 return (
  <PopupWithForm
   isOpen={props.isOpen}
   onClose={props.onClose}
   title='Edit profile'
   name='form-edit'
   titleClass='form__header'
   onSubmit={handleSubmit}
   refFormElement={props.refFormElement}
   refFormContainer={props.refFormContainer}
   refOverlay={props.refOverlay}
  >
   <input
    id='text-input'
    type='text'
    className='form__input form__name'
    name='inputName'
    value={name}
    onChange={() => props.validateInput(props.refName.current, props.refFormElement.current)}
    onInput={handleChangeName}
    required
    minLength='2'
    maxLength='40'
    placeholder='Nama'
    ref={props.refName}
   />
   <span className='text-input-error form__input-error'></span>
   <input
    id='text-input-dua'
    type='text'
    className='form__input form__job'
    name='inputJob'
    value={about}
    onChange={() => props.validateInput(props.refJob.current, props.refFormElement.current)}
    onInput={handleChangeAbout}
    required
    minLength='2'
    maxLength='200'
    placeholder='Tentang'
    ref={props.refJob}
   />
   <span className='text-input-dua-error form__input-error'></span>
   <button type='submit' className={`form__button form__button-save hover ${props.isLoading ? 'form__button_inactive' : ''} ${props.buttonDisabled ? 'form__button_inactive' : ''}`} aria-label='simpan'>
    {props.isLoading ? 'Menyimpan...' : 'Simpan'}
   </button>
  </PopupWithForm>
 );
}
