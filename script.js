//Emily Vanesa Chisaba Rivera - 1019035292

// Declaración de variables ingreso de información basica
let nombreCompleto = document.getElementById("nombreCompleto").value;
let edad = document.getElementById("edad").value;
let tipoDeDocumento = document.getElementById("tipoDeDocumento").value;
let numeroDeDocumento = document.getElementById("numeroDeDocumento").value;

// Validación de perfil
if (edad >= edadMinima) {
    // Persona mayor de edad: puede continuar con el cálculo.
} 

else {
    // Persona menor de edad: no puede aplicar en el simulador.

}
if (edad <= edadMaximaDeBeneficiarioPorCotizante) {

} 

else {
    // Persona mayor a 25 años: no puede ser beneficiario por cotizante.

}

//Ingreso de información salarial
let salario = document.getElementById("salario").value;
let comisiones = document.getElementById("comisiones").value;
let totalDeHorasExtras = document.getElementById("totalDeHorasExtras").value;
let clasificacionDeNivelDeRiesgo = document.getElementById("clasificacionDeNivelDeRiesgo").value;
let porcentajeDeIBC = 0;

// Valores de referencia para el año 2026
const smlv = 1750905;
const salarioMaximoLegalVigente = 22761765;
const auxilioTransporte = 249095;
const unidadDeValorTributario = 52.37;

// Tarifas de ARL (IBC)
const riesgoIMinimo = 0.00522;
const riesgoIIBajo = 0.01044;
const riesgoIIIMedio = 0.02436;
const riesgoIVAlto = 0.04350;
const riesgoVMaximo = 0.06960;

// Declaración de constantes para el cálculo de salario
const ibc = 0.7 * totalDevengado;
const salud = 0.04 * ibc;
const pension = 0.04 * ibc;
const totalDevengado = salario + comisiones + totalDeHorasExtras;

const arlTarifas = {
    1: riesgoIMinimo,
    2: riesgoIIBajo,
    3: riesgoIIIMedio,
    4: riesgoIVAlto,
    5: riesgoVMaximo,
};

// Funciones base * porcentaje
function calcularPorcentaje (base, porcentaje) {
    return base * porcentaje;
}

const arl = arlTarifas[clasificacionDeNivelDeRiesgo] ? arlTarifas[clasificacionDeNivelDeRiesgo] * ibc : 0;

//Se paga 1% adicional si el IBC es mayor o igual 4 SMMLV
const fondoSolidaridadPensional = porcentajeDeIBC >= 4 * smlv ? 0.01 * ibc : 0;
const retencionEnLaFuente = 0;
const edadMinima = 18;
const edadMaximaDeBeneficiarioPorCotizante = 25;
const edadPension = 60;
