/******************************************************************************\
|                                                                              |
|                            mouse-mode-bar-view.js                            |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines the view for a mouse mode toolbar.                       |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.md', which is part of this source code distribution.         |
|                                                                              |
|******************************************************************************|
|        Copyright (C) 2016-2024, Megahed Labs LLC, www.sharedigm.com          |
\******************************************************************************/

import ToolbarView from '../../../../../views/apps/common/toolbars/toolbar-view.js';
import MouseModeButtonsView from '../../../../../views/apps/image-viewer/header-bar/mouse-mode-bar/mouse-mode-buttons-view.js';

export default ToolbarView.extend({

	//
	// attributes
	//

	template: template(`<div class="mouse-mode"></div>`),

	regions: {
		mouse_mode: '.mouse-mode'
	},

	//
	// getting methods
	//

	getMouseMode: function() {
		return this.getChildView('mouse_mode').getValue();
	},

	//
	// setting methods
	//
	
	setMouseMode: function(mouseMode) {

		// enable / disable buttons
		//
		this.setItemsEnabled(mouseMode != undefined);

		// select / deselect actual size button
		//
		this.getChildView('mouse_mode').setValue(mouseMode);
	},

	//
	// rendering methods
	//

	onRender: function() {

		// call superclass method
		//
		ToolbarView.prototype.onRender.call(this);

		// show child views
		//
		this.showChildView('mouse_mode', new MouseModeButtonsView({
			model: this.model
		}));

		// set initial state
		//
		this.setItemsEnabled(false);
	},

	//
	// event handling methods
	//

	onLoad: function() {

		if (!this.loaded) {

			// load mouse mode buttons
			//
			this.getChildView('mouse_mode').onLoad();
			this.setMouseMode('pan');
			this.loaded = true;
		}

		// enable / disable mouse mode
		//
		this.setItemsEnabled(this.parent.app.model != undefined);
	}
});