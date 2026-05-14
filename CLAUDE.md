# Stoked Design System - Contexto del Proyecto

## Descripción

**stoked-ds** es un design system React ligero y accesible con CSS de zero-runtime, **diseñado para trabajar con asistentes de IA**.

- **Versión**: 0.6.0
- **Licencia**: MIT
- **Node requerido**: >=18.0.0
- **React requerido**: >=18.0.0
- **AI-ready**: incluye `.context/` (slicing) y `@stoked-ds/mcp-server` (MCP)

## Stack Tecnológico

| Tecnología | Uso |
|------------|-----|
| React 18 | Librería UI |
| TypeScript 5.7 | Tipado estático |
| Vite 7 | Bundler y dev server |
| CSS Modules | Estilos (zero-runtime) |
| Storybook 10 | Documentación y desarrollo |
| Vitest 4 | Unit testing |
| Playwright 1.58 | E2E testing |
| ESLint 9 | Linting |
| Prettier 3.4 | Formateo |
| pnpm 11 | Gestor de paquetes y workspaces |

## Estructura del Proyecto

```
stoked-design-system/
├── .claude/
│   └── skills/
│       ├── code-review-es.md    # Skill de revisión de código
│       ├── release.md           # Skill de release a npm
│       ├── new-component.md     # Workflow para crear componentes
│       ├── new-integration.md   # Workflow para crear integraciones
│       └── improve-docs.md      # Workflow para documentación
├── .storybook/
│   ├── main.ts                  # Configuración Storybook
│   └── preview.tsx              # Preview con theme toggle
├── e2e/                         # Tests E2E con Playwright
├── src/
│   ├── components/              # Componentes React (28)
│   │   ├── Accordion/
│   │   ├── Alert/
│   │   ├── AppShell/
│   │   ├── Avatar/
│   │   ├── Badge/
│   │   ├── Breadcrumb/
│   │   ├── Button/
│   │   ├── ButtonGroup/
│   │   ├── Card/
│   │   ├── Checkbox/
│   │   ├── HierarchicalSelect/
│   │   ├── Input/
│   │   ├── Modal/
│   │   ├── Pagination/
│   │   ├── Progress/
│   │   ├── Radio/
│   │   ├── SearchInput/
│   │   ├── Select/
│   │   ├── Sidebar/
│   │   ├── Skeleton/
│   │   ├── Spinner/
│   │   ├── StatCard/
│   │   ├── Switch/
│   │   ├── Table/
│   │   ├── Tabs/
│   │   ├── Tag/
│   │   ├── Toast/
│   │   └── Tooltip/
│   ├── docs/                    # MDX documentation pages (Storybook)
│   │   ├── GettingStarted.mdx
│   │   ├── DesignTokens.mdx
│   │   ├── Theming.mdx
│   │   └── Accessibility.mdx
│   ├── integrations/            # Third-party library adapters
│   │   └── react-hook-form/     # React Hook Form (Form, FormField)
│   ├── styles/
│   │   ├── reset.css            # CSS reset
│   │   ├── global.css           # Estilos globales
│   │   └── shared.module.css    # Estilos compartidos
│   ├── tokens/
│   │   ├── index.css            # Entry point tokens
│   │   ├── colors.css           # Paleta de colores (dark/light)
│   │   ├── spacing.css          # Espaciados
│   │   ├── typography.css       # Tipografía
│   │   ├── borders.css          # Bordes y radios
│   │   ├── shadows.css          # Sombras
│   │   ├── transitions.css      # Transiciones y easing
│   │   └── z-index.css          # Capas z-index
│   ├── utils/
│   │   ├── cn.ts                # Utility para clases (clsx wrapper)
│   │   ├── mergeRefs.ts         # Merge de refs
│   │   ├── useId.ts             # Hook para IDs únicos
│   │   ├── useControllable.ts   # Hook para controlled/uncontrolled
│   │   ├── useExitAnimation.ts  # Hook para exit animations (reemplaza AnimatePresence)
│   │   ├── polymorphic.ts       # Tipos para componentes polimórficos
│   │   └── index.ts
│   ├── types/
│   │   └── css.d.ts             # Tipos para CSS modules
│   └── test/
│       ├── setup.ts             # Setup de Vitest
│       └── vitest.d.ts          # Tipos para testing
├── dist/                        # Build de producción
├── package.json
├── tsconfig.json
├── tsconfig.test.json           # Config TypeScript para tests
├── vite.config.ts
├── vitest.config.ts
└── playwright.config.ts
```

