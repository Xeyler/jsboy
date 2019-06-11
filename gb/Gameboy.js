function Gameboy() {
    this.running = false;

    this.gpu = new GPU();
    this.timingDispatcher = new TimingDispatcher(this.gpu);
    this.mmu = new MMU(this.gpu);
    this.cpu = new CPU(this.mmu, this.timingDispatcher);

    this.set_rom = function(bytes) {
        this.mmu.set_rom(bytes);
    }

    this.reset = function() {
        this.running = false;
        this.mmu.reset();
        this.gpu.reset();
        this.cpu.reset();
    }

    this.run = function() {
        this.running = true;
        while(this.running) {
            this.cpu.advance();
        }
    }

    this.stop = function() {
        this.running = false;
    }
}