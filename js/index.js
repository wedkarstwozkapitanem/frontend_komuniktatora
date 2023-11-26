"strict mode";

const body = document.querySelector("body");
const ladowanie = document.getElementById("ladowanie");
const tytul_portalu = document.getElementById("tytul_portalu");
const lupka = document.getElementById("lupka");
const wyszukiwarka = document.getElementById("wyszukiwarka");
const powiad_przycisk = document.getElementById("powiad_przycisk");
const powiadomienia = document.querySelector(".powiadomienia");
const powiad = document.getElementById("powiad");
const pilne_przycisk = document.getElementById("pilne_przycisk");
const pilne_wiad = document.getElementById("pilne_wiad");
const wiad_przycisk = document.getElementById("wiad_przycisk");
const wiadomosci = document.getElementById("wiadomosci");
let aktywny_dymek = null,
    aktywnyprzycik = null;

/** */
const wiadomosci_tel = document.getElementById("wiadomosci_tel");
const pow_tel = document.getElementById("pow_tel");
const wyszukaj = document.getElementById("wyszukaj");
let szukanie = false,
    szukanie_live = false; //
let czy_wstawiano_post = false;
let licznik_zdjec = 0;
/*****/

(function renderowanie_strony_glownej() {
    window.onload = () => {
        renderuj_nawigacje();
        renderuj_glowne();
        prawa_burta();
        body.removeChild(ladowanie);
        nowe_posty();
    }
})();


function przelodwanie() {
    document.location.reload();
}




function renderuj_nawigacje() {
    let nav = document.createElement("nav");
    let menu = document.createElement("div");
    menu.className = "menu";
    let header = document.createElement("header");
    header.id = "tytul_portalu";
    header.innerHTML = "<h1>Pixi</h1>";
    header.addEventListener("click", przelodwanie); //przeładowanie tytułm
    menu.appendChild(header);


    let wyszuk = document.createElement("div");
    wyszuk.classList = "wyszukaj i";

    let form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.className = "i";
    let input = document.createElement("input");
    input.setAttribute("type", "text");
    input.className = "b";
    input.setAttribute("name", "wyszukiwarka");
    input.id = "wyszukiwarka";
    input.setAttribute("placeholder", "Szukaj w pixi");

    input.addEventListener("focus", () => {
        if(!szukanie_live){
        if (window.innerWidth >= 943) !szukanie_live ?  pole_wyszukiwania() : "";
        szukanie_live = true;
        }
    });



    form.appendChild(input);
    wyszuk.appendChild(form);
    menu.appendChild(wyszuk);
    let lup = document.createElement("button");
    lup.id = "lupka";
    lup.innerHTML = "&#128270;";
  //  lup.addEventListener("click", zmienlupe); //
    wyszuk.appendChild(lup);

    let tel = document.createElement("div");
    tel.className = "telefon";
    let but1 = document.createElement("button");
    but1.id = "wiadomosci_tel";
    but1.className = "wiadomosci_ikonka";
    but1.setAttribute("alt", "wiadomosci");
    but1.innerHTML = "&#128232;";

    let licznik_pow = document.createElement("div");
    licznik_pow.className = "licznik_menu";
    licznik_pow.innerText = "488"; //
    but1.appendChild(licznik_pow);

    tel.appendChild(but1);
    let but2 = document.createElement("div");
    but2.id = "pow_tel";
    but2.style.left = "48%";
    but2.className = "wiadomosci_ikonka";
    but2.innerHTML = "&#128240;";

    let licznik_wiad = document.createElement("div");
    licznik_wiad.className = "licznik_menu";
    licznik_wiad.innerText = "488"; //
    but2.appendChild(licznik_wiad);

    tel.appendChild(but2);

    /** */
    let hamburger = document.createElement("div");
    hamburger.appendChild(document.createElement("div"));
    hamburger.appendChild(document.createElement("div"));
    hamburger.appendChild(document.createElement("div"));
    hamburger.id = "hamburger";
    hamburger.addEventListener("click",() => {
        document.querySelector(".komputer").classList.toggle("widocznoscz");
    });
    tel.appendChild(hamburger);


    /** */
    menu.appendChild(tel);

    let div_komp = document.createElement("div");
    div_komp.className = "komputer";

    let men_opcje = document.createElement("div");
    men_opcje.className = "menu_opcje";
    /* */
    let zamknij_menu_tel =  document.createElement("div");
    zamknij_menu_tel.innerHTML = "X";
    zamknij_menu_tel.style.background = "none";
    zamknij_menu_tel.style.fontSize ="48px";
    zamknij_menu_tel.style.margin = "24px";
    zamknij_menu_tel.className = "zamknij";
    zamknij_menu_tel.addEventListener("click",()=> {
        document.querySelector(".komputer").classList.toggle("widocznoscz");
    });
    men_opcje.appendChild(zamknij_menu_tel);
    /** */
    div_komp.appendChild(men_opcje);
    menu.appendChild(div_komp);

    nav.appendChild(menu);

    body.appendChild(nav);
    /** */

    nowy_dym_wysz();

    /*  */
}

