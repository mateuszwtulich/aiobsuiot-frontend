import RoleEto from 'models/RoleEto';
import AccountEto from 'models/AccountEto';

type User = {
	id: string,
	email?: string,
	password?: string,
	repeatedPassword?: string,
	name: string,
	surname: string,
	role: string
	roleEto?: RoleEto,
	accountEto?: AccountEto,
}

export default User;
