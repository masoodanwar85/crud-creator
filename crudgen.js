#!/usr/bin/env node

const generate = require("./core/generator");
const fs = require("fs");

// CLI args
const args = process.argv.slice(2);
const command = args[0];     // make:crud
const entity = args[1];      // User
const fwIndex = args.indexOf("--fw");
const framework = fwIndex !== -1 ? args[fwIndex + 1] : null;

if (!command || !entity || !framework) {
  console.log(`
Usage:
  crudgen make:crud User --fw laravel
  crudgen make:model User --fw coldfusion_fw1
`);
  process.exit();
}

// Load schema
const schema = JSON.parse(fs.readFileSync("schema/schema.json"));

// Override entity dynamically
schema.entity = entity;
schema.table = entity.toLowerCase() + "s";

// Detect mode
let mode = "crud";
if (command === "make:model") mode = "model";

// Call generator correctly
generate(framework, schema, mode);

console.log(`✅ ${command} generated for ${entity} using ${framework}`);
