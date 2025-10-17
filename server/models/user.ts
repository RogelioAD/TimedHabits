import { Association, DataTypes, Model, Sequelize } from 'sequelize';
import { Habit } from './habit';
import { TimeEntry } from './timeEntry';

export class User extends Model {
    declare id: number;
    declare googleId: string;
    declare email: string;
    declare displayName: string;
    declare profilePicture: string;
    declare createdAt: Date;
    declare updatedAt: Date;
    declare habits?: Habit[];
    declare timeEntries?: TimeEntry[];

    static associations: {
        habits: Association<User, Habit>;
        timeEntries: Association<User, TimeEntry>;
    };
}

export function UserFactory(sequelize: Sequelize) {
    User.init({
        id: { 
            type: DataTypes.INTEGER.UNSIGNED, 
            autoIncrement: true, 
            primaryKey: true ,
            allowNull: false,
            unique: true,   
        },
        googleId: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        displayName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        profilePicture: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    }, {
        freezeTableName: true,
        tableName: 'user',
        sequelize,
        timestamps: true
    });

    return User
}