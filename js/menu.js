function main(){return renderuj_nawigacje(),body.removeChild(ladowanie),!0}function przelodwanie(){document.location.reload()}function renderuj_nawigacje(){let e=document.createElement("nav"),t=document.createElement("div");t.className="menu";let i=document.createElement("header");i.id="tytul_portalu",i.innerHTML="<h1>Pixi</h1>",i.addEventListener("click",przelodwanie),t.appendChild(i);let n=document.createElement("div");n.classList="wyszukaj i";let d=document.createElement("form");d.setAttribute("method","POST"),d.className="i";let a=document.createElement("input");a.setAttribute("type","text"),a.className="b",a.setAttribute("name","wyszukiwarka"),a.id="wyszukiwarka",a.placeholder="Szukaj w pixi",a.addEventListener("focus",()=>{!szukanie.live&&l.click()}),a.addEventListener("blur",()=>szukanie.live?"":l.click()),d.appendChild(a),n.appendChild(d),t.appendChild(n);let l=document.createElement("button");l.id="lupka",l.innerHTML="&#128270;",l.addEventListener("click",zmienlupe),n.appendChild(l);let o=document.createElement("div");o.className="telefon";let c=document.createElement("button");c.id="wiadomosci_tel",c.className="wiadomosci_ikonka",c.setAttribute("alt","wiadomosci"),c.innerHTML="&#128232;",o.appendChild(c);let m=document.createElement("div");m.id="pow_tel",m.style.left="40%",m.className="wiadomosci_ikonka",m.innerHTML="&#128240;",o.appendChild(m),t.appendChild(o);let s=document.createElement("div");s.className="komputer";let y=document.createElement("div");y.className="menu_opcje",s.appendChild(y),t.appendChild(s),e.appendChild(t),body.appendChild(e),nowy_dym_wysz()}function renderuj_menu(){let e=[["aktywny_przycisk","Strona główna"],["powiad_przycisk","Powiadomienia","powiadomienia"],["pilne_przycisk","Pilne wiadomości","pilne_wiad"],["wiad_przycisk","Wiadomości","wiadomosci"],[" ","Dodaj posta"],[" ","Mój profil"],[" ","Ustawienia"],[" ","Więcej"],[" ","Wyloguj"]],t=document.querySelector(".menu_opcje");e.forEach(e=>{przycisk=document.createElement("button"),przycisk.id=e[0],przycisk.innerText=e[1],e.length>=3&&e[2]&&(zmieniajdymki(przycisk,document.getElementById(e[2]),"#"+e[2]+" h2 button"),licznik=document.createElement("div"),licznik.className="licznik_menu",licznik.innerText="488",przycisk.appendChild(licznik)),t.appendChild(przycisk)})}function nowy_dym_wysz(){let e=[["powiadomienia","powiad","Moje powiadomienia","pow_tel"],["pilne_wiad","pilne_wiadom","Pilne wiadomości"],["wiadomosci","pilne_wiadom","Wiadomości","wiadomosci_tel"],["wyszukaj","wynik_wyszuk","Wyniki wyszukiwania","lupka"]];e.forEach(e=>{let t=body.appendChild(document.createElement("aside")),i=document.createElement("div");i.id=e[0],i.classList="powiadomienia";let n=document.createElement("h2");n.innerText=e[2]+" :";let d=document.createElement("button");d.innerText="X",n.appendChild(d),i.appendChild(n);let a=document.createElement("div");a.classList="powiad",a.id=e[1],i.appendChild(a);for(let e=0;e<4;e++){let e=document.createElement("div");e.classList="powiadomienie powiad_load",e.innerHTML='<div class="ladowanie_prof"></div>',a.appendChild(e)}t.appendChild(i),e.length>=4&&e[3]&&""!==e[3]&&("lupka"!==e[3]?zmieniajdymki(document.getElementById(e[3]),i):zmieniajdymki(document.getElementById(e[3]),i,"#wyszukaj h2 button"))}),renderuj_menu()}function zmienlupe(){document.getElementById("wyszukiwarka").classList.toggle("widocznosc"),document.getElementById("lupka").classList.toggle("aktywnalupa"),zmienikony(),szukanie_live=!szukanie_live}function zmienikony(){document.getElementById("wiadomosci_tel").classList.toggle("wid"),document.getElementById("pow_tel").classList.toggle("wid")}function aktywnedymki(){aktywnyprzycik.classList.toggle("aktywny_przycisk"),aktywny_dymek.classList.toggle("widocznosc")}function zmieniajdymki(e,t,i){e.addEventListener("click",()=>{null!=aktywny_dymek&&(aktywny_dymek!=t&&aktywnedymki()),e.classList.toggle("aktywny_przycisk"),t.classList.toggle("widocznosc"),"wiadomosci_tel"===e.id&&document.getElementById("wiad_przycisk").classList.toggle("aktywny_przycisk"),"pow_tel"===e.id&&document.getElementById("powiad_przycisk").classList.toggle("aktywny_przycisk"),aktywny_dymek!=t?(aktywny_dymek=t,aktywnyprzycik=e):(aktywny_dymek=null,aktywnyprzycik=null)}),i&&document.querySelector(i).addEventListener("click",()=>{aktywnedymk=!1,e.classList.toggle("aktywny_przycisk"),t.classList.toggle("widocznosc"),aktywny_dymek=null,aktywnyprzycik=null,t==document.getElementById("wyszukaj")&&zmienlupe()})}const body=document.querySelector("body"),ladowanie=document.getElementById("ladowanie"),tytul_portalu=document.getElementById("tytul_portalu"),lupka=document.getElementById("lupka"),wyszukiwarka=document.getElementById("wyszukiwarka"),powiad_przycisk=document.getElementById("powiad_przycisk"),powiadomienia=document.querySelector(".powiadomienia"),powiad=document.getElementById("powiad"),pilne_przycisk=document.getElementById("pilne_przycisk"),pilne_wiad=document.getElementById("pilne_wiad"),wiad_przycisk=document.getElementById("wiad_przycisk"),wiadomosci=document.getElementById("wiadomosci");let aktywny_dymek=null,aktywnyprzycik=null;const wiadomosci_tel=document.getElementById("wiadomosci_tel"),pow_tel=document.getElementById("pow_tel"),wyszukaj=document.getElementById("wyszukaj");let szukanie=!1,szukanie_live=!1;try{window.onload=(()=>{if(!main())throw new Error("Błąd")})}catch(e){console.log(e)}
