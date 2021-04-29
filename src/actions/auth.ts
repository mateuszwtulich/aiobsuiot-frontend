async function login({ email, password }: {email: string, password: string}) {
  console.log(email);
  console.log(password);
}

async function signup({ email, password, repeatedPassword } :
{email: string, password: string, repeatedPassword: string}) {
  console.log(email);
  console.log(password);
  console.log(repeatedPassword);
}

function logout() {}

export { login, signup, logout };
