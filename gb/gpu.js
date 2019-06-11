function GPU() {
	this._mode = 0;
	this._modeclock = 0;
	this._currentline = 0;
	
	this._vram = [];
	this._oam = [];

	this._bgmap = false;
	this._scx = 0;
	this._scy = 0;
	
	this.advanceCycles = function(cyclesAdvanced) {
		this._modeclock += cyclesAdvanced;
		
		switch(this._mode) {
			case 2: // searching OAM
				if(this._modeclock >= 20) {
					this._modeclock = 0; // TODO: Why aren't these -= the corresponding modeclock amount?
					this._mode = 3;
				}
				break;
			case 3: // drawing
				if(this._modeclock >= 43) {
					this._modeclock = 0;
					this._mode = 0;
					this.render_scanline();
				}
				break;
			case 0: // hblank
				if(this._modeclock >= 51) {
					this._modeclock = 0;
					this._line++;
					
					if(this._line == 143) {
						this._mode = 1;
						// TODO: render frame
					} else {
						this._mode = 2;
					}
				}
				break;
			case 1: // vblank
				if(this._modeclock >= 114) {
					this._modeclock = 0;
					this._line++;
					
					if(this._line > 153) {
						this._mode = 2;
						this._line = 0;
					}
				}
				break;
		}
	};
	
	this.render_scanline = function() {
		var map_y = this._bgmap ? 0x1C00 : 0x1800;
		map_y += Math.trunc(((this._currentline + this._scy) & 0xFF) / 8);
		var map_x = Math.trunc(this._scx / 8);
		var pixel_y = (this._currentline + this._scy) & 7;
		var pixel_x = this._scx & 7;

		
	};
	
	this.reset = function() {
		this._mode = 0;
		this._modeclock = 0;
		this._currentline = 0;

		this._vram.length = 0x9FFF - 0x8000 + 1;
		this._vram.fill(0);
		this._oam.length = 0xFE9F - 0xFE00 + 1;
		this._oam.fill(0);

		this._bgmap = false;
		this._scx = 0;
		this._scy = 0;
	};
};