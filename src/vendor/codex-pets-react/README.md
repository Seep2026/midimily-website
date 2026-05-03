Vendored subset of `codex-pets-react` 0.2.0.

Upstream: https://github.com/backnotprop/codex-pets-react
License: MIT

This project currently uses a small JSX-compatible subset of the package
because the site is a plain Vite React app without TypeScript and the local
workspace did not have a package manager available when the integration was
implemented. The public API shape is kept close to upstream:

- `PetWidget`
- `SpriteAnimator`
- `usePetController`
- `petReducer`
- `codexPetAtlas`

If the project later standardizes on an installed npm dependency, replace
imports from `../../vendor/codex-pets-react` with `codex-pets-react`.
