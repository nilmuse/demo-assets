# demo-assets

Central demo media for the [ux-ui-pro](https://github.com/ux-ui-pro) npm portfolio.
Served via [jsDelivr](https://www.jsdelivr.com/) from this public GitHub repository.

This is an **infrastructure repo** (local clone: `_demo-assets`). It is **not** published to npm.

---

## URL template

Pin a git tag — do not use `@main` in CodePen, README, or other public demos.

```
https://cdn.jsdelivr.net/gh/ux-ui-pro/demo-assets@<tag>/packages/<package>/<file>
```

Current release tag: **`v1.0.0`**

Examples:

```
https://cdn.jsdelivr.net/gh/ux-ui-pro/demo-assets@v1.0.0/packages/zero-hour/timer-digits.svg
https://cdn.jsdelivr.net/gh/ux-ui-pro/demo-assets@v1.0.0/packages/cascading-reel/reel.svg
```

Multi-format audio sets live in a typed subfolder (e.g. `audio/`):

```
https://cdn.jsdelivr.net/gh/ux-ui-pro/demo-assets@v1.0.0/packages/clicktone/audio/cartoon.mp3
```

---

## Layout

```
packages/<npm-package-name>/   assets for that package's demos
shared/                        cross-package placeholders (future)
catalog.json                   machine-readable index + baseUrl
```

---

## Adding an asset

1. Place the file under `packages/<package-name>/` (or `packages/<package>/<dir>/<name>.<ext>` for format sets).
2. Add an entry to `catalog.json` with a short `description`.
3. Bump `version` in `catalog.json` and `baseUrl` tag when publishing a new release.
4. Run `node scripts/verify-catalog.mjs` locally.
5. Git-tag the release (`git tag v1.x.x`) and push tags.

Use `"pending": true` in `catalog.json` while the file is not yet committed (CI skips pending entries).

---

## Verify

```bash
node scripts/verify-catalog.mjs
```

CI runs the same check on Node 22 and 24.

---

## License

MIT — see [LICENSE](./LICENSE).
