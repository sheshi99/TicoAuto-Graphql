# TicoAuto-Backend GraphQL

## Descripción

Este proyecto corresponde al backend **GraphQL** de TicoAuto, una plataforma para la publicación y búsqueda de vehículos en venta.

Este repositorio fue separado del backend REST con el objetivo de mantener GraphQL de forma independiente. Permite consultar información de vehículos mediante un único endpoint GraphQL, reutilizando los modelos de MongoDB.

---

## Tecnologías utilizadas

- **Node.js**: Entorno de ejecución para backend.
- **Express.js**: Framework utilizado para levantar el servidor.
- **Apollo Server**: Servidor GraphQL.
- **GraphQL**: Lenguaje de consulta para obtener datos específicos.
- **MongoDB**: Base de datos NoSQL.
- **Mongoose**: ORM para MongoDB.
- **JWT**: Para validar usuarios autenticados.
- **dotenv**: Para manejar variables de entorno.
- **cors**: Middleware para permitir solicitudes entre frontend y backend.

---

## Funcionalidades principales

- **Consulta de vehículos**:
  - Obtener vehículos registrados.
  - Buscar vehículos por filtros.
  - Consultar vehículos por ID.

- **Chat (Preguntas y Respuestas)**:
  - Obtener las preguntas realizadas a los vehículos.
  - Obtener las respuestas asociadas a cada pregunta.

- **Filtros de búsqueda**:
  - Filtrado por marca, modelo, precio, año y estado.

- **Autenticación en GraphQL**:
  - Validación del token JWT enviado desde el frontend.
  - Uso de contexto para identificar al usuario autenticado.

---

## Endpoint principal

```txt
/graphql
```

---

## Diagrama arquitectura de servicios

![Diagrama de Arquitectura de Servicios](diagrama/Diagrama%20de%20servicios.png)

---

## Instalación

### 1. Clonar el repositorio

Primero, debes clonar el repositorio:

```bash
git clone https://github.com/sheshi99/TicoAuto-Graphql
```

Segundo, debes inicializar node.js:

```bash
npm install 
```

Luego, Tienes que crear un archivo .env, donde van todas tus variables de entorno.

### Ejemplo:

```bash
PORT=4000
MONGO_URI=mongodb://localhost:27001/auto
JWT_SECRET=your_jwt_secret_key
```

