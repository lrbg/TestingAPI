
# Test API Automation Project (Including Performance Tests)

## Objetivo del Proyecto

Este proyecto tiene como objetivo la automatización de pruebas de una API RESTful, utilizando el **Swagger Pet Store** como API de ejemplo. El proyecto se divide en dos partes:

1. **Pruebas funcionales automatizadas**: Validación de operaciones CRUD en la API.
2. **Pruebas de rendimiento**: Evaluación del rendimiento de la API utilizando **K6**.

## Composición del código

El código está organizado en un entorno **Gradle** con la siguiente estructura:

```
├── build.gradle
├── gradlew
├── gradlew.bat
├── gradle/
├── src/
│   └── test/
│       └── java/
│           └── PetStoreTests.java
├── performance-tests.js
└── README.md
```

### Archivos principales:

- **`build.gradle`**: Archivo de configuración de Gradle que gestiona las dependencias y define las tareas de prueba.
- **`gradlew` y `gradlew.bat`**: Scripts para ejecutar Gradle.
- **`src/test/java/PetStoreTests.java`**: Archivo que contiene los casos de prueba automatizados para la API de Pet Store.
- **`performance-tests.js`**: Archivo que contiene las pruebas de rendimiento utilizando K6.
- **`README.md`**: Documento que estás leyendo actualmente.

## Dependencias

Este proyecto utiliza las siguientes dependencias:

- **Java 14** o superior.
- **Gradle 7.5**: Sistema de compilación.
- **JUnit 4.13.2**: Framework para pruebas unitarias.
- **Rest Assured 4.4.0**: Herramienta para realizar pruebas automatizadas en APIs RESTful.
- **K6 0.31.1**: Herramienta para pruebas de rendimiento.

## Tecnologías y versiones

- **Java**: Versión mínima 14.
- **Gradle**: 7.5.
- **JUnit**: 4.13.2.
- **Rest Assured**: 4.4.0.
- **K6**: 0.31.1.

## Pruebas automatizadas

### Pruebas funcionales automatizadas

En el archivo `PetStoreTests.java`, se encuentran las pruebas para validar las operaciones básicas de la API. Las pruebas incluyen:

1. **Prueba GET (Obtener mascotas disponibles)**:
   - **URL**: `https://petstore.swagger.io/v2/pet/findByStatus?status=available`
   - **Validación**: Se valida que el código de respuesta sea 200 y que la lista de mascotas esté disponible.

2. **Prueba POST (Crear una nueva mascota)**:
   - **URL**: `https://petstore.swagger.io/v2/pet`
   - **Validación**: Se valida que el código de respuesta sea 200 y que la mascota se haya creado correctamente.

3. **Prueba PUT (Actualizar una mascota)**:
   - **URL**: `https://petstore.swagger.io/v2/pet`
   - **Validación**: Se valida que el código de respuesta sea 200 y que la mascota se haya actualizado correctamente.

4. **Prueba DELETE (Eliminar una mascota)**:
   - **URL**: `https://petstore.swagger.io/v2/pet/{petId}`
   - **Validación**: Se valida que el código de respuesta sea 200 y que la mascota se haya eliminado correctamente.

### Pruebas de rendimiento

El archivo `performance-tests.js` incluye diferentes tipos de pruebas de rendimiento utilizando **K6**.

1. **Prueba de lectura (GET)**:
   - Objetivo: Medir el tiempo de respuesta para obtener todas las mascotas disponibles.
   - URL: `https://petstore.swagger.io/v2/pet/findByStatus?status=available`.
   - Evaluación: La prueba verifica que la API puede manejar solicitudes de lectura de manera eficiente.

2. **Prueba de creación (POST)**:
   - Objetivo: Evaluar el rendimiento al crear nuevas mascotas en la API.
   - URL: `https://petstore.swagger.io/v2/pet`.
   - Evaluación: Se mide el tiempo necesario para crear una nueva entrada en la API.

3. **Prueba de actualización (PUT)**:
   - Objetivo: Medir la capacidad de la API para actualizar los datos de una mascota.
   - URL: `https://petstore.swagger.io/v2/pet`.
   - Evaluación: Se verifica la eficiencia en la actualización de datos.

4. **Prueba de eliminación (DELETE)**:
   - Objetivo: Evaluar el rendimiento de la API al eliminar una mascota.
   - URL: `https://petstore.swagger.io/v2/pet/{petId}`.
   - Evaluación: Se mide el tiempo que tarda la API en eliminar una entrada.

5. **Prueba de estrés (Stress Test)**:
   - Objetivo: Probar la API bajo carga pesada con múltiples usuarios y solicitudes concurrentes.
   - URL: `https://petstore.swagger.io/v2/pet/findByStatus?status=available`.
   - Evaluación: La prueba mide el rendimiento de la API cuando se ejecutan múltiples solicitudes GET al mismo tiempo.

## Interpretación de los resultados de las pruebas de rendimiento

Después de ejecutar el comando `k6 run performance-tests.js`, los resultados proporcionan métricas clave:

- **`http_req_duration`**: Mide el tiempo total que tarda la API en responder a una solicitud.
  - **Promedio (avg)**: Indica el tiempo promedio de respuesta.
  - **Mínimo (min)** y **Máximo (max)**: Muestran los tiempos de respuesta más rápidos y lentos.
  
- **`http_reqs`**: Número total de solicitudes realizadas durante la prueba.

- **`vus`**: Número de usuarios virtuales que están realizando solicitudes concurrentes.

- **`data_sent`** y **`data_received`**: La cantidad de datos enviados y recibidos durante la prueba.

- **Pruebas exitosas (`✓`)** y fallidas (`✗`) muestran la cantidad de solicitudes que devolvieron el código de estado esperado (como 200).

Ejemplo de interpretación de resultados:

```
checks.....................: 100.00% ✓ 290     ✗ 0   
http_req_duration..........: avg=34.07ms min=30.21ms  med=32.01ms  max=93.98ms
vus........................: 10         min=10      max=10
```

Este resultado indica que todas las solicitudes fueron exitosas (`100% checks passed`), con un tiempo de respuesta promedio de 34.07ms y un tiempo máximo de 93.98ms. Esto sugiere que la API respondió eficientemente bajo las condiciones de carga.

## Comandos para la instalación y ejecución

### Instalación de dependencias

Para instalar las dependencias y compilar el proyecto, ejecuta el siguiente comando en la terminal:

```bash
./gradlew build
```

### Ejecución de las pruebas funcionales

```bash
./gradlew test
```

### Ejecución de las pruebas de rendimiento

Para ejecutar las pruebas de rendimiento con K6:

```bash
k6 run performance-tests.js
```

### Despliegue en GitHub Actions

Si deseas integrar este proyecto con **GitHub Actions** para pruebas automáticas en cada commit, sigue estos pasos:

1. Crea un archivo `.github/workflows/gradle.yml` en tu repositorio con el siguiente contenido:

```yaml
name: Java CI with Gradle

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v2
    - name: Set up JDK 14
      uses: actions/setup-java@v1
      with:
        java-version: '14'
    - name: Grant execute permission for gradlew
      run: chmod +x gradlew
    - name: Build with Gradle
      run: ./gradlew build
    - name: Run tests
      run: ./gradlew test
```

## Conclusión

Este proyecto cubre tanto las pruebas funcionales como las pruebas de rendimiento para una API RESTful. Las pruebas de rendimiento se han diseñado para evaluar el comportamiento de la API bajo diferentes cargas y tipos de solicitudes, asegurando su capacidad para manejar el tráfico de manera eficiente.
