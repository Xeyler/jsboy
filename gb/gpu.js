gpu = {
	_mode: 0,
	_modeclock: 0,
	_line: 0,
	
	_vram: [],
	_oam: [],
	_gl: [],
	
	advanceCycles: function(cyclesAdvanced) {
		gpu._modeclock += cyclesAdvanced;
		
		switch(gpu._mode) {
			case 2: // searching OAM
				if(gpu._modeclock >= 20) {
					gpu._modeclock = 0;
					gpu._mode = 3;
				}
				break;
			case 3: // drawing
				if(gpu._modeclock >= 43) {
					gpu._modeclock = 0;
					gpu._mode = 0;
					gpu.render_scanline();
				}
				break;
			case 0: // hblank
				if(gpu._modeclock >= 51) {
					gpu._modeclock = 0;
					gpu._line++;
					
					if(gpu._line == 143) {
						gpu._mode = 1;
						// TODO: render frame
					} else {
						gpu._mode = 2;
					}
				}
				break;
			case 1: // vblank
				if(gpu._modeclock >= 114) {
					gpu._modeclock = 0;
					gpu._line++;
					
					if(gpu._line > 153) {
						gpu._mode = 2;
						gpu._line = 0;
					}
				}
				break;
		}
	},
	
	render_scanline: function() {
		
	},
	
	reset: function() {
		gpu._gl = document.getElementById('display').getContext('webgl2');
		gpu._gl.clearColor(0.0, 0.0, 0.0, 1.0);
		gpu._gl.clear(gpu._gl.COLOR_BUFFER_BIT | gpu._gl.DEPTH_BUFFER_BIT);
	}
};