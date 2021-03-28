// 两列之间有无空位
const noColCellZero = (cells, row, col1, col2) => {
  for (let j = col1 + 1; j < col2; j++) {
    if (cells[row][j].val !== 0) {
      return false;
    }
  }
  return true;
};
// 两行之间有无空位
const noRowCellZero = (cells, row1, row2, col) => {
  for (let i = row1 + 1; i < row2; i++) {
    if (cells[i][col].val !== 0) {
      return false;
    }
  }
  return true;
};

// 向左滑动逻辑
const getLeftHandle = (cells) => {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (cells[i][j].val !== 0) {
        for (let k = 0; k < j; k++) {
          // 左侧有空位
          if (cells[i][k].val === 0 && noColCellZero(cells, i, k, j)) {
            cells[i][k].val = cells[i][j].val;
            cells[i][k].isShown = cells[i][j].isShown;
            cells[i][j].val = 0;
            cells[i][j].isShown = false;
            continue;
          }
          // 左侧有相同
          if (
            cells[i][k].val === cells[i][j].val &&
            noColCellZero(cells, i, k, j)
          ) {
            cells[i][k].val += cells[i][j].val;
            cells[i][k].isShown = cells[i][j].isShown;
            cells[i][j].val = 0;
            cells[i][j].isShown = false;
            continue;
          }
        }
      }
    }
  }
};
// 向右滑动逻辑
const getRightHandle = (cells) => {
  for (let i = 3; i >= 0; i--) {
    for (let j = 3; j >= 0; j--) {
      if (cells[i][j].val !== 0) {
        for (let k = 3; k > j; k--) {
          if (cells[i][k].val === 0 && noColCellZero(cells, i, j, k)) {
            console.log(i, j, k);
            cells[i][k].val = cells[i][j].val;
            cells[i][k].isShown = cells[i][j].isShown;
            cells[i][j].val = 0;
            cells[i][j].isShown = false;
            break;
          }
          if (
            cells[i][k].val === cells[i][j].val &&
            noColCellZero(cells, i, j, k)
          ) {
            cells[i][k].val += cells[i][j].val;
            cells[i][k].isShown = cells[i][j].isShown;
            cells[i][j].val = 0;
            cells[i][j].isShown = false;
            break;
          }
        }
      }
    }
  }
};
// 向上滑动逻辑
const getUpHandle = (cells) => {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (cells[i][j].val !== 0) {
        for (let k = 0; k < i; k++) {
          if (cells[k][j].val === 0 && noRowCellZero(cells, k, i, j)) {
            cells[k][j].val = cells[i][j].val;
            cells[k][j].isShown = cells[i][j].isShown;
            cells[i][j].val = 0;
            cells[i][j].isShown = false;
            continue;
          }
          if (
            cells[k][j].val === cells[i][j].val &&
            noRowCellZero(cells, k, i, j)
          ) {
            cells[k][j].val += cells[i][j].val;
            cells[k][j].isShown = cells[i][j].isShown;
            cells[i][j].val = 0;
            cells[i][j].isShown = false;
            continue;
          }
        }
      }
    }
  }
};
// 向下滑动逻辑
const getDownHandle = (cells) => {
  for (let i = 3; i >= 0; i--) {
    for (let j = 3; j >= 0; j--) {
      if (cells[i][j].val !== 0) {
        for (let k = 3; k > i; k--) {
          if (cells[k][j].val === 0 && noRowCellZero(cells, i, k, j)) {
            cells[k][j].val = cells[i][j].val;
            cells[k][j].isShown = cells[i][j].isShown;
            cells[i][j].val = 0;
            cells[i][j].isShown = false;
            continue;
          }
          if (
            cells[k][j].val === cells[i][j].val &&
            noRowCellZero(cells, i, k, j)
          ) {
            cells[k][j].val += cells[i][j].val;
            cells[k][j].isShown = cells[i][j].isShown;
            cells[i][j].val = 0;
            cells[i][j].isShown = false;
            continue;
          }
        }
      }
    }
  }
};

export default {
  getLeftHandle,
  getRightHandle,
  getUpHandle,
  getDownHandle,
};
