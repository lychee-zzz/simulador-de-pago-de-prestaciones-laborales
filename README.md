# Simulador de Pago de Prestaciones Laborales

**Autora:** Emily Vanesa Chisaba Rivera  
**Documento:** CC 1019035292  
 

---

## Descripción

Este es un ejercicio  academico de una aplicación web que simula el cálculo del pago de prestaciones laborales colombianas para el año 2026, incluyendo salud, pensión, ARL,fondo de solidaridad pensional y retención en la fuente.

---

## Cómo usar

1. Clonar o descargar el repositorio.
2. Abrir `index.html` en cualquier navegador.
3. Ingresar los datos personales y salariales.
4. Hacer clic en **Calcular**.

No requiere instalación ni dependencias externas.

---

## Estructura del proyecto

├── index.html        # Estructura de la página <br>
├── style.css         # Estilos y diseño <br>
├── script.js         # Lógica y cálculos <br>
├── pseudocodigo/     # Pseudocódigo hecho a mano <br>
│   └── IMG_20260530_185834262_HDR.jpg <br>
│   └── IMG_20260530_185848549_HDR.jpg <br>
│   └── IMG_20260530_185856507_HDR.jpg <br>
│   └── IMG_20260530_185901825_HDR.jpg <br>
│   └── IMG_20260530_185911872_HDR.jpg <br>
│   └── IMG_20260530_185918316_HDR.jpg <br>
│   └── IMG_20260530_185924546_HDR.jpg <br>
│   └── IMG_20260530_185933142_HDR.jpg <br>
├── identidifacion de edge cases/     # Tablas con edge cases <br>
│   └── IMG_20260508_082544313_HDR.jpg <br>
│   └── IMG_20260508_082550916.jpg <br>
│   └── IMG_20260508_082556498.jpg <br>
│   └── IMG_20260508_082601921.jpg <br>
│   └── IMG_20260508_082611007_HDR.jpg <br>
│   └── IMG_20260508_082617465_HDR.jpg <br>
└── README.md         # Este archivo <br>

---

## Valores de referencia 2026

| Concepto | Valor |
|---|---|
| SMLV | $1.750.905 |
| Subsidio de transporte | $249.095 |
| UVT | $52.37 |

---

## Funcionalidades

- Validación de perfil por edad y tipo de documento
- Cálculo de IBC (70% del total devengado sin auxilio)
- Auxilio de transporte para salarios ≤ 2 SMLV
- Deducciones: salud (4%), pensión (4%), ARL según nivel de riesgo
- Fondo de solidaridad pensional para IBC ≥ 4 SMLV
- Retención en la fuente según Art. 383 ET 
- Caso especial para pensionados (edad ≥ 60)
- Diseño responsive
