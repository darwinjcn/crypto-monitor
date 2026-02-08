# CRYPTO MONITOR - GUÍA DE IMPLEMENTACIÓN COMPLETA

## 📋 Resumen del Proyecto

Plataforma de Monitoreo de Criptoactivos en Tiempo Real con todas las funcionalidades requeridas:

✅ **Requisitos Funcionales Implementados:**
- Listado de 5 criptomonedas con actualización cada 200ms
- Sistema de Alertas Dinámicas configurable por el usuario
- Gráficos de línea en tiempo real con SVG
- Cálculo de SMA (Simple Moving Average) y Volatilidad
- Dashboard profesional con métricas generales

✅ **Requisitos Técnicos Implementados:**
- State Management con Signals (WritableSignal y Computed)
- Web Workers para cálculos estadísticos (no bloquea UI)
- Directiva personalizada con animación flash verde/rojo
- Optimización con trackBy en *ngFor
- ChangeDetectionStrategy.OnPush en todos los componentes
- Diseño responsive tipo dashboard profesional

---

## 📁 ESTRUCTURA DE ARCHIVOS Y UBICACIONES

### 1. SERVICIO PRINCIPAL
**Archivo:** crypto-data.service.ts
**Ubicación:** `src/app/core/services/crypto-data.service.ts`
**Descripción:** Servicio principal con gestión de estado, Web Worker, alertas y computed signals

### 2. WEB WORKER
**Archivo:** stats.worker.ts
**Ubicación:** `src/app/shared/workers/stats.worker.ts`
**Descripción:** Worker para cálculos estadísticos (SMA y Volatilidad)

### 3. COMPONENTE TARJETA DE CRIPTO
**Archivos:**
- crypto-card.component.ts
- crypto-card.component.html
- crypto-card.component.scss

**Ubicación:** `src/app/components/crypto-card/`
**Descripción:** Componente presentacional con alertas, gráfico SVG y estadísticas

### 4. COMPONENTE LISTA DE CRIPTOS
**Archivos:**
- crypto-list.component.ts
- crypto-list.component.html
- crypto-list.component.scss

**Ubicación:** `src/app/components/crypto-list/`
**Descripción:** Contenedor inteligente con trackBy, OnPush y métricas generales

### 5. DIRECTIVA PERSONALIZADA
**Archivo:** highlight-change.directive.ts
**Ubicación:** `src/app/shared/directives/highlight-change.directive.ts`
**Descripción:** Directiva que aplica animación flash verde/rojo según cambio de precio

### 6. COMPONENTE RAÍZ
**Archivos:**
- app.component.ts
- app.component.html
- app.component.scss

**Ubicación:** `src/app/`
**Descripción:** Componente principal con header, main y footer

### 7. ESTILOS GLOBALES
**Archivo:** styles.scss
**Ubicación:** `src/styles.scss`
**Descripción:** Estilos globales con animaciones flash y scrollbar personalizado

---

## 🚀 PASOS DE INSTALACIÓN

### Paso 1: Copiar los archivos
Reemplaza cada archivo en tu proyecto con los proporcionados, siguiendo las ubicaciones exactas arriba indicadas.

### Paso 2: Instalar dependencias
```bash
npm install
```

### Paso 3: Ejecutar el proyecto
```bash
ng serve
```

### Paso 4: Abrir en navegador
```
http://localhost:4200
```

---

## 🎨 CARACTERÍSTICAS VISUALES

### Dashboard Principal
- Header con logo "NOVADEX" y título "Market Overview"
- Barra de métricas con:
  * Total Market Cap (suma de precios)
  * Active Pairs (cantidad de criptos)
  * Average Volatility (promedio de volatilidad)
  * Indicador "Live Stream Active" con punto pulsante verde

### Tarjetas de Criptomonedas
- Símbolo y nombre de la cripto
- Precio actual en formato moneda
- Badge de cambio porcentual (verde/rojo)
- Gráfico SVG de línea con últimos 20 valores
- Métricas: SMA (20) y Volatilidad
- Sistema de alertas configurable:
  * Botón toggle para activar/desactivar
  * Selector de tipo: Above/Below
  * Input de umbral de precio
  * Indicador visual cuando se dispara

