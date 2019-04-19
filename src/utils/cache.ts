interface ICacheItem {
  expired: number;
  value: any;
}

interface ICache {
  [key: string]: ICacheItem;
}

const CACHE: ICache = {};
const cache = {
  get(key: string) {
    if (CACHE[key] && CACHE[key].expired > Date.now()) {
      return CACHE[key].value;
    } else {
      return null;
    }
  },
  set(key: string, value: any, maxAge: number) {
    CACHE[key] = {
      expired: maxAge,
      value,
    };

    return CACHE[key];
  },
};
