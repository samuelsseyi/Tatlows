import {useEffect, useRef, useId, type ReactNode} from 'react';
import {createPortal} from 'react-dom';
import {Link} from 'react-router-dom';
import {ArrowUpRight, X} from 'lucide-react';
import {motion, useReducedMotion} from 'motion/react';

export function Button({to, children, secondary = false}: {to: string; children: ReactNode; secondary?: boolean}) {
  return <Link className={`button ${secondary ? 'secondary' : ''}`} to={to}>{children}<ArrowUpRight size={17}/></Link>;
}
export function Reveal({children, className = ''}: {children: ReactNode; className?: string}) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : {opacity: 0, y: 16}} whileInView={{opacity: 1, y: 0}} viewport={{once: true, amount: .1}} transition={{duration: .45, ease: [.22, 1, .36, 1]}}>{children}</motion.div>;
}
export function SectionHeading({eyebrow, title, children}: {eyebrow: string; title: string; children?: ReactNode}) {
  return <div className="section-heading"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{children && <p>{children}</p>}</div>;
}
export function Modal({children, title, onClose, drawer = false, className = ''}: {children: ReactNode; title: string; onClose: () => void; drawer?: boolean; className?: string}) {
  const ref = useRef<HTMLDivElement>(null);
  const closeRef = useRef(onClose);
  const titleId = useId();
  const reduced = useReducedMotion();
  closeRef.current = onClose;
  useEffect(() => {
    const prior = document.activeElement as HTMLElement | null;
    const root = document.getElementById('root');
    const oldInert = root?.inert ?? false;
    const oldOverflow = document.body.style.overflow;
    const oldPadding = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;
    if (root) root.inert = true;
    ref.current?.focus();
    function key(event: KeyboardEvent) {
      if (event.key === 'Escape') { event.preventDefault(); closeRef.current(); }
      if (event.key !== 'Tab') return;
      const elements = Array.from(ref.current?.querySelectorAll<HTMLElement>('button:not([disabled]),a[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex="0"]') ?? []).filter(element => element.getClientRects().length > 0);
      if (!elements.length) { event.preventDefault(); return; }
      const first = elements[0], last = elements[elements.length - 1];
      if (event.shiftKey && (document.activeElement === first || document.activeElement === ref.current)) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
    document.addEventListener('keydown', key);
    return () => {
      document.body.style.overflow = oldOverflow;
      document.body.style.paddingRight = oldPadding;
      if (root) root.inert = oldInert;
      document.removeEventListener('keydown', key);
      if (prior?.isConnected) prior.focus({preventScroll: true});
    };
  }, []);
  return createPortal(
    <motion.div className="overlay" initial={reduced ? false : {opacity: 0}} animate={{opacity: 1}} transition={{duration: .18}} onClick={event => {if (event.target === event.currentTarget) onClose();}}>
      <motion.div ref={ref} tabIndex={-1} role="dialog" aria-modal="true" aria-labelledby={titleId} className={`modal ${drawer ? 'drawer' : ''} ${className}`} initial={reduced ? false : {opacity: 0, x: drawer ? 30 : 0, y: drawer ? 0 : 12}} animate={{opacity: 1, x: 0, y: 0}} transition={{duration: .25, ease: [.22, 1, .36, 1]}}>
        <div className="modal-head"><h2 id={titleId}>{title}</h2><button className="icon-button" type="button" aria-label="Close dialog" onClick={onClose}><X size={21}/></button></div>
        {children}
      </motion.div>
    </motion.div>, document.body
  );
}
export function DemoNotice() {
  return <p className="demo-notice">Interactive concept demonstration — no order will be sent and no payment will be taken.</p>;
}
