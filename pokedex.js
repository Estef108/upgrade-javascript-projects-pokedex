// Crear array de URLs
const arrUrl = [];
for (let i = 1; i <= 150; i++) {
  const baseUrl = `https://pokeapi.co/api/v2/pokemon/${i}`;
  arrUrl.push(baseUrl);
}
//Función obtener pokemons
function getPokemons() {
  try {
    //Mapear array de URLs y hacer fetch por cada una
    const llamadasApi = arrUrl.map((url) =>
      fetch(url).then((response) => response.json())
    );
    //Esperar todas las promesas y mapear para extraer info necesaria
    Promise.all(llamadasApi).then((results) => {
      const pokemonData = results.map((result) => ({
        name: result.name,
        image: result.sprites.other.dream_world["front_default"],
        type: result.types.map((type) => type.type.name).join(", "),
        id: result.id,
      }));
      //Llamada a función externa para pintar tarjetas en el HTML
      pokemonData.forEach(mostrarHTML);
    });
  } catch (error) {
    console.error("Se ha producido un error..." + error);
  }
}

getPokemons();

//Función pintar pokemons en Html
function mostrarHTML(datos) {
  const lista = document.querySelector("#pokedex");
  let elementLi = document.createElement("li");
  let card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
              <h2 class="card-title">${datos.name}</h2>
              <img src=${datos.image} class="card-image"></img>
              <p class= "card-subtitle">Type: ${datos.type} </p>
              <p class= "card-subtitle">ID: ${datos.id}</p>
              `;
  elementLi.appendChild(card);
  lista.appendChild(elementLi);
}
