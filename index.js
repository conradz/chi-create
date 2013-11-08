'use strict';

var forOwn = require('mout/object/forOwn'),
    forEach = require('mout/array/forEach'),
    isArray = require('mout/lang/isArray'),
    isPlainObject = require('mout/lang/isPlainObject');

var document = window.document,
    slice = Array.prototype.slice;

module.exports = create;

function create(tagName) {
    var tag = document.createElement(tagName);
    forEach(slice.call(arguments, 1), addContent, tag);

    return tag;
}

function addContent(value) {
    /* jshint validthis: true */
    if (typeof value === 'string') {
        this.appendChild(document.createTextNode(value));
    } else if (isPlainObject(value)) {
        forOwn(value, setAttribute, this);
    } else if (isArray(value)) {
        forEach(value, addContent, this);
    } else {
        this.appendChild(value);
    }
}

function setAttribute(value, name) {
    /*jshint validthis: true */
    this.setAttribute(name, value);
}
