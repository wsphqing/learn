// import sayHello from "./modules/MyModule";
// import _ from 'lodash';

// const arr = _.concat([1, 2, 3], 5, [6]);
// sayHello('Hello from Rollup');

let arr = [
  {id: 1, name: '部门1', pid: 0},
  {id: 2, name: '部门2', pid: 1},
  {id: 3, name: '部门3', pid: 1},
  {id: 5, name: '部门5', pid: 4},
  {id: 4, name: '部门4', pid: 3},
]
function arrayToTree(arr) {

  let treeObj = {}
  let treeArr = []
  arr.sort((a, b) => a.pid - b.pid).forEach((item) => {
    item['children'] = [];
    treeObj[item.id] = item;
    if (treeObj[item.pid]) {
      treeObj[item.pid]['children'].push(item)
    } else {
      treeArr.push(item);
    }
  })
  return treeArr
}

// function arrayToTree(items) {
//   const result = [];   // 存放结果集
//   const itemMap = {};  // 
//   for (const item of items) {
//     const id = item.id;
//     const pid = item.pid;

//     if (!itemMap[id]) {
//       itemMap[id] = {
//         children: [],
//       }
//     }

//     itemMap[id] = {
//       ...item,
//       children: itemMap[id]['children']
//     }

//     const treeItem =  itemMap[id];

//     if (pid === 0) {
//       result.push(treeItem);
//     } else {
//       if (!itemMap[pid]) {
//         itemMap[pid] = {
//           children: [],
//         }
//       }
//       itemMap[pid].children.push(treeItem)
//     }

//   }
//   return result;
// }

// console.log(JSON.stringify(arrayToTree(arr)))
