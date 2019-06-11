window.onload = function() {
    var rom_input = document.getElementById('rom_input');
    rom_input.addEventListener('change', function() {
            console.log("User selected rom file: ", rom_input.files[0]);
            var reader = new FileReader();
            reader.onload = function() {
                
                var gb = new Gameboy();

                var file_byte_array = new Uint8Array(this.result);
                gb.set_rom(file_byte_array);

                gb.run();
            }
            reader.readAsArrayBuffer(rom_input.files[0]);
        }
    );
}