function sortuj(kolumna, asc = true) {
    const tablica = document.getElementById("tablicaPojazdow");
    const kierunek = asc ? 1 : -1;
    const cialoTablicy = tablica.tBodies[0];
    const wiersze = Array.from(cialoTablicy.querySelectorAll("tr"));

    const posortowane = wiersze.sort((a, b) => {
        const aText = a.querySelector(`td:nth-child(${ kolumna + 1 })`).textContent.trim();
        const bText = b.querySelector(`td:nth-child(${ kolumna + 1 })`).textContent.trim();

        return aText > bText ? (1 * kierunek) : (-1 * kierunek);
    });

    while (cialoTablicy.firstChild) {
        cialoTablicy.removeChild(cialoTablicy.firstChild);
    }

    cialoTablicy.append(...posortowane);

    tablica.querySelectorAll("th").forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));
    tablica.querySelector(`th:nth-child(${ kolumna + 1})`).classList.toggle("th-sort-asc", asc);
    tablica.querySelector(`th:nth-child(${ kolumna + 1})`).classList.toggle("th-sort-desc", !asc);
}

