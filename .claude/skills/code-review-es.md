# code-review-es

Skill para revisar código enfocado en Clean Code, buenas prácticas de React, estilos SASS y accesibilidad.

## Instrucciones

Cuando el usuario invoque `/code-review-es`, realiza una revisión exhaustiva del código seleccionado o de los archivos especificados siguiendo estas categorías:

### 1. Clean Code

Revisa y reporta:
- **Nombres descriptivos**: Variables, funciones y componentes deben tener nombres claros y autodescriptivos
- **Funciones pequeñas**: Cada función debe hacer una sola cosa (SRP - Single Responsibility Principle)
- **DRY (Don't Repeat Yourself)**: Identificar código duplicado que pueda abstraerse
- **KISS (Keep It Simple, Stupid)**: Evitar complejidad innecesaria
- **Comentarios**: Solo cuando son necesarios; el código debe ser autoexplicativo
- **Magic numbers/strings**: Deben extraerse a constantes con nombres descriptivos
- **Early returns**: Preferir retornos tempranos para reducir anidación
- **Inmutabilidad**: Preferir operaciones inmutables sobre mutaciones

### 2. Buenas Prácticas React

Revisa y reporta:
- **Hooks**:
  - Uso correcto de `useState`, `useEffect`, `useMemo`, `useCallback`
  - Dependencias correctas en arrays de dependencias
  - Evitar hooks condicionales
- **Componentes**:
  - Componentes funcionales preferidos sobre clases
  - Props tipadas correctamente con TypeScript
  - Desestructuración de props
  - Componentes pequeños y reutilizables
- **Keys**: Uso correcto de keys en listas (no usar índices como keys cuando hay reordenamiento)
- **Estado**:
  - Estado mínimo necesario
  - Derivar valores en lugar de duplicar estado
  - Levantar estado solo cuando sea necesario
- **Efectos secundarios**: useEffect con cleanup cuando sea necesario
- **Memoización**: Uso apropiado de `React.memo`, `useMemo`, `useCallback`
- **Event handlers**: Nombres descriptivos (handleClick, onSubmit)
- **Fragmentos**: Usar `<>` o `<Fragment>` cuando corresponda

### 3. Estilos SASS/SCSS

Revisa y reporta:
- **Nomenclatura BEM**: Block__Element--Modifier
- **Anidación**: Máximo 3-4 niveles de profundidad
- **Variables**: Uso de variables para colores, espaciados, tipografía
- **Mixins**: Reutilización de patrones comunes
- **Modularidad**: Archivos SCSS organizados y partials (`_nombre.scss`)
- **Especificidad**: Evitar selectores demasiado específicos o uso de `!important`
- **Mobile-first**: Media queries de menor a mayor
- **Unidades**: Uso consistente (rem/em para tipografía, px para bordes)

### 4. Accesibilidad (a11y)

Revisa y reporta:
- **Semántica HTML**: Uso correcto de elementos (`<button>`, `<nav>`, `<main>`, `<article>`, etc.)
- **ARIA**:
  - Roles ARIA cuando sea necesario
  - `aria-label`, `aria-labelledby`, `aria-describedby`
  - `aria-live` para contenido dinámico
  - `aria-expanded`, `aria-hidden` según corresponda
- **Navegación por teclado**:
  - Elementos interactivos accesibles con Tab
  - Focus visible
  - Orden de tabulación lógico (`tabIndex`)
- **Imágenes**: Alt text descriptivo o `alt=""` para decorativas
- **Formularios**: Labels asociados correctamente, mensajes de error accesibles
- **Contraste**: Mencionar si hay posibles problemas de contraste
- **Focus management**: Manejo del foco en modales, dropdowns, etc.

## Formato de Salida

Presenta los hallazgos en el siguiente formato:

```
## 📋 Revisión de Código: [nombre del archivo/componente]

### ✅ Aspectos Positivos
- [Listar buenas prácticas encontradas]

### 🔴 Crítico (debe corregirse)
- [Problemas de accesibilidad graves]
- [Bugs potenciales]
- [Problemas de seguridad]

### 🟡 Mejoras Recomendadas
- [Sugerencias de clean code]
- [Optimizaciones de React]
- [Mejoras de SASS]

### 💡 Sugerencias Opcionales
- [Mejoras menores]
- [Refactorizaciones opcionales]

### 📊 Resumen
| Categoría | Estado |
|-----------|--------|
| Clean Code | ✅/⚠️/❌ |
| React | ✅/⚠️/❌ |
| SASS | ✅/⚠️/❌ |
| Accesibilidad | ✅/⚠️/❌ |
```

## Uso

### Alcance de la revisión
- `/code-review-es` - Revisa el archivo actualmente seleccionado o abierto
- `/code-review-es src/components/Button` - Revisa un componente específico
- `/code-review-es --all` - **Revisa TODO el repositorio** (componentes, estilos, hooks, utils)
- `/code-review-es src/components` - Revisa todos los componentes de una carpeta

### Filtros por categoría
- `/code-review-es --focus=a11y` - Enfocarse solo en accesibilidad
- `/code-review-es --focus=react` - Enfocarse solo en React
- `/code-review-es --focus=sass` - Enfocarse solo en SASS
- `/code-review-es --focus=clean` - Enfocarse solo en Clean Code

### Combinaciones
- `/code-review-es --all --focus=a11y` - Revisar accesibilidad de todo el repo
- `/code-review-es src/components --focus=react,sass` - Revisar React y SASS de componentes

## Estrategia para Revisión Completa (--all)

Cuando se use `--all`, seguir este orden:

1. **Listar estructura del proyecto**: Identificar carpetas `src/components`, `src/hooks`, `src/utils`, etc.
2. **Revisar por módulos**: Analizar cada componente/módulo por separado
3. **Generar reporte consolidado**: Al final, crear un resumen ejecutivo con:
   - Patrones problemáticos recurrentes
   - Deuda técnica identificada
   - Priorización de correcciones (crítico → recomendado → opcional)
   - Componentes que requieren refactorización urgente

### Formato Reporte Consolidado

```
## 📊 Reporte Consolidado del Repositorio

### 🎯 Resumen Ejecutivo
- Total de archivos revisados: X
- Problemas críticos: X
- Mejoras recomendadas: X

### 🔴 Top 5 Problemas Críticos
1. [Descripción] - [Archivo(s) afectado(s)]
...

### 📈 Patrones Recurrentes
- [Patrón problemático identificado en múltiples archivos]

### 🏆 Buenas Prácticas Encontradas
- [Destacar lo que está bien hecho]

### 📋 Plan de Acción Sugerido
| Prioridad | Tarea | Archivos | Esfuerzo |
|-----------|-------|----------|----------|
| Alta | ... | ... | ... |
```
