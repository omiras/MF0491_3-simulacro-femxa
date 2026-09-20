# Ejercicio: Consulta del tiempo

Queremos crear una aplicación Web para el móvil, que consulta una la API [Open-Meteo](https://open-meteo.com/) 

## API elegida

Usamos [Open-Meteo](https://open-meteo.com/), que tiene estas ventajas:

- Es completamente gratuita.
- No necesita clave API.
- Tiene soporte CORS para fetch en el navegador.
- Es estable y muy adecuada para proyectos educativos.

## Funcionalidad de la aplicación

La página permite elegir entre:

- Madrid
- Barcelona
- Valencia

Cuando se selecciona una ciudad, la aplicación hace una petición a la API de Open-Meteo y rellena la interfaz con:

- La ciudad y el país
- La temperatura actual
- La sensación térmica
- El estado del tiempo
- La temperatura mínima y máxima del día

## Cómo probarlo

1. Abre `index.html` en el navegador.
2. Selecciona una ciudad del desplegable.
3. Pulsa el botón para consultar el clima.
4. Comprueba que la información se rellena en la interfaz.
