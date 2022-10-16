# How To

## Setup

1. Initialize the project: `npm init`
2. Install packages:
    - clasp: `npm install -D @google/clasp`
    - clasp types: `npm i -D @types/google-apps-script`
    - parcel: `npm i -D parcel`
    - react and react-dom: `npm i react react-dom`
    - react types: `npm install -D @types/react @types/react-dom`
3. Enable the Google Apps Script API [here](https://script.google.com/home/usersettings)
4. Create a `gas` folder and `src` folder
5. Add scripts to package.json:

    ```json
    "scripts": {
        "login": "clasp login",
        "logout": "clasp logout",
        "create": "clasp create --title 'tidystats add-in' --rootDir gas",
        "pull": "clasp pull",
        "push": "clasp push",
        "start": "clasp push --watch",
        "open": "clasp open",
        "dev": "parcel src/*/*.html --dist-dir gas",
        "build": "parcel build src/*/*.html --dist-dir gas"
      }
    ```

6. Create a Google Apps Script project with `npm create --rootDir gas`
7. Move `.clasp.json` to the main directory
8. Add TypeScript by creating `tsconfig.json` in the main folder with, for example, the following content:

    ```json
    {
      "compilerOptions": {
        "target": "es6",
        "jsx": "react-jsx",
        "strict": true,
        "forceConsistentCasingInFileNames": true
      },
      "include": ["src"]
    }
    ```

## Usage

1. Create an HTML file in `src`, probably in a subfolder, with the following template (note how the CSS and JS is imported):

    ```html
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <title>tidystats</title>
        <style>
            @import "styles.css";
        </style>
    </head>

    <body>
        <div id="container">
            <script type="module">
                import "./app.tsx"
            </script>
    </body>

    </html>
    ```

2. Add the following CSS to the header: `<link rel="stylesheet" href="https://ssl.gstatic.com/docs/script/css/add-ons1.css">`
3. Add React components, starting with the following template:

    ```js
    import { createRoot } from "react-dom/client"
    import { App } from "./App"

    const container = document.getElementById("app-container")
    const root = createRoot(container!)

    root.render(<App />)
    ```
4. Run `npm run watch` to begin pushing changes to Google
5. Run `npm run dev` to begin development. `parcel` will keep everything up to date in the `gas` folder, which will automatically be pushed to Google
6. Run `npm run build` to create the final build version