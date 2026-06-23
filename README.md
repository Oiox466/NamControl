# NamControl
# TianguisStock - NamControl

## Descripción del Proyecto

TianguisStock es una aplicación web de control de inventarios y visualización de productos para comerciantes de tianguis. El proyecto surgió como una solución para digitalizar la oferta de los puestos locales, permitiendo a los comerciantes gestionar su stock en tiempo real y a los clientes visualizar los productos disponibles y sus precios en diferentes divisas. La aplicación destaca por su interfaz responsiva, segura y fácil de usar, adaptada a las necesidades de un entorno de comercio tradicional.

Este proyecto fue desarrollado bajo el nombre de la organización "NamControl" como parte de un laboratorio de desarrollo de software.

---

## Características Principales (Features)

El sistema se divide en dos módulos principales: uno público para clientes y otro privado para comerciantes.

### Para el Cliente (Módulo Público)

* **Visualización de Puestos:** Listado completo de los locales del tianguis registrados.
* **Búsqueda Dinámica:** Filtro de puestos por nombre o categoría.
* **Detalle del Puesto:** Vista del inventario actual de un local específico.
* **Conversor de Divisas:** Los precios se muestran en Pesos Mexicanos (MXN) por defecto, pero el usuario puede cambiarlos a Dólares (USD) o Euros (EUR) en tiempo real, gracias a la integración con una API externa de tasas de cambio.
* **Iconos Profesionales:** La interfaz utiliza iconos vectoriales profesionales (`react-icons`) en lugar de emojis nativos para una experiencia de usuario superior.

### Para el Comerciante (Módulo Privado/Dashboard)

* **Autenticación Segura:** Sistema de registro y login con hashing de contraseñas (Bcrypt).
* **Gestión de Inventario (CRUD):**
* **Crear:** Añadir nuevos productos con nombre, precio y stock.
* **Leer:** Visualizar todo el stock actual en una tabla estilizada.
* **Actualizar:** Editar los detalles de productos existentes.
* **Eliminar:** Borrar productos del inventario con confirmación.


* **Productos Estrella (Destacados):** Los comerciantes pueden marcar hasta 3 productos como "Estrella" para que se muestren de forma destacada en la vista pública del puesto. El backend valida estrictamente este límite.

---

## Arquitectura y Tecnologías Utilizadas

El proyecto sigue una arquitectura Cliente-Servidor (Full Stack).

### Frontend (Client-side)

* **React:** Biblioteca de JavaScript para construir interfaces de usuario.
* **React Router:** Gestión de rutas y navegación.
* **React Icons:** Suite de iconos vectoriales profesionales.
* **CSS Puro:** Estilos personalizados, incluyendo un selector de divisas premium y animaciones.

### Backend (Server-side)

* **Node.js:** Entorno de ejecución para el servidor.
* **Express:** Framework web para Node.js.
* **mssql:** Driver para la conexión y consultas parametrizadas con SQL Server.
* **bcryptjs:** Biblioteca para el hashing y comparación de contraseñas.
* **cors:** Middleware para habilitar el intercambio de recursos de origen cruzado (CORS).

### Base de Datos

* **Microsoft SQL Server:** Sistema de gestión de base de datos relacional.

### APIs Externas

* **ExchangeRate-API:** Utilizada en el frontend para obtener tasas de cambio de divisas actualizadas en tiempo real.

---

## Seguridad

El proyecto implementa prácticas de seguridad estándar de la industria:

* **Protección contra Inyección SQL:** El backend utiliza **Consultas Preparadas (Parametrizadas)** mediante la librería `mssql`. Toda entrada de usuario se trata como datos, no como código ejecutable.
* **Hashing de Contraseñas:** Las contraseñas de los comerciantes se procesan con **Bcrypt (hashing unidireccional)** e incorporan un **Salt** único antes de guardarse en la base de datos. El servidor no almacena contraseñas en texto plano.
* **Validación en el Backend:** Todas las reglas de negocio (como el límite de 3 productos estrella) y los tipos de datos se validan en el servidor para proteger la integridad de la base de datos.

---

## Instalación y Configuración

### Requisitos Previos

* Node.js instalado.
* Microsoft SQL Server configurado y en ejecución.

### Configuración de la Base de Datos

1. Ejecuta el script de creación de la base de datos (generalmente provisto en la carpeta del backend) en tu instancia de SQL Server.
2. Asegúrate de configurar la conexión en el backend.

### Configuración del Backend

1. Navega a la carpeta del backend:
```bash
cd backend

```


2. Instala las dependencias:
```bash
npm install

```


3. Crea un archivo `.env` o configura tus variables de entorno para la conexión a la base de datos (ejemplo: `DB_USER`, `DB_PASSWORD`, `DB_SERVER`, `DB_DATABASE`).
4. Inicia el servidor:
```bash
npm start

```


*El servidor debería correr en `http://localhost:5000*`.

### Configuración del Frontend

1. Navega a la carpeta del frontend:
```bash
cd frontend

```


2. Instala las dependencias:
```bash
npm install

```


3. Inicia la aplicación:
```bash
npm start

```


*La aplicación debería abrirse en `http://localhost:3000*`.

---

## Estructura del Proyecto (Puntos Clave)

### Frontend (`/src`)

* **/components:** Componentes reutilizables como `Navbar`, `ProductCard`, `TianguisCard`.
* **/pages:** Vistas principales de la aplicación.
* **`Home.jsx`:** Listado público de puestos.
* **`Puesto.jsx`:** Vista del inventario de un puesto con conversor de divisas.
* **`Dashboard.jsx`:** Panel privado de gestión para el comerciante.
* **`Login.jsx`:** Formulario de inicio de sesión.
* **`Register.jsx`:** Formulario de registro de nuevos puestos.



---

## Autores

* **NamControl**

*Proyecto desarrollado para fines educativos.*

```

```