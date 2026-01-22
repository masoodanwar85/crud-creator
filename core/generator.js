const fs = require("fs");
const path = require("path");
const Handlebars = require("handlebars");

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

  if (!fs.existsSync(templatePath)) {
    console.error("❌ Template not found:", templatePath);
    process.exit(1);
  }

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

// MAIN GENERATOR
function generate(framework, schema, mode = "crud") {
  console.log("🚀 Generating for framework:", framework);

  const config = loadFramework(framework);

  for (const [templateName, outputTemplatePath] of Object.entries(config.files)) {

    // If only model mode
    if (mode === "model" && templateName !== "model") continue;

    const outputPath = renderPath(outputTemplatePath, schema);
    const fullPath = path.join(__dirname, "../output", framework, outputPath);

    // Create folders
    fs.mkdirSync(path.dirname(fullPath), { recursive: true });

    // Compile template
    const content = compileTemplate(framework, templateName, schema);

    // Write file
    fs.writeFileSync(fullPath, content);
    console.log("✅ Generated:", fullPath);
  }
}

module.exports = generate;
