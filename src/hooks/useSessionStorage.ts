const useSessionStorage = (name: any) => {
  /** 获取sessionStorage */
  const getSessionStorage = () => {
    const local = sessionStorage.getItem(name)
    if (local !== null) {
      return JSON.parse(local)
    }
    return null;
  }
  /** 设置sessionStorage */
  const setSessionStorage = (item?: any) => {
    if (!item) return null;
    sessionStorage.setItem(name, JSON.stringify(item))
  }
  /** 清除sessionStorage */
  const removeSessionStorage = () => {
    return sessionStorage.removeItem(name)
  }

  return { getSessionStorage, setSessionStorage, removeSessionStorage }
};

export default useSessionStorage;
