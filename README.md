## URL template

```
https://cdn.jsdelivr.net/gh/nilmuse/demo-assets@<tag>/packages/<package>/<file>
```

Current release tag: **`v1.1.0`**

Examples:

```
https://cdn.jsdelivr.net/gh/nilmuse/demo-assets@v1.1.0/packages/zero-hour/digits.svg
https://cdn.jsdelivr.net/gh/nilmuse/demo-assets@v1.1.0/packages/cascading-reel/reel.svg
https://cdn.jsdelivr.net/gh/nilmuse/demo-assets@v1.1.0/packages/clicktone/audio/cartoon.mp3
https://cdn.jsdelivr.net/gh/nilmuse/demo-assets@v1.1.0/packages/smoke-layer/fog-texture.png
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

MIT
