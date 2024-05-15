const request = indexedDB.open("pokedex", 1);

request.onupgradeneeded = (event) => {
  const db = request.result;
  switch (event.oldVersion) {
    case 0: // New database, the client had no database
      db.createObjectStore("pokemons", { keyPath: "id" });
    case 1: // The client had a database with version 1, update to version 2
      db.createObjectStore("trainers", { keyPath: "id" });
  }
};
request.onerror = () => {};
request.onsuccess = function () {
  const db = request.result;

  db.onversionchange = () => {
    db.close();
    alert("Database is outdated, please reload the page.");
  };
};

request.onblocked = function () {
  alert("Please close other tabs with this site open.");
};
