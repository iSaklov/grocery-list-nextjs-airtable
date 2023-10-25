const Airtable = require('airtable')

// Authenticate
Airtable.configure({
	endpointUrl: 'https://api.airtable.com',
	apiKey: process.env.AIRTABLE_API_TOKEN,
})

// Initialize a base
const base = Airtable.base(process.env.AIRTABLE_BASE_ID)

// Reference a table
const table = base(process.env.AIRTABLE_TABLE_ID)

// To get minified records array
const minifyItems = (records) => records.map((record) => getMinifiedItem(record))

// to make record meaningful.
const getMinifiedItem = (record) => {
	if (!record.fields.brought) {
		record.fields.brought = false
	}
	return {
		id: record.id,
		fields: record.fields,
	}
}

export { table, minifyItems, getMinifiedItem }
