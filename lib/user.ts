const USER_ID_KEY = "live_match_user_id";
const USERNAME_KEY = "live_match_username";

export const getUserSession = (): { userId: string; username: string } => {
  let userId = localStorage.getItem(USER_ID_KEY);
  let username = localStorage.getItem(USERNAME_KEY);

  if (!userId) {
    userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem(USER_ID_KEY, userId);
  }

  if (!username) {
    const randomNum = Math.floor(Math.random() * 1000);
    username = `Fan${randomNum}`;
    localStorage.setItem(USERNAME_KEY, username);
  }

  return { userId, username };
};

export const setUsername = (username: string): void => {
  localStorage.setItem(USERNAME_KEY, username);
};

export const getUsername = (): string => {
  return localStorage.getItem(USERNAME_KEY) || "Fan";
};
