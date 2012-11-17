/*
 * Ample SDK - JavaScript GUI Framework
 *
 * Copyright (c) 2012 Sergey Ilinsky
 * Dual licensed under the MIT and GPL licenses.
 * See: http://www.amplesdk.com/about/licensing/
 *
 */

var cXULElement_caption	= function(){};
cXULElement_caption.prototype	= new cXULElement("caption");
cXULElement_caption.prototype.viewType	= cXULElement.VIEW_TYPE_VIRTUAL;

// Class Events Handlers
cXULElement_caption.handlers	= {
	"DOMNodeInsertedIntoDocument":	function(oEvent) {
		this.parentNode.$getContainer("caption").innerHTML	= (this.hasAttribute("image") ? '<img src="' + this.getAttribute("image") + '" align="absmiddle" /> ' : '')+(this.hasAttribute("label") ? this.getAttribute("label") : '');
		if (this.getAttribute("hidden") != "true")
			this.parentNode.$getContainer("caption").style.display	= "";
	}
};

cXULElement_caption.prototype.$mapAttribute	= function(sName, sValue) {
	// ensure the parent is groupbox
	if (!(this.parentNode instanceof cXULElement_groupbox))
		return;
	//
	if (sName == "label")
		this.parentNode.$getContainer("caption").innerHTML	=(this.attributes["image"] ? '<img src="' + this.attributes["image"] + '" align="absmiddle" /> ' : '')+ (sValue || '');
	else
	if (sName == "image")
		this.parentNode.$getContainer("caption").innerHTML	=(sValue ? '<img src="' + sValue + '" align="absmiddle" /> ' : '') + (this.attributes["label"] ? this.attributes["label"] : '');
	else
	if (sName == "hidden")
		this.parentNode.$getContainer("caption").style.display	= sValue == "true" ? "none" : "";
	else
		cXULElement.prototype.$mapAttribute.call(this, sName, sValue);
};

// Register Element
ample.extend(cXULElement_caption);
