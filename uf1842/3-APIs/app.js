const button = document.querySelector("#btn");
button.addEventListener("click", getCharacter);

async function getCharacter() {
    const randomId = Math.floor(Math.random() * 826) + 1;
    const result = await fetch(`https://rickandmortyapi.com/api/character/${randomId}`);
    const data = await result.json();

    console.log("Mira la consola del navegador para ver los datos", data);

    document.querySelector("#character-name").textContent = data.name.toUpperCase();
    document.querySelector("#character-status").textContent = data.status.toUpperCase();
    document.querySelector("#character-species").textContent = data.species.toUpperCase();
    document.querySelector("#character-gender").textContent = data.gender.toUpperCase();
    
}