function renderuj_menu() {
    let menu_opcje = [
        ["aktywny_przycisk", "Strona główna"],
        ["powiad_przycisk", "Powiadomienia", "powiadomienia"],
        ["pilne_przycisk", "Pilne wiadomości", "pilne_wiad"],
        ["wiad_przycisk", "Wiadomości", "wiadomosci"],
        ["dodawanie_posta", "Dodaj artykuł"],
        [" ", "Mój profil"],
        [" ", "Ustawienia"],
        [" ", "Więcej"],
        [" ", "Wyloguj"],
    ];
    let opcja_menu = document.querySelector(".menu_opcje");
    menu_opcje.forEach((opcja) => {
        przycisk = document.createElement("button");
        przycisk.id = opcja[0];
        przycisk.innerText = opcja[1];
        if (opcja.length >= 3) {
            if (opcja[2]) {
                zmieniajdymki(
                    przycisk,
                    document.getElementById(opcja[2]),
                    "#" + opcja[2] + " h2 button"
                );
                licznik = document.createElement("div");
                licznik.className = "licznik_menu";
                licznik.innerText = "488"; ////
                przycisk.appendChild(licznik);
            }
        }
        opcja_menu.appendChild(przycisk);
    });

    document
        .getElementById("dodawanie_posta")
        .addEventListener("click", renderuj_wstawianie_nowy_post);
}

function nowy_dym_wysz() {
    let dymki = [
        ["powiadomienia", "powiad", "Moje powiadomienia", "pow_tel"],
        ["pilne_wiad", "pilne_wiadom", "Pilne wiadomości"],
        ["wiadomosci", "pilne_wiadom", "Wiadomości", "wiadomosci_tel"],
        ["wyszukaj", "wynik_wyszuk", "Wyniki wyszukiwania", "lupka"],
    ];

    dymki.forEach((oknienko_id) => {
        let aside = body.appendChild(document.createElement("aside"));
        let okno = document.createElement("div");
        okno.id = oknienko_id[0];
        okno.classList = "powiadomienia";
        
        let h2 = document.createElement("h2");
        if(oknienko_id[0] != "wyszukaj") {
        h2.innerText = oknienko_id[2] + " :";
    } else {
        h2.className = "border_none";
        okno.innerHTML = `
        <form method="POST" class="i"><input type="text" class="wyszukuwanie" name="wyszukiwarka" id="wyszukiwark" placeholder="Szukaj w pixi"></form>
        `;
    }
        let button = document.createElement("button");
        button.innerText = "X";
        h2.appendChild(button);
        okno.appendChild(h2);

        let pow = document.createElement("div");
        pow.classList = "powiad";
        pow.id = oknienko_id[1];
        okno.appendChild(pow);

        //  okno.addEventListener('focus', () => {!szukanie.live ? lup.click() : "";});
        // okno.addEventListener("blur", () => (!szukanie.live ? lup.click() : "")); //
      /*  if (typeof (document.getElementById("lupka")) !== 'undefined') {
            okno.addEventListener("click", () => (!szukanie.live ? document.getElementById("lupka") : "")); //
        }*/
        for (let i = 0; i < 4; i++) {
            let znajomy = document.createElement("div");
            znajomy.classList = "powiadomienie powiad_load";
            znajomy.innerHTML = '<div class="ladowanie_prof"></div>';
            pow.appendChild(znajomy);
        }
        aside.appendChild(okno);

        if (oknienko_id.length >= 4) {
            if (oknienko_id[3] && oknienko_id[3] !== "") {
                if (oknienko_id[3] !== "lupka")
                    zmieniajdymki(document.getElementById(oknienko_id[3]), okno);
                else
                    zmieniajdymki(
                        document.getElementById(oknienko_id[3]),
                        okno,
                        "#wyszukaj h2 button"
                    );
            }
        }
    });

    renderuj_menu();
}


