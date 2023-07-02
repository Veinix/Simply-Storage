"use strict";
/** 
 * @module aviStorage
 * @description Module to more easily manipulate storage with easier, more robust and user-friendly syntax
*/

//# Local Storage Object
/**
 * More easily manipulate and read local storage data
 * @example lcl.store("key", value);
 * @method store -- Adds an entry by it's key and value to `localStorage`.
 * @method retrieve -- Returns an entry from `localStorage` based on its key
 * @method remove -- Removes an entry from `localStorage` based on its key
 * @method clear -- Empties the `localStorage`
 * @method init -- Tests if `localStorage` is available in the current environment
 * @method clean -- Removes all null or undefined keys from `localStorage`
 * @method amount -- Displays in the console the amount of items in storage
 */
const lcl = { 
    /**
     * Adds an entry to `localStorage` via it's key-value pair. Does not return anything
     * 
     * `key` must be a string, `value` is automatically turned into a string via `JSON.stringify(value)`;
     * 
     * @example 
     * lcl.store("dataKey",dataValue);
     * @param {string} key - Key of the entry
     * @param {any} value - Value of the entry
     * @param {boolean} [doesReturn] - Set to true to return the stored information
     * 
     *  
    */
    store(key, value, doesReturn){
        // Validate the key parameter
        if (typeof key !== "string" || key.trim() === "") {
            throw new Error("Invalid key. Key must be a non-empty string.");
        }

        // Convert key to string and stringifying value
        key = key.toString();
        const data = JSON.stringify(value);

        // Try-Catch block to catch errors such as "QuotaExceededError" (Local Storage limit reached)
        try {
            localStorage.setItem(key, data);
          } catch (error) {
            if (error instanceof DOMException && error.name === "QuotaExceededError") {
              console.error(
                "Storage quota exceeded. Cannot add more data to localStorage. \n Recommendations: \n 1) Use lcl.remove(key) to remove data that is not needed anymore \n 2) Periodically delete information that is not needed \n 3) Use other methods of storage (sessionStorage, cookies, cache, IndexedDB");
            } else {
              // Handle other errors
              console.error("An error occurred while accessing localStorage:", error);
            }
          }
        
        if (doesReturn) {  
            const entry = localStorage.getItem(key);
            return entry ? JSON.parse(entry) : null;
        }
    }
    ,
    /**
     * Returns an entry from `localStorage` via it's `key`. The entry is parsed into it's original form (eg. Array) before return. If there is no such entry with the provided `key` it will return `null`
     *
     * @param {string} key - Key of the entry
     * @returns {any} Entry stored
     */
    retrieve(key) {
        // Validate the key parameter
        if (typeof key !== "string" || key.trim() === "") {
            throw new Error("Invalid key. Key must be a non-empty string.");
        }

        // Convert key to string
        key = key.toString();
        const entry = localStorage.getItem(key);
        return entry ? JSON.parse(entry) : null;
    },
    /**
     * Removes an entry from `localStorage` via it's `key`
     *
     * @param {string} key - Key of the entry
     */
    remove(key) {
        // Validate the key parameter
        if (typeof key !== "string" || key.trim() === "") {
            throw new Error("Invalid key. Key must be a non-empty string.");
        }

        // Convert key to string
        key = key.toString();

        localStorage.removeItem(key);
    },
    /**
     * Clears all entries in `localStorage`
     */
    clear(){
        localStorage.clear();
    },
    /**
     * Tests to see if the environment supports `localStorage`. 
     * 
     * Certain environments that do not support the Web Storage API include older browsers or restricted environments
     */
    init() {
        if (typeof localStorage === "undefined" | localStorage === "null") {
            console.error("Local storage is not supported in this browser/environment.");
            return false;
        } else {
            console.log("%cEnvironment supports localStorage","color: #1F680B")
            return true;
        }
    },
    /**
     * Removes any entry whose key is empty/null/undefined, from `localStorage`
     */
    clean() {
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            if (key === null | key === undefined | key === "") {
                localStorage.removeItem(key);
            }
            let value = localStorage.getItem(localStorage.key(i));
            if (value === null | value === undefined | value === "" ) {
                localStorage.removeItem(key);
            }
          }
    },
    
    // TODO Work on this method
    /**
     * Displays in the console the length or the amount of things in `localStorage`. Given parameters, it will log the length of a specific entry 
     * @param {string} [key] Key of entry
     */
    amount(key) {
        if (key) {
            // Validate the key parameter
            if (typeof key !== "string" || key.trim() === "") {
                throw new Error("Invalid key. Key must be a non-empty string.");
            }

            // Convert key to string
            key = key.toString();

            // Getting the length of the entry
            const entry = localStorage.getItem(key)
            console.log(`Entry "${key}" contains ${entry.length} `)
            return
        } 
        console.log(`Currently ${localStorage.length} entries in localStorage`);

    } 
}

