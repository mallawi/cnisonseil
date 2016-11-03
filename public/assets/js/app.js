/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

eval("\n// /**\n//  * First we will load all of this project's JavaScript dependencies which\n//  * include Vue and Vue Resource. This gives a great starting point for\n//  * building robust, powerful web applications using Vue and Laravel.\n//  */\n\n// require('./bootstrap');\n\n// /**\n//  * Next, we will create a fresh Vue application instance and attach it to\n//  * the page. Then, you may begin adding components to this application\n//  * or customize the JavaScript scaffolding to fit your unique needs.\n//  */\n\n// Vue.component('example', require('./components/Example.vue'));\n\n// const app = new Vue({\n//     el: '#app'\n// });\n\n(function() {\n    \"use strict\";\n\n    function init() {\n        console.log(\"document ready!\");\n    }\n\n\n    function navHandler() {\n        var hamBtn = document.getElementById(\"ham--button\");\n        var nav = document.getElementById(\"main--nav\");\n\n        hamBtn.addEventListener(\"click\", function(ev) {\n            ev.preventDefault();\n\n           if (!nav.classList.contains(\"nav--shown\")) {\n                nav.classList.add(\"nav--shown\");\n           } else {\n               nav.classList.remove(\"nav--shown\");\n           }\n        });\n    } \n\n    function formsHandler() {\n        var formsItem = document.getElementsByClassName(\"forms--item\");\n        var acForm = document.getElementById(\"form--item-acheter\");\n\n        function ajaxReq(url) {\n            var promise = new Promise( function (resolve, reject) {\n                var xhr = new XMLHttpRequest();\n\n                xhr.open(\"GET\", url);\n                xhr.responseType = \"document\";\n                xhr.send();\n\n                xhr.onreadystatechange = function() {\n                    if (this.readyState === 4) {\n                        if (this.status === 200) {\n                            resolve(this.response);\n                        } else {\n                            reject(this.status);\n                        }\n                    } else {\n                        \n                    }\n                }\n            });\n\n            return promise;\n        }\n\n        var ajaxCb = {\n            success: function(data) {\n                console.log(data);\n            },\n            failed: function(status) {\n\n            }\n        }\n        \n        function getForms(ev) {\n            ev.preventDefault();\n            ev.stopPropagation();\n\n            console.log(ev);\n            console.log(acForm.getAttribute(\"data-type\"));\n            var typeAttr = acForm.getAttribute(\"data-type\");\n\n            var url = \"/form/\" + typeAttr;\n\n            ajaxReq(url).then(ajaxCb.success).catch(ajaxCb.failed);\n        }\n\n        for (var i = 0; i < formsItem.length; i++) {\n            formsItem[i].addEventListener(\"click\", getForms);\n            // console.log(formsItem[i]);\n        }\n    }\n    \n\n\n    document.onreadystatechange = function() {\n        if (document.readyState === \"complete\") {\n            init();\n            navHandler();\n            formsHandler();\n        }\n    }\n\n\n\n\n}());\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9yZXNvdXJjZXMvYXNzZXRzL2pzL2FwcC5qcz84YjY3Il0sInNvdXJjZXNDb250ZW50IjpbIlxuLy8gLyoqXG4vLyAgKiBGaXJzdCB3ZSB3aWxsIGxvYWQgYWxsIG9mIHRoaXMgcHJvamVjdCdzIEphdmFTY3JpcHQgZGVwZW5kZW5jaWVzIHdoaWNoXG4vLyAgKiBpbmNsdWRlIFZ1ZSBhbmQgVnVlIFJlc291cmNlLiBUaGlzIGdpdmVzIGEgZ3JlYXQgc3RhcnRpbmcgcG9pbnQgZm9yXG4vLyAgKiBidWlsZGluZyByb2J1c3QsIHBvd2VyZnVsIHdlYiBhcHBsaWNhdGlvbnMgdXNpbmcgVnVlIGFuZCBMYXJhdmVsLlxuLy8gICovXG5cbi8vIHJlcXVpcmUoJy4vYm9vdHN0cmFwJyk7XG5cbi8vIC8qKlxuLy8gICogTmV4dCwgd2Ugd2lsbCBjcmVhdGUgYSBmcmVzaCBWdWUgYXBwbGljYXRpb24gaW5zdGFuY2UgYW5kIGF0dGFjaCBpdCB0b1xuLy8gICogdGhlIHBhZ2UuIFRoZW4sIHlvdSBtYXkgYmVnaW4gYWRkaW5nIGNvbXBvbmVudHMgdG8gdGhpcyBhcHBsaWNhdGlvblxuLy8gICogb3IgY3VzdG9taXplIHRoZSBKYXZhU2NyaXB0IHNjYWZmb2xkaW5nIHRvIGZpdCB5b3VyIHVuaXF1ZSBuZWVkcy5cbi8vICAqL1xuXG4vLyBWdWUuY29tcG9uZW50KCdleGFtcGxlJywgcmVxdWlyZSgnLi9jb21wb25lbnRzL0V4YW1wbGUudnVlJykpO1xuXG4vLyBjb25zdCBhcHAgPSBuZXcgVnVlKHtcbi8vICAgICBlbDogJyNhcHAnXG4vLyB9KTtcblxuKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJkb2N1bWVudCByZWFkeSFcIik7XG4gICAgfVxuXG5cbiAgICBmdW5jdGlvbiBuYXZIYW5kbGVyKCkge1xuICAgICAgICB2YXIgaGFtQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoYW0tLWJ1dHRvblwiKTtcbiAgICAgICAgdmFyIG5hdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFpbi0tbmF2XCIpO1xuXG4gICAgICAgIGhhbUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oZXYpIHtcbiAgICAgICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgaWYgKCFuYXYuY2xhc3NMaXN0LmNvbnRhaW5zKFwibmF2LS1zaG93blwiKSkge1xuICAgICAgICAgICAgICAgIG5hdi5jbGFzc0xpc3QuYWRkKFwibmF2LS1zaG93blwiKTtcbiAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgIG5hdi5jbGFzc0xpc3QucmVtb3ZlKFwibmF2LS1zaG93blwiKTtcbiAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9IFxuXG4gICAgZnVuY3Rpb24gZm9ybXNIYW5kbGVyKCkge1xuICAgICAgICB2YXIgZm9ybXNJdGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImZvcm1zLS1pdGVtXCIpO1xuICAgICAgICB2YXIgYWNGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmb3JtLS1pdGVtLWFjaGV0ZXJcIik7XG5cbiAgICAgICAgZnVuY3Rpb24gYWpheFJlcSh1cmwpIHtcbiAgICAgICAgICAgIHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoIGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICAgICAgICAgICAgICB4aHIub3BlbihcIkdFVFwiLCB1cmwpO1xuICAgICAgICAgICAgICAgIHhoci5yZXNwb25zZVR5cGUgPSBcImRvY3VtZW50XCI7XG4gICAgICAgICAgICAgICAgeGhyLnNlbmQoKTtcblxuICAgICAgICAgICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PT0gNCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdHVzID09PSAyMDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRoaXMucmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QodGhpcy5zdGF0dXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgYWpheENiID0ge1xuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZhaWxlZDogZnVuY3Rpb24oc3RhdHVzKSB7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgZnVuY3Rpb24gZ2V0Rm9ybXMoZXYpIHtcbiAgICAgICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICAgICAgY29uc29sZS5sb2coZXYpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coYWNGb3JtLmdldEF0dHJpYnV0ZShcImRhdGEtdHlwZVwiKSk7XG4gICAgICAgICAgICB2YXIgdHlwZUF0dHIgPSBhY0Zvcm0uZ2V0QXR0cmlidXRlKFwiZGF0YS10eXBlXCIpO1xuXG4gICAgICAgICAgICB2YXIgdXJsID0gXCIvZm9ybS9cIiArIHR5cGVBdHRyO1xuXG4gICAgICAgICAgICBhamF4UmVxKHVybCkudGhlbihhamF4Q2Iuc3VjY2VzcykuY2F0Y2goYWpheENiLmZhaWxlZCk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZvcm1zSXRlbS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgZm9ybXNJdGVtW2ldLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBnZXRGb3Jtcyk7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhmb3Jtc0l0ZW1baV0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuXG5cbiAgICBkb2N1bWVudC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09IFwiY29tcGxldGVcIikge1xuICAgICAgICAgICAgaW5pdCgpO1xuICAgICAgICAgICAgbmF2SGFuZGxlcigpO1xuICAgICAgICAgICAgZm9ybXNIYW5kbGVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG5cbn0oKSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gcmVzb3VyY2VzL2Fzc2V0cy9qcy9hcHAuanMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9");

/***/ }
/******/ ]);