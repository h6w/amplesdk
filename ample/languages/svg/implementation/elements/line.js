/*
 * Ample SDK - JavaScript GUI Framework
 *
 * Copyright (c) 2009 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 * See: http://www.amplesdk.com/about/licensing/
 *
 */

var cSVGElement_line	= function(){};
cSVGElement_line.prototype	= new cSVGElement;

if (cSVGElement.useVML) {
	// Implementation for IE

	// handlers
	cSVGElement_line.handlers	= {
		'DOMAttrModified':	function(oEvent) {
			if (oEvent.target == this) {
				var oElement	= this.$getContainer();
				switch (oEvent.attrName) {
					case "x1":
						oElement.from	= oEvent.newValue + "," +(this.getAttribute("y1") || 0);
						break;

					case "y1":
						oElement.from	=(this.getAttribute("x1") || 0) + "," + oEvent.newValue;
						break;

					case "x2":
						oElement.to		= oEvent.newValue + "," +(this.getAttribute("y2") || 0);
						break;

					case "y2":
						oElement.to		=(this.getAttribute("x2") || 0)+ "," + oEvent.newValue;
						break;
					//
					case "transform":
						cSVGElement.applyTransform(this);
						break;
					//
					default:
						cSVGElement.setStyle(this, oEvent.attrName, oEvent.newValue);
				}
			}
		},
		'DOMNodeInsertedIntoDocument':	function(oEvent) {
			var sValue;

			// Apply gradients
			if ((sValue = cSVGElement.getStyle(this, "fill")) && sValue.substr(0, 3) == "url")
				cSVGElement.setStyle(this, "fill", sValue);

			// Apply transform
			cSVGElement.applyTransform(this);

			// Apply CSS
			cSVGElement.applyCSS(this);
		}
	};

	// presentation
	cSVGElement_line.prototype.$getTagOpen	= function() {
		return '<svg2vml:line class="svg-line' + (this.hasAttribute("class") ? ' ' + this.getAttribute("class") : '')+ '"\
						from="' + this.getAttribute("x1") + ',' + this.getAttribute("y1") + '"\
						to="' + this.getAttribute("x2") + ',' + this.getAttribute("y2") + '"\
				>' + cSVGElement.getTagStyle(this);
	};

	cSVGElement_line.prototype.$getTagClose	= function() {
		return '</svg2vml:line>';
	};
};

// Register Element with language
oSVGNamespace.setElement("line", cSVGElement_line);
