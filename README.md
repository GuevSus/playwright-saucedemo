# Playwright + Cucumber — SauceDemo Automation Suite

Suite de pruebas automatizadas de extremo a extremo (E2E) para la aplicación web [SauceDemo](https://www.saucedemo.com/), desarrollada como solución al reto técnico de automatización de **Inetum**. 

Este proyecto implementa pruebas de comportamiento (BDD) utilizando **Playwright** como motor de automatización y **Cucumber.js** como ejecutor de pruebas, todo estructurado bajo el patrón de diseño **Page Object Model (POM)** para garantizar legibilidad, escalabilidad y fácil mantenimiento.

---

## Tecnologías y Herramientas

* **Core:** JavaScript (ES6+)
* **Framework de Automatización:** Playwright
* **Enfoque BDD:** Cucumber.js (Gherkin)
* **Reportes:** Cucumber HTML Reporter

---

## Estructura del Proyecto

El diseño del proyecto mantiene una separación estricta entre la definición de los escenarios de negocio y la lógica técnica de automatización:

```text
├── features/               # Escenarios de prueba en lenguaje Gherkin (.feature)
│   ├── checkout.feature
│   └── login.feature
├── pages/                  # Localizadores y acciones de la UI (Page Object Model)
│   ├── CartPage.js
│   ├── CheckoutPage.js
│   ├── InventoryPage.js
│   └── LoginPage.js
├── step-definitions/       # Mapeo y traducción de los pasos de Gherkin a código
│   └── sauceDemoSteps.js
├── support/                # Ganchos de ciclo de vida (Before / After) y entorno
│   └── hooks.js
├── reports/                # Reportes gráficos generados tras la ejecución
│   └── cucumber-report.html
├── cucumber.js             # Configuración global de Cucumber
└── package.json            # Scripts de ejecución y dependencias del proyecto

```

---

## Credenciales de Prueba

Para la ejecución de los escenarios automatizados en el entorno de pruebas de SauceDemo, se utilizan las siguientes credenciales estándar expuestas públicamente por la aplicación:

| Usuario | Contraseña | Rol / Estado |
| --- | --- | --- |
| `standard_user` | `secret_sauce` | Usuario estándar (Flujo óptimo) |
| `locked_out_user` | `secret_sauce` | Usuario bloqueado (Prueba de error) |

---

## Instalación y Configuración

### Requisitos Previos

* [Node.js](https://nodejs.org/) (Versión 18 o superior recomendada)
* Administrador de paquetes `npm` (incluido con Node.js)

### Pasos

1. Clonar el repositorio en tu máquina local:

```bash
   git clone https://github.com/GuevSus/playwright-saucedemo.git

```

2. Acceder al directorio del proyecto:

```bash
   cd playwright-saucedemo

```

3. Instalar todas las dependencias requeridas:

```bash
   npm install

```

4. Instalar los navegadores que utiliza Playwright:
```bash
   npx playwright install chromium
 
```

---

## Ejecución de las Pruebas

El proyecto incluye scripts configurados en el `package.json` para ejecutar los diferentes flujos mediante etiquetas de Cucumber:

### Ejecutar la suite completa (Modo oculto / Headless)

```bash
npx cucumber-js

```

### Ejecutar flujos específicos por módulo

* **Solo Login:**
    ```bash
    npm run test:login
    ```
* **Solo Carrito de Compras:**
    ```bash
    npm run test:cart
    ```
* **Solo Proceso de Checkout:**
    ```bash
    npm run test:checkout
    ```
* **Solo escenarios etiquetados como Compra:**
    ```bash
        npm run test:compra
    ```

### Ejecutar viendo el navegador (Modo Headed — Windows PowerShell)
```powershell
$env:HEADLESS="false"; npx cucumber-js

```

---

## Reportes de Prueba

Cada vez que finaliza una ejecución, se genera de manera automática un reporte visual dinámico en formato HTML.

Puedes abrirlo directamente desde tu navegador web abriendo el archivo ubicado en la siguiente ruta:

```text
reports/cucumber-report.html
```

---

### Captura de pantalla automática en fallos
 
Cuando un escenario **falla**, el hook `After` (definido en `support/hooks.js`) toma automáticamente una captura de pantalla del estado del navegador en ese momento y la adjunta al reporte HTML. Esto permite diagnosticar visualmente qué ocurrió sin necesidad de volver a ejecutar la prueba.
 
Para verla, abre `reports/cucumber-report.html`, busca el escenario en rojo y expande la sección **"hooks"** ubicada debajo del error — ahí aparece la imagen adjunta.
 
### Timeout por defecto
 
El tiempo máximo de espera configurado para cada paso (step) es de **30 segundos** (`setDefaultTimeout(30000)` en `support/hooks.js`). Si necesitas agregar pasos que tarden más en completarse, ajusta este valor en dicho archivo.
 
---

## Cobertura de Escenarios

| Módulo | Escenario de Prueba | Etiqueta (Tag) | Estado |
| --- | --- | --- | --- |
| **Autenticación** | Login exitoso con credenciales válidas | `@login` | ✅ |
| **Autenticación** | Intento de login con credenciales incorrectas | `@login` | ✅ |
| **Inventario** | Agregar productos seleccionados al carrito | `@cart` | ✅ |
| **Inventario** | Validación de persistencia de productos en el carrito | `@cart` | ✅ |
| **Checkout** | Flujo completo de compra (End-to-End) con éxito | `@checkout` | ✅ |

---

## Buenas Prácticas de Automatización Aplicadas

* **Page Object Model (POM):** Reduce la duplicación de código y encapsula la estructura de la página web. Si la interfaz cambia, solo se actualiza la clase `Page` correspondiente.
* **Aislamiento de Pruebas (Test Isolation):** Cada escenario de Cucumber se ejecuta en un contexto de navegador totalmente limpio (`BrowserContext`), asegurando que ninguna prueba dependa del estado de otra.
* **Estrategia de Selectores Robustos:** Se prioriza el uso de atributos estables como `data-test` sobre selectores CSS o XPath complejos que tienden a romperse fácilmente.
* **Espera Inteligente (Auto-waiting):** Eliminación total de esperas forzadas e ineficientes (`sleep`), aprovechando la sincronización nativa de Playwright basada en promesas.