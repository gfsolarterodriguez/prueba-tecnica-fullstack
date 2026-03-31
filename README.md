# Prueba Técnica Full-Stack (Laravel + React)

Solución al reto técnico implementando un API REST para la gestión de Clientes (Customers) y Órdenes (Orders) con relación 1:N.

## Requisitos Previos
- PHP >= 8.1
- Composer
- Node.js >= 18
- MySQL

## 1. Configuración de la Base de Datos
1. Enciende tu servidor MySQL (por ejemplo, desde el panel de XAMPP).
2. Abre tu gestor de base de datos preferido (phpMyAdmin, DBeaver, TablePlus, etc.).
3. Crea una base de datos vacía llamada `db_gestion_pedidos` (cotejamiento recomendado: `utf8mb4_unicode_ci`).

## 2. Cómo levantar el Backend (Laravel)
Abre una terminal, ubícate en la raíz del proyecto y ejecuta los siguientes comandos para preparar la API:

```bash
# Ingresar a la carpeta del backend
cd backend

# Instalar las dependencias de PHP
composer install

# Duplicar el archivo de entorno (si no existe el .env)
cp .env.example .env

# Generar la llave de la aplicación
php artisan key:generate

# Crear las tablas (clientes y ordenes) en MySQL
php artisan migrate

# Levantar el servidor de la API
php artisan serve

## 3. Cómo levantar el Frontend (React)
# Ingresar a la carpeta del frontend
cd frontend

# Instalar las dependencias de Node (React, Axios, etc.)
npm install

# Levantar el entorno de desarrollo de Vite
npm run dev

## 4. Evidencias de Funcionamiento
Al ingresar a la aplicación web, el evaluador podrá comprobar:

#CRUD Completo de Clientes: Capacidad de registrar, visualizar, editar y eliminar clientes reales en la base de datos a través de peticiones asíncronas con Axios.

#CRUD Completo de Órdenes: Gestión dinámica del listado de órdenes conectadas a la API REST.

#Manejo de Estados: La interfaz (React) se actualiza de manera instantánea al ejecutar acciones (Crear/Editar/Borrar) sin necesidad de recargar la página, gracias al uso de Hooks (useState, useEffect).

#Manejo de Errores: Validaciones en el frontend y capturas de error en las peticiones HTTP (try/catch).