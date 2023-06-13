const path = require("path");
const fs = require("fs");
const solc = require("solc");

const outputPath = path.resolve(__dirname, "..", "build", "PureYul.bytecode.json");

const inputPath = path.resolve(__dirname, "..", "contracts", "PureYul.sol");//path for input comtract
const source = fs.readFileSync(inputPath, "utf-8");//encoding 

var input = {
    language: 'Yul',//language 
    sources: {
        'PureYul.sol' : { //contract name 
            content: source //path 
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': [ "evm.bytecode" ] // output the byte code (not able to get the abi)
            }
        }
    }
};

const compiledContract = solc.compile(JSON.stringify(input)); //compile the input using solc
const bytecode = JSON.parse(compiledContract).contracts["PureYul.sol"].PureYul.evm.bytecode.object;

fs.writeFile(outputPath, JSON.stringify(bytecode), (err) => {});
console.log(compiledContract);
console.log("done");
