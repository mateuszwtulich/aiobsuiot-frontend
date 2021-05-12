import User from "./User";

type Task = {
  id : string,
  name : string,
  userTo : User,
  finalDate : Date,
}

export default Task;
