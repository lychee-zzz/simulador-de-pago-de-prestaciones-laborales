/* Emily Vanesa Chisaba Rivera CC 1019035292 */

function calcular() {

    // LIMPIAR RESULTADOS

    document.getElementById("nombreResultado").textContent = "";
    document.getElementById("documentoResultado").textContent = "";
    document.getElementById("salarioResultado").textContent = "";
    document.getElementById("auxilioResultado").textContent = "";
    document.getElementById("comisionesResultado").textContent = "";
    document.getElementById("horasResultado").textContent = "";
    document.getElementById("devengadoResultado").textContent = "";
    document.getElementById("ibcResultado").textContent = "";
    document.getElementById("saludResultado").textContent = "";
    document.getElementById("pensionResultado").textContent = "";
    document.getElementById("fondoResultado").textContent = "";
    document.getElementById("arlResultado").textContent = "";
    document.getElementById("deduccionesResultado").textContent = "";
    document.getElementById("totalResultado").textContent = "";

    // DATOS PERSONALES

    const nombreCompleto =
        document.getElementById("nombreCompleto").value;

    const edad =
        Number(document.getElementById("edad").value);

    const tipoDocumento =
        document.getElementById("tipoDeDocumento").value;

    const numeroDocumento =
        document.getElementById("numeroDeDocumento").value;

    // VALIDACIÓN DOCUMENTO

    if (tipoDocumento === "noSeleccionado") {

        alert("Seleccione un tipo de documento.");
        return;
    }

    // VALIDACIONES DE EDAD

    if (edad < 18) {

        alert("El usuario es menor de edad y no puede continuar.");
        return;
    }

    if (edad < 25) {

        alert("Usuario beneficiario por cotizante.");
        return;
    }

    // CONSTANTES

    const smlv = 1750905;
    const auxilioTransporte = 249095;

    const riesgoIMinimo = 0.00522;
    const riesgoIIBajo = 0.01044;
    const riesgoIIIMedio = 0.02436;
    const riesgoIVAlto = 0.04350;
    const riesgoVMaximo = 0.06960;

    // CASO PENSIONADO

    if (edad >= 60) {

        const mesadaPensional =
            Number(document.getElementById("mesadaPensional").value);

        if (mesadaPensional <= 0) {

            alert("Ingrese la mesada pensional.");
            return;
        }

        const pension =
            mesadaPensional * 0.04;

        document.getElementById("nombreResultado").textContent =
            `Nombre: ${nombreCompleto}`;

        document.getElementById("documentoResultado").textContent =
            `Documento: ${tipoDocumento} ${numeroDocumento}`;

        document.getElementById("pensionResultado").textContent =
            `Pensión: $${pension.toLocaleString()}`;

        return;
    }

    // INFORMACIÓN SALARIAL

    const salario =
        Number(document.getElementById("salario").value);

    const comisiones =
        Number(document.getElementById("comisiones").value) || 0;

    const horasExtras =
        Number(document.getElementById("totalDeHorasExtras").value) || 0;

    const nivelRiesgo =
        document.getElementById("clasificacionDeNivelDeRiesgo").value;

    // AUXILIO DE TRANSPORTE

    let auxilio = 0;

    if (salario <= smlv * 2) {

        auxilio = auxilioTransporte;
    }

    // TOTAL DEVENGADO

    const totalDevengado =
        salario +
        auxilio +
        comisiones +
        horasExtras;

    // IBC

    const ibc =
        totalDevengado * 0.70;

    // SALUD Y PENSIÓN

    let salud =
        ibc * 0.04;

    let pension =
        ibc * 0.04;

    // FONDO DE SOLIDARIDAD

    let fondoSolidaridad = 0;

    if (ibc >= smlv * 4) {

        fondoSolidaridad =
            ibc * 0.01;
    }

    // ARL

    const arlTarifas = {

        1: riesgoIMinimo,
        2: riesgoIIBajo,
        3: riesgoIIIMedio,
        4: riesgoIVAlto,
        5: riesgoVMaximo

    };

    let arl =
        ibc * (arlTarifas[nivelRiesgo] || 0);

    // REGLA DEL TALLER

    if (salario < smlv * 2) {

        salud = 0;
        pension = 0;
        fondoSolidaridad = 0;
        arl = 0;
    }

    // TOTAL DEDUCCIONES

    const totalDeducciones =
        salud +
        pension +
        fondoSolidaridad +
        arl;

    // TOTAL NETO

    const total =
        totalDevengado -
        totalDeducciones;

    // RESULTADOS

    document.getElementById("nombreResultado").textContent =
        `Nombre: ${nombreCompleto}`;

    document.getElementById("documentoResultado").textContent =
        `Documento: ${tipoDocumento} ${numeroDocumento}`;

    document.getElementById("salarioResultado").textContent =
        `Salario: $${salario.toLocaleString()}`;

    document.getElementById("auxilioResultado").textContent =
        `Auxilio de transporte: $${auxilio.toLocaleString()}`;

    document.getElementById("comisionesResultado").textContent =
        `Comisiones: $${comisiones.toLocaleString()}`;

    document.getElementById("horasResultado").textContent =
        `Horas extra: $${horasExtras.toLocaleString()}`;

    document.getElementById("devengadoResultado").textContent =
        `Total devengado: $${totalDevengado.toLocaleString()}`;

    document.getElementById("ibcResultado").textContent =
        `IBC: $${ibc.toLocaleString()}`;

    document.getElementById("saludResultado").textContent =
        `Salud: $${salud.toLocaleString()}`;

    document.getElementById("pensionResultado").textContent =
        `Pensión: $${pension.toLocaleString()}`;

    document.getElementById("fondoResultado").textContent =
        `Fondo de solidaridad: $${fondoSolidaridad.toLocaleString()}`;

    document.getElementById("arlResultado").textContent =
        `ARL: $${arl.toLocaleString()}`;

    document.getElementById("deduccionesResultado").textContent =
        `Total deducciones: $${totalDeducciones.toLocaleString()}`;

    document.getElementById("totalResultado").textContent =
        `Total a recibir: $${total.toLocaleString()}`;
}
// MOSTRAR U OCULTAR MESADA PENSIONAL

const edadInput =
    document.getElementById("edad");

const campoMesada =
    document.getElementById("campoMesada");

const datosLaborales =
    document.getElementById("datosLaborales");

// Estado inicial

campoMesada.style.display = "none";

edadInput.addEventListener("input", function () {

    const edad =
        Number(this.value);

    if (edad >= 60) {

        campoMesada.style.display = "flex";
        datosLaborales.style.display = "none";

    } else {

        campoMesada.style.display = "none";
        datosLaborales.style.display = "contents";

    }

});