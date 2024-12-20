import * as process from "node:process";
function parseCommandLineArgs(args) {
    const parsedArgs = {
        input: '',
        output: '',
        encrypt: [],
        decrypt: [],
        compress: false,
        decompress: false,
    };
    // Обрабатываем опции
    for (let i = 2; i < args.length; i++) {
        if (args[i] === '--encrypt' && args[i + 1]) {
            parsedArgs.encrypt.push(args[i + 1]);
            i++;
        }
        else if (args[i] === '--decrypt' && args[i + 1]) {
            parsedArgs.decrypt.push(args[i + 1]);
            i++;
        }
        else if (args[i] === '--compress') {
            parsedArgs.compress = true;
        }
        else if (args[i] === '--decompress') {
            parsedArgs.decompress = true;
        }
        else {
            if (parsedArgs.input) {
                parsedArgs.output = args[i];
            }
            else {
                parsedArgs.input = args[i];
            }
        }
    }
    return parsedArgs;
}
function main() {
    const args = parseCommandLineArgs(process.argv);
}
main();
