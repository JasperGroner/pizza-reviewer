/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.table('users', table => {
        table.string("firstName").notNullable()
        table.string('lastName').notNullable()
    })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.alterTable('users', table => {
        table.dropColumn('firstName')
        table.dropColumn('lastName')
    })
}
