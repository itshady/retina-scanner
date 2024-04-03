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
        console.log(resultSet.rows._array);
      },
      (txObj, error) => console.log(error)
    );
  });
};

export const insertResult = async (currentResult, setCurrentResult, setResults) => {
  await db.transaction(async tx => {
    await tx.executeSql('INSERT INTO results (result) VALUES (?)', [currentResult],
      (txObj, resultSet) => {
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString(); // Customize date format as needed
        let existingResults = [...results];
        existingResults.push({ id: resultSet.insertId, result: currentResult, resultDate: formattedDate });
        setResults(existingResults);
        setCurrentResult(undefined);
      },
      (txObj, error) => console.log(error)
    );
  });
};
