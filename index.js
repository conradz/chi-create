var _ = require('lodash'),
    document = window.document;

function setAttributes(tag, attributes) {
    _.forOwn(attributes, function(value, name) {
        tag.setAttribute(name, value);
    });
}

function addContent(tag, content) {
    if (typeof content === 'string') {
        tag.appendChild(document.createTextNode(content));
    } else if (_.isArray(content)) {
        _.forEach(content, function(value) {
            addContent(tag, value);
        });
    } else {
        tag.appendChild(content);
    }
}

function create(tagName) {
    var tag = document.createElement(tagName);

    for (var i = 1, l = arguments.length; i < l; i++) {
        var value = arguments[i];
        if (_.isPlainObject(value)) {
            setAttributes(tag, value);
        } else {
            addContent(tag, value);
        }
    }

    return tag;
}

module.exports = create;