import { Association, DataTypes, Model, Sequelize } from 'sequelize';
import { Habit } from './habit';
import { User } from './user';

export class TimeEntry extends Model {
    declare id: number;
    declare habitId: number;
    declare userId: number;
    declare startTime: Date;
    declare endTime: Date;
    declare durationMinutes: number;
    declare date: Date;
    declare createdAt: Date;
    declare updatedAt: Date;
    declare habit?: Habit;
    declare user?: User;

    static associations: {
        habit: Association<TimeEntry, Habit>;
        user: Association<TimeEntry, User>;
    };
}

export function TimeEntryFactory(sequelize: Sequelize) {
    TimeEntry.init({
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        habitId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: 'habit',
                key: 'id'
            }
        },
        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        startTime: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        endTime: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        durationMinutes: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
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
        tableName: 'timeEntry',
        timestamps: true
    });

    return TimeEntry
}
