import { AuthUserType } from "contexts/AuthContext";

const EDIT_TASK = "EDIT_TASK";
const ADD_TASK = "ADD_TASK";
const DELETE_TASK = "DELETE_TASK";
const GET_TASKS = "GET_TASKS";
const EDIT_USER = "EDIT_USER";
const ADD_USER = "ADD_USER";
const DELETE_USER = "DELETE_USER";
const GET_USERS = "GET_USERS";

function hasAuthority(authUser, authority) {
	return authUser ? authUser.authorities.find(({authority: _authority})=> _authority === authority) : false;
}

export function canRemoveTask(authUser: AuthUserType) {
	return hasAuthority(authUser, DELETE_TASK);
}

export function canAddTask(authUser: AuthUserType) {
	return hasAuthority(authUser, ADD_TASK);
}

export function canEditTask(authUser: AuthUserType) {
	return hasAuthority(authUser, EDIT_TASK);
}

export function canGetTasks(authUser: AuthUserType) {
	return hasAuthority(authUser, GET_TASKS);
}

export function canRemoveUser(authUser: AuthUserType) {
	return hasAuthority(authUser, DELETE_USER);
}

export function canAddUser(authUser: AuthUserType) {
	return hasAuthority(authUser, ADD_USER);
}

export function canEditUser(authUser: AuthUserType) {
	return hasAuthority(authUser, EDIT_USER);
}

export function canGetUsers(authUser: AuthUserType) {
	return hasAuthority(authUser, GET_USERS);
}