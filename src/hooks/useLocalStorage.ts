const useLocalStorage = () => {
  /** 获取 locaStorage */
  const getLocaStorage = (key: string) => {
    const local: any = window.localStorage.getItem(key);
    if (local !== null) {
      return JSON.parse(local);
    }
  };

  /**
   * @description 存储localStorage
   * @param {String} key Storage名称
   * @param {string} value Storage值
   * @returns void
   */
  const setLocaStorage = (key: string, value?: string) => {
    if (!value) return null;
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  /** 删除指定的 localStorage */
  const delSimgleLocastorage = (key: string) => {
    if (!key) return null;
    window.localStorage.removeItem(key);
  };

  /** 清除所有的 localStorage */
  const clearLocalStorage = () => {
    window.localStorage.clear();
  };

  return { getLocaStorage, setLocaStorage, delSimgleLocastorage, clearLocalStorage }
};

export default useLocalStorage;
