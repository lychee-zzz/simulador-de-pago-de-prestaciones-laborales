/* Emily Vanesa Chisaba Rivera CC 1019035292 */

function calcular() {

    // LIMPIAR RESULTADOS
    const ids = [
        "nombreResultado", "documentoResultado", "salarioResultado",
        "auxilioResultado", "comisionesResultado", "horasResultado",
        "devengadoResultado", "ibcResultado", "saludResultado",
        "pensionResultado", "fondoResultado", "arlResultado",
        "deduccionesResultado", "totalResultado"
    ];
    ids.forEach(id => document.getElementById(id).textContent = "");

    // DATOS PERSONALES
    const nombreCompleto   = document.getElementById("nombreCompleto").value.trim();
    const edad             = Number(document.getElementById("edad").value);
    const tipoDocumento    = document.getElementById("tipoDeDocumento").value;
    const numeroDocumento  = document.getElementById("numeroDeDocumento").value.trim();

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
        alert("Usuario clasificado como 'Beneficiario por cotizante'. No puede continuar.");
        return;
    }

    // CONSTANTES 2026
    const smlv              = 1750905;
    const auxilioTransporte = 249095;
    const uvt               = 52.37;

    const arlTarifas = {
        "1": 0.00522,
        "2": 0.01044,
        "3": 0.02436,
        "4": 0.04350,
        "5": 0.06960
    };

    // MOSTRAR IDENTIFICACIÓN
    document.getElementById("nombreResultado").textContent =
        `Nombre: ${nombreCompleto}`;
    document.getElementById("documentoResultado").textContent =
        `Documento: ${tipoDocumento.toUpperCase()} ${numeroDocumento}`;

    // CASO PENSIONADO (edad >= 60)
    if (edad >= 60) {
        const mesadaPensional = Number(document.getElementById("mesadaPensional").value);

        if (!mesadaPensional || mesadaPensional <= 0) {
            alert("Ingrese la mesada pensional.");
            return;
        }

        const pension = mesadaPensional * 0.04;

        document.getElementById("salarioResultado").textContent =
            `Mesada pensional: $${mesadaPensional.toLocaleString("es-CO")}`;
        document.getElementById("pensionResultado").textContent =
            `Pensión (4%): $${pension.toLocaleString("es-CO")}`;
        document.getElementById("totalResultado").textContent =
            `Total a recibir: $${(mesadaPensional - pension).toLocaleString("es-CO")}`;
        return;
    }

    // INFORMACIÓN SALARIAL
    const salario      = Number(document.getElementById("salario").value);
    const comisiones   = Number(document.getElementById("comisiones").value) || 0;
    const horasExtras  = Number(document.getElementById("totalDeHorasExtras").value) || 0;
    const nivelRiesgo  = document.getElementById("clasificacionDeNivelDeRiesgo").value;

    if (!salario || salario <= 0) {
        alert("Ingrese un salario válido.");
        return;
    }

    if (!nivelRiesgo) {
        alert("Seleccione el nivel de riesgo ARL.");
        return;
    }

    // AUXILIO DE TRANSPORTE (solo si salario <= 2 SMLV)
    const auxilio = salario <= smlv * 2 ? auxilioTransporte : 0;

    // TOTAL DEVENGADO (para mostrar en resultados)
    const totalDevengado = salario + auxilio + comisiones + horasExtras;

    // BASE IBC: excluye auxilio de transporte (según enunciado)
    const baseIBC = salario + comisiones + horasExtras;
    const ibc     = baseIBC * 0.70;

    // DEDUCCIONES — solo aplican si salario >= 2 SMLV
    let salud            = 0;
    let pension          = 0;
    let fondoSolidaridad = 0;
    let arl              = 0;

    if (salario >= smlv * 2) {
        salud   = ibc * 0.04;
        pension = ibc * 0.04;

        if (ibc >= smlv * 4) {
            fondoSolidaridad = ibc * 0.01;
        }

        arl = ibc * (arlTarifas[nivelRiesgo] || 0);
    }

    const totalDeducciones = salud + pension + fondoSolidaridad + arl;
    const total            = totalDevengado - totalDeducciones;

    // MOSTRAR RESULTADOS
    document.getElementById("salarioResultado").textContent =
        `Salario: $${salario.toLocaleString("es-CO")}`;
    document.getElementById("auxilioResultado").textContent =
        `Auxilio de transporte: $${auxilio.toLocaleString("es-CO")}`;
    document.getElementById("comisionesResultado").textContent =
        `Comisiones: $${comisiones.toLocaleString("es-CO")}`;
    document.getElementById("horasResultado").textContent =
        `Horas extra: $${horasExtras.toLocaleString("es-CO")}`;
    document.getElementById("devengadoResultado").textContent =
        `Total devengado: $${totalDevengado.toLocaleString("es-CO")}`;
    document.getElementById("ibcResultado").textContent =
        `IBC (70% base): $${ibc.toLocaleString("es-CO")}`;
    document.getElementById("saludResultado").textContent =
        `Salud (4%): $${salud.toLocaleString("es-CO")}`;
    document.getElementById("pensionResultado").textContent =
        `Pensión (4%): $${pension.toLocaleString("es-CO")}`;
    document.getElementById("fondoResultado").textContent =
        `Fondo de solidaridad (1%): $${fondoSolidaridad.toLocaleString("es-CO")}`;
    document.getElementById("arlResultado").textContent =
        `ARL (Nivel ${nivelRiesgo}): $${arl.toLocaleString("es-CO")}`;
    document.getElementById("deduccionesResultado").textContent =
        `Total deducciones: $${totalDeducciones.toLocaleString("es-CO")}`;
    document.getElementById("totalResultado").textContent =
        `Total a recibir: $${total.toLocaleString("es-CO")}`;
}

// MOSTRAR U OCULTAR CAMPOS SEGÚN EDAD
const edadInput     = document.getElementById("edad");
const campoMesada   = document.getElementById("campoMesada");
const datosLaborales = document.getElementById("datosLaborales");

campoMesada.style.display = "none";

edadInput.addEventListener("input", function () {
    const edad = Number(this.value);

    if (edad >= 60) {
        campoMesada.style.display  = "flex";
        datosLaborales.style.display = "none";
    } 
    
    else {
        campoMesada.style.display  = "none";
        datosLaborales.style.display = "contents";

    }

});