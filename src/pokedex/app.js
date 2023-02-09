const {
  leerInput,
  inquirerMenu,
  pausa
} = require("./helpers/inquirer");

// Librería que convierte imagenes a formato ascii
const asciify = require('asciify-image');

// La resolución en píxeles de la imagen a mostrar
const resolution = 
{
  fit: 'box',
  width: 60,
  height: 60
}

const Busquedas = require("./models/busquedas");

const main = async () => {
  // Se llama a una nueva búsqueda de la clase ( Busquedas )
  const busquedas = new Busquedas();
  //let opt;

  do {
    // Se muestra el mensaje inicial, con sus 3 opciones ( buscar pokemon, historial y salir )
    opt = await inquirerMenu();
    
    switch (opt) {
      
      //Buscar ciudad
      case 1:
        // Mostrar mensaje que te pide el pokemon y escribir el pokemon
        const pokemon_nombre = await leerInput("Pokemon: ");

        // Hacer la petición API y obtener los datos del pokemon
        const selected_pokemon = await busquedas.pokemon_specs(pokemon_nombre);

        // Guardar el pokemon en DB
        busquedas.agregarHistorial(pokemon_nombre);

        if (selected_pokemon.length === 0)  {
          
          console.log ( 'x--'.repeat(16).red);
          console.log('El Pokemon que se ha buscado no se ha encontrado\n');
          console.log ( 'x--'.repeat(16).red);
          continue;
        }

        // Mostrar resultados del pokemon
        console.log("\nInformación del Pokemon\n".green);
        console.log("*-".repeat(15).green);
        console.log("Nombre:", selected_pokemon.nombre);
        console.log("Numero de la Pokedex:", selected_pokemon.numero_pokedex);
        console.log("Tipo:", selected_pokemon.tipo);
        console.log("HP:", selected_pokemon.hp);
        console.log("Ataque:", selected_pokemon.ataque);
        console.log("Ataque especial:", selected_pokemon.ataque_especial);
        console.log("Defensa:", selected_pokemon.defensa);
        console.log("Defensa especial:", selected_pokemon.defensa_especial);
        console.log("Velocidad:", selected_pokemon.velocidad);
        console.log("Peso:", ( selected_pokemon.peso/10 ), " Kilos");
        console.log("Altura:", (selected_pokemon.altura/10), " Metros" );

        // Mostrar imagen del pokemon en ascii
        console.log("\n");
        console.log("Foto del Pokemon:");

        await asciify(`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${selected_pokemon.numero_pokedex}.png`, resolution)
        .then(function (asciified) {
          // Imprime la imagen en formato ascii a la consola
          console.log(asciified);
        })
        // catch para poder reportar posibles errores en consola
        .catch(function (err) {
          console.error(err);
        });


        console.log(``)
        console.log("\n");
      
        break;

        //Mostrar historial
        case 2:
        busquedas.historialCapitalizado.forEach((pokemon, i) => {
          const idx = `${i + 1}.`.red;
          console.log(`${idx} ${pokemon} `);
        });

        break;
    }

    //salir del programa
    if (opt !== 0) await pausa();
  } while (opt !== 0);
};

main();
