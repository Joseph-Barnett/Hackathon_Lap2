const db = require('../database/connect')

class Entries {
    constructor({id, name, entry_date, entry_time, entry}) {
        this.id = id;
        this.name = name;
        this.entry_date = entry_date;
        this.entry_time = entry_time;
        this.entry = entry;
    }

    static async getAll() {
        const response = await db.query("SELECT * FROM entries ORDER BY entry_date DESC;");
        if (response.rows.length === 0) {
            throw new Error("No entries available.")
        }
        return response.rows.map(entry => new Entries(entry));
    }

    static async getOneById(id) {
        const response = await db.query('SELECT * FROM entries WHERE id = $1;', [id]);

        if (response.rows.length != 1) {
            throw new Error("Unable to locate entry.")
        }
        return new Entries(response.rows[0]);
    }

    static async create(data) {
        const { name, entry_date, entry_time, entry } = data;
        const response = await db.query('INSERT INTO entries (name, entry_date, entry_time, entry) VALUES ($1, $2, $3, $4) RETURNING *;', [name, entry_date, entry_time, entry]);
        const newSnack = new Entries(response.rows[0]);
        return newSnack;
    }
    
    async update(data) {
        const response = await db.query("UPDATE entries SET votes = $1 RETURNING id, votes;",
            [this.votes + parseInt(data.votes), this.id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to update votes.")
        }
        return new Entries(response.rows[0]);
    }

    async destroy() {
        const response = await db.query('DELETE FROM entries WHERE id = $1 RETURNING *;', [this.id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to delete entry.")
        }
        return new Entries(response.rows[0]);
    }
}   

module.exports = Entries;