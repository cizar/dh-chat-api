# Chat REST API

## Para comenzar

Instalar dependencias

```
npm install
```

Iniciar servidor local de desarrollo

```
npm start
```
## Configurar

Se puede configurar la aplicación creando el archivo `.env` en la raíz del proyecto

```
# .env

PORT=8080
HOST=127.0.0.1

MONGODB_URI=mongodb://user:pass@hostname:port/dbname

SALT_WORK_FACTOR=10

JWT_SECRET=S3cr3t!
JWT_ISSUER=dh-chat-api
JWT_EXPIRES_IN=1h
```

O bien pasando la configuración como variables del entorno

```
MONGODB_URI=mongodb://user:pass@hostname:port/dbname npm start
```

## Endpoints

| URL                                      | Método     | Descripción                         |
|:-----------------------------------------|:----------:|:------------------------------------|
| `/api/auth`                              | **POST**   | Crear certificado de identidad      |
| `/api/users`                             | **POST**   | Registrar un nuevo usuario          |
| `/api/users/:id`                         | **HEAD**   | Verificar que existe el usuario     |
| `/api/users/:id`                         | **GET**    | Obtener información del usuario     |
| `/api/channels`                          | **POST**   | Crear un cuarto de chat             |
| `/api/channels`                          | **GET**    | Listado de cuartos de chat          |
| `/api/channels/:id`                      | **GET**    | Obtener información del canal       |
| `/api/channels/:id`                      | **PATCH**  | Cambiar el tópico del canal         |
| `/api/channels/:id`                      | **DELETE** | Cerrar un canal de chat             |
| `/api/channels/:id/members`              | **POST**   | Unirse a un canal                   |
| `/api/channels/:id/members`              | **GET**    | Obtener los participantes del canal |
| `/api/channels/:id/members`              | **DELETE** | Salir del canal                     |
| `/api/channels/:id/messages`             | **POST**   | Enviar un mensaje al canal          |
| `/api/channels/:id/messages?since=:id`   | **GET**    | Obtener los mensajes del canal      |
