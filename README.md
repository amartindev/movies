# Movies App 🎬

Esta es una aplicación web simple para buscar películas utilizando la API de The Movie Database (TMDb), desarrollada con Next.js.

## Version Live

https://antonio-movies.netlify.app/

## Características

-   **Búsqueda de Películas:** Permite buscar películas por título.
-   **Visualización de Resultados:** Muestra la información básica de las películas encontradas (título, descripción, imagen).
-   **Diseño Responsivo:** Se adapta a diferentes tamaños de pantalla.
-   **Desarrollado con Next.js:** Aprovecha las ventajas del framework React para la creación de aplicaciones web.

## Tecnologías Utilizadas

-   React
-   Next.js
-   HTML
-   Tailwind CSS
-   JavaScript
-   API de The Movie Database (TMDb)

## Configuración

Para ejecutar esta aplicación correctamente, necesitas seguir estos pasos:

1.  **Clona el repositorio:**
    ```bash
    git clone https://github.com/amartindev/movies.git
    cd movies
    ```

2.  **Instala las dependencias:**
    ```bash
    npm install
    ```

3.  **Obtén un token de API de TMDb:**
    -   Ve al sitio web de [The Movie Database](https://www.themoviedb.org/).
    -   Crea una cuenta o inicia sesión si ya tienes una.
    -   Dirígete a la sección de configuración de la API (normalmente en "Settings" -> "API").
    -   Genera un nuevo token de API (v3 auth).

4.  **Crea un archivo `.env.local`:**
    -   En la raíz del proyecto, crea un nuevo archivo llamado `.env.local`.
    -   Dentro del archivo `.env.local`, agrega la siguiente línea, reemplazando `...` con el token y la api key que obtuviste de TMDb:

        ```env
        NEXT_PUBLIC_TMDB_API_KEY=...
        NEXT_PUBLIC_TMDB_ACCESS_TOKEN=...
        ```

5.  **Ejecuta el servidor de desarrollo:**
    ```bash
    npm run dev
    ```
    Esto iniciará el servidor de desarrollo de Next.js y podrás acceder a la aplicación en tu navegador en la dirección que se te indique en la consola (normalmente `http://localhost:3000`).
