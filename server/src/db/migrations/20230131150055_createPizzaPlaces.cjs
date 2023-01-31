/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.createTable("pizzaPlaces", (table) => {
        table.bigIncrements("id")
        table.string("name").notNullable()
        table.string("address").notNullable()
        table.string("phoneNumber").notNullable()
        table.string("website")
        table.string("hours")
        table.string("imageUrl")
        table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
        table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
    })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.dropTableIfExists("pizzaPlaces")
}
