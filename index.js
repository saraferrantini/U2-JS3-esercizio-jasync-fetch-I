//☑️ FETCH - PER PRENDERE IL CONTENUTO DELL'URL

fetch("https://striveschool-api.herokuapp.com/books")
  // utilizza un metodo .then sulla promise del fetch per gestire la risposta
  .then((response) => {
    if (response.ok) {
      // se abbiamo una risposta positiva e lo status è da 100 ~ 399
      // mi devi trasformare il flusso dati in un jason, altrimenti mi lanci errore

      return response.json();
    } else {
      throw new Error("ERRORE NEL REPERIMENTO DATI");
    }
  })

  //   se la risposta al then precedente è ok mi restituisce un jason che chiamo(jasonData)
  .then((jsonData) => {
    // ☑️FUNZIONE CALLBACK vado a riempire il div che deve contenere le card
    let raccoglitore = document.getElementById("raccoglitore");
    let htmlInniettato = "";
    for (let i = 0; i <= jsonData.length - 1; i++) {
      let html = `
      <div class="col-lg-3 col-md-4 col-sm-6 d-flex" id=${jsonData[i].asin}>
        <div class="card border-info border-3" style="width: 18rem">
        <img src=${jsonData[i].img} />
        <div class="card-body">
        <h5 class="card-title">${jsonData[i].title}</h5>
        <p class="card-text">
            price: ${jsonData[i].price}
        </p>
        <a href="#" class="btn btn-primary" id=scarta_${jsonData[i].asin}>Scarta</a>
        </div>
        </div>
        </div>`;
      // per fare in modo che venga fatto anche per le altre card
      htmlInniettato = htmlInniettato + html;
    }

    // l'html Inniettato lo assegniamo a innerHTML di raccoglitore
    raccoglitore.innerHTML = htmlInniettato;

    // ☑️CICLO FOR PER FAR SPARIRE LA CARD
    for (let i = 0; i <= jsonData.length - 1; i++) {
      let bottoneScarta = document.getElementById("scarta_" + jsonData[i].asin);
      bottoneScarta.addEventListener("click", function () {
        let elementoDaScartare = document.getElementById(jsonData[i].asin);
        elementoDaScartare.innerHTML = "";
      });
    }
  })
  .catch((error) => {
    console.error("Si è verificato un errore:", error);
  });
