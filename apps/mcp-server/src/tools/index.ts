import fs from "fs/promises";
import path from "path";
import { exec } from "child_process";
import util from "util";

const execAsync = util.promisify(exec);

export const tools = [
    {
        name: "read_file",
        description: "Read a file from the filesystem",
        inputSchema: {
            type: "object",
            properties: {
                path: { type: "string" },
            },
            required: ["path"],
        },
        handler: async (args: any) => {
            const { path: filePath } = args;
            const content = await fs.readFile(filePath, "utf-8");
            return {
                content: [
                    {
                        type: "text",
                        text: content,
                    },
                ],
            };
        },
    },
    {
        name: "write_file",
        description: "Write content to a file",
        inputSchema: {
            type: "object",
            properties: {
                path: { type: "string" },
                content: { type: "string" },
            },
            required: ["path", "content"],
        },
        handler: async (args: any) => {
            const { path: filePath, content } = args;
            await fs.writeFile(filePath, content, "utf-8");
            return {
                content: [
                    {
                        type: "text",
                        text: `Successfully wrote to ${filePath}`,
                    },
                ],
            };
        },
    },
    {
        name: "run_command",
        description: "Run a shell command",
        inputSchema: {
            type: "object",
            properties: {
                command: { type: "string" },
                cwd: { type: "string" }
            },
            required: ["command"]
        },
        handler: async (args: any) => {
            const { command, cwd } = args;
            try {
                const { stdout, stderr } = await execAsync(command, { cwd: cwd || process.cwd() });
                return {
                    content: [
                        {
                            type: "text",
                            text: `STDOUT:\n${stdout}\n\nSTDERR:\n${stderr}`
                        }
                    ]
                }
            } catch (error: any) {
                return {
                    isError: true,
                    content: [
                        {
                            type: "text",
                            text: `Error executing command: ${error.message}\n${error.stdout ? "STDOUT:\n" + error.stdout : ""}\n${error.stderr ? "STDERR:\n" + error.stderr : ""}`
                        }
                    ]
                }
            }
        }
    },
    {
        name: "list_dir",
        description: "List contents of a directory",
        inputSchema: {
            type: "object",
            properties: {
                path: { type: "string" },
            },
            required: ["path"],
        },
        handler: async (args: any) => {
            const { path: dirPath } = args;
            const entries = await fs.readdir(dirPath, { withFileTypes: true });
            const files = entries.map((entry) => ({
                name: entry.name,
                type: entry.isDirectory() ? "directory" : "file",
            }));
            return {
                content: [
                    {
                        type: "text",
                        text: JSON.stringify(files, null, 2),
                    },
                ],
            };
        },
    },
];
