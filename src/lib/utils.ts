export const money=(n:number)=>new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD'}).format(n);
export const days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
export function torontoDate(date=new Date()){return new Intl.DateTimeFormat('en-CA',{timeZone:'America/Toronto',year:'numeric',month:'2-digit',day:'2-digit'}).format(date)}
export function torontoDay(date=new Date()){return days.indexOf(new Intl.DateTimeFormat('en-US',{timeZone:'America/Toronto',weekday:'long'}).format(date))}
export const totals=(lines:{price:number;quantity:number}[])=>{const cents=lines.reduce((s,l)=>s+Math.round(l.price*100)*l.quantity,0);const tax=Math.round(cents*.13);return {subtotal:cents/100,tax:tax/100,total:(cents+tax)/100}};
export function readLocal<T>(key:string,fallback:T):T{try{return JSON.parse(localStorage.getItem(key)||'null')??fallback}catch{return fallback}}
export function saveLocal(key:string,value:unknown){try{localStorage.setItem(key,JSON.stringify(value))}catch{/* Private browsing can disable storage. */}}
