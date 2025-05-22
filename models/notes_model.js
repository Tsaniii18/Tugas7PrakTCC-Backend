import { Sequelize } from "sequelize";
import db from "../config/database.js";
import User from "./user_model.js";

const { DataTypes } = Sequelize;

const Note = db.define('note', {
    judul: Sequelize.STRING,
    isi: Sequelize.STRING,
    // userId: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     references: {
    //         model: 'user', // menunjuk tabel user
    //         key: 'id'
    //     },
    //     onDelete: 'CASCADE', // jika user dihapus, note ikut dihapus
    //     onUpdate: 'CASCADE'
    // }
},

    {
        freezeTableName: true,
        createdAt: 'tanggal_dibuat',
        updatedAt: 'tanggal_diupdate'
    }
);

export default Note;

(async () => { await db.sync(); })();