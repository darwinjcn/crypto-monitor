# 📊 Crypto Monitor - Plataforma de Monitoreo de Criptoactivos en Tiempo Real

![Angular](https://img.shields.io/badge/Angular-18+-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=white)
![Web Workers](https://img.shields.io/badge/Web_Workers-4285F4?style=for-the-badge&logo=google-chrome&logoColor=white)

Aplicación web profesional para monitorear criptomonedas en tiempo real con análisis estadístico avanzado, sistema de alertas personalizadas y visualizaciones interactivas.

![Dashboard Preview](https://via.placeholder.com/800x400/0b0e11/fcd535?text=Crypto+Monitor+Dashboard)

---

## 🎯 Características Principales

### ✅ Requisitos Funcionales
- **Actualización en Tiempo Real**: Precios actualizados cada 200ms
- **5 Criptomonedas Monitoreadas**: BTC, ETH, SOL, ADA, DOT
- **Sistema de Alertas Dinámicas**: Configurable por el usuario (umbral y tipo)
- **Gráficos SVG Interactivos**: Historial de precios de los últimos 20 valores
- **Análisis Estadístico**: SMA (Simple Moving Average) y Volatilidad
- **Dashboard Profesional**: Métricas generales del mercado

### 🔧 Requisitos Técnicos
- **State Management Moderno**: Signals de Angular (WritableSignal y Computed)
- **Web Workers**: Cálculos estadísticos en background sin bloquear UI
- **Directiva Personalizada**: Animación flash verde/rojo según cambio de precio
- **Optimización de Renderizado**: 
  - `trackBy` en `*ngFor`
  - `ChangeDetectionStrategy.OnPush` en todos los componentes
- **Diseño Responsive**: Adaptable a dispositivos móviles y escritorio
- **Datos Reales**: Precios basados en Binance (Febrero 2026)

---

## 🏗️ Arquitectura del Proyecto

```
src/
├── app/
│   ├── components/
│   │   ├── crypto-card/          # Componente presentacional
│   │   │   ├── crypto-card.component.ts
│   │   │   ├── crypto-card.component.html
│   │   │   └── crypto-card.component.scss
│   │   └── crypto-list/          # Componente contenedor
│   │       ├── crypto-list.component.ts
│   │       ├── crypto-list.component.html
│   │       └── crypto-list.component.scss
│   ├── core/
│   │   └── services/
│   │       └── crypto-data.service.ts    # Gestión de estado
│   ├── shared/
│   │   ├── directives/
│   │   │   └── highlight-change.directive.ts
│   │   └── workers/
│   │       └── stats.worker.ts   # Web Worker
│   ├── app.component.ts
│   ├── app.component.html
│   ├── app.component.scss
│   └── app.config.ts
└── styles.scss                    # Estilos globales
```

---

## 🚀 Instalación y Ejecución

### Prerrequisitos
- **Node.js**: v18 o superior
- **npm**: v9 o superior
- **Angular CLI**: v18 o superior

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/TU_USUARIO/crypto-monitor.git
cd crypto-monitor
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Ejecutar el proyecto**
```bash
ng serve
```

4. **Abrir en el navegador**
```
http://localhost:4200
```

---

## 📊 Precios de Criptomonedas

Los precios están basados en datos reales de **Binance** (Febrero 2026):

| Criptomoneda | Precio Inicial | Símbolo |
|--------------|----------------|---------|
| Bitcoin      | $76,045.93     | BTC     |
| Ethereum     | $2,239.52      | ETH     |
| Solana       | $96.30         | SOL     |
| Cardano      | $0.30          | ADA     |
| Polkadot     | $1.49          | DOT     |

*Fuente de datos: [Binance.com](https://www.binance.com)*

---

## 💡 Funcionalidades Detalladas

### 1️⃣ Dashboard Principal
- **Total Market Cap**: Suma estimada de todos los activos
- **Active Pairs**: Número de pares de criptomonedas monitoreadas
- **Average Volatility**: Promedio de volatilidad del mercado
- **Live Stream Indicator**: Indicador visual de transmisión activa

### 2️⃣ Tarjetas de Criptomonedas
Cada tarjeta muestra:
- Símbolo y nombre de la criptomoneda
- Precio actual en tiempo real
- Porcentaje de cambio (verde/rojo)
- Gráfico de tendencia SVG
- Métricas estadísticas (SMA y Volatilidad)
- Sistema de alertas configurable

### 3️⃣ Sistema de Alertas
- **Activación/Desactivación** con botón toggle
- **Tipo de alerta**: Above (arriba) o Below (abajo)
- **Umbral personalizable**: Define el precio de disparo
- **Indicador visual**: Animación de pulso rojo cuando se activa

### 4️⃣ Animaciones
- **Flash verde**: Cuando el precio sube
- **Flash rojo**: Cuando el precio baja
- **Hover effects**: En todas las tarjetas
- **Transiciones suaves**: En todos los elementos

---

## 🧠 Tecnologías y Patrones

### Frontend
- **Angular 18+**: Framework principal con Standalone Components
- **TypeScript**: Lenguaje de programación
- **RxJS**: Programación reactiva para actualización de precios
- **Signals**: State management moderno de Angular
- **SCSS**: Preprocesador CSS con variables y mixins

### Optimización
- **Web Workers**: Cálculos estadísticos en background
- **Change Detection OnPush**: Reducción de renderizados
- **TrackBy Functions**: Optimización de listas
- **Computed Signals**: Cálculos derivados eficientes
- **SVG**: Gráficos de alto rendimiento

### Patrones de Arquitectura
- **Smart & Dumb Components**: Separación de responsabilidades
- **Service Pattern**: Centralización de lógica de negocio
- **Reactive Programming**: Flujos de datos reactivos
- **Custom Directives**: Reutilización de comportamientos

---

## 📝 Componentes Principales

### CryptoDataService
Servicio principal que gestiona:
- Estado global con Signals
- Actualización de precios cada 200ms
- Sistema de alertas reactivo
- Integración con Web Worker
- Historial de precios (últimos 20 valores)
- Computed signals para métricas derivadas

### CryptoCardComponent
Componente presentacional que muestra:
- Información de la criptomoneda
- Gráfico de tendencia SVG
- Estadísticas (SMA y Volatilidad)
- Sistema de alertas configurables
- Animaciones de cambio de precio

### CryptoListComponent
Componente contenedor que:
- Inyecta el servicio de datos
- Orquesta la vista del dashboard
- Pasa datos a componentes hijos
- Implementa trackBy para optimización

### HighlightChangeDirective
Directiva personalizada que:
- Detecta cambios en el precio
- Aplica animación flash verde/rojo
- Usa Renderer2 para manipulación del DOM
- Implementa efecto reactivo con Signals

### Stats Worker
Web Worker que calcula:
- **SMA (Simple Moving Average)**: Promedio móvil de precios
- **Volatilidad**: Desviación estándar de precios
- Se ejecuta en background sin bloquear UI

---

## 🎨 Diseño Visual

### Paleta de Colores
- **Fondo**: `#0b0e11` - `#1a1d23`
- **Cards**: `#1e2329` - `#2b3139`
- **Primario**: `#fcd535` (Amarillo dorado)
- **Positivo**: `#0ecb81` (Verde neón)
- **Negativo**: `#f6465d` (Rojo neón)
- **Texto**: `#eaecef` (Blanco suave)
- **Secundario**: `#848e9c` (Gris)

### Tipografía
- **Font Family**: 'Inter', 'Segoe UI', Roboto, Helvetica, Arial
- **Weights**: 500, 600, 700, 800

---

## ✅ Cumplimiento de Requisitos

### Requisitos Funcionales

| Requisito | Estado | Descripción |
|-----------|--------|-------------|
| Listado de Activos | ✅ | 5 criptomonedas (BTC, ETH, SOL, ADA, DOT) |
| Actualización Continua | ✅ | Cada 200ms con cambios simulados |
| Sistema de Alertas | ✅ | Configurable con umbral y tipo (above/below) |
| Cambio Visual de Alerta | ✅ | Border rojo + animación de pulso |

### Requisitos Técnicos

| Requisito | Estado | Implementación |
|-----------|--------|----------------|
| State Management | ✅ | WritableSignal + Computed Signals |
| Web Workers | ✅ | stats.worker.ts para SMA y Volatilidad |
| Directiva Personalizada | ✅ | appHighlightChange con animación flash |
| Optimización | ✅ | trackBy + OnPush en todos los componentes |

---

## 🐛 Solución de Problemas

### El Web Worker no funciona
```bash
# Verifica que el archivo exista en:
src/app/shared/workers/stats.worker.ts
```

### Las animaciones no se ven
```bash
# Verifica que styles.scss esté importado correctamente
# Revisa que las clases .flash-green y .flash-red estén definidas
```

### Las alertas no se disparan
```bash
# Verifica que el efecto en CryptoDataService esté ejecutándose
# Comprueba que el umbral sea un número válido
```

### Error de compilación
```bash
# Limpia la caché de Angular
rm -rf .angular
ng serve
```

---

## 📚 Scripts Disponibles

```bash
# Desarrollo
npm start          # Ejecutar en modo desarrollo
ng serve           # Ejecutar con Angular CLI

# Producción
npm run build      # Compilar para producción
ng build --prod    # Build optimizado

# Testing
npm test           # Ejecutar pruebas unitarias
ng test            # Test con Angular CLI

# Linting
npm run lint       # Verificar código
ng lint            # Lint con Angular CLI
```

---

## 🤝 Contribución

Este proyecto fue desarrollado como ejercicio académico. Para contribuir:

1. Fork el proyecto
2. Crea una rama de feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Add: nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

---

## 👨‍💻 Autor

**Darwin Colmenares**

- **Universidad**: UNETI - Universidad Nacional Experimental de las Telecomunicaciones e Informática
- **Materia**: Programación III
- **Sección**: 6y7A-2025-2
- **Ejercicio**: 2 - Plataforma de Monitoreo de Criptoactivos en Tiempo Real
- **Fecha de Desarrollo**: 2026
- **Fecha de Entrega**: 12 de Febrero, 2026

---

## 📄 Licencia

Este código es propiedad de Darwin Colmenares y se proporciona para fines educativos.

---

## 🙏 Agradecimientos

- **Binance**: Por proporcionar datos de mercado reales
- **Angular Team**: Por el excelente framework
- **UNETI**: Por la oportunidad de aprendizaje

---

## 📞 Contacto

Si tienes preguntas o sugerencias sobre este proyecto, no dudes en contactarme.

---

**⭐ Si te gusta este proyecto, dale una estrella en GitHub!**