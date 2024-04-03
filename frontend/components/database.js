import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('results');

export const initializeDatabase = () => {
  db.transaction(tx => {
    tx.executeSql('CREATE TABLE IF NOT EXISTS results (id INTEGER PRIMARY KEY AUTOINCREMENT, result TEXT, resultDate DATETIME DEFAULT CURRENT_TIMESTAMP)');
  });
};

export const fetchResults = (setResults) => {
  db.transaction(tx => {
    tx.executeSql('SELECT * FROM results', null,
      (txObj, resultSet) => {
        setResults(resultSet.rows._array);
        // console.log(resultSet.rows._array);
      },
      (txObj, error) => console.log(error)
    );
  });
};

export const insertResult = async (currentResult) => {
  try {
    console.log(currentResult);
    await db.transaction( async tx => {
      await tx.executeSql('INSERT INTO results (result) VALUES (?)', [currentResult],
        (txObj, resultSet) => {
          // console.log("added")
        },
        (txObj, error) => console.log(error)
      );
    });
  } catch (error) {
    console.error("Error inserting: ", error)
  } 
};

export const clearResultsTable = () => {
  db.transaction(tx => {
    tx.executeSql('DELETE FROM results', null,
      () => console.log('Results table cleared'),
      (txObj, error) => console.log('Error clearing results table:', error)
    );
  });
};
