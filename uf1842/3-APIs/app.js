const button = document.querySelector("#btn");
button.addEventListener("click", getCharacter);

async function getCharacter() {
    const randomId = Math.floor(Math.random() * 826) + 1;
    const result = await fetch(`https://rickandmortyapi.com/api/character/${randomId}`);
    const data = await result.json();

    console.log("Mira la consola del navegador para ver los datos", data);

    document.querySelector("#first").textContent = data.name.toUpperCase();
    document.querySelector("#last").textContent = data.status.toUpperCase();
    document.querySelector("#country").textContent = data.species.toUpperCase();
    document.querySelector("#phone").textContent = data.gender.toUpperCase();
    document.querySelector("#photo").src = data.image;
    document.querySelector("#email").textContent = data.origin.name.toUpperCase();
}