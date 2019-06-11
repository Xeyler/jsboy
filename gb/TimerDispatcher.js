function TimingDispatcher(gpu) {
    this.advanceCycles = function(numOfCycles) {
        gpu.advanceCycles(numOfCycles);
    };
};