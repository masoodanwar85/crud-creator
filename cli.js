const generate = require("./core/generator");
const schema = require("./schema/schema.json");

const framework = process.argv[2]; // e.g. laravel, coldfusion_fw1

if (!framework) {
  console.log("Usage: node cli.js <framework>");
  process.exit();
}

generate(framework, schema);
