/*
 Options (yEd)

 graphAttributes:
 hierarchic: {0|1}

 nodeAttributes:
 graphics [
 x {number}
 y {number}
 w {number}
 h {number}
 type {string}
 fill "#RRGGBB"
 outline	"#RRGGBB"
 ]
 LabelGraphics [
 text {string}
 color "#RRGGBB"
 fontSize {number}
 fontStyle {string}
 fontName {string}
 underlineText {0|1}
 visible {0|1}
 ]

 edgeAttributes:
 graphics [
 style {string}
 fill "#RRGGBB"
 targetArrow	{string}
 ]
 LabelGraphics [
 text {string}
 fontSize {number}
 fontName {string}
 ]
 */

/**
 * Parses GML string.
 *
 * @param {String} string
 * @returns {Object}
 */
exports.parse = function (string) {

	// TODO: Parse GML
	throw Error('GML parse not implemented yet');
};

/**
 * Stringifies GML object.
 *
 * @param {Object} object
 * @param {Object} [options]
 * @returns {String}
 */
exports.stringify = function (object, options) {

	if (typeof object.toJSON === 'function') {
		object = object.toJSON();
	}

	options = options || {};

	var nodes = object.nodes || [];
	var edges = object.edges || [];
	var indent1 = (typeof options.indent === 'string' ? options.indent : '  ');
	var indent2 = indent1 + indent1;
	var getGraphAttributes = options.graphAttributes || null;
	var getNodeAttributes = options.nodeAttributes || null;
	var getEdgeAttributes = options.edgeAttributes || null;

	var lines = ['graph ['];

	function attribute(key, value) {

		return (key + ' ' + JSON.stringify(value));
	}

	function addAttributes(attributes, indent) {

		if (!attributes) {
			return;
		}

		Object.keys(attributes).forEach(function (key) {

			var value = attributes[key];

			if (isObject(value)) {
				lines.push(indent + key + ' [');
				addAttributes(value, indent + indent1);
				lines.push(indent + ']');
			}
			else {
				lines.push(indent + attribute(key, value));
			}
		});
	}

	addAttributes({ directed: object.directed ? 1 : 0 }, indent1);

	if (object.label) {
		addAttributes({ label: object.label }, indent1);
	}

	if (getGraphAttributes) {
		addAttributes(getGraphAttributes(object), indent1);
	}

	nodes.forEach(function (node) {

		lines.push(indent1 + 'node [');

		addAttributes({
			id: node.id,
			label: node.label
		}, indent2);

		if (getNodeAttributes) {
			addAttributes(getNodeAttributes(node), indent2);
		}

		lines.push(indent1 + ']');
	});

	edges.forEach(function (edge) {

		lines.push(indent1 + 'edge [');

		addAttributes({
			source: edge.source,
			target: edge.target,
			label: edge.label
		}, indent2);

		if (getEdgeAttributes) {
			addAttributes(getEdgeAttributes(edge), indent2);
		}

		lines.push(indent1 + ']');
	});

	lines.push(']');

	return lines.join('\n');
};

function isObject(value) {

	return (value && Object.prototype.toString.call(value) === '[object Object]');
}

/*
function errorMessage(lineNumber, line) {

	var message = 'GML parse error';

	if (lineNumber) {
		message += ', line ' + lineNumber;
	}

	if (line) {
		message += ': ' + line;
	}

	return message;
}
*/
