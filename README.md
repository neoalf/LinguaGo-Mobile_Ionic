# LinguaGo Mobile 📱

Aplicación móvil de aprendizaje de idiomas desarrollada con **Ionic + React + Capacitor**.

## 🚀 Inicio Rápido

### Requisitos Previos

- Node.js 16+ instalado
- Backend de LinguaGo corriendo en `http://localhost:4000`

### Instalación

```bash
# Instalar dependencias
npm install

# Iniciar en modo desarrollo
ionic serve
```

La aplicación se abrirá en `http://localhost:8100`

## 📱 Características

- ✅ Autenticación (Login/Register)
- ✅ Dashboard con cursos de idiomas
- ✅ Perfil de usuario editable
- ✅ Sistema de progreso por idioma
- ✅ Almacenamiento local persistente
- ✅ Detección de conectividad

## 🏗️ Estructura del Proyecto

```
src/
├── pages/          # Páginas de la aplicación
├── services/       # Servicios (API, Auth, Storage)
├── types/          # Definiciones TypeScript
└── App.tsx         # Configuración de rutas
```

## 🧪 Testing

### Navegador
```bash
ionic serve
```

### Android
```bash
ionic cap add android
ionic cap sync
ionic cap open android
```

### iOS (requiere Mac)
```bash
ionic cap add ios
ionic cap sync
ionic cap open ios
```

## 📚 Stack Tecnológico

- **Frontend:** Ionic 7 + React 18 + TypeScript
- **Backend:** Node.js + Express + SQLite
- **Mobile:** Capacitor 7
- **HTTP Client:** Axios

## 🔧 Configuración

### Backend

Asegúrate de que el backend esté corriendo:

```bash
cd ../server
npm start
```

### Variables de Entorno

La URL del backend está configurada en `src/services/api.service.ts`:

```typescript
const API_BASE_URL = 'http://localhost:4000';
```

## 🎓 Proyecto Académico

Este proyecto fue desarrollado como parte de la migración de la aplicación web LinguaGo a plataforma móvil para fines académicos.
 Framework**
