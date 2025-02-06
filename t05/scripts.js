/*********************************************
 * scripts.js
 * Validaciones para el formulario
 *********************************************/

// Esperamos a que el DOM esté cargado
document.addEventListener("DOMContentLoaded", function () {
  // 1) Capturamos el formulario
  const form = document.getElementById("registrarUsuario");
  const inputs = document.querySelectorAll(
    "#registrarUsuario input, #registrarUsuario select"
  ); // Selecciona todos los inputs y selects DENTRO del formulario
  //   form.setAttribute("action", "/registro"); // Ajusta la URL según tu backend

  // 2) Añadimos el listener al evento submit
  form.addEventListener("submit", function (event) {
    // Evitamos envío hasta verificar todo
    event.preventDefault();

    //limpiar errores previos
    const errores = document.querySelectorAll(".error-message");
    errores.forEach((error) => error.remove());

    let esValido = true; // asume que todo está bien

    // Validar cada campo al enviar el formulario. Se llama a la función de validación
    // de cada campo pasándole 'false' para que no se validen en tiempo real.
    if (!validarNombre()) {
      esValido = false;
    }
    if (!validarApellidos()) {
      esValido = false;
    }

    if (!validarfechanacimiento()) {
      esValido = false;
    }

    if (!validarTipoDocumento()) {
      esValido = false;
    }

    if (!validarDNI()) {
      esValido = false;
    }
    if (!validarIDESP()) {
      esValido = false;
    }

    if (!validarContrasena()) {
      esValido = false;
    }

    if (!validarEmail()) {
      esValido = false;
    }
    if (!validarRepEmail()) {
      esValido = false;
    }

    if (!validarTelefono()) {
      esValido = false;
    }
    if (!validarDeclaracion()) {
      esValido = false;
    }

    // Si todo es válido, enviamos el formulario
    //para visualizarlos en otra pagina web (success.html) los guardamos en el localStorage y redirigimos a la pagina

    if (esValido) {
      // 1) Obtener datos
      const datosFormulario = obtenerDatosFormulario(form);

      // 2) Guardar en localStorage
      localStorage.setItem("formData", JSON.stringify(datosFormulario));

      // 3) Redirigir a otra página
      window.location.href = "success.html";
    }
  });

  //  Añadimos listeners a los inputs para validar al perder el foco (evento blur)
  inputs.forEach((input) => {
    input.addEventListener("blur", function () {
      // Validar al perder el foco (blur)
      validarCampo(this);
    });
  });

  /**
   * Obtener datos del formulario en formato objeto.
   * Recorremos todos los inputs y selects dentro del form
   * y guardamos sus valores en un objeto.
   */
  function obtenerDatosFormulario(form) {
    const formData = new FormData(form);
    const datos = {};

    formData.forEach((valor, llave) => {
      datos[llave] = valor;
    });

    return datos;
  }

  //  Función para validar un campo específico
  function validarCampo(input) {
    // Limpiar error previo para este input
    const errorPrevio = input.parentNode.querySelector(".error-message");
    if (errorPrevio) {
      errorPrevio.remove();
    }

    let valido = true;
    switch (input.id) {
      case "nombre":
        valido = validarNombre();
        break;
      case "apellido1":
        valido = validarApellidos();
        break;
      case "fechanacimiento":
        valido = validarfechanacimiento();
        break;
      case "tipodocumento":
        valido = validarTipoDocumento();
        break;
      case "numdocumento":
        valido = validarDNI();
        break;
      case "idxesp":
        valido = validarIDESP();
        break;
      case "contrasena":
        valido = validarContrasena();
        break;
      case "repContrasena":
        valido = validarRepContrasena();
        break;
      case "email":
        valido = validarEmail();
        break;
      case "repEmail":
        valido = validarRepEmail();
        break;
      case "telefono":
        valido = validarTelefono();
        break;
      case "declaraVeracidad":
        valido = validarDeclaracion();
        break;
    }
    if (!valido) {
      mostrarError(input, obtenerMensajeError(input.id));
    }
    return valido;
  }

  //  Función para obtener el mensaje de error según el campo
  function obtenerMensajeError(inputId) {
    switch (inputId) {
      case "nombre":
        return "El campo 'Nombre' es obligatorio.";
      case "apellido1":
        return "El campo 'Primer apellido' es obligatorio.";
      case "apellido2":
        return "El campo 'Segundo apellido' no puede contener números ni símbolos.";
      case "fechanacimiento":
        return "Debes ser mayor de 18 años.";
      case "tipodocumento":
        return "Selecciona un tipo de documento.";
      case "numdocumento":
        return "El DNI/NIE no es válido.";
      case "idxesp":
        return "El IDESP/IXESP no es válido.";
      case "contrasena":
        return "La contraseña debe tener al menos 12 caracteres, un número y un símbolo (!@#%^&*).";
      case "repContrasena":
        return "Las contraseñas no coinciden.";
      case "email":
        return "Formato de correo electrónico no válido.";
      case "repEmail":
        return "Los correos electrónicos no coinciden.";
      case "telefono":
        return "Teléfono no válido. Debe tener al menos 9 dígitos y empezar con +, 6, 7, 8 o 9.";
      case "declaraVeracidad":
        return "Debes aceptar la declaración de veracidad.";
      default:
        return ""; // O un mensaje genérico
    }
  }

  ///  Función para mostrar un mensaje de error
  function mostrarError(input, mensaje) {
    const errorDiv = document.createElement("div");
    errorDiv.className = "error-message";
    errorDiv.textContent = mensaje;
    input.parentNode.insertBefore(errorDiv, input.nextSibling);
  }

  /********************************************
   * Función 1: validar NOMBRE
   *  - El campo “Nombre” es obligatorio
   *  - No puede contener números ni símbolos
   ********************************************/
  function validarNombre() {
    const inputNombre = document.getElementById("nombre");
    const nombre = inputNombre.value.trim();

    // Validar que no esté vacío
    if (nombre === "") {
      return false;
    }

    // Validar que no contenga números ni símbolos
    if (!/^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/.test(nombre)) {
      mostrarError(
        inputNombre,
        "El nombre no puede contener números ni símbolos."
      );
      return false;
    }
    return true;
  }

  /********************************************
   * Función 2: validar APELLIDOS
   *  - El campo “Primer apellido” es obligatorio
   ********************************************/
  function validarApellidos() {
    const inputApellido1 = document.getElementById("apellido1");
    const apellido1 = inputApellido1.value.trim();

    // Validar que el primer apellido no esté vacío
    if (apellido1 === "") {
      return false;
    }
    return true;
  }

  /******************************************************
   * Función 3: validar FECHA DE NACIMIENTO (mayor de 18)
   *  - Tiene que ser mayor de edad
   ******************************************************/
  function validarfechanacimiento() {
    const inputFecha = document.getElementById("fechanacimiento");
    const fechaNac = inputFecha.value;

    const fechanacimientoDate = new Date(fechaNac);

    if (isNaN(fechanacimientoDate.getTime())) {
      return false; // Fecha inválida
    }

    const hoy = new Date();
    const fecha18 = new Date(
      hoy.getFullYear() - 18,
      hoy.getMonth(),
      hoy.getDate()
    );

    if (fechanacimientoDate > fecha18) {
      return false; // Menor de 18 años
    }

    return true;
  }
  /******************************************************
   * Función 4: validar TIPO DE DOCUMENTO
   *  - Debe seleccionar un valor
   ******************************************************/
  function validarTipoDocumento() {
    const selectTipoDocumento = document.getElementById("tipodocumento");
    const tipoDocumento = selectTipoDocumento.value;

    if (tipoDocumento === "") {
      return false;
    }
    return true;
  }
  /*******************************************************
   * Función 5: validar DNI o NIE
   *  - 8 dígitos + 1 letra (DNI) o  1 letra + 7 dígitos + 1 letra (NIE)
   *  - Se puede verificar la letra con un algoritmo
   *******************************************************/
  function validarDNI() {
    const inputDni = document.getElementById("numdocumento");
    const dni = inputDni.value.trim().toUpperCase();
    const tipoDocumento = document.getElementById("tipodocumento").value;

    // Si el tipo de documento es "Otro", no se valida
    if (tipoDocumento === "4") {
      return true;
    }

    if (tipoDocumento === "1") {
      // Validar DNI (8 dígitos + 1 letra)
      const regexDNI = /^\d{8}[A-Z]$/;
      if (!regexDNI.test(dni)) {
        return false;
      }

      const letrasValidas = "TRWAGMYFPDXBNJZSQVHLCKE";
      const numero = parseInt(dni.substring(0, 8), 10);
      const letra = dni.charAt(8);
      const resto = numero % 23;
      const letraCorrecta = letrasValidas.charAt(resto);

      if (letra !== letraCorrecta) {
        return false;
      }
    } else if (tipoDocumento === "2") {
      // Validar NIE (1 letra + 7 dígitos + 1 letra)
      const regexNIE = /^[XYZ]\d{7}[A-Z]$/;
      if (!regexNIE.test(dni)) {
        return false;
      }

      const letrasInicioValidas = "XYZ";
      const letraInicio = dni.charAt(0);
      const numero = parseInt(dni.substring(1, 8), 10);
      const letraFin = dni.charAt(8);

      if (!letrasInicioValidas.includes(letraInicio)) {
        return false;
      }

      let numeroNIE = numero;
      if (letraInicio === "Y") {
        numeroNIE += 10000000;
      } else if (letraInicio === "Z") {
        numeroNIE += 20000000;
      }

      const letrasValidas = "TRWAGMYFPDXBNJZSQVHLCKE";
      const resto = numeroNIE % 23;
      const letraCorrecta = letrasValidas.charAt(resto);

      if (letraFin !== letraCorrecta) {
        return false;
      }
    }

    return true;
  }

  /*******************************************************
   * Función 6: validar IDESP/IXESP
   *  - requerido
   *******************************************************/
  function validarIDESP() {
    const inputIdxesp = document.getElementById("idxesp");
    const idxesp = inputIdxesp.value.trim();

    // Validar que el campo no esté vacío
    if (idxesp === "") {
      return false;
    }
    return true;
  }

  /********************************************************************
    validar CONTRASEÑA y validar REPETIR CONTRASEÑA
   *  - Contraseña y repetición deben coincidir
   *  - Mínimo 12 caracteres
   *  - Al menos 1 número
   *  - Al menos 1 símbolo: !@#%^&*
   ********************************************************************/
  function validarContrasena() {
    const inputPass = document.getElementById("contrasena");

    const contrasena = inputPass.value;
    const regexNumero = /[0-9]/;
    const regexSimbolo = /[!@#%^&*]/;

    if (contrasena.length < 12) {
      return false;
    }

    if (!regexNumero.test(contrasena)) {
      return false;
    }

    if (!regexSimbolo.test(contrasena)) {
      return false;
    }

    return true;
  }

  function validarRepContrasena() {
    const inputRepContrasena = document.getElementById("repContrasena");
    const repContrasena = inputRepContrasena.value;
    const contrasena = document.getElementById("contrasena").value;

    if (contrasena !== repContrasena) {
      return false;
    }

    return true;
  }

  /*******************************************************
   * Función 8: validar EMAIL
   *  - Formato estándar de email
   *******************************************************/
  function validarEmail() {
    const inputEmail = document.getElementById("email");
    const email = inputEmail.value.trim();

    // Regex email básico
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regexEmail.test(email)) {
      return false;
    }
    return true;
  }

  /*******************************************************
   * Función 9: validar REPETIR EMAIL
   *  - Los correos deben coincidir
   *******************************************************/
  function validarRepEmail() {
    const inputEmail = document.getElementById("email");
    const inputRepEmail = document.getElementById("repEmail");
    const email = inputEmail.value.trim();
    const repEmail = inputRepEmail.value.trim();

    if (email !== repEmail) {
      return false;
    }
    return true;
  }

  /**********************************************************
   * Función 10: validar TELÉFONO
   *  - Al menos 9 dígitos
   *  - El primer carácter: 6, 7, 8, 9 o '+'
   **********************************************************/
  function validarTelefono() {
    const inputTel = document.getElementById("telefono");
    const telefono = inputTel.value.trim();

    const regexTel = /^(\+|[6789])\d{8,}$/;

    if (!regexTel.test(telefono)) {
      return false;
    }

    return true;
  }

  /**********************************************************
   * Función 11: validar DECLARACIÓN
   *  - Debe estar marcado el checkbox
   **********************************************************/
  function validarDeclaracion() {
    const inputDeclaracion = document.getElementById("declaraVeracidad");
    const declaracion = inputDeclaracion.checked;

    if (!declaracion) {
      return false;
    }

    return true;
  }
});
