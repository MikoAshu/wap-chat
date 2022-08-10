const allRoles = {
  user: ['getUsers'],
  admin: ['getUsers', 'manageUsers'],
};
const userTypes = ['consumer', 'support'];

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
  userTypes,
};
