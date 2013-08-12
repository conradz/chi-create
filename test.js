// Tests must be run in a browser!
//
// Tests are run using [testling](https://github.com/substack/testling). You
// can install testling locally to run tests during development. To run tests
// you can run for example `testling -x firefox` to run tests in firefox.

var test = require('tape'),
    create = require('./index');

test('Create empty node', function(t) {
    var node = create('div');
    t.equal(node.tagName, 'DIV');
    t.ok(node instanceof window.Element);
    t.end();
});

test('Set node attributes', function(t) {
    var node = create('div', { "class": "foo bar", 'data-test': 'value' });
    t.equal(node.getAttribute('class'), 'foo bar');
    t.equal(node.getAttribute('data-test'), 'value');
    t.end();
});

test('Add text to node', function(t) {
    var node = create('div', 'Hello World!');
    t.equal(node.innerHTML, 'Hello World!');
    t.end();
});

test('Handle HTML characters', function(t) {
    var node = create('div', '<div>test</div>');
    t.equal(node.textContent || node.innerText, '<div>test</div>');
    t.end();
});

test('Add child nodes', function(t) {
    var child = document.createElement('span'),
        node = create('div', child);
    t.equal(node.firstChild, child);
    t.equal(node.children.length, 1);
    t.end();
});

test('Add array of child nodes', function(t) {
    var content = [
            document.createElement('h1'),
            document.createElement('h2')
        ],
        node = create('div', content);

    t.equal(node.firstChild, content[0]);
    t.equal(node.lastChild, content[1]);
    t.equal(node.children.length, 2);
    t.end();
});

test('Add text from array', function(t) {
    var content = [
            document.createElement('span'),
            'test'
        ],
        node = create('div', content);

    t.equal(node.innerHTML, '<span></span>test');
    t.end();
});

test('Add nested arrays', function(t) {
    var one = document.createElement('h1'),
        two = document.createElement('h2'),
        three = document.createElement('h3'),
        content = [one, [two, three]],
        node = create('div', content);

    t.equal(node.children.length, 3);
    t.equal(node.children[0], one);
    t.equal(node.children[1], two);
    t.equal(node.children[2], three);
    t.end();
});

test('Variadic arguments', function(t) {
    var one = document.createElement('h1'),
        two = document.createElement('h2'),
        cssAttr = { 'class': 'test', 'style': 'width: 10px' },
        dataAttr = { 'data-test': 'foo' },
        text = 'Hello World!',
        node = create('div', one, cssAttr, text, dataAttr, two);

    t.equal(node.innerHTML, '<h1></h1>Hello World!<h2></h2>');
    t.equal(node.getAttribute('class'), cssAttr['class']);
    t.equal(node.getAttribute('style'), cssAttr['style']);
    t.equal(node.getAttribute('data-test'), dataAttr['data-test']);
    t.end();
});