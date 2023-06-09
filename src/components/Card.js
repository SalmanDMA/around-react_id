export default function Card(props) {
 function handleClick() {
  props.onCardClick(props.card);
 }

 return (
  <div className='card__item' key={props.card.id}>
   <img className='card__image' alt={props.card.name} src={props.card.link} onClick={handleClick} />
   <button className='card__icon-delete hover-icon' onClick={props.onCardDelete}></button>
   <div className='card__main-text'>
    <h3 className='card__title'>{props.card.name}</h3>
    <div className='card__likes'>
     <button className='card__icon hover-icon'></button>
     <p className='card__likes-text'>{props.card.likes.length}</p>
    </div>
   </div>
  </div>
 );
}
