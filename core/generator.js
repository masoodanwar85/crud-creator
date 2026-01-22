const fs = require("fs");
const path = require("path");
const Handlebars = require("handlebars");

Handlebars.registerHelper("entityLower", function (options) {
  return options.data.root.entity.toLowerCase();
});

// Lowercase
Handlebars.registerHelper("lower", s => s.toLowerCase());

// Uppercase
Handlebars.registerHelper("upper", s => s.toUpperCase());

// Equals
Handlebars.registerHelper("eq", (a, b) => a === b);

// Not equal
Handlebars.registerHelper("neq", (a, b) => a !== b);

// Plural (basic)
Handlebars.registerHelper("plural", s => s + "s");

// Snake case
Handlebars.registerHelper("snake", s => s.replace(/[A-Z]/g, l => "_" + l.toLowerCase()));

// Camel case
Handlebars.registerHelper("camel", s => s.replace(/_([a-z])/g, g => g[1].toUpperCase()));

// Load framework config
function loadFramework(framework) {
  const configPath = path.join(__dirname, `../frameworks/${framework}/config.json`);

  if (!fs.existsSync(configPath)) {
    console.error("❌ Framework not found:", framework);
    process.exit(1);
  }

  return JSON.parse(fs.readFileSync(configPath));
}

// Compile template
function compileTemplate(framework, templateName, schema) {
  const templatePath = path.join(
    __dirname,
    `../frameworks/${framework}/templates/${templateName}.hbs`
  );

  const source = fs.readFileSync(templatePath, "utf8");
  return Handlebars.compile(source)(schema);
}


// Replace variables in output path
function renderPath(str, schema) {
  return str
    .replace("{{entity}}", schema.entity)
    .replace("{{table}}", schema.table)
    .replace("{{timestamp}}", Date.now());
}

function cleanOutput(framework) {
  const outputPath = path.join(__dirname, "../output", framework);

  if (fs.existsSync(outputPath)) {
    fs.rmSync(outputPath, { recursive: true, force: true });
    console.log("🧹 Cleaned:", outputPath);
  }
}


// MAIN GENERATOR
function generate(framework, schema, mode = "crud") {
  console.log("🚀 Generating for framework:", framework);

  const config = loadFramework(framework);

  for (const [templateName, outputTemplatePath] of Object.entries(config.files)) {

    if (mode === "model" && templateName !== "model") continue;

    const outputPath = renderPath(outputTemplatePath, schema);
    const fullPath = path.join(__dirname, "../output", framework, outputPath);

    fs.mkdirSync(path.dirname(fullPath), { recursive: true });

    const content = compileTemplate(framework, templateName, schema);
    fs.writeFileSync(fullPath, content);

    console.log("✅ Generated:", fullPath);
  }
}


module.exports = { generate, cleanOutput };
