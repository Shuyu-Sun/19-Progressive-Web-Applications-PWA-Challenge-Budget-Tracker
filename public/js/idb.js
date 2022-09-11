let db;
const request = indexedDB.open("budget_tracker", 1);

request.onupgradeneeded = (event) => {
  event.target.result.createObjectStore("new_transaction", {
    keyPath: "id",
    autoIncrement: true,
  });
};

request.onsuccess = (event) => {
  db = event.target.result;

  if (navigator.onLine) {
    checkDatabase();
  };
};

request.onerror = (err) => {
  console.log(err.message);
};

// submit without internet connection