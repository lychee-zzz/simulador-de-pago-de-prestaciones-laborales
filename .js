// Declaración de variables ingreso de información basica
let nombreCompleto = "";
let edad = 0;
let tipoDeDocumento = "";
let numeroDeDocumento = "";


// Validación de perfil
if (edad >= edadMinima) {
    // Persona mayor de edad: puede continuar con el cálculo.

} else {
    // Persona menor de edad: no puede aplicar en el simulador.

}
if (edad <= edadMaximaDeBeneficiarioPorCotizante) {

} else {
    // Persona mayor a 25 años: no puede ser beneficiario por cotizante.

}

// Declaración de variables para el cálculo de salario
let salario = 0;
let comisiones = 0;
let totalDeHorasExtras = 0;
let clasificacionDeNivelDeRiesgo = 1;
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

const arl = arlTarifas[clasificacionDeNivelDeRiesgo] ? arlTarifas[clasificacionDeNivelDeRiesgo] * ibc : 0;
//Se paga 1% adicional si el IBC es mayor o igual 4 SMMLV.
const fondoSolidaridadPensional = porcentajeDeIBC >= 4 * smlv ? 0.01 * ibc : 0;
const retencionEnLaFuente = 0;
const edadMinima = 18;
const edadMaximaDeBeneficiarioPorCotizante = 25;
const edadPension = 60;

//Resultados.
console.log("Salario: " + salario);
console.log("Comisiones: " + comisiones);
console.log("Total de Horas Extras: " + totalDeHorasExtras);
console.log("IBC (ingreso base de cotización): " + ibc);
console.log("ARL: " + arl);
console.log("Fondo de Solidaridad Pensional: " + fondoSolidaridadPensional);