//# Session Storage Object 

/**
 * Module to more easily manipulate and read session storage data
 * @example sess.store("key", value);
 * @method store -- Adds an entry by its key and value to `sessionStorage`
 * @method retrieve -- Returns an entry from `sessionStorage` based on its key
 * @method remove -- Removes an entry from `sessionStorage` based on its key
 * @method clear -- Empties the `sessionStorage`
 * @method init -- Tests if `sessionStorage` is available in the current environment
 * @method clean -- Removes all null or undefined keys from `sessionStorage`
 * @method amount -- Displays in the console the amount of items in storage
 */
const sess = {
  /**
   * Adds an entry to `sessionStorage` via its key-value pair. Does not return anything
   *
   * @example
   * sess.store("dataKey", dataValue);
   * @param {string} key - Key of the entry.
   * @param {any} value - Value of the entry.
   */
  store(key, value) {
    if (typeof key !== "string" || key.trim() === "") {
      throw new Error("Invalid key. Key must be a non-empty string.");
    }

    key = key.toString();
    const data = JSON.stringify(value);
    sessionStorage.setItem(key, data);
  },

  /**
   * Returns an entry from `sessionStorage` based on its key. The entry is parsed into its original form before returning
   * 
   * If there is no such entry with the provided key, it will return `null`
   *
   * @param {string} key - Key of the entry
   * @returns {any} Entry stored.
   */
  retrieve(key) {
    if (typeof key !== "string" || key.trim() === "") {
      throw new Error("Invalid key. Key must be a non-empty string.");
    }

    key = key.toString();
    const entry = sessionStorage.getItem(key);
    return entry ? JSON.parse(entry) : null;
  },

  /**
   * Removes an entry from `sessionStorage` based on its key
   *
   * @param {string} key - Key of the entry
   */
  remove(key) {
    if (typeof key !== "string" || key.trim() === "") {
      throw new Error("Invalid key. Key must be a non-empty string.");
    }

    key = key.toString();
    sessionStorage.removeItem(key);
  },

  /**
   * Clears all entries in `sessionStorage`
   */
  clear() {
    sessionStorage.clear();
  },

  /**
   * Tests to see if the environment supports `sessionStorage`
   */
  init() {
    if (typeof sessionStorage === "undefined" || sessionStorage === null) {
      console.error("Session storage is not supported in this browser/environment.");
      return false;
    } else {
      console.log("%cEnvironment supports sessionStorage", "color: #1F680B");
      return true;
    }
  },

  /**
   * Removes any entry whose key is empty/null/undefined from `sessionStorage`
   */
  clean() {
    for (let i = 0; i < sessionStorage.length; i++) {
      let key = sessionStorage.key(i);
      if (key === null || key === undefined || key === "") {
        sessionStorage.removeItem(key);
      }
      let value = sessionStorage.getItem(sessionStorage.key(i));
      if (value === null || value === undefined || value === "") {
        sessionStorage.removeItem(key);
      }
    }
  },

  /**
     * Displays in the console the length or the amount of things in `sessionStorage`. Given parameters, it will log the length of a specific entry 
     * @param {string} [key] Key of entry
     */
  amount(key) {
    if (key) {
        // Validate the key parameter
        if (typeof key !== "string" || key.trim() === "") {
            throw new Error("Invalid key. Key must be a non-empty string.");
        }

        // Convert key to string
        key = key.toString();

        // Getting the length of the entry
        const entry = sessionStorage.getItem(key)
        console.log(`Entry "${key}" contains ${entry.length} `)
        return
    } 
    console.log(`Currently ${sessionStorage.length} entries in sessionStorage`);

} 
};

