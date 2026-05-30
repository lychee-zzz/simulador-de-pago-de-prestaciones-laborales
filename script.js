/* Emily Vanesa Chisaba Rivera CC 1019035292 */

// RETENCIÓN EN LA FUENTE

function calcularRetencion(salario, comisiones, horasExtras, salud, pension, uvt) {

    // 1. Base gravable = ingresos laborales sin auxilio de transporte
    const ingresos = salario + comisiones + horasExtras;

    // 2. Restar ingresos no constitutivos de renta (salud + pensión del empleado)
    const noConstitutivos = salud + pension;
    const despuesDeNoConstitutivos = ingresos - noConstitutivos;

    // 3. Renta exenta: 25% del resultado, con tope de 240 UVT mensuales
    const tope240UVT = 240 * uvt;
    const rentaExenta = Math.min(despuesDeNoConstitutivos * 0.25, tope240UVT);

    // 4. Base gravable final
    const baseGravable = despuesDeNoConstitutivos - rentaExenta;

    // 5. Convertir a UVT
    const baseEnUVT = baseGravable / uvt;

    // 6. Aplicar tabla Art. 383 ET
    let retencionUVT = 0;

    if (baseEnUVT <= 95) {

        retencionUVT = 0;

    } else if (baseEnUVT <= 150) {

        retencionUVT = (baseEnUVT - 95) * 0.19;

    } else if (baseEnUVT <= 360) {

        retencionUVT = (baseEnUVT - 150) * 0.28 + 10;

    } else if (baseEnUVT <= 640) {

        retencionUVT = (baseEnUVT - 360) * 0.33 + 69;

    } else if (baseEnUVT <= 945) {

        retencionUVT = (baseEnUVT - 640) * 0.35 + 162;

    } else if (baseEnUVT <= 2300) {

        retencionUVT = (baseEnUVT - 945) * 0.37 + 268;

    } else {

        retencionUVT = (baseEnUVT - 2300) * 0.39 + 770;
    }

    // 7. Convertir resultado de UVT a pesos
    return retencionUVT * uvt;
}

function calcular() {

    // LIMPIAR RESULTADOS
    
    document.getElementById("retencionResultado").textContent = "";

    const ids = [
        "nombreResultado", "documentoResultado", "salarioResultado",
        "auxilioResultado", "comisionesResultado", "horasResultado",
        "devengadoResultado", "ibcResultado", "saludResultado",
        "pensionResultado", "fondoResultado", "arlResultado",
        "deduccionesResultado", "totalResultado"
    ];
    ids.forEach(id => document.getElementById(id).textContent = "");

    // DATOS PERSONALES
    const nombreCompleto = document.getElementById("nombreCompleto").value.trim();
    const edad = Number(document.getElementById("edad").value);
    const tipoDocumento = document.getElementById("tipoDeDocumento").value;
    const numeroDocumento = document.getElementById("numeroDeDocumento").value.trim();

  // VALIDACIÓN CAMPOS PERSONALES

    if (!nombreCompleto) {

        alert("Ingrese su nombre completo.");
        return;
    }

    if (!numeroDocumento) {

        alert("Ingrese su número de documento.");
        return;
    }

    if (!edad || edad <= 0) {

        alert("Ingrese una edad válida.");
        return;
    }

    // VALIDACIÓN TIPO DE DOCUMENTO
    if (tipoDocumento === "noSeleccionado") {

        alert("Seleccione un tipo de documento.");
        return;
    }

    // VALIDACIÓN DOCUMENTO VS EDAD
    if (tipoDocumento === "RC" && edad >= 7) {

        alert("El Registro Civil corresponde a menores de 7 años.");
        return;
    }

    if (tipoDocumento === "TI" && (edad < 7 || edad > 17)) {

        alert("La Tarjeta de Identidad corresponde a personas entre 7 y 17 años.");
        return;
    }

    if (tipoDocumento === "CC" && edad < 18) {

        alert("La Cédula de Ciudadanía corresponde a mayores de 18 años.");
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

        const mesadaPensional =
            Number(document.getElementById("mesadaPensional").value);

        if (!mesadaPensional || mesadaPensional <= 0) {
            alert("Ingrese la mesada pensional.");
            return;
        }

        const pensionPensionado = mesadaPensional * 0.04;
        const totalPensionado   = mesadaPensional - pensionPensionado;

        document.getElementById("nombreResultado").textContent =
            `Nombre: ${nombreCompleto}`;

        document.getElementById("documentoResultado").textContent =
            `Documento: ${tipoDocumento} ${numeroDocumento}`;

        document.getElementById("salarioResultado").textContent =
            `Mesada pensional: $${mesadaPensional.toLocaleString("es-CO")}`;

        document.getElementById("pensionResultado").textContent =
            `Pensión (4%): $${Math.round(pensionPensionado).toLocaleString("es-CO")}`;

        document.getElementById("deduccionesResultado").textContent =
            `Total deducciones: $${Math.round(pensionPensionado).toLocaleString("es-CO")}`;

        document.getElementById("totalResultado").textContent =
            `Total a recibir: $${Math.round(totalPensionado).toLocaleString("es-CO")}`;

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
    let retencion        = 0;     

    if (salario >= smlv * 2) {

        salud   = ibc * 0.04;
        pension = ibc * 0.04;

        if (ibc >= smlv * 4) {
            fondoSolidaridad = ibc * 0.01;
        }

        arl = ibc * (arlTarifas[nivelRiesgo] || 0);

        // RETENCIÓN EN LA FUENTE 
        retencion = calcularRetencion(
            salario,
            comisiones,
            horasExtras,
            salud,
            pension,
            uvt
        );
    }

    const totalDeducciones = salud + pension + fondoSolidaridad + arl + retencion;

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
    document.getElementById("retencionResultado").textContent =
        `Retención en la fuente: $${Math.round(retencion).toLocaleString("es-CO")}`;
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