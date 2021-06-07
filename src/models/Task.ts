import User from "./User";

type Task = {
  id: string;
  name: string;
  userTo: User;
  finalDate: string;
};

export default Task;
