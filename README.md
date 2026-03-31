# Prueba Técnica Full-Stack (Laravel + React)

Solución al reto técnico para la gestión de Clientes (Customers) y Órdenes (Orders) con relación 1:N. Este proyecto utiliza una arquitectura de Monorepo, integrando tanto el servidor (Backend) como el cliente (Frontend) en este mismo repositorio.

## Tecnologías y Frameworks Utilizados

- **Backend:** Laravel 10.x (PHP Framework)
- **Frontend:** React 18.x (Vite)
- **Base de Datos:** MySQL

## Requisitos Previos

Para ejecutar el proyecto se requiere tener instalado:
- **PHP:** >= 8.1
- **Composer:** >= 2
- **Node.js:** >= 18
- **NPM:** >= 9
- **MySQL:** Motor de base de datos local

## 1. Configuración de la Base de Datos

1. Iniciar el servidor MySQL (XAMPP o similar).
2. Crear una base de datos vacía llamada `db_gestion_pedidos`.
3. Se recomienda el cotejamiento `utf8mb4_unicode_ci`.

## 2. Cómo levantar el Backend (Laravel)

Ubicarse en la raíz del proyecto y ejecutar los siguientes comandos para preparar la API:

```bash
# Ingresar a la carpeta del backend
cd backend

# Instalar las dependencias de PHP
composer install

# Crear el archivo de configuración de entorno
*Abre el .env y configura tus credenciales de base de datos (DB_DATABASE, DB_USERNAME, DB_PASSWORD).
cp .env.example .env

# Generar la llave única de la aplicación
php artisan key:generate

# Configurar credenciales de DB en el archivo .env y ejecutar las migraciones
php artisan migrate:fresh

# Levantar el servidor de desarrollo para la API
php artisan serve
```
## 3. Cómo levantar el Frontend (React)
En una terminal independiente, ubicarse en la raíz del monorepo y ejecutar:
```bash
# Ingresar a la carpeta del frontend:
cd frontend

# Instalar las dependencias de Node:
npm install

# Iniciar el servidor de desarrollo de Vite.
npm run dev
```
## 4. Estructura del Proyecto (Monorepo)
* Backend: Contiene la lógica del servidor, modelos (Customer, Order), controladores y migraciones desarrolladas en Laravel.

* Frontend: Contiene la interfaz de usuario, componentes y servicios de consumo de API desarrollados en React.
