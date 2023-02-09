// Permite hacer cuestionarios en consola
const inquirer = require("inquirer");
// Permite tener colores en la consola
require("colors");

//Se muestran las primeras opciones del menú. 
//la variable ( opt ) de app.js se define con el valor de la key ( value ) del array de objetos ( choices )
const preguntas = [
  {
    type: "list",
    name: "opcion",
    message: "¿Qué desea hacer?",
    choices: [
      {
        value: 1,
        name: `${"1.".green} Buscar pokemon en la Pokedex`,
      },
      {
        value: 2,
        name: `${"2.".blue} Historial de Pokemons`,
      },
      {
        value: 0,
        name: `${"0.".red} Salir`,
      },
    ],
  },
];

// Variable que carga la interfaz inicial en consola y guarda la respuesta elegida.
const inquirerMenu = async () => {
  console.log("==========================".red);
  console.log("  Seleccione una opción".white);
  console.log("==========================\n".red);

  //La opción elegida se va a almacenar con un valor (1,2,3)
  const { opcion } = await inquirer.prompt(preguntas);

  // ( inquirerMenu ) va a devolver la opción elegida, que será el valor de la variable ( opt ) en app.js
  return opcion;
};

// Cada vez que en app.js se pausa, esta variable muestra en interfaz el mensaje `Presione "enter" para continuar`
const pausa = async () => {
  const question = [
    {
      type: "input",
      name: "enter",
      message: `Presione ${"enter".green} para continuar\n`,
    },
  ];

  await inquirer.prompt(question);
};

// Este inquirer pide señalar el pokemon
const leerInput = async (message) => {
  const pregunta_nombre_pokemon = [
    {
      type: "input",
      name: "pokemon",
      message, // 'Pokemon: '
      validate(value) {
        if (value.length === 0) {
          return "Por favor ingrese un valor";
        }
        return true;
      },
    },
  ];

  // Este inquirer extrae el input que se escribe.
  // La variable { pokemon } espera a la respuesta del usuario (pregunta_nombre_pokemon)
  const { pokemon } = await inquirer.prompt(pregunta_nombre_pokemon);
  return pokemon;
};

module.exports = {
  inquirerMenu,
  pausa,
  leerInput
};
