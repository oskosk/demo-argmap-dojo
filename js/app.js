dojo.require("dojo.parser");
dojo.require("dijit.layout.AccordionContainer");
dojo.require("dijit.layout.ContentPane");
dojo.require("dijit.layout.TabContainer");
dojo.require("dijit.layout.BorderContainer");
dojo.require("dijit.form.Button");
dojo.require("dijit.Dialog");
dojo.require("dijit.form.CheckBox");
dojo.require("argmap.dijit.EditBar");

dojo.ready(function(){
	map = new argmap.Map();
	tb = new argmap.toolsets.Draw(map);
	tb.activate(argmap.toolsets.Draw.POINT);
	//dojo.parser.parse();
	dojo.connect(dojo.byId('punto'), 'click', tb, function() { this.activate(argmap.toolsets.Draw.POINT) } );
	dojo.connect(dojo.byId('linea'), 'click', tb, function() { this.activate(argmap.toolsets.Draw.POLYLINE) } );
	dojo.connect(dojo.byId('poligono'), 'click', tb, function() { this.activate(argmap.toolsets.Draw.POLYGON) } );
});
