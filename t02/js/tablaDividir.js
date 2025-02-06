const mostrarTablaDividir = (event) => {
    event.preventDefault();
    const divisor = Number(document.getElementById('divisor').value);
    if (divisor >= 1 && divisor <= 10) {
        let tabla = document.getElementById('tablaDividir');
        let tablaDividir = `<h2>Tabla de Dividir del número ${divisor}</h2>`;
        tablaDividir += '<ul>';
        for (let i = 1; i <= 10; i++) {

           /*Como la division me da muchos decimales, 
           creo la variable resultado para luego aplicarle el metodo toFixed().*/
            let resultado = divisor / i;
            tablaDividir += `<li>${divisor} : ${i} = ${resultado.toFixed(1)}</li>`;
        }
        tablaDividir += '</ul>';
        tabla.innerHTML += tablaDividir;
    } else {
        alert('El número introducido debe estar entre 1 y 10 (ambos inclusive');
        document.getElementById("divisor").value = '';
    }
}