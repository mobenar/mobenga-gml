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
exports.parse = function parse(string) {

	// TODO: Parse GML
	throw Error('GML parse not implemented yet');
};

/**
 * Stringifies GML object.
 *
 * @param {Object} graph
 * @param {Object} [options]
 * @returns {String}
 */
exports.stringify = function stringify(graph, options) {

	if (typeof graph.toJSON === 'function') {
		graph = graph.toJSON();
	}

	options = options || {};

	var nodes = graph.nodes || [];
	var edges = graph.edges || [];
	var indent1 = (typeof options.indent === 'string' ? options.indent : '  ');
	var indent2 = indent1 + indent1;
	var getGraphAttributes = options.graphAttributes || null;
	var getNodeAttributes = options.nodeAttributes || null;
	var getEdgeAttributes = options.edgeAttributes || null;
	var lines = ['graph ['];

	function addAttribute(key, value, indent) {

		if (isObject(value)) {
			lines.push(indent + key + ' [');

			forIn(value, function (key, value) {

				addAttribute(key, value, indent + indent1);
			});

			lines.push(indent + ']');
		}
		else {
			lines.push(indent + attribute(key, value));
		}
	}

	forIn(graph, function (key, value) {

		if (key !== 'nodes' && key !== 'edges') {
			addAttribute(key, value, indent1);
		}
	});

	if (getGraphAttributes) {
		forIn(getGraphAttributes(graph), function (key, value) {

			addAttribute(key, value, indent1);
		});
	}

	nodes.forEach(function (node) {

		lines.push(indent1 + 'node [');

		addAttribute('id', node.id, indent2);
		addAttribute('label', node.label, indent2);

		if (getNodeAttributes) {
			forIn(getNodeAttributes(node), function (key, value) {

				addAttribute(key, value, indent2);
			});
		}

		lines.push(indent1 + ']');
	});

	edges.forEach(function (edge) {

		lines.push(indent1 + 'edge [');

		addAttribute('source', edge.source, indent2);
		addAttribute('target', edge.target, indent2);
		addAttribute('label', edge.label, indent2);

		if (getEdgeAttributes) {
			forIn(getEdgeAttributes(edge), function (key, value) {

				addAttribute(key, value, indent2);
			});
		}

		lines.push(indent1 + ']');
	});

	lines.push(']');

	return lines.join('\n');
};

function isObject(value) {

	return (value && Object.prototype.toString.call(value) === '[object Object]');
}

function forIn(object, callback) {

	Object.keys(object).forEach(function (key) {

		callback(key, object[key]);
	});
}

function attribute(key, value) {

	if (typeof value === 'boolean') {
		value = value ? 1 : 0;
	}

	return (key + ' ' + JSON.stringify(value));
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
