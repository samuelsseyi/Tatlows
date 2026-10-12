import {useState} from 'react';
import {Link} from 'react-router-dom';
import {ArrowUpRight, CalendarDays, RotateCcw, ShoppingBag, Utensils, Check} from 'lucide-react';
import {useStore} from '../context/Store';
import {specials} from '../data/business';
import {days, money, torontoDay, torontoDate} from '../lib/utils';
import {Modal} from './UI';

export function DemoControls() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const store = useStore();
  const activeDay = store.day ?? torontoDay();
  const features = specials[activeDay];
  const close = () => setOpen(false);
  return <>
    <button type="button" className="text-link concept-trigger" aria-haspopup="dialog" aria-expanded={open} onClick={() => {setMessage(''); setOpen(true);}}>Explore the concept <ArrowUpRight size={17}/></button>
    {open && <Modal title="Explore the concept" onClose={close} className="concept-modal">
      <div className="concept-intro"><span className="eyebrow">PROTOTYPE PRESENTATION TOOLS</span><p>A better way to order, plan a visit, and discover a reason to return. Try it for yourself.</p></div>
      <div className="concept-journeys">
        <Link to="/order" onClick={close}><ShoppingBag size={21}/><span>Try pickup ordering<small>Menu → cart → demo checkout</small></span><ArrowUpRight size={17}/></Link>
        <Link to="/reservations" onClick={close}><CalendarDays size={21}/><span>Try reservations<small>Choose a table → review your plans</small></span><ArrowUpRight size={17}/></Link>
      </div>
      <div className="concept-section-title"><Utensils size={17}/><h3>See a different day.</h3><span>{store.day === null ? 'Toronto today' : 'Preview mode'}</span></div>
      <p className="concept-help">Choose a day to update this preview and the site's specials.</p>
      <div className="day-grid">{[1,2,3,4,5,6,0].map(day => <button type="button" aria-pressed={activeDay === day} className={activeDay === day ? 'selected' : ''} key={day} onClick={() => {store.setDay(day); setMessage('');}}><span className="day-full">{days[day]}</span><span className="day-short" aria-hidden="true">{days[day].slice(0,3)}</span>{activeDay === day && <Check size={13}/>}</button>)}</div>
      <div className="concept-preview" aria-live="polite" aria-atomic="true">
        <span className="eyebrow">{days[activeDay]} · {store.day === null ? torontoDate() : 'ILLUSTRATIVE DAY PREVIEW'}</span>
        {features ? features.map(feature => <div className="concept-feature" key={feature.name}><div><h3>{feature.name}</h3><strong>{money(feature.price)}</strong></div><p>{feature.description}</p><small>{feature.terms}</small></div>) : <div className="concept-feature"><h3>Your favourites, all week long.</h3><p>No published weekday dinner promotion for {days[activeDay]}. The site features the regular menu instead.</p></div>}
        <Link to="/specials" className="text-link" onClick={close}>View all specials <ArrowUpRight size={15}/></Link>
      </div>
      <div className="concept-reset"><button type="button" className="text-link" onClick={() => {store.setDay(null); setMessage('Showing the actual day in Toronto.');}}><CalendarDays size={15}/>Use the actual Toronto day</button><button type="button" className="text-link" onClick={() => {store.reset(); setMessage('Demo states reset. Your cart and booking demo have been cleared.');}}><RotateCcw size={15}/>Reset cart & booking demo</button></div>
      <p className="concept-status" role="status">{message}</p>
      <p className="fine-print">Presentation tools only. No real orders, reservations or payments. Published offers do not confirm live restaurant availability.</p>
    </Modal>}
  </>;
}