function zmienlupe() {
   // document.getElementById("wyszukiwarka").classList.toggle("widocznosc");
   // document.getElementById("lupka").classList.toggle("aktywnalupa");
    zmienikony();
    // szukanie_live ? (szukanie_live = false) : (szukanie_live = true);
}

/****/

function zmienikony() {
    document.getElementById("wiadomosci_tel").classList.toggle("wid");
    document.getElementById("pow_tel").classList.toggle("wid");
    document.getElementById("hamburger").classList.toggle("wid");
}
/*******/

function aktywnedymki() {
    aktywnyprzycik.classList.toggle("aktywny_przycisk");
    aktywny_dymek.classList.toggle("widocznosc");
}

function zmieniajdymki(przycisk, dymek, zamknij) {
    if(przycisk) {
    przycisk.addEventListener("click", () => {
        aktywny_dymek != null ? (aktywny_dymek != dymek ? aktywnedymki() : "") : "";
        przycisk.classList.toggle("aktywny_przycisk");
        dymek.classList.toggle("widocznosc");
        if (przycisk.id === "wiadomosci_tel") {
            document
                .getElementById("wiad_przycisk")
                .classList.toggle("aktywny_przycisk");
        }
        if (przycisk.id === "pow_tel") {
            document
                .getElementById("powiad_przycisk")
                .classList.toggle("aktywny_przycisk"); //
        }
        if (aktywny_dymek != dymek) {
            aktywny_dymek = dymek;
            aktywnyprzycik = przycisk;
        } else {
            aktywny_dymek = null;
            aktywnyprzycik = null;
        }
        szukanie_live = false;
    });
}
    if (zamknij) {
        document.querySelector(zamknij).addEventListener("click", () => {
            aktywnedymk = false;
            przycisk.classList.toggle("aktywny_przycisk");
            dymek.classList.toggle("widocznosc");
            aktywny_dymek = null;
            aktywnyprzycik = null;
            szukanie_live = false;
            if (dymek == document.getElementById("wyszukaj")) {
                zmienlupe();
            }
        });
    }

  

    /*   if (dymek !== document.getElementById("wyszukaj")) {
               przycisk.addEventListener("blur", () => { //jakby okienka się zamykali wyłączyć
                   aktywny_dymek != null ? aktywny_dymek != dymek ? aktywnedymki() : "" : "";
                   przycisk.classList.toggle("aktywny_przycisk");
                   dymek.classList.toggle("widocznosc");
                   if (aktywny_dymek != dymek) {
                       aktywny_dymek = dymek;
                       aktywnyprzycik = przycisk;
                   } else {
                       aktywny_dymek = null;
                       aktywnyprzycik = null;
                   }
               });
           }*/
}

function pole_wyszukiwania() {
    //aktywny_dymek != null ? (aktywny_dymek != dymek ? aktywnedymki() : "") : "";
    if(aktywny_dymek != null && aktywny_dymek != document.getElementById("wyszukaj")) {
        aktywny_dymek.classList.toggle("widocznosc");
        aktywnyprzycik.classList.toggle("aktywny_przycisk");
    }
    document.getElementById("wyszukaj").classList.toggle("widocznosc");
    if (przycisk.id === "wiadomosci_tel") {
        document
            .getElementById("wiad_przycisk")
            .classList.remove("aktywny_przycisk");
    }
    if (przycisk.id === "pow_tel") {
        document
            .getElementById("powiad_przycisk")
            .classList.remove("aktywny_przycisk"); //
    }
    if (aktywny_dymek != document.getElementById("wyszukaj")) {
        document.getElementById("lupka").classList.toggle("aktywny_przycisk");
        aktywny_dymek = document.getElementById("wyszukaj");
        aktywnyprzycik = document.getElementById("lupka");
    } else {
        aktywny_dymek = null;
        aktywnyprzycik = null;
    }
    szukanie_live = false;
}


