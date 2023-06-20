export default function PopupWithForm(props) {
 const handleOverlayClick = (e) => {
  if (!props.refFormContainer.current.contains(e.target) && props.refOverlay.current.contains(e.target)) return props.onClose();
 };

 const handleOverlayMouseOver = (e) => {
  props.refFormContainer.current.contains(e.target) ? (props.refOverlay.current.style.cursor = 'default') : (props.refOverlay.current.style.cursor = 'pointer');
 };

 return (
  <div ref={props.refOverlay} className={`overlay ${props.isOpen ? 'block' : ''}`} onClick={handleOverlayClick} onMouseOver={handleOverlayMouseOver}>
   <div ref={props.refFormContainer} className={`form ${props.name} ${props.isOpen ? 'block' : ''}`}>
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
