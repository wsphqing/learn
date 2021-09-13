 (() => { 
 	var __webpack_modules__ = ([
,

 ((module, __unused_webpack_exports, __webpack_require__) => {

 module = __webpack_require__.nmd(module);

function add(a, b) {
  return a + b;
}

module["export"] = add;

 })
 	]);

 	
 	var __webpack_module_cache__ = {};
 	
 	
 	function __webpack_require__(moduleId) {
 		
 		var cachedModule = __webpack_module_cache__[moduleId];
 		if (cachedModule !== undefined) {
 			return cachedModule.exports;
 		}
 		
 		var module = __webpack_module_cache__[moduleId] = {
 			id: moduleId,
 			loaded: false,
 			exports: {}
 		};
 	
 		
 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
 	
 		
 		module.loaded = true;
 	
 		
 		return module.exports;
 	}
 	

 	
 	(() => {
 		__webpack_require__.nmd = (module) => {
 			module.paths = [];
 			if (!module.children) module.children = [];
 			return module;
 		};
 	})();
 	

var __webpack_exports__ = {};

(() => {
var add = __webpack_require__(1);



var x = add(60, 100);
var y = x; 


console.log(y);
})();

 })()
;