/*global describe, before, it */

var fs = require('fs');
var expect = require('chai').expect;

var GML = require('../index');

describe('GML', function () {

	var gml;

	before(function () {

		gml = fs.readFileSync('test/graph.gml', 'utf8').replace(/\r\n/g, '\n');
	});

	it.skip('should parse', function () {

		var parsed = GML.parse(gml);
		var nodeIds = parsed.nodes.map(function (node) { return node.id; });
		var edgeLabels = parsed.edges.map(function (edge) { return edge.label; });

		expect(nodeIds).to.have.members([1, 2, 3, 4, 5, 6, 7]);
		expect(edgeLabels).to.have.members(['A->B', 'A->C', 'B->D', 'B->E', 'C->F', 'C->G']);
	});

	it('should stringify', function () {

		var string = GML.stringify({
			directed: true,
			label: '',
			nodes: [
				{ id: 1, label: 'A' },
				{ id: 2, label: 'B' },
				{ id: 3, label: 'C' },
				{ id: 4, label: 'D' },
				{ id: 5, label: 'E' },
				{ id: 6, label: 'F' },
				{ id: 7, label: 'G' }
			],
			edges: [
				{ source: 1, target: 2, label: 'A->B' },
				{ source: 1, target: 3, label: 'A->C' },
				{ source: 2, target: 4, label: 'B->D' },
				{ source: 2, target: 5, label: 'B->E' },
				{ source: 3, target: 6, label: 'C->F' },
				{ source: 3, target: 7, label: 'C->G' }
			]
		}, {
			indent: '  '
		});

		expect(string).to.equal(gml);
	});

});
