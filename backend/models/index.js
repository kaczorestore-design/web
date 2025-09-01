const User = require('./User');
const Content = require('./Content');
const Contact = require('./Contact');
const RadiologistApplication = require('./RadiologistApplication');
const SalesLead = require('./SalesLead');

// Define associations
Content.belongsTo(User, { foreignKey: 'author', as: 'authorDetails' });
User.hasMany(Content, { foreignKey: 'author' });

Contact.belongsTo(User, { foreignKey: 'assignedTo', as: 'assignee' });
Contact.belongsTo(User, { foreignKey: 'respondedBy', as: 'responder' });
User.hasMany(Contact, { foreignKey: 'assignedTo' });
User.hasMany(Contact, { foreignKey: 'respondedBy' });

// RadiologistApplication associations
RadiologistApplication.belongsTo(User, { foreignKey: 'reviewedBy', as: 'reviewer' });
User.hasMany(RadiologistApplication, { foreignKey: 'reviewedBy' });

// SalesLead associations
SalesLead.belongsTo(User, { foreignKey: 'assignedTo', as: 'assignee' });
SalesLead.belongsTo(User, { foreignKey: 'qualifiedBy', as: 'qualifier' });
SalesLead.belongsTo(User, { foreignKey: 'closedBy', as: 'closer' });
User.hasMany(SalesLead, { foreignKey: 'assignedTo' });
User.hasMany(SalesLead, { foreignKey: 'qualifiedBy' });
User.hasMany(SalesLead, { foreignKey: 'closedBy' });

module.exports = {
  User,
  Content,
  Contact,
  RadiologistApplication,
  SalesLead
};