# API Monitoring Platform

A lightweight service monitoring system that periodically checks API endpoints, measures response latency, and detects downtime conditions.

The platform allows users to create monitors, run manual health checks, and view historical results and alerts.  
This project demonstrates backend service design, asynchronous operations, and frontend–backend integration in a real-world monitoring scenario.

---

## ✨ Features

- Create and manage monitors
- Automatic periodic health checks
- Manual health check trigger
- Response status & latency measurement
- Alert generation based on failures
- Historical check results
- Monitoring dashboard (React)
- RESTful API architecture

---

## 🧰 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- Axios

### Frontend
- React (Vite)
- Axios API service layer

### Development & Testing Tools
- Postman (API testing)
- MongoDB Compass (database inspection)
- Nodemon (development runtime)

---

## 🧠 System Overview

The system monitors HTTP endpoints by sending periodic requests and analyzing their responses.

### Core Models
- **Monitor** → defines target endpoint and configuration
- **CheckResult** → stores each health check result
- **Alert** → generated when service becomes unhealthy

### Services
- `checkService` — performs HTTP request and records result
- `alertService` — evaluates recent checks and creates alerts
- `schedulerService` — runs automatic periodic checks
- `retentionService` — cleans old monitoring records

Frontend communicates with the backend through REST API endpoints.

---

## 📸 Screenshots

> Add your screenshots here (place images under `docs/screenshots/`)

### Monitors Dashboard
![Monitors Screenshot](pictures/uygulamaIciGorsel1.png)

### Check Now Button
![Monitors Screenshot](pictures/uygulamaIciGorsel2.png)

### Monitor Detail
![Monitors Screenshot](pictures/uygulamaIciGorsel3.png)

---

## 🚀 Getting Started

### 1. Clone repository
```bash
git clone https://github.com/EmirBaranKadirhan/node-api-monitor.git
cd node-api-monitor
