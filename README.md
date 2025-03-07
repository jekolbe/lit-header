# About the project

This project serves as a **showcase** for a simple webpage header build with **[Lit](https://lit.dev/docs/)**.

The exposed top-level component `soka-kupo-header` can be included as **[Web Component](https://developer.mozilla.org/de/docs/Web/API/Web_components)** in every browser simple by importing the `bundle.js`.

## Motivation

The header is designed to be used in conjuction with a full-blown web framework like Angular or React. In a **Micro Frontend** approach one team would develop the inner app and another team maintains the header.

# Run the project

```
npm install

npm run build

npm run serve
```

Open `localhost:3000` and play around

# How it works

## Framework

**[Lit](https://lit.dev/docs/)** is designed "for building shareable components, design systems, or maintainable, future-ready sites and apps." And: "Every Lit component is a native web component"

## Communication

Communication between header and inner app happenes via standard browser **[Events](https://developer.mozilla.org/de/docs/Web/API/Event)**. For this purpose a separate library can be integrated which serves as an abstraction of `addEventListener` and `dispatchEvent`. Check out the `Inject Navigation` button for more information

## i18n

i18n is based on Lits [native i18n support](https://lit.dev/docs/localization/overview/)


# Related

- [Web Components](https://developer.mozilla.org/de/docs/Web/API/Web_components)
- [Micro Frontend](https://micro-frontends.org/)
- [Lit](https://lit.dev/)