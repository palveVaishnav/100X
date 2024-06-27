import React, { useState, useEffect } from 'react';

const Sudoku = () => {
  const [matrix, setMatrix] = useState(Array(9).fill(0).map(() => Array(9).fill(0)));
  const [puzzle, setPuzzle] = useState(Array(9).fill(0).map(() => Array(9).fill(0)));
  const [count, setCount] = useState(0);

  const getRandom = () => {
    let x;
    do {
      x = Math.floor(Math.random() * 10);
    } while (x === 0);
    return x;
  };

  const rowExist = (row, col) => {
    for (let i = 0; i < 9; i++) {
      if (matrix[row][i] === matrix[row][col] && i !== col) {
        return true;
      }
    }
    return false;
  };

  const colExist = (row, col) => {
    for (let i = 0; i < 9; i++) {
      if (matrix[i][col] === matrix[row][col] && i !== row) {
        return true;
      }
    }
    return false;
  };

  const boxCheck = (row, col) => {
    const startRow = row - (row % 3);
    const startCol = col - (col % 3);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (matrix[i + startRow][j + startCol] === matrix[row][col] &&
            (row !== i + startRow && col !== j + startCol)) {
          return true;
        }
      }
    }
    return false;
  };

  const enterNumber = (row, col) => {
    let x = getRandom();
    let attempts = 0;
    do {
      setMatrix(prevMatrix => {
        const newMatrix = [...prevMatrix];
        newMatrix[row][col] = x;
        return newMatrix;
      });
      setCount(prevCount => prevCount + 1);
      x = (x % 9) + 1;
      attempts++;
      if (attempts > 9) {
        startAgain();
        return;
      }
    } while (rowExist(row, col) || colExist(row, col) || boxCheck(row, col));
  };

  const startAgain = () => {
    setMatrix(Array(9).fill(0).map(() => Array(9).fill(0)));
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        enterNumber(i, j);
      }
    }
  };

  const makePuzzle = (level) => {
    setPuzzle(prevPuzzle => {
      const newPuzzle = [...prevPuzzle];
      for (let k = 0; k < level; k++) {
        let i = 0;
        do {
          const j = getRandom() - 1;
          if (newPuzzle[i][j] !== 0) {
            newPuzzle[i][j] = 0;
            i++;
          }
        } while (i < 9);
      }
      return newPuzzle;
    });
  };

  const copyPuzzle = () => {
    let valid = true;
    setPuzzle(matrix.map((row, i) =>
      row.map((val, j) => {
        if (rowExist(i, j) || colExist(i, j) || boxCheck(i, j)) {
          valid = false;
        }
        return val;
      })
    ));
    return valid;
  };

  useEffect(() => {
    startAgain();
  }, []);

  const printMatrix = (x) => (
    <div>
      {x.map((row, i) => (
        <div key={i}>
          {row.map((val, j) => (
            <span key={j}> {val} </span>
          ))}
        </div>
      ))}
    </div>
  );

  const printPuzzle = () => (
    <div>
      {puzzle.map((row, i) => (
        <div key={i}>
          {row.map((val, j) => (
            <span key={j}> {val === 0 ? ' ' : val} </span>
          ))}
        </div>
      ))}
    </div>
  );

  const handleLevelChange = (e) => {
    const level = parseInt(e.target.value, 10);
    makePuzzle(level);
  };

  return (
    <div>
      <h1>Sudoku Generator</h1>
      <div>
        <h2>Matrix</h2>
        {printMatrix(matrix)}
      </div>
      <div>
        <h2>Puzzle</h2>
        {printPuzzle()}
      </div>
      <div>
        <label>
          Level:
          <input type="number" onChange={handleLevelChange} />
        </label>
      </div>
    </div>
  );
};

export default Sudoku;
