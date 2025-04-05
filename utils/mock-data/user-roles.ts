export const userRoles = ["admin", "seller", "customer"];
export const userRolesOptions = userRoles.map((role) => ({
	id: role,
	name: role.charAt(0).toUpperCase() + role.slice(1),
}));
