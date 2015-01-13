var fs = require('fs');
var expect = require('chai').expect;

var GML = require('../index');

describe('GML', function () {

	it.skip('should parse', function () {

		var gml = GML.parse(fs.readFileSync('test/graph.gml', 'utf8'));

		var nodeIds = gml.nodes.map(function (node) { return node.id; });
		var edgeLabels = gml.edges.map(function (edge) { return edge.label; });

		expect(nodeIds).to.have.members([1, 2, 3, 4, 5, 6, 7]);
		expect(edgeLabels).to.have.members(['A->B', 'A->C', 'B->D', 'B->E', 'C->F', 'C->G']);
	});

});
