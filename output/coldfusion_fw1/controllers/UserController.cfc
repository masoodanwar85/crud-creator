component {

function list(rc) {
    rc.records = model("User").getAll();
}

function save(rc) {
    model("User").save(rc);
}

function delete(rc) {
    model("User").delete(rc.id);
}

}
