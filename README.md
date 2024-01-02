# `<multi-check>` Element
Tiny, framework-agnostic, dependency-free Custom Element that reflects a
checkbox’s state to and from multiple checkboxes

## Installation

NPM:

```sh
npm install @evanminto/multi-check-element --save
```

Or Yarn:

```sh
yarn add @evanminto/multi-check-element
```

### HTML

```html
<script src="path/to/@evanminto/multi-check-element/dist/global.js" defer>
```

### ES Modules

You can also load the component directly in your JavaScript, which allows you to define your own custom name for the element or control the timing of module loading and custom element definition.

```js
import { MultiCheckElement } from '@evanminto/multi-check-element';

customElements.define('multi-check', MultiCheckElement);
```

## Usage

Wrap a `<multi-check>` element around an `<input type="checkbox">` and include a
`controls` attribute with a list of IDs to link the child checkbox to the
controlled checkboxes.

### Basic

```html
<label for="all">Check All</label>
<multi-check controls="one two three">
  <input type="checkbox" id="all">
</multi-check>

<ol>
  <li>
    <input type="checkbox" id="one">
    <label for="one">One</label>
  </li>
  <li>
    <input type="checkbox" id="two">
    <label for="two">Two</label>
  </li>
  <li>
    <input type="checkbox" id="three">
    <label for="three">Three</label>
  </li>
</ol>
```

## Attributes

### controls

Similar to
[`aria-controls`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-controls).
A space-separated list of IDs of checkboxes that the child checkbox should
control.

## Properties

### controls

Reflects the `controls` attribute as an array of strings.

## Events

`<multi-check>` doesn’t fire any events itself, but you can listen on `change` events on the child checkbox directly.

