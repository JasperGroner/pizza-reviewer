/* eslint-disable import/no-extraneous-dependencies */
const Bcrypt = require("bcrypt");
const unique = require("objection-unique");
const Model = require("./Model");

const saltRounds = 10;

const uniqueFunc = unique({
  fields: ["email"],
  identifiers: ["id"],
});

class User extends uniqueFunc(Model) {
  static get tableName() {
    return "users";
  }

  set password(newPassword) {
    this.cryptedPassword = Bcrypt.hashSync(newPassword, saltRounds);
  }

  authenticate(password) {
    return Bcrypt.compareSync(password, this.cryptedPassword);
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["email", "firstName", "lastName"],

      properties: {
        email: { type: "string" },
        cryptedPassword: { type: "string" },
        firstName: { type: 'string', minLength: 1 },
        lastName: { type: 'string', minLength: 1 }
      },
    };
  }

	static get relationMappings() {
		const { Review } = require("./index.js")

		return {
			reviews: {
				relation: Model.HasManyRelation,
				modelClass: Review,
				join: {
					from: "users.id",
					to: "reviews.userId"
				}
			}
		}
  }

  $formatJson(json) {
    const serializedJson = super.$formatJson(json);

    if (serializedJson.cryptedPassword) {
      delete serializedJson.cryptedPassword;
    }

    return serializedJson;
  }
}

module.exports = User;
