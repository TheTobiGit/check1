export default function useLocalStorage(key, value) {
  return {
    get,
    set,
  };
}
