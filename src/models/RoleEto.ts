import Permission from "./Permission";

type RoleEto = {
	id: string,
	name: string,
	description?: string, 
	permissionEtoList: Permission[],
}

export default RoleEto;