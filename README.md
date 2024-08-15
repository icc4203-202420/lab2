# Laboratorio 2: Introducción al desarrollo móvil con React y MUI

En este laboratorio veremos una aplicación de clima construida utilizando lo básico de React y MUI. La aplicación utiliza la API de OpenWeather para acceder a información climática.

## Pasos iniciales

El primer paso en este laboratorio es crear una cuenta en OpenWeather, a través del portal openweathermap.org. Puedes usar para esto tu correo personal o institucional. Luego, ingresando al portal de OpenWeather, puedes pinchar en el menú en donde aparece tu login arriba a la derecha en la _top bar_ del sitio, y allí acceder a la opción "My API keys". Ingresando allí, verás la API Key que OpenWeather ha creado automáticamente para tu uso gratuito (máximo 1000 consultas diarias).

A continuación, crea un archivo llamado `.env` en el directorio raíz de este repositorio. En dicho archivo ingresa el siguiente texto:

```sh
VITE_OPENWEATHER_API_KEY=#[copia y pega aquí la API Key y elimina los corchetes y el caracter gato]
```

Luego, puedes ejecutar:

```sh
yarn install
```

Esto instalará todos los paquetes o módulos especificados en el archivo `package.json` que requiere la aplicación. Preferimos utilizar Yarn para gestión de módulos y dependencias de Javascript.

Con esto, la aplicación estará lista para ejecutar:

```sh
yarn dev
```

