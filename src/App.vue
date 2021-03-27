<template>
  <div class="board" tabindex="1">
    <Cell
      v-for="cell in cells.flat(1)"
      :key="cell.id"
      :num="cell.val"
      :shouldShow="cell.isShown"
    />
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import Cell from "./components/Cell.vue";
import actions from "./helpers/userActions.js";

// 共有16个格子，初始时初始数字由2或者4构成。
// 1、手指向一个方向滑动，所有格子会向那个方向运动。
// 2、相同数字的两个格子，相撞时数字会相加。
// 3、每次滑动时，空白处会随机刷新出一个数字的格子。
// 4、当界面不可运动时（当界面全部被数字填满时），游戏结束；当界面中最大数字是2048时，游戏胜利。
export default {
  name: "App",
  components: {
    Cell,
  },
  setup() {
    const createCells = getInitialCells();
    const cells = ref(createCells);
    const {
      getLeftHandle,
      getRightHandle,
      getUpHandle,
      getDownHandle,
    } = actions;

    const keyDownHandler = (e) => {
      e.preventDefault();
      switch (e.keyCode) {
        case 37:
          getLeftHandle(cells.value);
          break;
        case 38:
          getUpHandle(cells.value);
          break;
        case 39:
          getRightHandle(cells.value);
          break;
        case 40:
          getDownHandle(cells.value);
          break;
      }
      updateNewCell(cells.value);
    };

    onMounted(() => {
      window.addEventListener("keydown", throtte(keyDownHandler, 1000));
    });

    return {
      cells,
    };
  },
};

const getInitialCells = () => {
  const createCells = [];
  let idCounter = 0;
  for (let i = 0; i < 4; i++) {
    createCells[i] = [];
    for (let j = 0; j < 4; j++) {
      idCounter++;
      createCells[i][j] = {
        id: idCounter,
        val: 0,
        isShown: false,
      };
    }
  }

  const randomCell = () => createCells[randomIndex()][randomIndex()];

  let initialCells = [];
  for (let i = 0; i < 2; i++) {
    initialCells[i] = randomCell();
  }
  while (initialCells[0] == initialCells[1]) {
    initialCells[1] = randomCell();
  }

  for (let i = 0; i < 2; i++) {
    initialCells[i].val = 2;
    initialCells[i].isShown = true;
  }

  return createCells;
};
const updateNewCell = (cells) => {
  let newCell = cells[randomIndex()][randomIndex()];
  while (newCell.val !== 0) {
    newCell = cells[randomIndex()][randomIndex()];
  }
  newCell.val = 2;
  newCell.isShown = true;
};

const randomIndex = () => Math.floor(Math.random() * 4);
const throtte = (func, delay) => {
  let pre = Date.now();
  return function(...rest) {
    if (Date.now() - pre > delay) {
      func.apply(this, rest);
      pre = Date.now();
    }
  };
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #faf8ef;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 450px;
  height: 450px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #bbada0;
  border-radius: 6px;
}
.board {
  width: 430px;
  height: 430px;
  display: grid;
  grid-template-columns: repeat(4, 100px);
  row-gap: 10px;
  column-gap: 10px;
}
</style>
