let options = [
    '--require-module ts-node/register',   // load typescript module
    '--require ./steps/*.steps.ts',         // load steps declaration
    '--format progress',                    // load customer formatter
].join(' ');

let run_features = [
    './features/', //specify feature files
    options    
].join(' ');

module.exports = {
    test_runner: run_features,
    default: '--publish-quiet',
};