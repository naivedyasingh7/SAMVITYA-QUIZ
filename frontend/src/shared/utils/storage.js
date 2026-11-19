const PREFIX = 'evt_pts_';

export const storage = {
  get: (key) => {
    try {
      const item = localStorage.getItem(PREFIX + key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(PREFIX + key, JSON.stringify(value));
    } catch (err) {
      console.error('Storage write error', err);
    }
  },
  remove: (key) => {
    localStorage.removeItem(PREFIX + key);
  }
};
