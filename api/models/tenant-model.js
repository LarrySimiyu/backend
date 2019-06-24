const db = require("../../data/dbConfig.js");

module.exports = {
  add,
  insert,
  find,
  get,
  findById
};

async function add(tenant) {
  const [id] = await db("tenant").insert(tenant);
  //return findById(id)
  return id;
  //.join("users", "tenant.user_id", "users.id")
  //.join("property", "tenant.property_id", "property.id");
  //.select("tenant.*", "users.name as tenant_name", "property.property_name");
}

//larry simiyu test addition
function insert(tenant) {
  return db("tenant")
    .insert(tenant)
    .then(ids => ({ id: ids[0] }));
}

function find() {
  return db("tenant as t").join("users as s", "t.user_id", "s.id"); // this is how you join a table
}

function get(id) {
  if (id) {
    return db("tenant")
      .where({ id: Number(id) })
      .first();
  } else {
    return db("tenant");
  }
}

function findById(id) {
  return db("tenant")
    .where({ id })
    .first();
}
