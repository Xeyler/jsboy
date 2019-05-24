gpu = {
	_mode: 0,
	_modeclock: 0,
	_line: 0,
	
	_vram: [],
	_oam: [],
	_opengl_rendering_context: [],
	
	update: function() {
		gpu._modeclock += cpu._r.t;
		
		switch(gpu._mode) {
			case 2:
				if(gpu._modeclock >= 80) {
					gpu._modeclock = 0;
					gpu._mode = 3;
				}
				break;
			case 3: 
				if(gpu._modeclock >= 172) {
					gpu._modeclock = 0;
					gpu._mode = 0;
					gpu.render_scanline();
				}
				break;
			case 0:
				if(gpu._modeclock >= 204) {
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
			case 1:
				if(gpu._modeclock >= 456) {
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
	
	reset: function() {
		gpu._opengl_rendering_context = document.getElementById('display').getContext('webgl2');
	}
};