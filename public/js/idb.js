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
  }
};

request.onerror = (err) => {
  console.log(err.message);
};

// submit without internet connection
function saveRecord(record) {
  const transaction = db.transaction("new_transaction", "readwrite");
  const store = transaction.objectStore("new_trasaction");
  store.add(record);
}

getAll.onsuccess = function() {
    if (getAll.result.length > 0) {
        fetch('/api/transaction', {
            method: 'POST',
            body: JSON.stringify(getAll.result),
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(() => {
                const transaction = db.transaction("new_trasaction", "readwrite");
                const store = transaction.objectStore("new_trasaction");
                store.clear();
            });
        }
    };