El comando anterior ejecuta la aplicación en modo de desarrollo. Puedes abrir el navegador web en [http://localhost:5173/](http://localhost:5173/) para ver el funcionamiento.

## Lo básico de Vite

Usamos Vite (https://vitejs.dev/) como andamiaje para crear nuestra aplicación utilizando React 18. Vite provee una serie de herramientas, por ejemplo, generadores parecidos a los que tiene una aplicación Rails, que permiten crear una aplicación de frontend a partir de cero, y preparar una aplicación para producción.

Si abres el archivo `package.json` verás que hay un objeto con clave `"scripts"` declarado. Este objeto define varias tareas posibles de realizar utilizando Vite, invocándolas con Yarn según nuestras preferencias de ambiente de desarrollo.

Los scripts relevantes son:

* `dev`: Permite levantar la aplicación en modo desarrollo como hemos visto arriba.
* `build`: Prepara la aplicación para ponerla en ambiente de producción.
* `lint`: Ejecuta linters para validar que el código cumpla estándares de codificación, y normas de calidad.
* `preview`: Permite previsualizar la aplicación después que ha sido construida con `build`.

## Uso de API keys con aplicaciones de frontend

Las APIs públicas remotas como la de OpenWeather requieren el uso de una llave (key) que queda asociada a alguna cuenta de usuario para fines de facturación y monitoreo. Lo mismo ocurre con otras APIs web como la de reCaptcha, utilizada para evitar el abuso de la aplicación web por parte de robots, y otras APIs de proveedores como por ejemplo OpenAI, Google Cloud Platform, Amazon Web Services, etc. Las API Keys deben tener un trato similar al de las contraseñas. Si una API key se deja expuesta en el código del frontend puede ser robada por potencialmente cualquier usuario (atacante) que tenga acceso a la aplicación, y el atacante podría usar las APIs (con sus consiguientes costos para los titulares) en forma fraudulenta. 

¿Cuáles son las soluciones a este problema?

1. Encapsular las API keys: Para esto, se crea un servicio intermedio. Tu aplicación envía solicitudes a un servidor backend que tú controlas, y este servidor realiza las solicitudes a la API externa. Esto te permite mantener las claves API fuera del cliente y aplicar técnicas de seguridad adicionales, como la autenticación de usuarios y la validación de sesiones.
2. Si el proveedor de la API lo permite, se puede definir una configuración para restringir las solicitudes basadas en el origen de la llamada, por ejemplo, rangos de direcciones IP que uno controla (p.ej., si la aplicación estará disponible solamente en alguna intranet o a través de una VPN), dominios de referencia, es decir referentes HTTP desde los cuales se pueden hacer llamadas a la API. Esto ayuda a asegurar que solo los dominios que tú especificas puedan hacer solicitudes. 
3. Si el proveedor de la API lo permite, se pueden definir claves con las que solamente se puedan realizar operaciones de lectura de datos. Sin embargo, esto no resuelve problemas como los de garantizar la privacidad de datos, o los abusos que se pueden dar con la realización indiscriminada de peticiones a la API.

**Disclaimer:** En este ejercicio, usaremos claves en el frontend únicamente por razones prácticas, dado que la API que utilizaremos es gratuita y tiene un límite de peticiones diarias que estamos dispuestos a aceptar para nuestros fines. Si la aplicación fuera de producción y tuviéramos que contratar la API con nuetra tarjeta de crédito, entonces lo más seguro sería optar por la alternativa (1). 

## API keys con variables de entorno en VITE

Te recomendamos leer este [diálogo con ChatGPT](https://chatgpt.com/share/4bae19a6-d438-49a6-b8d8-e162cca05832) para comprender mejor conceptualmente qué son las variables de entorno y cómo se usan. En nuestra aplicación hemos definido un archivo `.env` y éste es automáticamente cargado por la tarea `dev` de Vite. Si abres el archivo `src/components/Weather.jsx` verás algo como:

```es6
const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
```

Todas las variables de entorno que se utilizan con Vite deben tener el prefijo `VITE_`. Vite busca estas variables en `.env`, en el entorno de las variables exportadas por la consola (_shell_), y las deja a disposición en el módulo `meta.env`. Cuando se ejecuta la tarea `build` de Vite, el código es minificado y los accesos a las variables desde el módulo `meta.env` son eliminados y reemplazados por los valores literales de las variables. Esto es lo que en definitiva facilita que un atacante pueda robar las API keys si se utilizan variables de entorno para manejarlas.

## Descripción de la Aplicación React

Nuestra aplicación React en su primera iteración es bastante simple y se limita a llamar a la API de OpenWeather para realizar un par de consultas. Primero, resuelve las coordenadas GPS de Santiago de Chile usando una API de "Geocoder", y luego, con estas coordenadas, llama a la API de clima de OpenWeather utlizando las funciones de una biblioteca llamada Axios ([https://axios-http.com/docs/intro](https://axios-http.com/docs/intro)), para obtener la información del clima actual. Axios permite realizar peticiones XHR a APIs remotas, con funcionalidad similar a la Fetch API estándar que implementan los navegadores web, sin embargo, Axios provee una serie de conveniencias:

* Convierte automáticamente respuestas JSON de la API de backend directamente a objetos Javascript. De otro modo, es necesario llamar a `JSON.parse` en forma manual para convertir respuestas JSON a objetos.
* Simplifica el paso de parámetros a las APIs remotas.
* Ofrece soporte para eventos de carga y descarga cuando se trabaja con archivos.
* Permite cancelar solicitudes en forma simple.
* Permite modificar solicitudes y respuestas utilizando lógica encapsulable (interceptores).
* Simplifica la sintaxis para realizar solicitudes a las APIs.

La aplicación al cargarse realiza las invocaciones con axios a las APIs de OpenWeather y luego el resultado es desplegado en un componente `Weather` que se encuentra inserto en la aplicación.

### Componentes de la Aplicación

**Index**

La página de carga de la aplicación SPA desarrollada con React es `index.html`. En este archivo se declara un elemento raíz de tipo `div` con `id` con valor `root`, y se carga el archivo `main.jsx`. Este último archivo instancia el componente principal de la aplicación llamado `App` (ver `App.jsx`):

```es6
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme'; // Asegúrate de importar el tema

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
        </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
```

**Theme de MUI**

Existe un _theme_ de MUI (Material UI) configurado para la aplicación que se encuentra descrito en `src/theme.js`. Es posible variar la tipografía Roboto utilizada en la aplicación, el esquema de colores, y en general alterar todas las propiedades personalizables de los componentes de MUI.

El componente `ThemeProvider` decora `App` con el _theme_ cargado en el propio archivo `main.jsx`.

**BrowserRouter**

Luego, hay un componente `BrowserRouter`, provisto por React, que permite que la aplicación de frontend pueda tener sus propios enlaces (hipervínculos) locales, y procesar los paths que hay en la barra de direcciones del navegador interpretándolos en el contexto local del frontend. Los enlaces permiten acceder a distintos componentes de la aplicación que quedan instanciados por el componente `App`. 

**React.StrictMode**

Finalmente `React.StrictMode` permite comunicar advertencias o errores al desarrollador respecto a prácticas erróneas en el desarrollo de la aplicación, asociadas a potenciales problemas de calidad.

**Componente App**

El archivo `App.jsx` declara el componente principal de la aplicación `App`, junto con componentes que se instancian cuando se está en la ruta raíz `/` (`Home`) y en la ruta `/search` (`Search`). 

El componente `App` maneja una única variable de estado con el hook de _state_, que permite alternar la vista del menú de navegación, haciendo click en el botón que se encuentra en la barra superior (ver `AppBar` y uso de la variable de estado `toggleDrawer`).

El menú de navegación está construido con un componente tipo `List` de React que permite que los ítemes queden enlazados a otros componentes; `Home` y `Search`.

En las líneas finales de `App.jsx` se encuentra el componente `Routes` que en forma análoga a `routes.rb` en el backend de la aplicación Rails, define una lista de rutas que son válidas para la aplicación que se ejecuta en el _frontend_.

**Componente Home**

El componente `Home` incluye algunos componentes de MUI, como el de [`Card`](https://mui.com/material-ui/react-card/) y `CardContent`. Sin embargo, el propósito de `Card` es proveer un área en la cual instanciar el componente `Weather` que realiza las acciones relevantes en nuestra aplicación.

**Componente Weather**

En este componente hay dos hooks de React relevantes que son instanciados:

* `state` (variable `weather`): Esta variable contiene el objeto actual de clima cargado mediante la API de OpenWeather.
* `effect`: Este hook que no recibe ningún objeto para vigilar en su arreglo de argumentos, y ejecuta _automáticamente y una sola vez cuando se termina de renderizar_ el componente `Weather`. La función asíncrona que ejecuta el hook es `fetchWeather`. Podemos ver en ella las llamadas a la API remota y el procesamiento de resultados.

## Experimenta con el código

1. Puedes partir usando mensajes `console.debug` en el componente `Weather` para desplegar en consola las respuestas que se obtienen al llamar a las APIs de geocoder y clima remotas.
2. Luego, puedes modificar el request a geocoder y cambiar la ubicación geográfica, y verificar los resultados.
3. Puedes personalizar el componente `Search` declarado en `App.jsx`. Incorpora un [campo de texto](https://mui.com/material-ui/react-text-field/) para búsqueda, agrega un hook de `useEffect` que vigile el campo de texto, y luego invoque a las APIs de geocoder y clima, y despliegue en la consola el resultado de clima de acuerdo con la ubicación geográfica tipeada en el campo de texto.
4. Puedes hacer _refactoring_ del código, y mover la función `fetchWeather` fuera del hook, de manera que pueda ser compartida por los componentes `Home` y `Search`. Puedes modificar esta función para que reciba como parámetro un string con el nombre de la ubicación geográfica que se desea consultar.
5. Puedes ajustar los estilos utilizados en la aplicación variando colores en `src/theme.js`.

