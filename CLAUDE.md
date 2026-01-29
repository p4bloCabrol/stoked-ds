# Stoked Design System - Contexto del Proyecto

## Descripción

**stoked-ds** es un design system React ligero y accesible con CSS de zero-runtime.

- **Versión**: 0.1.0
- **Licencia**: MIT
- **Node requerido**: >=18.0.0
- **React requerido**: >=18.0.0

## Stack Tecnológico

| Tecnología | Uso |
|------------|-----|
| React 18 | Librería UI |
| TypeScript 5.7 | Tipado estático |
| Vite 6 | Bundler y dev server |
| CSS Modules | Estilos (zero-runtime) |
| Storybook 8.4 | Documentación y desarrollo |
| Vitest 2.1 | Unit testing |
| Playwright 1.58 | E2E testing |
| ESLint 9 | Linting |
| Prettier 3.4 | Formateo |

## Estructura del Proyecto

```
stoked-design-system/
├── .claude/
│   └── skills/
│       └── code-review-es.md    # Skill de revisión de código
├── .storybook/
│   ├── main.ts                  # Configuración Storybook
│   └── preview.ts
├── e2e/                         # Tests E2E con Playwright
├── src/
│   ├── components/              # Componentes React
│   │   ├── Accordion/
│   │   ├── Alert/
│   │   ├── Avatar/
│   │   ├── Badge/
│   │   ├── Button/
│   │   ├── Card/
│   │   ├── Checkbox/
│   │   ├── Input/
│   │   ├── Modal/
│   │   ├── Progress/
│   │   ├── Radio/
│   │   ├── Select/
│   │   ├── Skeleton/
│   │   ├── Spinner/
│   │   ├── Switch/
│   │   ├── Table/
│   │   ├── Tabs/
│   │   ├── Toast/
│   │   └── Tooltip/
│   ├── styles/
│   │   ├── reset.css            # CSS reset
│   │   ├── global.css           # Estilos globales
│   │   └── shared.module.css    # Estilos compartidos
│   ├── tokens/
│   │   ├── index.css            # Entry point tokens
│   │   ├── colors.css           # Paleta de colores
│   │   ├── spacing.css          # Espaciados
│   │   ├── typography.css       # Tipografía
│   │   ├── borders.css          # Bordes y radios
│   │   ├── shadows.css          # Sombras
│   │   ├── transitions.css      # Transiciones
│   │   └── z-index.css          # Capas z-index
│   ├── utils/
│   │   ├── cn.ts                # Utility para clases (clsx wrapper)
│   │   ├── mergeRefs.ts         # Merge de refs
│   │   ├── useId.ts             # Hook para IDs únicos
│   │   ├── useControllable.ts   # Hook para controlled/uncontrolled
│   │   ├── polymorphic.ts       # Tipos para componentes polimórficos
│   │   └── index.ts
│   ├── types/
│   │   └── css.d.ts             # Tipos para CSS modules
│   └── test/
│       └── setup.ts             # Setup de Vitest
├── dist/                        # Build de producción
├── package.json
├── tsconfig.json
├── vite.config.ts
├── vitest.config.ts
└── playwright.config.ts
```

## Componentes Disponibles (19)

### Form Controls
- **Button** - Botón con variantes solid/outline/ghost/link
- **Input** - Campo de texto
- **Checkbox** - Casilla de verificación
- **Radio** - Botón de radio con RadioGroup
- **Select** - Selector dropdown
- **Switch** - Toggle switch

### Feedback
- **Alert** - Mensajes de alerta
- **Modal** - Diálogos modales
- **Toast** - Notificaciones temporales
- **Spinner** - Indicador de carga circular
- **Progress** - Barra de progreso
- **Skeleton** - Placeholder de carga
- **Tooltip** - Tooltips informativos

### Data Display
- **Badge** - Etiquetas/badges
- **Avatar** - Avatares de usuario
- **Card** - Tarjetas contenedoras
- **Accordion** - Paneles colapsables
- **Tabs** - Navegación por pestañas
- **Table** - Tablas de datos

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

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Storybook en puerto 6006 |
| `npm run build` | Build de producción |
| `npm run test` | Ejecutar tests unitarios |
| `npm run test:watch` | Tests en modo watch |
| `npm run test:e2e` | Tests E2E con Playwright |
| `npm run lint` | Ejecutar ESLint |
| `npm run lint:fix` | Auto-fix con ESLint |
| `npm run format` | Formatear con Prettier |
| `npm run typecheck` | Verificar tipos TypeScript |

## Configuración TypeScript

- **Target**: ES2020
- **Module**: ESNext
- **JSX**: react-jsx
- **Strict mode**: Habilitado
- **Path alias**: `@/*` → `src/*`

## Dependencias Clave

- **clsx**: Utilidad para concatenar clases CSS
- **@storybook/addon-a11y**: Testing de accesibilidad en Storybook

## Notas de Desarrollo

1. **Zero-runtime CSS**: No usar CSS-in-JS, solo CSS Modules
2. **Data attributes**: Preferir `data-*` sobre clases para estados/variantes
3. **Accesibilidad**: Siempre incluir atributos ARIA necesarios
4. **Testing**: Cada componente debe tener tests unitarios y stories
