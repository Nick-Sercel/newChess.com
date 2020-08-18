// const user = {
//   id: 1,
//   username: "",
//   email: "",
//   elo: 0,
//   password: "password"
// }

// const data = {
//   user: {
//     id: 1,
//     username: "",
//     email: "",
//     elo: 0,
//     password: "password"
//   }
// }

export const postSession = (user) => {
    return $.ajax({
        url: '/api/session',
        method: 'POST',
        data: { user }
    });
};

export const deleteSession = () => {
    return $.ajax({
        url: '/api/session',
        method: 'DELETE'
    });
};