// TODO Work on the cache object 
//# Cache Object
/**
 * More easily manipulate and read cache storage data
 * @example 
 * @method add -- Creates a named cache and adds data to it
 * @method addAll -- Creates a named cache and adds data to it
 * @method retrieve -- Retrieves data from a named cache
 * @method init -- Tests if `localStorage` is available in the current environment
 */
const cch = {
    /**
     * Opens a named cache in the cache storage, then stores the data from a single url. Set overwite to true to overwrite the data in the named cache
     *
     * @param {string} cacheName - The name of the cache to open
     * @param {string} url - URL of data
     * @param {boolean} [overwrite] - Determines if the method overwrites
     * @returns {Promise<Cache>} A promise that resolves to the opened Cache object
     */
    async add(cacheName, url, overwrite) {
        cacheName = cacheName.toString();
        if (overwrite) {
            return await caches.open(cacheName).then((cache) => {
                fetch(request)
                    .then((response) => {
                        cache
                            .put(request, response)
                            .then(() => console.log("Data added to cache."))
                            .catch((error) => console.error("Error adding data to cache:", error));
                    })
                    .catch((error) => console.error("Error fetching data:", error));
            })
        } else {
            return await caches.open(cacheName).then((cache) => {
                cache
                .add(url)
                .then(()=> console.log("Data added to cache - (add method)"))
                .catch((err) => console.error("Error adding data to the cache: ", err));
            })
        }
    },
    /**
     * Opens a named cache in the cache storage, then stores the data from multiple urls in it. Set overwite to true to overwrite the data in the named cache if it exists
     *
     * @param {string} cacheName - The name of the cache to open
     * @param {Object<Array>} url - URLs of data, organized in an array
     * @param {boolean} [overwrite] - Determines if the method overwrites
     * @returns {Promise<Cache>} A promise that resolves to the opened Cache object.
     */
    async addAll(cacheName, urls, overwrite) {
        cacheName = cacheName.toString();
        if (overwrite) {
            return await caches.open(cacheName).then((cache) => {
                urls.forEach(url => {
                    fetch(url)
                    .then((response) => {
                        cache
                        .put(url, response)
                        .catch((error) => console.error("Error adding data to cache:", error));
                    })
                    .catch((error) => console.error("Error fetching data:", error));
                });
            })
        } else {
            return await caches.open(cacheName).then((cache) => {
                cache
                .addAll(urls)
                .catch((err) => console.error("Error adding data to the cache: ", err));
            })
        }
    },
    // TODO work on this
    /**
     * Retrieves data from a named cache
     * 
     * @param {string} cacheName - The name of the cache to open
     */
    retrieve(cacheName){
        caches.open(cacheName).then(function (cache) {
            cache.match("/path/to/resource").then(function (response) {
              if (response) {
                // Resource found in cache
                console.log(response);
              } else {
                // Resource not found in cache
              }
            });
        })
    },

    /**
     * Checks if the `caches` object in available in the global `window` object
     */
    init(){
        if ("caches" in window) {
            console.log("Cache API is supported")
        }
    },

    clear(){
        
    }
  };
  
//# Indexed DB Object

//# Cookies Object