function renderuj_wstawianie_nowy_post() {
    document
        .getElementById("dodawanie_posta")
        .classList.toggle("aktywny_przycisk");
    if (czy_wstawiano_post) {
        document.getElementById("nowa_akcja").style.display = "flex";
        return 0;
    }

    let aside = body.appendChild(document.createElement("aside"));

    let nowa_akcja = document.createElement("div");
    nowa_akcja.id = "nowa_akcja";

    let nowy_post = document.createElement("div");
    nowy_post.className = "nowy_post";

    let tytul_post = document.createElement("div");
    tytul_post.style.borderBottom = "1px silver solid";
    tytul_post.style.padding = "4px";
    tytul_post.innerHTML = " &#128196; Utwórz nowy artykuł";
    let zamk = document.createElement("button");
    zamk.className = "zamknij";
    zamk.innerText = "X";
    zamk.addEventListener("click", () => {
        document.getElementById("nowa_akcja").style.display = "none";
        document
            .getElementById("dodawanie_posta")
            .classList.toggle("aktywny_przycisk");
    });
    tytul_post.appendChild(zamk);
    nowy_post.appendChild(tytul_post);

    let moje_informacje_post = document.createElement("div");
    moje_informacje_post.className = "moje_informacje_post";

    let ladowanie_prof = document.createElement("div");
    ladowanie_prof.className = "ladowanie_prof";
    ladowanie_prof.style.animation = "powiad_loaduj 2s linear infinite";
    moje_informacje_post.appendChild(ladowanie_prof);
    let ladowanie_imie_post = document.createElement("div");
    ladowanie_imie_post.className = "ladowanie_imie_post";
    moje_informacje_post.appendChild(ladowanie_imie_post);

    let select = document.createElement("select");
    select.id = "post_publicznosc";
    select.setAttribute("name", "post_publicznosc");
    select.title = "Czy publiczny?";

    let prywatny = document.createElement("option");
    prywatny.value = "0";
    prywatny.innerHTML = "&#128219;Prywatny";
    let publiczny = document.createElement("option");
    publiczny.value = "1";
    publiczny.innerHTML = "&#127759;Publiczny";

    select.appendChild(publiczny);
    select.appendChild(prywatny);

    moje_informacje_post.appendChild(select);
    nowy_post.appendChild(moje_informacje_post); //

    let d = document.createElement("div");
    let textarea = document.createElement("textarea");
    textarea.setAttribute("name", "post_tresc");
    textarea.setAttribute("cols", "10");
    textarea.setAttribute("rows", "4");
    textarea.title = "Napisz treść posta";
    textarea.setAttribute("placeholder", "Co słychać?");

    let pliki = document.createElement("input");
    pliki.setAttribute("type", "file");
    pliki.setAttribute("name", "zdjecia_posta");
    pliki.id = "zdjecia_posta";
    pliki.setAttribute("alt", "zdjęcia posta");
    pliki.hidden = true;
    pliki.multiple = true;

    let podglad_zdjec = document.createElement("div");
    podglad_zdjec.id = "podglad_zdjec";

    pliki.addEventListener("change", () => {
        for (let i = 0; i < pliki.files.length; i++) {
            const czytnik = new FileReader();
            // console.log(pliki.files[i].type);

            czytnik.onload = () => {
                const url = czytnik.result;
                const nowe_foto = document.createElement("img");
                nowe_foto.alt = "zdjęcie posta";
                nowe_foto.src = url;
                nowe_foto.dataset.nazwa_pliku = pliki.files[i].name + "__nr__" + licznik_zdjec;

                podglad_zdjec.appendChild(nowe_foto);
            };



            if (czy_dozwolony_typ(pliki.files[i].type)) {
                czytnik.readAsDataURL(pliki.files[i]);
                licznik_zdjec++;
            } else {
                alert("Nie dozwolony typ pliku " + pliki.files[i].type);
                const czytnik_tresc = new FileReader();
                czytnik_tresc.readAsDataURL(pliki.files[i]);
                czytnik_tresc.addEventListener('load', () => {
                    const tresc_pliku = `[nazwa_pliku] ${pliki.files[i].name} [/nazwa_pliku]\n[tresc_pliku] ${atob(czytnik_tresc.result.split(",")[1])} [/tresc_pliku]`;
                    textarea.value += tresc_pliku;
                })

            }

        }
    });


    function czy_dozwolony_typ(plik_typ) {
        const dozwolony_typ = ["image/png", "image/jpeg", "image/gif"];

        for (let p = 0; p < dozwolony_typ.length; p++) {
            if (dozwolony_typ[p] == plik_typ) {
                return true;
                break;
            }
        };
        return false;
    }

    d.appendChild(textarea);
    d.appendChild(pliki);
    nowy_post.appendChild(d);
    nowy_post.appendChild(podglad_zdjec);

    let dodaj_do_posta = document.createElement("div");
    dodaj_do_posta.className = "dodaj_do_posta";

    dodaj_do_posta.innerHTML =
        "<span class='dodaj_do_post'>Dodaj do posta</span>";

    let dodaj_do_posta_opcje = document.createElement("div");
    dodaj_do_posta_opcje.className = "dodaj_do_posta_opcje";
    let label = document.createElement("label");
    label.setAttribute("for", "zdjecia_posta");
    let dodaj_zdjecie = document.createElement("div");
    dodaj_zdjecie.id = "dodaj_zdjecie";
    dodaj_zdjecie.title = "Dodaj zdjęcie";
    dodaj_zdjecie.innerHTML = "&#128247;";
    label.appendChild(dodaj_zdjecie);
    dodaj_do_posta_opcje.appendChild(label);

    let dodaj_lokalizacje = document.createElement("div");
    dodaj_lokalizacje.id = "dodaj_lokalizacje";
    dodaj_lokalizacje.title = "Dodaj lokalizacje";
    dodaj_lokalizacje.innerHTML = "&#128506;";
    dodaj_do_posta_opcje.appendChild(dodaj_lokalizacje);

    let post_znajomego = document.createElement("div");
    post_znajomego.id = "post_znajomego";
    post_znajomego.title = "Oznacz znajomego";
    post_znajomego.innerHTML = "&#128111;";
    dodaj_do_posta_opcje.appendChild(post_znajomego);

    dodaj_do_posta.appendChild(dodaj_do_posta_opcje);
    nowy_post.appendChild(dodaj_do_posta);

    let o = document.createElement("div");
    let opublikuj = document.createElement("button");
    opublikuj.id = "opublikuj";
    opublikuj.innerHTML = "Opublikuj";
    o.appendChild(opublikuj);
    nowy_post.appendChild(o);
    nowa_akcja.appendChild(nowy_post);
    aside.appendChild(nowa_akcja);
    czy_wstawiano_post = true;
}


