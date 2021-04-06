let katalog = [];
let modalNowyPojazd = new bootstrap.Modal(document.getElementById("exampleModal"));
let karuzela = document.querySelector("#karuzela");
let karuzelaBootstrap = new bootstrap.Carousel(karuzela, { pause: true, interval: false });

let pola = ["Marka", "Model", "Rocznik", "Pojemnosc", "Przebieg", "Skrzynia", "Opcje"];

function wyczyscNowyPojazd() {
  modalNowyPojazd.toggle();
  document.forms["dodajPojazd"].reset();
}

$("#Skrzynia").click(function () {
  if ($(this).is(":checked")) {
    $(this).siblings("label").html("Automatyczna");
  } else {
    $(this).siblings("label").html("Manualna");
  }
});

function zapisz() {
  localStorage.setItem("katalog", JSON.stringify(katalog));
}
function wczytaj() {
  if (!(localStorage.getItem("katalog") === null))
  katalog = JSON.parse(localStorage.getItem("katalog"));
  przeladuj();
}
function dodajPojazd() {
  let formularz = document.forms["dodajPojazd"].elements;
  let Element = new Pojazd(
    formularz[0].value,
    formularz[1].value,
    formularz[2].value,
    formularz[3].value,
    formularz[4].value,
    formularz[5].checked ? "Automatyczna" : "Manualna"
  );
  katalog.push(Element);
  wyczyscNowyPojazd();
  przeladuj();
}

function ustawWartosc() {
  let element = document.getElementById("wartosc");
  let wartosc = katalog.length;
  let co = " pojazdów";
  if (wartosc == 1) co = " pojazd";
  else if (wartosc > 1 && wartosc < 5) co = " pojazdy";
  element.innerHTML = wartosc + co;
}

function usunElement(id){
  katalog.splice(id,1);
  przeladuj();
}

function tworzTablica() {
  let gdzie = document.getElementById("tablica");
  let tablica = document.createElement("table");

  tablica.id = "tablicaPojazdow";
  tablica.classList.add("table");
  tablica.classList.add("table-striped");
  tablica.classList.add("table-sort");

  let naglowek = document.createElement("thead");
  let cialo = document.createElement("tbody");
  let wierszNaglowek = document.createElement("tr");

  pola.forEach((naglowekText) => {
    let nagl = document.createElement("th");
    let text = document.createTextNode(naglowekText);
    nagl.appendChild(text);
    wierszNaglowek.appendChild(nagl);
  });
  naglowek.appendChild(wierszNaglowek);
  tablica.appendChild(naglowek);

  katalog.forEach((samochod, i) =>{
    let wiersz = document.createElement("tr");
    Object.values(samochod).forEach(wartosc =>{
      let komorka = document.createElement("td");
      let text = document.createTextNode(wartosc);
      komorka.appendChild(text);
      wiersz.appendChild(komorka);
    })
    {
      let komorka = document.createElement("td");
      let przycisk = document.createElement("button")
      przycisk.classList.add("btn");
      przycisk.classList.add("btn-danger");
      przycisk.value = i;
      przycisk.onclick = function() {usunElement(this.value)};
      przycisk.innerText="Usuń";
      komorka.appendChild(przycisk);
      wiersz.appendChild(komorka);
    }
    cialo.appendChild(wiersz);
  })
  tablica.appendChild(cialo);
  gdzie.innerHTML = "";
  gdzie.appendChild(tablica);
}

function przeladuj() {
  ustawWartosc();
  tworzTablica();
  document.querySelectorAll(".table-sort th").forEach((naglowek, i) => {
    if(i != 6){

      naglowek.addEventListener("click", () => {
        const indeks = Array.prototype.indexOf.call(naglowek.parentElement.children, naglowek);
        const rosnaca = naglowek.classList.contains("th-sort-asc");
        
        sortuj(indeks, !rosnaca);
      });
    }
});
}

window.onload = function () {
  katalog = []
  wczytaj();
  if (window.location.toString().split("#")[1] == "katalog") karuzelaBootstrap.to(1);
};
