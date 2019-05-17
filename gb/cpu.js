cpu = {
	_clock: {
		m: 0,
		t: 0
	},
	
	_r: {
		a: 0,
		b: 0,
		c: 0,
		d: 0,
		e: 0,
		h: 0,
		l: 0,
		f: 0,
		pc: 0,
		sp: 0,
		m: 0,
		t: 0,
		ime: 0
	},
	
	_halt: 0,
	_stop: 0,
	
	reset: function() {
		cpu._r.a = 0;
		cpu._r.b = 0;
		cpu._r.c = 0;
		cpu._r.d = 0;
		cpu._r.e = 0;
		cpu._r.h = 0;
		cpu._r.l = 0;
		cpu._r.f = 0;
		cpu._r.pc = 0;
		cpu._r.sp = 0;
		cpu._r.m = 0;
		cpu._r.t = 0;
	},
	
	run: function() {
		var instr = mmu.rb(cpu._r.pc++);
		ops[instr]();
		cpu._r.pc &= 0xFFFF;
		cpu._clock.m += cpu._register.m;
		cpu._clock.t += cpu._register.t;
	},
	
	ops: {
		// Misc/control instructions
		NOP: function() { cpu._r.m=1; cpu._r.t=4; },
		STOP: function() { throw new Error("opcode not implemented"); },
		HALT: function() { cpu._halt=1; },
		CB: function() { throw new Error("opcode not implemented"); },
		DI: function() { cpu._r.ime=0; cpu._r.m=1; cpu._r.t=4; },
		EI: function() { cpu._r.ime=1; cpu._r.m=1; cpu._r.t=4; },
		
		// Jumps/calls
		JR_NZ_r8: function() { throw new Error("opcode not implemented"); }
		
		// 8bit load/store/move instructions
		
		// 16bit load/store/move instructions
		
		// 8bit arithmetic/logical instructions
		
		// 16bit arithmetic/logical instructions
		
		// 8bit rotations/shifts and bit instructions
	}
};