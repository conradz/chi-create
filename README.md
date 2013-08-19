# chi-create

DOM node creation ... now with added easy!

This module uses Node.js-style modules, for best results use
[browserify](https://github.com/substack/node-browserify).

```js
create(tagName, contents...);
```

`tagName` is the HTML tag name (e.g. 'div'). `contents` can be any number of
arguments where each argument is either a plain object (for attributes), a
string (for text), a DOM node (for adding existing DOM nodes), or an array
that contains DOM nodes or more arrays.

## Examples

Create an empty `<div>` node and append it to the document body:

```js
var create = require('chi-create');

var node = create('div');
document.body.appendChild(node);
```

Declare attributes on the node:

```js
create('div', { "class": "test" });
```

Add text to the node (treats strings as text, not HTML):

```js
create('div', 'Hello World');
```

Add existing DOM nodes (automatically detects DOM nodes):

```js
var span = create('span', 'Hello World!');
create('div', span);
```

Add lots of nodes (can handle nested arrays and variadic arguments):

```js
var children = [
    create('span', 'Hello '),
    create('span', 'World')
];

var mark = create('strong', '!');

create('div', children, mark);
```

Use them all together! Creates
`<div class="hello"><span>Hello</span> World<strong>!</strong></div>`.

```js
var hello = create('span', 'Hello'),
    mark = create('strong', '!'),
    attributes = { 'class': 'hello' };

create('span', attributes, hello, ' World', mark);
```