### Animaciones
- Flash verde cuando el precio sube
- Flash rojo cuando el precio baja
- Pulso rojo en tarjeta cuando se dispara alerta
- Hover effects en todas las tarjetas
- Transiciones suaves en todos los elementos

---

## 📊 TECNOLOGÍAS UTILIZADAS

- **Angular 18+** (Standalone Components)
- **RxJS** (Observables para actualización de precios)
- **Signals** (State Management moderno)
- **Web Workers** (Cálculos en background)
- **SCSS** (Estilos con variables y mixins)
- **SVG** (Gráficos de alto rendimiento)

---

## ✅ CUMPLIMIENTO DE REQUISITOS

### Requisitos Funcionales
1. ✓ Listado de Activos: 5 criptomonedas (BTC, ETH, SOL, ADA, DOT)
2. ✓ Actualización cada 200ms con cambios simulados
3. ✓ Sistema de Alertas: Configurable con umbral y tipo (above/below)
4. ✓ Cambio visual cuando se dispara alerta (border rojo + pulso)

### Requisitos Técnicos
1. ✓ State Management con Signals:
   - WritableSignal para rawPrices, priceAlerts, cryptoStats
   - Computed signals: totalMarketCap, activePairs, averageVolatility, topGainers, topLosers

2. ✓ Web Workers para Cálculos:
   - stats.worker.ts calcula SMA y Volatilidad
   - Se ejecuta en background sin bloquear UI
   - Resultados almacenados en signal

3. ✓ Directiva Personalizada:
   - appHighlightChange aplica animación flash
   - Verde para subida, rojo para bajada
   - Usa effect() para detectar cambios

4. ✓ Optimización de Renderizado:
   - trackByCryptoId en *ngFor
   - ChangeDetectionStrategy.OnPush en todos los componentes
   - Uso eficiente de computed signals

---

## 🎯 ARQUITECTURA SUGERIDA IMPLEMENTADA

1. **Core Service (Data Provider):**
   - CryptoDataService gestiona estado y lógica de negocio
   - Integración con Web Worker
   - Sistema de alertas reactivo

2. **Smart Components (Containers):**
   - CryptoListComponent orquesta la vista
   - Inyecta servicio y pasa datos a componentes hijos

3. **Presentational Components (Dumb):**
   - CryptoCardComponent recibe datos vía @Input (input signals)
   - No tiene lógica de negocio compleja
   - Emite eventos para interacción

---

## 📝 NOTAS IMPORTANTES

1. **Web Worker:** Se inicializa automáticamente en el constructor del servicio
2. **Historial de Precios:** Se mantienen los últimos 20 valores para el gráfico
3. **Alertas:** Se monitorean mediante effect() que reacciona a cambios de precio
4. **Performance:** La app maneja 5 actualizaciones por segundo (200ms) sin lag
5. **Escalabilidad:** Fácil añadir más criptomonedas al array inicial

---

## 🐛 SOLUCIÓN DE PROBLEMAS

### El Web Worker no funciona
- Verifica que el archivo esté en: `src/app/shared/workers/stats.worker.ts`
- Asegúrate de que angular.json incluya la carpeta workers en assets

### Las animaciones no se ven
- Verifica que styles.scss esté importado correctamente
- Revisa que las clases .flash-green y .flash-red estén definidas

### Las alertas no se disparan
- Verifica que el efecto en CryptoDataService esté ejecutándose
- Comprueba que el umbral sea un número válido

---

## 👨‍💻 AUTOR

**Darwin Colmenares**
UNETI - Universidad Nacional Experimental de las Telecomunicaciones e Informática
Materia: Programacion III
Seccion: Sección 6y7A-2025-2
Desarrollo: 2026
Ejercicio 2: Plataforma de Monitoreo de Criptoactivos en Tiempo Real
Entrega: 2026-02-12
---

## 📄 LICENCIA

Este código es propiedad de Darwin Colmenares y se proporciona para fines educativos.