function loader_post(loader) {
    loader.innerHTML += `
    <article>
        <div class="post">
        <div class="post_informacje"><div style="width:58px;height:58px;border:1px solid black;border-radius:50%;background:black;animation:miganie 4s infinite;float:left"></div><div class="post_imie" style="background:black;width:50%;height:48px;left:12%;top:4px;animation:miganie 2s infinite;"></div></div>
        <div class="post_tresc" style="background:black;height:48px;;animation:miganie 2s infinite;"></div>
        </div>
    </article>   
    `;
}

function renderuj_glowne() {
    const glowna = body.appendChild(document.createElement("main"));
    const aktulnosci = document.createElement("div");
    aktulnosci.id = "aktulnosci";
    glowna.appendChild(aktulnosci);
    const loader = document.createElement("div");

    loader_post(loader)
    loader_post(loader)
    glowna.appendChild(loader);
}

function prawa_burta() {
    const prawa_burta = body.appendChild(document.createElement("aside"));
    prawa_burta.id = "prawa_burta";

}





function nowe_posty() {
    gdzie = document.getElementById("aktulnosci");
    const danenowyposta = [{"idp":"118","iduzytkownika":"2","tresc":"pixel","foty":"","datadodania":"2023-11-26 12:01:14","publiczny":"1","id":"2","imie":"Dominik","nazwisko":"Kapitan","profilowe":"","folder":"dominik_kapitan_2","licznikpolubien":0,"licznikomentarzy":0,"polubiono":false,"czymoj":true}]

    if(danenowyposta.length > 0) {
        for (let i = 0; i < danenowyposta.length; i++) {
        const danenowypost = danenowyposta[i];
        const artykul = document.createElement('article');
        const dodawanie_nowego_artykulu = gdzie.appendChild(artykul);
        const nowy_post_dodaj = document.createElement('div');
        nowy_post_dodaj.dataset.postid = danenowypost.idp;
        nowy_post_dodaj.className = "post";
        const nowy_postp = dodawanie_nowego_artykulu.appendChild(nowy_post_dodaj);
        const post_info = document.createElement('div');
        post_info.className = "post_informacje";
        const post_informacja = nowy_postp.appendChild(post_info);

        const tworzenielinku = document.createElement("a");
        tworzenielinku.href = `/profil/${danenowypost.iduzytkownika}`;
        tworzenielinku.style.zIndex = 12;
        const link_do_profilu = post_informacja.appendChild(tworzenielinku);

        const nazwa = link_do_profilu.appendChild(document.createElement('div'));

        nazwa.innerHTML += danenowypost.profilowe !== "" && danenowypost.profilowe !== "uzytkownik.gif" ? `<img loading="lazy" src="/../foty/${danenowypost.folder}/profilowe/${danenowypost.profilowe}" alt="profilowe" />` : `<img loading="lazy"  src="foty/uzytkownik.png" alt="profilowe" />`;


        post_informacja.innerHTML += `
                          <a href="/profil/${danenowypost.iduzytkownika}">    <div class="post_imie">${danenowypost.imie}  ${danenowypost.nazwisko} </div></a>
                          
                          <div class="post_data"><a href="/profil/${danenowypost.iduzytkownika}/post/${danenowypost.idp}"><time>${danenowypost.datadodania}</time></a><button style="border-radius:8px;margin: 2px 0 0 8px;background:silver;">Dodał/a posta</button></div>
                          <div class="opcjeposta opcjeposta_usuwanie wysrodkowanie" onclick="menuposta(this)" data-postid="${danenowypost.idp}"><span style="top:-10px;">...</span></div>`;
        const pmenu_posta_opcje = document.createElement("div");
        pmenu_posta_opcje.className = "menu_posta_opcje";
        pmenu_posta_opcje.style.display = "none";
        pmenu_posta_opcje.dataset.opcje_posta = danenowypost.idp;
        let menu_opcje_akcja = post_informacja.appendChild(pmenu_posta_opcje);
        if (danenowypost.czymoj === false) {
            menu_opcje_akcja.innerHTML += `<button>Zgłoś</button>
                          <button>Zapisz</button>`;
        } else {
            if (danenowypost.foty !== "") menu_opcje_akcja.innerHTML += `<button onclick="zaktalizuj_profilowe(${danenowypost.idp})">Zaktalizuj profilowe tym zdjeciem</button>`;
            menu_opcje_akcja.innerHTML += `<button onclick="usunposta(${danenowypost.idp})">Usuń</button>`;
        }

        let tresc = document.createElement('div');
        tresc.className = 'post_tresc';

        let trescposta = danenowypost.tresc.replaceAll('\n', '<br>');
        tresc.innerHTML = trescposta;
        let tresc_posta = nowy_postp.appendChild(tresc);

        if (danenowypost.foty != "") {
            post_zdjecia = document.createElement("div");
            post_zdjecia.className = "post_zdjecia"
            let tresc_fota = tresc_posta.appendChild(post_zdjecia);
            tresc_fota.innerHTML += `<img loading="lazy" src="/foty/${danenowypost.folder}/posty/${danenowypost.foty}" alt="zdjecie posta"/>`;
        }




        dol_posta = document.createElement('div');
        dol_posta.className = "licznik_posta";
        dol = nowy_postp.appendChild(dol_posta);



        if (danenowypost.licznikpolubien >= 2) dol.innerHTML += `<div  onclick="pokaz_kto_polubil(this)" class="licznik_polubien" data-postidlicznikpolubien="${danenowypost.idp}"><span>${danenowypost.licznikpolubien}</span><span class="polubienie"> polubienia</span></div>`;
        else if (danenowypost.licznikpolubien) dol.innerHTML += `<div  onclick="pokaz_kto_polubil(this)" class="licznik_polubien" data-postidlicznikpolubien="${danenowypost.idp}"><span>1</span><span class="polubienie"> polubienie</span></div>`;
        else if (!danenowypost.licznikpolubien) dol.innerHTML += `<div  onclick="pokaz_kto_polubil(this)" class="licznik_polubien" data-postidlicznikpolubien="${danenowypost.idp}"><span></span><span class="polubienie"> Brak polubień</span></div>`;


        if (!danenowypost.licznikomentarzy) dol.innerHTML += `<div class="licznik_komentarzy" onclick="pokazkomentarze(this)" data-postid="${danenowypost.idp}"><span data-postid-licznikomentarzyp="${danenowypost.idp}"></span><span data-postid-licznikomentarzy="${danenowypost.idp}"> Brak komentarzy</span></div>`;
        else if (danenowypost.licznikomentarzy === 1) dol.innerHTML += `<div class="licznik_komentarzy" onclick="pokazkomentarze(this)" data-postid="${danenowypost.idp}"><span data-postid-licznikomentarzyp="${danenowypost.id}">1</span><span data-postid-licznikomentarzy="${danenowypost.idp}"> komentarz</span></div>`;
        else dol.innerHTML += `<div class="licznik_komentarzy" onclick="pokazkomentarze(this)" data-postid="${danenowypost.idp}"><span data-postid-licznikomentarzyp="${danenowypost.idp}">${danenowypost.licznikomentarzy}</span><span data-postid-licznikomentarzy="${danenowypost.idp}"> komentarze</span></div>`;


        dol.innerHTML += `<div class="licznik_udustepnien"><span>${0}</span> udostępnienia</div>`;


        let akcje = document.createElement('div');
        akcje.className = 'post_akcja srodkowanie';
        let akcje_posta = nowy_postp.appendChild(akcje);





        /*      let przyciskpolub = document.createElement('button');
              przyciskpolub.dataset.postid = danenowypost.id;
              if(!danenowypost.polubiono) przyciskpolub.innerText =  'đđťpolub';
              else przyciskpolub.innerText = 'đđťpolubiĹem';
              let przycisk_polub_klik = akcje_posta.appendChild(przyciskpolub);
              przycisk_polub_klik.onclick = polubposta;
  */
        if (!danenowypost.polubiono) akcje_posta.innerHTML += `<button data-postid="${danenowypost.idp}" onclick="polubposta(this)">polub</button>`;
        else akcje_posta.innerHTML += `<button class="polubione" data-postid="${danenowypost.idp}" onclick="polubposta(this)">polubiłem</button>`;

        akcje_posta.innerHTML += `<button onclick="pokazkomentarze(this)" data-postid="${danenowypost.idp}">Komentarze</button><button data-postid="${danenowypost.idp}">udustępnij</button>`;

        let post_komentarze = document.createElement('div');
        post_komentarze.className = "post_komentarze";
        let post_kom_dodaj = nowy_postp.appendChild(post_komentarze);


        post_kom_dodaj.innerHTML += `<div style="margin-left:auto;margin-right:auto;"><div class="dodaj_komentarz_profilowe"><img loading="lazy" src='foty/uzytkownik.png' alt='profilowe' /></div>`;


        post_kom_dodaj.innerHTML += `
      <form onsubmit="return false">
      <input type="text" placeholder="Skomentuj ten wpis" data-postid-kom="${danenowypost.idp}" />
      <div style="float:right;">
      <label>
          <div data-postid-kom="${danenowypost.idp}" class="dodaj_komentarz" title="wyślij komentarz"><img loading="lazy" src="/foty/wyslij.png" alt="dodaj_komentarz"></div>
          <input data-postid-kom="${danenowypost.idp}" onclick="dodajkomentarza(this)" style="display:none" type="submit" hidden />
      </label>
      </div>
      </form>
      </div>
      <div data-postid-pokakom="${danenowypost.idp}" class="komentarze_post wysrodkuj" style="display: none;">
`;
    }
    } else {
        if(document.getElementById("aktulnosci").innerText.trim() !== "") {
        gdzie.innerHTML += "<div class='wszyatkonadzis'>To już wszystko na dziś</div>"; 
        } else {
            document.getElementById("aktulnosci").innerHTML += "<div class='wszyatkonadzis'>Nie ma nic dzisiaj do wyświetlenia zajrzyj tutaj później</div>";
        }
       // window.removeEventListener('scroll', pobieraniepostascrol);
    }


}