## Componentes Disponibles (28)

### Form Controls
- **Button** - Botón con variantes solid/outline/ghost/link
- **Input** - Campo de texto con label, helper text, error
- **SearchInput** - Input con icono de búsqueda y onSearch (Enter)
- **Checkbox** - Casilla de verificación
- **Radio** - Botón de radio con RadioGroup
- **Select** - Selector dropdown
- **HierarchicalSelect** - Selector jerárquico con tree view (single/multi mode)
- **Switch** - Toggle switch
- **ButtonGroup** - Grupo de botones toggle (mutuamente exclusivo)

### Feedback
- **Alert** - Mensajes de alerta
- **Modal** - Diálogos modales
- **Toast** - Notificaciones temporales
- **Spinner** - Indicador de carga circular (CSS keyframes)
- **Progress** - Barra de progreso con stripes animados e indeterminate
- **Skeleton** - Placeholder de carga con pulse y wave (CSS keyframes)
- **Tooltip** - Tooltips informativos

### Data Display
- **Badge** - Etiquetas/badges
- **Tag** - Tags removibles con variantes solid/outline y colores
- **Avatar** - Avatares de usuario
- **Card** - Tarjetas contenedoras
- **StatCard** - Tarjeta de métrica con icono, valor, trend y status
- **Accordion** - Paneles colapsables
- **Tabs** - Navegación por pestañas
- **Table** - Tablas de datos

### Layout
- **Sidebar** - Navegación lateral colapsable con secciones e items
- **AppShell** - Layout wrapper (sidebar + header + contenido)

### Navigation
- **Breadcrumb** - Navegación jerárquica
- **Pagination** - Navegación de páginas con ellipsis inteligente

## Third-Party Integrations

stoked-ds provides optional adapters for popular libraries. Each integration lives in `src/integrations/[library-name]/` and is exported as a separate sub-path to avoid impacting the main bundle.

### Available (5)

| Integration | Import | Components | Peer Dependency |
|-------------|--------|------------|-----------------|
| React Hook Form | `stoked-ds/integrations/react-hook-form` | `Form`, `FormField` | `react-hook-form >=7.0.0` |
| TanStack Table | `stoked-ds/integrations/tanstack-table` | `DataTable` | `@tanstack/react-table >=8.0.0` |
| react-day-picker | `stoked-ds/integrations/react-day-picker` | `DatePicker`, `DateRangePicker` | `react-day-picker >=9.0.0` |
| react-select | `stoked-ds/integrations/react-select` | `AdvancedSelect` | `react-select >=5.0.0` |
| Recharts | `stoked-ds/integrations/recharts` | `ChartCard`, `StokedLineChart`, `StokedBarChart`, `StokedAreaChart`, `StokedPieChart` | `recharts >=2.0.0` |

### Planned

| Integration | Import | Components |
|-------------|--------|------------|
| React Flow | `stoked-ds/integrations/react-flow` | `StokedReactFlow`, custom nodes |

### Integration Structure

```
src/integrations/[library-name]/
├── Component.tsx           # Implementation
├── Component.types.ts      # Types & interfaces
├── Component.module.css    # Styles (token mapping)
├── Component.stories.tsx   # Storybook stories
├── Component.test.tsx      # Unit tests
└── index.ts                # Re-exports
```

### Integration Conventions

1. **Sub-path exports**: Each integration has its own entry point in `package.json` exports
2. **Optional peer dependencies**: Libraries go in `peerDependenciesMeta: { optional: true }`
3. **External in build**: Added to `rollupOptions.external` in vite.config.ts
4. **Storybook**: Stories under `Integrations/[Library Name]/ComponentName`
5. **Non-invasive**: Adapters wrap the external library, never modify core components

## Patrones de Código

### Estructura de Componente

Cada componente sigue esta estructura:
```
ComponentName/
├── ComponentName.tsx       # Implementación
├── ComponentName.types.ts  # Tipos e interfaces
├── ComponentName.module.css # Estilos
├── ComponentName.stories.tsx # Storybook stories
├── ComponentName.test.tsx   # Tests unitarios
└── index.ts                 # Re-export
```

### Convenciones

