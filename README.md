# DSi UI

Small, framework-independent web components inspired by the Nintendo DS and DSi system menu.

No framework or runtime dependency is required. Import the module once, import the theme, then use the custom elements in HTML.

Source, examples, and the full component list are available on [GitHub](https://github.com/doriangironde/dsi-ui).

## Install from GitHub

```sh
npm install github:doriangironde/dsi-ui
```

```js
import "dsi-ui";
import "dsi-ui/theme.css";
```

```html
<ds-panel heading="My projects" surface="grid">
  <ds-menu-item
    icon="profile"
    label="First project"
    description="A short description."
  ></ds-menu-item>
</ds-panel>
```

## Components

`ds-button` · `ds-icon-tile` · `ds-menu-item` · `ds-panel` · `ds-message` · `ds-status-bar` · `ds-clock` · `ds-calendar` · `ds-toggle` · `ds-progress` · `ds-tabs` · `ds-dialog` · `ds-input` · `ds-select` · `ds-slider` · `ds-checkbox` · `ds-breadcrumb` · `ds-badge` · `ds-pagination` · `ds-list`

Interactive elements emit small, native `CustomEvent`s such as `ds-select`, `ds-change`, `ds-input`, `ds-dismiss`, `ds-confirm`, and `ds-cancel`. Events bubble and cross shadow DOM boundaries.

## Local demo

Serve the repository root, then open `demo/index.html`:

```sh
npx serve .
```

The `src` directory is intentionally usable without a build step. The sprite sheet and system font are included in the package.

## License

MIT
