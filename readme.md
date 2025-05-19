# 📦 Ecommerce Server

Backend service for an ecommerce application built using **Node.js**, **Express**, **Sequelize**, and **MySQL**, configured for both **development** and **production** environments. The service is containerized using **Docker Compose**.

---

## 🚀 Features

- RESTful API with route grouping under `/api/v1`
- Sequelize ORM with MySQL
- Environment-specific configurations using `.env.dev` and `.env.prod`
- Nodemailer support for transactional emails
- JWT-based authentication
- Centralized error handling middleware
- File upload support using `multer`
- Dockerized for seamless deployment
- Code quality maintained via ESLint + Prettier + Husky

---

## 📁 Project Structure

Refer to the folder structure in the project tree:

- `middlewares/` – Custom Express middleware (e.g., error handler)
- `models/` – Sequelize models
- `repositories/` – Business logic separated from route handlers
- `routes/` – Express route definitions
- `services/` – Service layer to interact with repositories or external APIs
- `utils/` – Utility functions and error classes
- `public/uploads` – File uploads (static serving)
- `index.js` – App entry point

---

## 🧪 Environment Variables

Use the following configuration files:

### `.env.dev`

```env
DB_NAME=ecommerce_app
DB_USER=root
DB_PASSWORD=root
DB_HOST=db
DB_DIALECT=mysql
PORT=5000
CLIENT_URL=http://localhost:5173
EMAIL_USER=email@gmail.com
EMAIL_PASS=secret_password
JWT_SECRET=thisismySecretKey
```

### `.env.prod`

```env
DB_NAME=ecommerce_app
DB_USER=root
DB_PASSWORD=yourProdPassword
DB_HOST=prod-db-host
DB_DIALECT=mysql
PORT=5000
CLIENT_URL=https://your-client-url.com
EMAIL_USER=yourProdEmail@gmail.com
EMAIL_PASS=yourProdEmailPassword
JWT_SECRET=thisIsYourProdJwtSecretKey
```

---

## 🐳 Running with Docker Compose

To build and start the containers:

```bash
docker-compose up --build
```

> Make sure to configure your database container as `db` in your `docker-compose.yml` for `DB_HOST=db` to work.

---

## 📬 API Base URL

All APIs are prefixed with:

```
http://localhost:5000/api/v1

```

## 📬 API Reference

You can explore all endpoints in this [Postman Collection](https://postman.co/workspace/My-Workspace~2535fc12-6ff7-4987-882e-bc4aee5b7e88/collection/44751520-9ec99e39-4db1-4a66-b0ea-f5ab721ff177?action=share&creator=44751520).

### Available Routes:

| Resource  | Endpoint Prefix     |
| --------- | ------------------- |
| Products  | `/api/v1/products`  |
| Auth      | `/api/v1/auth`      |
| Upload    | `/api/v1/upload`    |
| Addresses | `/api/v1/addresses` |
| Cart      | `/api/v1/cart`      |

---

## 🧱 Scripts

| Script        | Command                | Description                 |
| ------------- | ---------------------- | --------------------------- |
| Dev Start     | `npm run dev`          | Start server in development |
| Prod Start    | `npm start`            | Start server in production  |
| Lint          | `npm run lint`         | Run ESLint                  |
| Format        | `npm run format`       | Format with Prettier        |
| Format Check  | `npm run format:check` | Check formatting            |
| Husky Prepare | `npm run prepare`      | Install husky hooks         |

---

## ✅ Requirements

- Node.js ≥ 18.x
- Docker & Docker Compose
- MySQL database (or containerized DB in Compose)

---

## 📫 Contact

For any issues or contributions, feel free to create a PR or raise an issue on the [GitHub repository](#).

---

## 📜 License

This project is licensed under the [ISC License](LICENSE).

```

```
