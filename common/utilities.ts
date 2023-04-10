const hasOwn = {}.hasOwnProperty;
const protocolAndDomainRE = /^(?:\w+:)?\/\/(\S+)$/;
const localhostDomainRE = /^localhost[\:?\d]*(?:[^\:?\d]\S*)?$/;
const nonLocalhostDomainRE = /^[^\s\.]+\.\S{2,}$/;

export const noop = () => {};

export const pluralize = (text, count) => {
  return count > 1 || count === 0 ? `${text}s` : text;
};

export function toDateISOString(data: string) {
  const date = new Date(data);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export const elide = (string, length = 140, emptyState = "...") => {
  if (isEmpty(string)) {
    return emptyState;
  }

  if (string.length < length) {
    return string.trim();
  }

  return `${string.substring(0, length)}...`;
};

export function bytesToSize(bytes: bigint, decimals: number = 1) {
  if (bytes === BigInt(0)) return "0 Bytes";

  const base = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["B", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];

  const sizeIndex = Math.floor(Math.log(Number(bytes)) / Math.log(base));

  const humanReadableBytes = Number(bytes) / Math.pow(base, sizeIndex);
  return `${humanReadableBytes.toFixed(dm)} ${sizes[sizeIndex]}`;
}

export function isEmpty(text: any) {
  // NOTE(jim): If a number gets passed in, it isn't considered empty for zero.
  if (text === 0) {
    return false;
  }

  if (!text) {
    return true;
  }

  if (typeof text === "object") {
    return true;
  }

  if (text.length === 0) {
    return true;
  }

  text = text.toString();

  return Boolean(!text.trim());
}

export function createSlug(text: any) {
  if (isEmpty(text)) {
    return "untitled";
  }

  const a = "æøåàáäâèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;";
  const b = "aoaaaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------";
  const p = new RegExp(a.split("").join("|"), "g");

  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special chars
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

export function isUrl(string: any) {
  if (typeof string !== "string") {
    return false;
  }

  var match = string.match(protocolAndDomainRE);
  if (!match) {
    return false;
  }

  var everythingAfterProtocol = match[1];
  if (!everythingAfterProtocol) {
    return false;
  }

  if (
    localhostDomainRE.test(everythingAfterProtocol) ||
    nonLocalhostDomainRE.test(everythingAfterProtocol)
  ) {
    return true;
  }

  return false;
}

export function debounce<Args extends unknown[]>(
  fn: (...args: Args) => void,
  delay: number
) {
  let timeoutID: number | undefined;
  let lastArgs: Args | undefined;

  const run = () => {
    if (lastArgs) {
      fn(...lastArgs);
      lastArgs = undefined;
    }
  };

  const debounced = (...args: Args) => {
    clearTimeout(timeoutID);
    lastArgs = args;
    timeoutID = window.setTimeout(run, delay);
  };

  debounced.flush = () => {
    clearTimeout(timeoutID);
  };

  return debounced;
}

export function classNames(...args: any[]): string {
  var classes = [];

  for (var i = 0; i < arguments.length; i++) {
    var arg = arguments[i];
    if (!arg) continue;

    var argType = typeof arg;

    if (argType === "string" || argType === "number") {
      classes.push(arg);
    } else if (Array.isArray(arg)) {
      if (arg.length) {
        var inner = classNames.apply(null, arg);
        if (inner) {
          classes.push(inner);
        }
      }
    } else if (argType === "object") {
      if (arg.toString !== Object.prototype.toString) {
        classes.push(arg.toString());
      } else {
        for (var key in arg) {
          if (hasOwn.call(arg, key) && arg[key]) {
            classes.push(key);
          }
        }
      }
    }
  }

  return classes.join(" ");
}

export const byteInPetabyte = BigInt(1125899906842624);

export function formatKeywordForComparison(keyword) {
  return keyword.toLowerCase().replace(/\s*\/\s*/g, "/");
}

export const CACHE_KEY = "allClients";
export const CACHE_EXPIRATION_TIME = 48 * 60 * 60 * 1000;
// export const CACHE_EXPIRATION_TIME = 0;

export function saveToLocalStorage(key, data) {
  const dataToSave = {
    timestamp: new Date().getTime(),
    data,
  };
  localStorage.setItem(key, JSON.stringify(dataToSave));
}

export function getFromLocalStorage(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

export function isCacheValid(cachedData, expirationTime) {
  if (!cachedData || !cachedData.timestamp) {
    return false;
  }
  const currentTime = new Date().getTime();
  return currentTime - cachedData.timestamp < expirationTime;
}

export function changeIntervalToCurrentDate(interval) {
  const currentDate = new Date();

  switch (interval) {
    case "month":
      return currentDate.setMonth(currentDate.getMonth() - 1);
    case "3month":
      return currentDate.setMonth(currentDate.getMonth() - 3);
    case "6month":
      return currentDate.setMonth(currentDate.getMonth() - 6);
  }

  //check if the current interval currentDate touches the previous years
  if (currentDate.getMonth() < 0) {
    currentDate.setFullYear(currentDate.getFullYear() - 1);
    currentDate.setMonth(currentDate.getMonth() + 12);
  }
  return currentDate;
}