1. **Props**: Extienden de `ComponentPropsWithoutRef<'element'>` o `ComponentPropsWithRef`
2. **Refs**: Usar `forwardRef` para exponer refs
3. **Estilos**: CSS Modules con data-attributes para variantes
4. **Tipos**: Definir types separados (ButtonVariant, ButtonSize, etc.)
5. **DisplayName**: Siempre definir para debugging
6. **Accesibilidad**: aria-* attributes cuando corresponda
7. **Animaciones**: Usar CSS keyframes y transitions en el .module.css del componente. Zero-runtime: sin dependencias JS para animaciones.

### Ejemplo de Componente

```tsx
// Button.tsx
import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import type { ButtonProps } from './Button.types';
import styles from './Button.module.css';

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'solid', size = 'md', className, children, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(styles.button, className)}
        data-variant={variant}
        data-size={size}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export { Button };
```

## Scripts Disponibles

Package manager: **pnpm** (ver `packageManager` en `package.json`). Para instalar dependencias: `pnpm install`.

| Comando | Descripción |
|---------|-------------|
| `pnpm dev` | Storybook en puerto 6006 |
| `pnpm build` | Build de producción |
| `pnpm test` | Ejecutar tests unitarios |
| `pnpm test:watch` | Tests en modo watch |
| `pnpm test:e2e` | Tests E2E con Playwright |
| `pnpm lint` | Ejecutar ESLint |
| `pnpm lint:fix` | Auto-fix con ESLint |
| `pnpm format` | Formatear con Prettier |
| `pnpm typecheck` | Verificar tipos TypeScript |
| `pnpm --filter @stoked-ds/mcp-server <script>` | Correr script en el workspace mcp-server |

## Configuración TypeScript

- **Target**: ES2020
- **Module**: ESNext
- **JSX**: react-jsx
- **Strict mode**: Habilitado
- **Imports**: relativos (`../../utils/cn`). Sin path aliases (`@/*` fue removido — no estaba en uso).

## Dependencias Clave

- **clsx**: Utilidad para concatenar clases CSS
- **@storybook/addon-a11y**: Testing de accesibilidad en Storybook

## Branching Strategy

**IMPORTANTE**: Nunca hacer push directo a `main`. Siempre usar feature branches + Pull Requests.

### Flujo de trabajo

1. Crear branch desde main: `feat/<nombre>`, `fix/<nombre>`, `docs/<nombre>`, `release/vX.X.X`
2. Desarrollar y commitear en la branch
3. Abrir PR con `gh pr create`
4. CI automático ejecuta: lint → typecheck → test → test:e2e → build
5. Mergear PR después de que CI pase

### Convenciones de branches

| Prefijo | Uso |
|---------|-----|
| `feat/` | Nuevos componentes o features |
| `fix/` | Bug fixes y correcciones |
| `docs/` | Documentación |
| `release/` | Releases a npm |

## Skills Disponibles

| Skill | Comando | Descripción |
|-------|---------|-------------|
| Code Review | `/code-review-es` | Revisión de código (Clean Code, React, CSS, a11y) |
| Release | `/release` | Preparar y publicar release a npm |
| Nuevo Componente | `/new-component` | Workflow completo: scaffold → implementar → test → stories → review → PR |
| Nueva Integración | `/new-integration` | Workflow para integraciones con librerías de terceros → PR |
| Mejorar Docs | `/improve-docs` | Crear/mejorar documentación en Storybook → PR |
| Audit | `/audit` | Revisar y parchear vulnerabilidades de seguridad en dependencias npm |

Todos los skills que generan cambios de código crean branch + PR automáticamente.

## Notas de Desarrollo

1. **Zero-runtime CSS**: No usar CSS-in-JS, solo CSS Modules
2. **Data attributes**: Preferir `data-*` sobre clases para estados/variantes
3. **Accesibilidad**: Siempre incluir atributos ARIA necesarios
4. **Testing**: Cada componente debe tener tests unitarios (Vitest), stories (Storybook) y tests E2E (Playwright)
5. **Animaciones CSS**: Definir `@keyframes` en el mismo `.module.css` del componente para que CSS Modules scope funcione correctamente
6. **Temas**: Dark mode por defecto en `:root`, light mode con `[data-theme='light']`
7. **Storybook**: Theme toggle disponible en la toolbar (dark/light)
8. **Branches**: Nunca push a main, siempre feature branches + PRs
9. **Documentación**: Páginas MDX en `src/docs/`, escritas en inglés
10. **E2E tests**: Viven en `e2e/`, un archivo por componente. Corren contra Storybook en puerto 6006. IDs de stories: `{title-kebab}--{story-kebab}`. Si fallan con `importers[path] is not a function`, borrar cache: `rm -rf node_modules/.cache/storybook`
