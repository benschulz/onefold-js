'use strict';

define([], function () {
    var nodeType = {
        ELEMENT_NODE: 1,
        ATTRIBUTE_NODE: 2,
        TEXT_NODE: 3,
        CDATA_SECTION_NODE: 4,
        ENTITY_REFERENCE_NODE: 5,
        ENTITY_NODE: 6,
        PROCESSING_INSTRUCTION_NODE: 7,
        COMMENT_NODE: 8,
        DOCUMENT_NODE: 9,
        DOCUMENT_TYPE_NODE: 10,
        DOCUMENT_FRAGMENT_NODE: 11,
        NOTATION_NODE: 12
    };

    function addClass(classes, classToAdd) {
        return removeClass(classes, classToAdd) + ' ' + classToAdd;
    }

    function isClassPresent(classes, classToCheckFor) {
        return (' ' + classes + ' ').indexOf(' ' + classToCheckFor + ' ') >= 0;
    }

    function removeClass(classes, classToRemove) {
        var raw = (' ' + classes + ' ').replace(' ' + classToRemove + ' ', ' ');
        var from = raw[0] === ' ' ? 1 : 0;
        var to = raw[raw.length - 1] === ' ' ? raw.length - 1 : raw.length;
        return raw.substring(from, to);
    }

    function strictlyContains(container, node) {
        return !!(container.compareDocumentPosition(node) & 16);
    }

    function isOrStrictlyContains(container, node) {
        return container === node || strictlyContains(container, node);
    }

    function determineDepth(root, node) {
        var depth = 0;

        while (node) {
            if (node === root)
                return depth;

            node = node.parentNode;
            ++depth;
        }

        throw new Error('Node ist nicht im Teilbaum enthalten.');
    }

    return {
        nodeType: nodeType,

        determineDepth: determineDepth,
        isOrContains: isOrStrictlyContains,
        strictlyContains: strictlyContains,

        element: {
            addClass: function (element, classToAdd) {
                element.className = addClass(element.className, classToAdd);
            },
            isClassPresent: (element, classToCheckFor) => isClassPresent(element.className, classToCheckFor),
            removeClass: function (element, classToRemove) {
                element.className = removeClass(element.className, classToRemove);
            }
        },
        classes: {
            add: addClass,
            isPresent: isClassPresent,
            remove: removeClass
        }
    };
});