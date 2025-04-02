const WIDTH = 400;
const HEIGHT = 400;
const NUM_TREASURES = 6;

let treasures = [
  { x: 50, y: 80 },
  { x: 150, y: 160 },
  { x: 240, y: 135 },
  { x: 300, y: 280 },
  { x: 350, y: 80 },
  { x: 100, y: 290 }
];

let currentTreasureIndex = 0;
let clicks = 0;

console.log("Coordenadas de los tesoros:", treasures);

let $map = document.querySelector('#map');
let $distance = document.querySelector('#distance');

let questions = [
  { question: "En un refugio de animales hay 20 animales entre pájaros y perros. Si se cuentan todas las patas, hay 50 patas en total. ¿Cuántos pájaros y cuántos perros hay en el refugio?", answer: "d=5,p=15", hint: "Alta y firme como un guardián, desde lo alto todo puede mirar. Si subes con cuidado, el tesoro hallarás." },

  { question: "En un estacionamiento hay 50 vehículos entre coches y motos. Si se cuentan todas las ruedas, hay 140 ruedas en total. ¿Cuántos coches y cuántas motos hay?", answer: "c=20,m=30", hint: "Alta y firme como un guardián, desde lo alto todo puede mirar. Si subes con cuidado, el tesoro hallarás." },

  { question: "Una tienda vende camisetas y gorras. Un cliente compró 6 camisetas y 4 gorras por $120. Otro cliente compró 8 camisetas y 5 gorras por $155. ¿Cuál es el precio de una camiseta y de una gorra?", answer: "c=10,g=15", hint: "Si miras arriba y no hacia el suelo, en el techo hallarás un gran tesoro." },
  { 
    question: "Responde lo siguiente", 
    answer: "89690", 
    hint: "Altas y verdes, al viento se mecen, busca en su tronco, donde los secretos crecen.",
    image: "img/claveSecreta.png" 
  },
  { question: "¿Cuánto es 100 - 37?", answer: "63", hint: "Payasos y magia, risas sin fin, donde hay carpas de colores, tu tesoro está allí." },
  { question: "¿Cuánto es 9 × 9?", answer: "81", hint: "Refleja el cielo y nunca descansa, su tesoro se esconde donde el agua danza." }
];

alert(`¡Bienvenido! Tu primer tesoro está escondido en algún lugar del mapa. No es un árbol, pero es verde y bajito, busca entre sus hojas, ahí está escondidito.\nPista: Se encuentra cerca de (${treasures[0].x}, ${treasures[0].y})`);

$map.addEventListener('click', function (e) {
  clicks++;
  let target = treasures[currentTreasureIndex];
  let distance = getDistance(e, target);
  let distanceHint = getDistanceHint(distance);
  $distance.innerHTML = `<h1>${distanceHint}</h1>`;

  if (distance < 20) {
    askMathQuestion();
  }
});

function askMathQuestion() {
  let questionObj = questions[currentTreasureIndex];

  // Buscar o crear el contenedor de preguntas en la página
  let questionContainer = document.getElementById("question-container");
  if (!questionContainer) {
    questionContainer = document.createElement("div");
    questionContainer.id = "question-container";
    document.body.appendChild(questionContainer);
  }

  // Mostrar la pregunta
  questionContainer.innerHTML = `<p>${questionObj.question}</p>`;

  // Si la pregunta tiene imagen, agregarla
  if (questionObj.image) {
    questionContainer.innerHTML += `<img src="${questionObj.image}" alt="Imagen de la pregunta" style="max-width:300px; display:block; margin:10px auto;">`;
  }

  // Crear un campo de entrada para la respuesta
  let input = document.createElement("input");
  input.type = "text";
  input.id = "answer-input";
  input.placeholder = "Escribe tu respuesta aquí";
  questionContainer.appendChild(input);

  // Crear un botón para enviar la respuesta
  let button = document.createElement("button");
  button.innerText = "Responder";
  button.onclick = function () {
    let userAnswer = document.getElementById("answer-input").value;
    if (userAnswer === questionObj.answer) {
      currentTreasureIndex++;
      if (currentTreasureIndex === NUM_TREASURES) {
        alert(`¡Has encontrado todos los tesoros en ${clicks} clics!`);
        location.reload();
      } else {
        alert(`¡Correcto! Aquí tienes una pista para el siguiente tesoro: ${questions[currentTreasureIndex].hint}\nSe encuentra cerca de (${treasures[currentTreasureIndex].x}, ${treasures[currentTreasureIndex].y})`);
      }
    } else {
      alert("Incorrecto. Intenta de nuevo.");
    }
  };
  questionContainer.appendChild(button);
}
