# Vendored PageAgent runtime

This folder contains the PageAgent runtime files needed by the Midimily site build.

Why it is vendored:

- The site imports `@page-agent/core`, `@page-agent/llms`, and `@page-agent/page-controller` in browser code.
- During local development these packages originally came from a sibling checkout at `../page-agent`.
- Production VPS builds only receive this repository, so the PageAgent runtime must be present inside this repository.

Source:

- Upstream repository: `https://github.com/alibaba/page-agent`
- Upstream version: `1.10.0`
- Vendored commit: `fb4b8fd0670bce33a134f7d7075e636992de481d`
- License: MIT, see `upstream/LICENSE`

Only the runtime source for `packages/core`, `packages/llms`, and `packages/page-controller` is included. Tests, demos, extension code, website code, and MCP code are intentionally omitted.
