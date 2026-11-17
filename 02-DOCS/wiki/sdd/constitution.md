---
type: constitution
title: rrhh-Quasar — Constitution
description: Principios y reglas innegociables que rigen el desarrollo, verificación y arquitectura de rrhh-Quasar.
tags: [sdd, constitution]
timestamp: 2026-11-03T21:35:00Z
topic: sdd
version: v1.0.0
---

# rrhh-Quasar — Constitution

> Versión: v1.0.0 · Ratificada: 2026-11-03 · Última modificación: 2026-11-03
> Principios innegociables que cada fase de desarrollo e implementación debe obedecer.

## 1. Stack canon

1. **Plataforma y Build Tool**: Vue 3 (Composition API con `<script setup lang="ts">`) sobre Quasar Framework v2, empaquetado con Vite (`@quasar/app-vite`).
2. **Runtime y Gestor de Paquetes**: Node.js (según configuración del proyecto) con gestor `npm` y `package-lock.json` unificado y comprometido.
3. **Estado Global**: Exclusivamente Pinia para almacenamiento y reactividad global (`defineStore`).
4. **Comunicaciones HTTP**: Instancia centralizada de Axios en `src/boot/axios.ts` (`api`), con funciones de servicio fuertemente tipadas devolviendo `Promise<T>`.

## 2. Tipado estricto (TypeScript)

5. **Prohibición absoluta de `any`**: Está prohibido el uso de `any`. Se deben definir y emplear tipos (`type`), interfaces (`interface`), tipos genéricos o `unknown` con guardas de tipo cuando el valor sea indeterminado.
6. **Verificación de tipos en build**: El validador de tipos (`vue-tsc`) debe pasar sin errores antes de dar por completado un cambio o merge.

## 3. Arquitectura y separación de responsabilidades

7. **Estructura modular por dominio**: Los módulos funcionales residen en `src/modules/<dominio>/` y deben respetar estrictamente la segregación interna:
   - `components/`: Componentes visuales y de formulario propios del módulo.
   - `composables/`: Lógica reactiva, ciclos de vida y orquestación del estado del módulo.
   - `pages/`: Vistas de enrutamiento del módulo.
   - `services/`: Peticiones a la API HTTP encapsuladas y saneadas.
   - `types/`: Declaraciones de tipos, interfaces y modelos de datos.
   - `utils/`: Configuraciones de tablas, columnas y formateadores locales.
8. **Componentes reutilizables y limpios**: Los componentes deben mantener separación clara de presentación y lógica. Las propiedades (`props`) y eventos emitidos (`emits`) deben declararse con tipado genérico explícito (`defineProps<{...}>()`, `defineEmits<{...}>()`).
9. **Composables desacoplados**: La lógica de negocio y reactividad reutilizable se aísla en composables (`use*`), manteniendo a los componentes como consumidores ligeros.

## 4. Calidad de código y compatibilidad

10. **Linter y Formateador**: Todo cambio debe cumplir limpiamente con las reglas de ESLint (`eslint.config.js`) y Prettier (`.prettierrc.json`) sin errores ni advertencias (`npm run lint`).
11. **Compatibilidad y preservación de código**: Prohibido aplicar refactorizaciones innecesarias o romper contratos existentes sobre código funcional previo. Toda adición debe respetar las convenciones preexistentes del módulo intervenido.

## 5. Principios fijos del ecosistema

12. **Autoría Git humana**: Los commits y contribuciones son de autoría exclusiva del desarrollador humano. Queda prohibida la inclusión de etiquetas como `Co-Authored-By` de asistentes de IA o pies de página de autoría sintética.
13. **Registro de decisiones**: Toda decisión arquitectónica, de convención o cambio de principio se documenta en el registro de decisiones (`02-DOCS/wiki/harness/decisions.md`).

## Definition of Done (Criterios de aceptación para verificación)

Un cambio o funcionalidad se considera terminado solo cuando cumple con la totalidad de los siguientes puntos:

- [ ] Formateo y linting limpios mediante ESLint y Prettier (Principio 10).
- [ ] Chequeo de tipos estricto superado sin `any` ni errores de compilación TypeScript (Principios 5 y 6).
- [ ] Ubicación adecuada dentro del módulo correspondiente en `src/modules/<dominio>/` o utilidades transversales (Principio 7).
- [ ] Componentes y composables con tipado explícito en `props`/`emits` y lógica desacoplada (Principios 8 y 9).
- [ ] Peticiones HTTP centralizadas en servicios con `api` de Axios y modelos tipados (Principio 4).
- [ ] Compatibilidad verificada: funcionalidad existente no degradada ni alterada sin justificación (Principio 11).
- [ ] Commits bajo autoría del usuario humano y decisiones significativas asentadas (Principios 12 y 13).

## Amendment log (append-only)

| Fecha | Versión | Cambio | Motivo |
|---|---|---|---|
| 2026-11-03 | v1.0.0 | Ratificación inicial de la constitución. | Establecimiento formal de principios y estándares de desarrollo para rrhh-Quasar. |
