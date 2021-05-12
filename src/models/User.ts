import RoleEto from 'models/RoleEto';

type User = {
	id: string,
	email?: string,
	password?: string,
	repeatedPassword?: string,
	name: string,
	surname: string,
	role: string
	roleEto?: RoleEto
}

export default User;
