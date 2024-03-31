export const users = [
  {
    id: 1,
    name: "sinan",
    email: "sinuzar5@gmail.com",
    password: "1234",
    usertype: "job-seeker",
  },
  {
    id: 2,
    name: "sinan",
    email: "sinan@gmail.com",
    password: "1234",
    usertype: "recruiter",
  },
];
/**
 *
 * @param {*} user object containing user data
 * @returns true/false based registration success
 */
export const registerUser = (user) => {
  const isUserExist = users.includes(({ email }) => email === user.email);
  if (isUserExist) return false;
  const newUser = {
    id: users.length + 1,
    name: user.name,
    email: user.email,
    password: user.password,
    usertype: user.usertype,
  };
  users.push(newUser);
  return true;
};
/**
 * authenticating if every data matches with stored info
 */

export const authenticateUser = (reqUser) => {
  const user = users.find(
    (user) =>
      user.email === reqUser.email &&
      user.password === reqUser.password &&
      user.usertype === reqUser.usertype
  );
  return user;
};
export const getUserById = (userId) => {
  return users.find((user) => user.id == userId);
};
