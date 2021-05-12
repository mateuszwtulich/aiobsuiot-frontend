import { AuthUserType } from "contexts/AuthContext";

const EDIT_TASK = "EDIT_TASK";
const ADD_TASK = "ADD_TASK";
const DELETE_TASK = "DELETE_TASK";
const GET_TASKS = "GET_TASKS";

function hasAuthority(authUser, authority) {
	return authUser.authorities.find(({authority: _authority})=> _authority === authority);
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