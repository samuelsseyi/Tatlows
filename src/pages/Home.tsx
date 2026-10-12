import {Link, useNavigate} from 'react-router-dom';
import {useState} from 'react';
import {ArrowUpRight, Sun, MapPin} from 'lucide-react';
import {Button, Reveal, SectionHeading} from '../components/UI';
import {DailySpecialCard} from '../components/Specials';
import {OpeningHours, VisitStrip} from '../components/Layout';
import {torontoDate} from '../lib/utils';
import {illustrativeImages, business} from '../data/business';

const categoryStories = [
  {name: 'Breakfast & brunch', title: 'Mornings, made better.', num: '01', detail: 'Bennies, skillets & slow starts.', image: 'brunch'},
  {name: 'Lunch', title: 'A midday favourite.', num: '02', detail: 'Burgers, wraps & something fresh.'},
  {name: 'Dinner', title: 'Stay a little longer.', num: '03', detail: 'Comforting classics & generous plates.', image: 'dinner'},
  {name: 'Sweet things', title: 'Room for a little more.', num: '04', detail: 'A sweet finish from our brunch menu.'},
] as const;

export function ReservationWidget() {
  const navigate = useNavigate();
  const [party, setParty] = useState('2');
  const [date, setDate] = useState(torontoDate());
  const [time, setTime] = useState('18:00');
  return <form className="booking-widget" onSubmit={event => {event.preventDefault(); navigate(`/reservations?party=${party}&date=${date}&time=${time}`);}}>
    <label>Good company<select value={party} onChange={event => setParty(event.target.value)}>{[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} {n === 1 ? 'guest' : 'guests'}</option>)}</select></label>
    <label>Your day<input required type="date" min={torontoDate()} value={date} onChange={event => setDate(event.target.value)}/></label>
    <label>Your time<select value={time} onChange={event => setTime(event.target.value)}><option value="09:00">9:00am</option><option value="12:00">12:00pm</option><option value="18:00">6:00pm</option><option value="19:00">7:00pm</option></select></label>
    <button className="button">Find your table<ArrowUpRight size={16}/></button>
  </form>;
}

export default function Home() {
  return <>
    <section className="hero">
      <Reveal className="hero-copy">
        <span className="eyebrow"><span className="little-line"/>HOLLAND LANDING, ONTARIO</span>
        <h1>Good food.<br/>Great company.<br/><em>Your neighbourhood<br/>table.</em></h1>
        <p>From early breakfasts to comforting dinners, there's always something worth gathering for.</p>
        <div className="hero-actions"><Button to="/menu">Explore our menu</Button><Link className="text-link" to="/order">Order pickup<ArrowUpRight size={17}/></Link></div>
        <div className="hero-note"><Sun size={23}/><span>Breakfast, lunch & dinner.<br/><strong>A little something for everyone.</strong></span></div>
      </Reveal>
      <Reveal className="hero-visual">
        <img src={illustrativeImages.brunch.src} alt={illustrativeImages.brunch.alt} fetchPriority="high" srcSet="/images/brunch-small.webp 700w, /images/brunch.webp 1400w" sizes="(max-width: 600px) 90vw, 45vw"/>
        <div className="hero-photo-label">GOOD MORNINGS START HERE<span>Illustrative concept photography</span></div>
        <Link className="round-note" to="/reservations" aria-label="Pull up a chair — try reservations">PULL UP<br/>A CHAIR<span>↗</span></Link>
      </Reveal>
    </section>
    <VisitStrip/>
    <main>
      <section className="section today-section">
        <div className="section-title-row"><SectionHeading eyebrow="FRESH REASONS TO STOP BY" title="There's always a good reason."/><Link className="text-link" to="/specials">All our specials<ArrowUpRight size={17}/></Link></div>
        <Reveal><DailySpecialCard/></Reveal>
      </section>
      <section className="section menu-discovery">
        <SectionHeading eyebrow="FROM YOUR FIRST COFFEE TO YOUR LAST BITE" title="Whatever you're in the mood for."/>
        <div className="discovery-grid">{categoryStories.map((category, index) => <Link key={category.name} className={`discovery discovery-${index}`} to={`/menu?category=${encodeURIComponent(category.name)}`}>
          <span className="eyebrow">{category.num} / {category.name.toUpperCase()}</span>
          {'image' in category && <img src={illustrativeImages[category.image].src} srcSet={`/images/${category.image}-small.webp 700w, /images/${category.image}.webp 1400w`} sizes="(max-width: 600px) 85vw, 40vw" alt={illustrativeImages[category.image].alt} loading="lazy"/>}
          <div><h3>{category.title}</h3><p>{category.detail}</p><ArrowUpRight size={24}/></div>
        </Link>)}</div>
        <p className="photo-caption">Food photographs are illustrative concept images.</p>
      </section>
      <section className="experience section">
        <Reveal className="experience-photo">
          <div className="experience-main"><img src={illustrativeImages.dinner.src} srcSet="/images/dinner-small.webp 700w, /images/dinner.webp 1400w" sizes="(max-width: 600px) 85vw, 45vw" alt={illustrativeImages.dinner.alt} loading="lazy"/></div>
          <div className="experience-inset"><img src={illustrativeImages.brunch.src} alt="Illustrative waffles and coffee on a breakfast table" loading="lazy"/><span>FROM FIRST COFFEE<br/>TO LAST BITE</span></div>
          <span className="photo-caption">Illustrative concept photography</span>
        </Reveal>
        <Reveal className="experience-copy"><span className="eyebrow">FAMILIAR FOOD. FRESH CONVERSATION.</span><h2>The best part?<br/>Who you share it with.</h2><p>Breakfast with the family. A lunch that turns into a catch-up. Dinner with nowhere else to be. Make Tatlows your next place to gather.</p><Button to="/about" secondary>Get to know Tatlows</Button></Reveal>
      </section>
      <section className="order-banner"><div><span className="eyebrow">GOOD FOOD, ON YOUR SCHEDULE</span><h2>Your favourites,<br/><em>ready when you are.</em></h2><Button to="/order">Try online ordering</Button></div><div className="steps">{['Explore the menu.','Choose your dishes.','Review your pickup plans.'].map((step, index) => <div key={step}><span>0{index + 1}</span><h3>{step}</h3></div>)}<p>Try the interactive concept. No order is sent and no payment is taken.</p></div></section>
      <section className="section reserve-section"><SectionHeading eyebrow="SAVE A SEAT FOR SOMETHING GOOD" title="Make room for good company."/><ReservationWidget/><p className="fine-print">A booking concept with illustrative times. No live table availability or real reservations.</p></section>
      <section className="section home-visit"><div><span className="eyebrow">YOUR NEXT STOP</span><h2>A little closer<br/><em>to home.</em></h2><p><MapPin size={18}/>{business.address}<br/>{business.locality}</p><a className="button secondary" href={business.directions} target="_blank" rel="noreferrer">Get directions<ArrowUpRight size={17}/></a></div><div><h3>Come on over.</h3><OpeningHours/></div></section>
    </main>
  </>;
}
