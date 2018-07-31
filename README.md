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

Inciar servidor configurando la conexión a MongoDB

```
MONGODB_URI=mongodb://user:password@hostname:27017/dbname npm start
```

## Endpoints

| URL                            | Método     | Descripción                         |
|:-------------------------------|:----------:|:------------------------------------|
| `/api/auth`                    | **POST**   | Crear certificado de identidad      |
| `/api/users`                   | **POST**   | Registrar un nuevo usuario          |
| `/api/users/:id`               | **GET**    | Obtener información del usuario     |
| `/api/channels`                | **POST**   | Crear un cuarto de chat             |
| `/api/channels`                | **GET**    | Listado de cuartos de chat          |
| `/api/channels/:id`            | **GET**    | Obtener información del canal       |
| `/api/channels/:id`            | **PATCH**  | Cambiar el tópico del canal         |
| `/api/channels/:id`            | **DELETE** | Cerrar un canal de chat             |
| `/api/channels/:id/members`    | **POST**   | Unirse a un canal                   |
| `/api/channels/:id/members`    | **GET**    | Obtener los participantes del canal |
| `/api/channels/:id/members`    | **DELETE** | Salir del canal                     |
| `/api/channels/:id/messages`   | **POST**   | Enviar un mensaje al canal          |
| `/api/channels/:id/messages`   | **GET**    | Obtener los eventos del canal       |
