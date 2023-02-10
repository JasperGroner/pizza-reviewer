/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.alterTable('reviews', table => {
    table.dropForeign("pizzaPlaceId")
    table.foreign("pizzaPlaceId").references("pizzaPlaces.id").onDelete("CASCADE")
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.alterTable('reviews', table => {
    table.dropForeign("pizzaPlaceId")
    table.foreign("pizzaPlaceId").references("pizzaPlaces.id").onDelete("NO ACTION")
  })
}
