"use strict";

/*
  Archivo: ejercicios.js
  Descripción: Soluciones a los ejercicios solicitados con un array base.
*/

// Array de base
let array = [
  95, 95, 14, 83, 58, 33, 65, 52, 7, 72, 13, 46, 19, 31, 27, 36, 30, 86, 88, 88,
  68, 16, 5, 14, 41, 56, 89, 11, 6, 29, 72, 11, 69, 36, 16, 11, 82, 84, 32, 84,
  95, 98, 76, 99, 100, 12, 89, 1, 92, 27, 66, 48, 38, 49, 30, 40, 87, 19, 31,
  37, 5, 32, 9, 33, 98, 94, 5, 15, 4, 88, 47, 34, 83, 8, 31, 4, 2, 72, 31, 39,
  15, 10, 46, 78, 11, 21, 92, 22, 83, 3, 6, 71, 39, 54, 50, 77, 13, 85, 7, 36,
];

/* ============================================================================
   1) Función que retorne el array ordenado sin modificar el array original
   ============================================================================
*/
function getSortedArray(arr) {
  // Usamos el operador spread para clonar el array y evitar modificarlo
  return [...arr].sort((a, b) => a - b);
}

/* ============================================================================
   2) Función que retorne los números impares y ordenados
   ============================================================================
*/
function getSortedImpares(arr) {
  return arr.filter((num) => num % 2 !== 0).sort((a, b) => a - b);
}

/* ============================================================================
   3) Función que retorne los números impares de dos cifras
      (entre 10 y 99, y que sean impares)
   ============================================================================
*/
function getImpares2Cifras(arr) {
  return arr.filter((num) => num % 2 !== 0 && num >= 10 && num <= 99);
}

/* ============================================================================
   4) Función que retorne un array de 0 a 100 con la frecuencia
      de cada número en el array original
   ============================================================================
*/
function getFrequencyArray(arr) {
  // Creamos un array de 101 posiciones (0..100) inicializado a 0
  let freq = new Array(101).fill(0);
  arr.forEach((num) => {
    freq[num]++;
  });
  return freq;
}

/* ============================================================================
   5) Función que indique si un número es mayor que otro
      según la longitud de su nombre en castellano (o valenciano)
   ============================================================================
*/

// (A) Función auxiliar para obtener el nombre en español de un número
function getSpanishName(n) {
  // Diccionario básico para 0..31, 40, 50, etc. (ejemplo)
  // Se puede expandir para cubrir más rangos
  const dictionary = {
    0: "cero",
    1: "uno",
    2: "dos",
    3: "tres",
    4: "cuatro",
    5: "cinco",
    6: "seis",
    7: "siete",
    8: "ocho",
    9: "nueve",
    10: "diez",
    11: "once",
    12: "doce",
    13: "trece",
    14: "catorce",
    15: "quince",
    16: "dieciséis",
    17: "diecisiete",
    18: "dieciocho",
    19: "diecinueve",
    20: "veinte",
    21: "veintiuno",
    22: "veintidós",
    23: "veintitrés",
    24: "veinticuatro",
    25: "veinticinco",
    26: "veintiséis",
    27: "veintisiete",
    28: "veintiocho",
    29: "veintinueve",
    30: "treinta",
    31: "treinta y uno",
    40: "cuarenta",
    50: "cincuenta",
    60: "sesenta",
    70: "setenta",
    80: "ochenta",
    90: "noventa",
    100: "cien",
  };

  if (dictionary.hasOwnProperty(n)) {
    return dictionary[n];
  }
  // Si no está en el diccionario, lo convertimos a string genérico
  return String(n);
}

// (B) Función para comparar según la longitud de su nombre
function compareBySpanishNameLength(num1, num2) {
  let name1 = getSpanishName(num1);
  let name2 = getSpanishName(num2);

  if (name1.length > name2.length) {
    return `${num1} es mayor que ${num2} según la longitud de su nombre.`;
  } else if (name1.length < name2.length) {
    return `${num1} es menor que ${num2} según la longitud de su nombre.`;
  } else {
    return `${num1} y ${num2} tienen la misma longitud de nombre.`;
  }
}

/* ============================================================================
   6) Función para ordenar el array según el criterio anterior
      (longitud del nombre en castellano)
   ============================================================================
*/
function sortArrayByNameLength(arr) {
  let newArr = [...arr]; // clonamos el array
  newArr.sort((a, b) => {
    let nameA = getSpanishName(a);
    let nameB = getSpanishName(b);
    return nameA.length - nameB.length;
  });
  return newArr;
}

/* ============================================================================
   7) Función que acepte un número y retorne otra función que acepte un array
      y retorne si el número está en el array.
   ============================================================================
*/
function findNumber(num) {
  return function (arr) {
    return arr.includes(num);
  };
}

// ================== EJEMPLOS DE USO ==================

// 1) Array ordenado sin modificar original
console.log("1) Array ordenado:", getSortedArray(array));

// 2) Números impares ordenados
console.log("2) Impares ordenados:", getSortedOddNumbers(array));

// 3) Impares de dos cifras
console.log("3) Impares de dos cifras:", getTwoDigitOddNumbers(array));

// 4) Frecuencia de cada número (0..100)
let frequencyArray = getFrequencyArray(array);
console.log("4) Frecuencia de cada número en 0..100:", frequencyArray);

// 5) Comparar dos números por la longitud de su nombre (castellano)
console.log("5) Comparación de 3 y 10:", compareBySpanishNameLength(3, 10));
console.log("5) Comparación de 21 y 100:", compareBySpanishNameLength(21, 100));
console.log("5) Comparación de 13 y 31:", compareBySpanishNameLength(13, 31));

// 6) Ordenar el array según la longitud de su nombre
console.log(
  "6) Array ordenado por longitud de nombre:",
  sortArrayByNameLength(array)
);

// 7) Función que genera otra función para comprobar si un número está en el array
let buscaEl11 = findNumber(11);
let buscaEl99 = findNumber(99);
console.log("7) ¿Existe el 11 en el array?", buscaEl11(array));
console.log("7) ¿Existe el 99 en el array?", buscaEl99(array));
