const { spawn } = require('child_process');
const path = require('path');

const serverPath = path.join(__dirname, 'dist', 'index.js');
const server = spawn('node', [serverPath]);

let step = 0;

server.stdout.on('data', (data) => {
    const lines = data.toString().split('\n').filter(line => line.trim() !== '');

    for (const line of lines) {
        try {
            const response = JSON.parse(line);

            if (step === 0 && response.result && response.result.protocolVersion) {
                // Initialized, now ask for tools
                console.log("Connection confirmed. Protocol Version:", response.result.protocolVersion);
                server.stdin.write(JSON.stringify({
                    jsonrpc: "2.0",
                    id: 2,
                    method: "tools/list"
                }) + '\n');
                step++;
            } else if (step === 1 && response.result && response.result.tools) {
                console.log("Available Tools:");
                response.result.tools.forEach(tool => {
                    console.log(`- ${tool.name}: ${tool.description}`);
                });
                server.kill();
                process.exit(0);
            }
        } catch (e) {
            console.error("Failed to parse JSON:", line);
        }
    }
});

server.stderr.on('data', (data) => {
    // console.error(`stderr: ${data}`);
});

// Send initialize
server.stdin.write(JSON.stringify({
    jsonrpc: "2.0",
    id: 1,
    method: "initialize",
    params: {
        protocolVersion: "2024-11-05",
        capabilities: {},
        clientInfo: { name: "test-client", version: "1.0.0" }
    }
}) + '\n');
