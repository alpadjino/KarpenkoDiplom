export const host = "http://localhost:5000";

export const registerRoute = `${host}/api/auth/register`;
export const loginRoute = `${host}/api/auth/login`;

export const getAllUsersRoute = `${host}/api/users/all`;
export const getMeRoute = `${host}/api/users/me`;
export const findUserRoute = `${host}/api/users/findUser`;
export const editUserData = `${host}/api/users/editProfile`;

export const createChatRoute = `${host}/api/admin/chat/createChat`;
export const addRolesRoute = `${host}/api/admin/chat/addRoles`;

export const getAllChats = `${host}/api/chat/all`;
export const getUserChatsRoutes = `${host}/api/chat/getUserChats`;
export const getChatMessage = `${host}/api/chat/getCurrentChatMessages`;
export const sendMyMessage = `${host}/api/chat/sendMessage`;

export const createNewsRoute = `${host}/api/news/create`;
export const showNewsRoute = `${host}/api/news/all`;
export const deleteOneNewsRoute = `${host}/api/news/delete`;
export const getOneNewsRoute = `${host}/api/news`;
export const setLikeRoute = `${host}/api/news/setLike`;