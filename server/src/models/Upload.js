const Model = require('./Model')

class Upload extends Model {
	static get tableName() {
		return "uploads"
	}

	static get jsonSchema(){
		return {
			type: "object",
			required: ["title", "image"],
			properties: {
					title: { type: "string" },
					image: { type: "string" }
			}
		}
	}
}

module.exports = Upload