import { Sequelize } from 'sequelize';
import { TimeEntry, TimeEntryFactory } from './timeEntry';
import { User, UserFactory } from './user';
import { Habit, HabitFactory } from './habit';
import { time } from 'console';

const timedhabitsdb = new Sequelize( 'timedhabits', 'root', 'Password1!', {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
});

UserFactory(timedhabitsdb);
HabitFactory(timedhabitsdb);
TimeEntryFactory(timedhabitsdb);


User.hasMany(Habit, { foreignKey: 'userId' });
Habit.belongsTo(User, { foreignKey: 'userId' });
Habit.hasMany(TimeEntry, { foreignKey: 'habitId' });
TimeEntry.belongsTo(Habit, { foreignKey: 'habitId' });

export default timedhabitsdb;