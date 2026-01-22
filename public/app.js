function addField() {
  const div = document.createElement("div");
  div.innerHTML = `
    Name: <input class="name">
    Type: <input class="type" value="string">
    Required: <input type="checkbox" class="required">
    <hr>
  `;
  document.getElementById("fields").appendChild(div);
}

function saveSchema() {
  const entity = document.getElementById("entity").value;
  const table = document.getElementById("table").value;

  const fields = [];
  document.querySelectorAll("#fields div").forEach(d => {
    fields.push({
      name: d.querySelector(".name").value,
      type: d.querySelector(".type").value,
      required: d.querySelector(".required").checked
    });
  });

  const schema = { entity, table, fields };

  fetch("/save-schema", {
    method: "POST",
    body: JSON.stringify(schema),
    headers: { "Content-Type": "application/json" }
  }).then(r => alert("Schema saved!"));
}
