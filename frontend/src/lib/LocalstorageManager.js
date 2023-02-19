export default {
  localstorageGetItem(key) {
    return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : null;
  },
  localstorageSetItem(key, item) {
    return localStorage.setItem(key, JSON.stringify(item));
  },
};
