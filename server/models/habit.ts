import { Association, DataTypes, Model, Sequelize } from 'sequelize';
import { TimeEntry } from './timeEntry';
import { User } from './user';


export class Habit extends Model {
    declare id: number;
    declare userId: number;
    declare name: string;
    declare description: string;
    declare goalTimeMinutes: number;
    declare color: string;
    declare isActive: boolean;
    declare createdAt: Date;
    declare updatedAt: Date;
    declare user?: User;
    declare timeEntries?: TimeEntry[];

    static associations: {
        user: Association<Habit, User>;
        timeEntries: Association<Habit, TimeEntry>;
    };
}

export function HabitFactory(sequelize: Sequelize) {
    Habit.init({
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            unique: true,
        },
        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        goalTimeMinutes: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        color: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
    }, {
        sequelize,
        tableName: 'habit',
        timestamps: true
    });

    return Habit;
}