import { useRef } from 'react';

export default function PopupWithForm(props) {
 const formContainerRef = useRef(null);
 const overlay = useRef(null);

 const handleOverlayClick = (e) => {
  if (!formContainerRef.current.contains(e.target) && overlay.current.contains(e.target)) return props.onClose();
 };

 const handleOverlayMouseOver = (e) => {
  formContainerRef.current.contains(e.target) ? (overlay.current.style.cursor = 'default') : (overlay.current.style.cursor = 'pointer');
 };

 return (
  <div ref={overlay} className={`overlay ${props.isOpen ? 'block' : ''}`} onClick={handleOverlayClick} onMouseOver={handleOverlayMouseOver}>
   <div ref={formContainerRef} className={`form ${props.name} ${props.isOpen ? 'block' : ''}`}>
    {props.name === 'form-confirm-container' ? (
     <>
      <button className='form__icon hover' onClick={props.onClose}></button>
      <div className='form-confirm-container__content'>
       <h3 className={props.titleClass}>{props.title}</h3>
       <form ref={props.refFormElement} className='form__control' name={props.name} noValidate>
        {props.children}
       </form>
      </div>
     </>
    ) : (
     <>
      <button className='form__icon hover' onClick={props.onClose}></button>
      <h3 className={props.titleClass}>{props.title}</h3>
      <form ref={props.refFormElement} className='form__control' name={props.name} noValidate onSubmit={props.onSubmit}>
       {props.children}
      </form>
     </>
    )}
   </div>
  </div>
 );
}
