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

    input.addEventListener("click", () => {
        if (window.innerWidth >= 943) !szukanie_live ? document.getElementById("lupka").click() : "";
    });

    form.appendChild(input);
    wyszuk.appendChild(form);
    menu.appendChild(wyszuk);
    let lup = document.createElement("button");
    lup.id = "lupka";
    lup.innerHTML = "&#128270;";
    lup.addEventListener("click", zmienlupe); //
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
    but2.style.left = "40%";
    but2.className = "wiadomosci_ikonka";
    but2.innerHTML = "&#128240;";

    let licznik_wiad = document.createElement("div");
    licznik_wiad.className = "licznik_menu";
    licznik_wiad.innerText = "488"; //
    but2.appendChild(licznik_wiad);

    tel.appendChild(but2);
    menu.appendChild(tel);

    let div_komp = document.createElement("div");
    div_komp.className = "komputer";

    let men_opcje = document.createElement("div");
    men_opcje.className = "menu_opcje";

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
        ["dodawanie_posta", "Dodaj posta"],
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
        h2.innerText = oknienko_id[2] + " :";
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
        if (typeof (document.getElementById("lupka")) !== 'undefined') {
            okno.addEventListener("click", () => (!szukanie.live ? document.getElementById("lupka") : "")); //
        }
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
    document.getElementById("wyszukiwarka").classList.toggle("widocznosc");
    document.getElementById("lupka").classList.toggle("aktywnalupa");
    zmienikony();
    // szukanie_live ? (szukanie_live = false) : (szukanie_live = true);
}

/****/

function zmienikony() {
    document.getElementById("wiadomosci_tel").classList.toggle("wid");
    document.getElementById("pow_tel").classList.toggle("wid");
}
/*******/

function aktywnedymki() {
    aktywnyprzycik.classList.toggle("aktywny_przycisk");
    aktywny_dymek.classList.toggle("widocznosc");
}

function zmieniajdymki(przycisk, dymek, zamknij) {
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
    });
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
    tytul_post.innerHTML = " &#128196; Utwórz post";
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

(function renderowanie_strony_glownej() {
    window.onload = () => {
        renderuj_nawigacje();
        renderuj_glowne();
        prawa_burta();
        body.removeChild(ladowanie);
    }
})();


function renderuj_glowne() {
    const glowna = body.appendChild(document.createElement("main"));
    let aktulnosci = document.createElement("div");
    aktulnosci.className = "aktulnosci";
    glowna.appendChild(aktulnosci);
}

function prawa_burta() {
    const prawa_burta = body.appendChild(document.createElement("aside"));
}