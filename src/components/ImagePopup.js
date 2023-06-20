import { useRef } from 'react';

export default function ImagePopup(props) {
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
   <div ref={formContainerRef} className={`pop-up ${props.isOpen ? 'block' : ''}`}>
    <img className='pop-up__image' alt={props.card ? props.card.name : ''} src={props.card ? props.card.link : ''} />
    <button className='pop-up__icon hover-icon' onClick={props.onClose}></button>
    <h3 className='pop-up__title'>{props.card ? props.card.name : ''}</h3>
   </div>
  </div>
 );
}
