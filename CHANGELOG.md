# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.4.0] - 2026-02-18

### Refactoring

- Remove framer-motion dependency, use pure CSS animations across all components

### Fixed

- Replace bundlephobia badge with packagephobia

### Documentation

- Add white paper page with roadmap and architecture overview

## [0.3.1] - 2026-02-12

### Added

- Security hardening for npm publishing (provenance, SBOM, sensitive file checks)

### Changed

- Upgrade Storybook from 8.4 to 10.2.8
- Bump actions/checkout from 4 to 6, actions/setup-node from 4 to 6
- Bump actions/upload-pages-artifact from 3 to 4
- Bump glob from 11.1.0 to 13.0.2
- Bump framer-motion and testing dependencies
- Bump the vite group with 2 updates

### Fixed

- Use class-based ResizeObserver mock for Vitest 4 compatibility
- Resolve CSS bugs and replace undefined design tokens
- Update version display to v0.3.0 in landing page and Storybook

### Security

- Add workflow permissions and SRI integrity hashes

### Documentation

- Add Architecture & Decisions white paper

## [0.3.0] - 2026-02-11

### Added

- Initial release with 27 components
- 8 Form Controls: Button, Input, SearchInput, Checkbox, Radio, Select, Switch, ButtonGroup
- 7 Feedback: Alert, Modal, Toast, Spinner, Progress, Skeleton, Tooltip
- 8 Data Display: Badge, Tag, Avatar, Card, StatCard, Accordion, Tabs, Table
- 2 Layout: Sidebar, AppShell
- 2 Navigation: Breadcrumb, Pagination
- 5 Integrations: React Hook Form, TanStack Table, react-day-picker, react-select, Recharts
- CSS Modules with zero-runtime CSS
- Dark and light theme support via `data-theme` attribute
- Full TypeScript type definitions
- Design tokens (colors, spacing, typography, borders, shadows, transitions, z-index)
- Static landing page for GitHub Pages
- Storybook documentation with accessibility addon

[0.4.0]: https://github.com/p4bloCabrol/stoked-ds/compare/v0.3.1...v0.4.0
[0.3.1]: https://github.com/p4bloCabrol/stoked-ds/compare/v0.3.0...v0.3.1
[0.3.0]: https://github.com/p4bloCabrol/stoked-ds/releases/tag/v0.3.0
