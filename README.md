# GML

GML (Graph Modelling Language) parser and stringifier.


## Stringify options (yEd)

### graphAttributes

```javascript
{
	hierarchic: {Boolean}
}
```

### nodeAttributes

```javascript
{
	graphics: {
		x: {Number},
		y: {Number},
		w: {Number},
		h: {Number},
		type: {String},
		fill: {String}, // #RRGGBB
		outline: {String} // #RRGGBB
	},

	LabelGraphics: {
		text: {String},
		color: {String}, // #RRGGBB
		fontSize: {Number},
		fontStyle: {String},
		fontName: {String},
		underlineText: {Boolean},
		visible: {Boolean}
	}
}
```

### edgeAttributes

```javascript
{
	graphics: {
		style: {String},
		fill: {String}, // #RRGGBB
		targetArrow: {string}
	},
	LabelGraphics: {
		text: {String},
		fontSize: {Number},
		fontName: {String}
	}
}
```
