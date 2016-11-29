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

eval("(function() {\n    \"use strict\";\n\n    // constructor function for XMLHttpRequest that return a promise\n    function XHRequest(progress) {\n\n        var pCb = progress;\n\n        function ajaxReq(method, url, data) {\n            var promise = new Promise( function (resolve, reject) {\n                var xhr = new XMLHttpRequest();\n\n                if (pCb) {\n                    xhr.addEventListener(\"progress\", pCb.progress);\n                    xhr.addEventListener(\"load\", pCb.load);\n                }\n\n                if (method === \"GET\") {\n                    xhr.responseType = \"document\";\n                }\n                    \n                xhr.open(method, url);\n\n                if (data)\n                    xhr.send(data);  \n                else\n                    xhr.send();\n\n                xhr.onreadystatechange = function() {\n                    if (this.readyState === 4) {\n                        if (this.status === 200) {\n                            resolve(this.response);\n                        } else {\n                            reject(this.status);\n                        }\n                    } else {\n                        \n                    }\n                }\n            });\n\n            return promise;\n        }\n\n        return {\n            get: function(url) {\n                return ajaxReq(\"GET\", url);\n            },\n            post: function(url, data) {\n                if (data) { return ajaxReq(\"POST\", url, data); }\n                return ajaxReq(\"POST\", url);\n            }\n        }\n\n    }\n\n    var formsHandler;\n\n    function FormsHandler() { // constructor function for forms handling\n\n        return {\n            init: function() {\n                formsGetHandler();\n            },\n            makeChanges: function(data) {\n                var requestedData = data;\n                var formHolder = document.getElementById(\"form--container\");\n                var requestedForm = requestedData.getElementById(\"form--wrap\");\n\n                if (formHolder.classList.contains(\"form--shown\")) { // replace the form if other shown\n                    // this.handle.replace(formHolder, requestedForm);\n                    var oldForm = document.getElementById(\"form--wrap\");\n                    formHolder.replaceChild(requestedForm, oldForm);\n                    this.formRef.current.classList.add(\"forms--item-current\");\n                    this.formRef.old.classList.remove(\"forms--item-current\");\n                    this.formRef.old = this.formRef.current;\n\n                    this.handle.listen();\n                    console.log(\"replaced\");\n                } else { // if no form shown add\n                    formHolder.classList.add(\"form--shown\");\n                    this.formRef.current.classList.add(\"forms--item-current\");\n                    formHolder.appendChild(requestedForm);\n                    this.formRef.old = this.formRef.current;\n            \n                    this.handle.listen();\n\n                    console.log(\"added\");\n                }\n            },\n            formRef: { // forms references, current for requested, and old for the last\n                old: null,\n                current: null\n            },\n            handle: { // listening for form submition and handling it\n                listen: function() {\n                    var formEl =  document.forms[0];\n                    \n                    formEl.addEventListener(\"submit\", function(ev) {\n                        ev.preventDefault();\n\n                        formsPostHandler(formEl); // sending the form to be posted to server\n                        return false;\n                    });\n\n                    formEl.addEventListener(\"reset\", function(ev) {\n                        formsHandler.handle.remove();\n                        return;\n                    });\n                },\n                remove: function() {\n                    var oldForm = document.getElementById(\"form--wrap\");\n                    var formHolder = document.getElementById(\"form--container\");\n                    formHolder.removeChild(oldForm);\n                    formHolder.classList.remove(\"form--shown\");\n                    formsHandler.formRef.old.classList.remove(\"forms--item-current\");\n                }\n            }\n        }\n    }\n\n\n    function formsGetHandler() {\n        var formsItem = document.getElementsByClassName(\"forms--item\");\n        var currentFormRef;\n\n        var responseHandler = {\n            success: function(data) {\n                formsHandler.makeChanges(data);\n            },\n            failed: function(status) {\n                console.log(status);\n            }\n        }\n\n        var progressCb = {\n            progress: function(ev) {\n                currentFormRef.classList.add(\"form--item-progress\");\n            },\n            load: function(ev) {\n                currentFormRef.classList.remove(\"form--item-progress\");\n            }\n        }\n\n        function getForms(ev) {\n            ev.preventDefault();\n            ev.stopPropagation();\n\n            currentFormRef = this;\n            formsHandler.formRef.current = this;\n\n            var typeAttr = this.getAttribute(\"data-type\");\n\n            if (this.classList.contains(\"forms--item-current\")) {\n                 if (formsHandler.formRef.old && this === formsHandler.formRef.old) {\n                    formsHandler.handle.remove();\n                    return;\n                }\n            }\n\n            var url = \"/form/\" + typeAttr;\n\n            var xhrequest = new XHRequest(progressCb);\n\n            xhrequest.get(url).then(responseHandler.success).catch(responseHandler.failed);\n        }\n\n        for (var i = 0; i < formsItem.length; i++) {\n            formsItem[i].addEventListener(\"click\", getForms);\n        }\n    }\n\n\n    function formsPostHandler(formEl) {\n        var formData = new FormData(formEl);\n\n        for (var eItem = 0; eItem < formEl.elements.length; eItem++) {\n            if (formEl.elements[eItem].tagName.toUpperCase() === \"BUTTON\") { continue; }\n            if (!formEl.elements[eItem].required && !formEl.elements[eItem].value) {\n                formData.set(formEl.elements[eItem].name, 11111);\n            }\n        }\n\n        var formAction = formEl.getAttribute(\"data-action\");\n\n        var progressCb = {\n            progress: function(ev) {\n\n            },\n            load: function(ev) {\n                // console.log(ev);\n            }\n        }\n\n        var responseHandler = {\n            success: function(data) {\n                formsHandler.handle.remove();\n\n                var confirmMsg = document.getElementById(\"form--confirmation-message\");\n                confirmMsg.classList.add(\"message--shown\");\n\n                var msgTimeout = setTimeout(function() {\n                    confirmMsg.classList.remove(\"message--shown\");\n                    clearTimeout(msgTimeout);\n                }, 5000);\n\n                console.log(data);\n            },\n            failed: function(status) {\n                console.log(status);\n            }\n        }\n        \n        var xhrequest = new XHRequest(progressCb);\n        xhrequest.post(formAction, formData).then(responseHandler.success).catch(responseHandler.failed);\n    }\n\n\n\n\n    // function handler for handling slider from the index page\n    function sliderHandler() {\n        var sliderBtns = document.getElementsByClassName(\"slider--btn\");\n        var sliderItems = document.getElementsByClassName(\"slider--item\");\n\n        if (!sliderBtns.length || !sliderItems.length) { return; }\n        var prevBtn;\n        var nextBtn;\n        var currentIdx;\n        var itemInterval;\n\n\n        function intervalSliderItem(rmv) {\n            if (!rmv) {\n                itemInterval = setInterval(function() {\n                    if (currentIdx) {\n                        for (var idx = 0; idx < sliderItems.length; idx++) {\n                            if (currentIdx === sliderItems[idx]) {\n                                var item = idx - 1;\n                                if (idx - 1 < 0) {\n                                    var item = sliderItems.length - 1;\n                                }\n\n                                changeSliderItem(currentIdx, sliderItems[item]);\n                                break;\n                            }\n                        }\n                    }\n                }, 2000);\n            } else {\n                clearInterval(itemInterval);\n            }\n        }\n\n        // making changes to the slider\n        function changeSliderItem(current, item) {\n            current.classList.remove(\"slider--item-current\");\n            item.classList.add(\"slider--item-current\");\n            currentIdx = item;\n        }\n        \n        // handler for btns and slider items\n        var sControl = {\n            previous: function(btn) {\n                if (nextBtn && nextBtn.disabled === true) {\n                    nextBtn.disabled = false;\n                }\n\n                for (var idx = 0; idx < sliderItems.length; idx++) {\n                    if (sliderItems[idx].classList.contains(\"slider--item-current\")) {\n                        if (idx + 1 === sliderItems.length ) {\n                            btn.disabled = true;\n                            return;\n                        }\n\n                        var item = idx + 1;\n\n                        changeSliderItem(sliderItems[idx], sliderItems[item]);\n                        break;\n                    }\n                }\n            },\n            next: function(btn) {\n                if (prevBtn && prevBtn.disabled === true) {\n                    prevBtn.disabled = false;\n                }\n\n                for (var idx = 0; idx < sliderItems.length; idx++) {\n                    if (sliderItems[idx].classList.contains(\"slider--item-current\")) {\n                        if (idx - 1 < 0 ) {\n                            btn.disabled = true;\n                            return;\n                        } \n\n                        var item = idx - 1;\n\n                        changeSliderItem(sliderItems[idx], sliderItems[item]);\n                        break;\n                    }\n                }\n            }\n        }\n\n        // event listener handler, determining the btn and calling the right action\n        function sBtnHandler(ev) {\n            ev.preventDefault();\n            ev.stopPropagation();\n\n            intervalSliderItem(true);\n\n            switch(this.name) {\n                case \"previous--btn\":\n                    sControl.previous(this);\n                    prevBtn = this;\n                    break;\n                case \"next--btn\":\n                    sControl.next(this);\n                    nextBtn = this;\n                    break;\n            }\n\n        }\n\n        // loops to add event listeners to btns and iterating over slider items\n        for (var i = 0; i < sliderBtns.length; i++) {\n            sliderBtns[i].addEventListener(\"click\", sBtnHandler);\n        }\n\n        for (var idx = 0; idx < sliderItems.length; idx++) {\n            if (idx === sliderItems.length - 1) {\n                sliderItems[idx].classList.add(\"slider--item-current\");\n                currentIdx = sliderItems[idx];\n                intervalSliderItem();\n            }\n        }\n    }\n\n\n\n    function init() {\n        console.log(\"document ready!\");\n    }\n\n\n    function navHandler() {\n        var hamBtn = document.getElementById(\"ham--button\");\n        var nav = document.getElementById(\"main--nav\");\n\n        hamBtn.addEventListener(\"click\", function(ev) {\n            ev.preventDefault();\n\n           if (!nav.classList.contains(\"nav--shown\")) {\n                nav.classList.add(\"nav--shown\");\n           } else {\n               nav.classList.remove(\"nav--shown\");\n           }\n        });\n    } \n\n    document.onreadystatechange = function() {\n        if (document.readyState === \"complete\") {\n            init();\n            navHandler();\n            formsHandler = new FormsHandler();\n            formsHandler.init();\n            sliderHandler();\n        }\n    }\n\n}());\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9yZXNvdXJjZXMvYXNzZXRzL2pzL2FwcC5qcz84YjY3Il0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIC8vIGNvbnN0cnVjdG9yIGZ1bmN0aW9uIGZvciBYTUxIdHRwUmVxdWVzdCB0aGF0IHJldHVybiBhIHByb21pc2VcbiAgICBmdW5jdGlvbiBYSFJlcXVlc3QocHJvZ3Jlc3MpIHtcblxuICAgICAgICB2YXIgcENiID0gcHJvZ3Jlc3M7XG5cbiAgICAgICAgZnVuY3Rpb24gYWpheFJlcShtZXRob2QsIHVybCwgZGF0YSkge1xuICAgICAgICAgICAgdmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZSggZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgICAgICAgICAgICAgIGlmIChwQ2IpIHtcbiAgICAgICAgICAgICAgICAgICAgeGhyLmFkZEV2ZW50TGlzdGVuZXIoXCJwcm9ncmVzc1wiLCBwQ2IucHJvZ3Jlc3MpO1xuICAgICAgICAgICAgICAgICAgICB4aHIuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgcENiLmxvYWQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChtZXRob2QgPT09IFwiR0VUXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9IFwiZG9jdW1lbnRcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHhoci5vcGVuKG1ldGhvZCwgdXJsKTtcblxuICAgICAgICAgICAgICAgIGlmIChkYXRhKVxuICAgICAgICAgICAgICAgICAgICB4aHIuc2VuZChkYXRhKTsgIFxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgeGhyLnNlbmQoKTtcblxuICAgICAgICAgICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PT0gNCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdHVzID09PSAyMDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRoaXMucmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QodGhpcy5zdGF0dXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbih1cmwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYWpheFJlcShcIkdFVFwiLCB1cmwpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHBvc3Q6IGZ1bmN0aW9uKHVybCwgZGF0YSkge1xuICAgICAgICAgICAgICAgIGlmIChkYXRhKSB7IHJldHVybiBhamF4UmVxKFwiUE9TVFwiLCB1cmwsIGRhdGEpOyB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFqYXhSZXEoXCJQT1NUXCIsIHVybCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIHZhciBmb3Jtc0hhbmRsZXI7XG5cbiAgICBmdW5jdGlvbiBGb3Jtc0hhbmRsZXIoKSB7IC8vIGNvbnN0cnVjdG9yIGZ1bmN0aW9uIGZvciBmb3JtcyBoYW5kbGluZ1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBmb3Jtc0dldEhhbmRsZXIoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBtYWtlQ2hhbmdlczogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgIHZhciByZXF1ZXN0ZWREYXRhID0gZGF0YTtcbiAgICAgICAgICAgICAgICB2YXIgZm9ybUhvbGRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZm9ybS0tY29udGFpbmVyXCIpO1xuICAgICAgICAgICAgICAgIHZhciByZXF1ZXN0ZWRGb3JtID0gcmVxdWVzdGVkRGF0YS5nZXRFbGVtZW50QnlJZChcImZvcm0tLXdyYXBcIik7XG5cbiAgICAgICAgICAgICAgICBpZiAoZm9ybUhvbGRlci5jbGFzc0xpc3QuY29udGFpbnMoXCJmb3JtLS1zaG93blwiKSkgeyAvLyByZXBsYWNlIHRoZSBmb3JtIGlmIG90aGVyIHNob3duXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuaGFuZGxlLnJlcGxhY2UoZm9ybUhvbGRlciwgcmVxdWVzdGVkRm9ybSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBvbGRGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmb3JtLS13cmFwXCIpO1xuICAgICAgICAgICAgICAgICAgICBmb3JtSG9sZGVyLnJlcGxhY2VDaGlsZChyZXF1ZXN0ZWRGb3JtLCBvbGRGb3JtKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mb3JtUmVmLmN1cnJlbnQuY2xhc3NMaXN0LmFkZChcImZvcm1zLS1pdGVtLWN1cnJlbnRcIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZm9ybVJlZi5vbGQuY2xhc3NMaXN0LnJlbW92ZShcImZvcm1zLS1pdGVtLWN1cnJlbnRcIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZm9ybVJlZi5vbGQgPSB0aGlzLmZvcm1SZWYuY3VycmVudDtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZS5saXN0ZW4oKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJyZXBsYWNlZFwiKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgeyAvLyBpZiBubyBmb3JtIHNob3duIGFkZFxuICAgICAgICAgICAgICAgICAgICBmb3JtSG9sZGVyLmNsYXNzTGlzdC5hZGQoXCJmb3JtLS1zaG93blwiKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mb3JtUmVmLmN1cnJlbnQuY2xhc3NMaXN0LmFkZChcImZvcm1zLS1pdGVtLWN1cnJlbnRcIik7XG4gICAgICAgICAgICAgICAgICAgIGZvcm1Ib2xkZXIuYXBwZW5kQ2hpbGQocmVxdWVzdGVkRm9ybSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZm9ybVJlZi5vbGQgPSB0aGlzLmZvcm1SZWYuY3VycmVudDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZS5saXN0ZW4oKTtcblxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImFkZGVkXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmb3JtUmVmOiB7IC8vIGZvcm1zIHJlZmVyZW5jZXMsIGN1cnJlbnQgZm9yIHJlcXVlc3RlZCwgYW5kIG9sZCBmb3IgdGhlIGxhc3RcbiAgICAgICAgICAgICAgICBvbGQ6IG51bGwsXG4gICAgICAgICAgICAgICAgY3VycmVudDogbnVsbFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGhhbmRsZTogeyAvLyBsaXN0ZW5pbmcgZm9yIGZvcm0gc3VibWl0aW9uIGFuZCBoYW5kbGluZyBpdFxuICAgICAgICAgICAgICAgIGxpc3RlbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBmb3JtRWwgPSAgZG9jdW1lbnQuZm9ybXNbMF07XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBmb3JtRWwuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBmdW5jdGlvbihldikge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybXNQb3N0SGFuZGxlcihmb3JtRWwpOyAvLyBzZW5kaW5nIHRoZSBmb3JtIHRvIGJlIHBvc3RlZCB0byBzZXJ2ZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgZm9ybUVsLmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNldFwiLCBmdW5jdGlvbihldikge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybXNIYW5kbGVyLmhhbmRsZS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICByZW1vdmU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgb2xkRm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZm9ybS0td3JhcFwiKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZvcm1Ib2xkZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZvcm0tLWNvbnRhaW5lclwiKTtcbiAgICAgICAgICAgICAgICAgICAgZm9ybUhvbGRlci5yZW1vdmVDaGlsZChvbGRGb3JtKTtcbiAgICAgICAgICAgICAgICAgICAgZm9ybUhvbGRlci5jbGFzc0xpc3QucmVtb3ZlKFwiZm9ybS0tc2hvd25cIik7XG4gICAgICAgICAgICAgICAgICAgIGZvcm1zSGFuZGxlci5mb3JtUmVmLm9sZC5jbGFzc0xpc3QucmVtb3ZlKFwiZm9ybXMtLWl0ZW0tY3VycmVudFwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGZ1bmN0aW9uIGZvcm1zR2V0SGFuZGxlcigpIHtcbiAgICAgICAgdmFyIGZvcm1zSXRlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJmb3Jtcy0taXRlbVwiKTtcbiAgICAgICAgdmFyIGN1cnJlbnRGb3JtUmVmO1xuXG4gICAgICAgIHZhciByZXNwb25zZUhhbmRsZXIgPSB7XG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgZm9ybXNIYW5kbGVyLm1ha2VDaGFuZ2VzKGRhdGEpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZhaWxlZDogZnVuY3Rpb24oc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coc3RhdHVzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBwcm9ncmVzc0NiID0ge1xuICAgICAgICAgICAgcHJvZ3Jlc3M6IGZ1bmN0aW9uKGV2KSB7XG4gICAgICAgICAgICAgICAgY3VycmVudEZvcm1SZWYuY2xhc3NMaXN0LmFkZChcImZvcm0tLWl0ZW0tcHJvZ3Jlc3NcIik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbG9hZDogZnVuY3Rpb24oZXYpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50Rm9ybVJlZi5jbGFzc0xpc3QucmVtb3ZlKFwiZm9ybS0taXRlbS1wcm9ncmVzc1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGdldEZvcm1zKGV2KSB7XG4gICAgICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgICAgIGN1cnJlbnRGb3JtUmVmID0gdGhpcztcbiAgICAgICAgICAgIGZvcm1zSGFuZGxlci5mb3JtUmVmLmN1cnJlbnQgPSB0aGlzO1xuXG4gICAgICAgICAgICB2YXIgdHlwZUF0dHIgPSB0aGlzLmdldEF0dHJpYnV0ZShcImRhdGEtdHlwZVwiKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZm9ybXMtLWl0ZW0tY3VycmVudFwiKSkge1xuICAgICAgICAgICAgICAgICBpZiAoZm9ybXNIYW5kbGVyLmZvcm1SZWYub2xkICYmIHRoaXMgPT09IGZvcm1zSGFuZGxlci5mb3JtUmVmLm9sZCkge1xuICAgICAgICAgICAgICAgICAgICBmb3Jtc0hhbmRsZXIuaGFuZGxlLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgdXJsID0gXCIvZm9ybS9cIiArIHR5cGVBdHRyO1xuXG4gICAgICAgICAgICB2YXIgeGhyZXF1ZXN0ID0gbmV3IFhIUmVxdWVzdChwcm9ncmVzc0NiKTtcblxuICAgICAgICAgICAgeGhyZXF1ZXN0LmdldCh1cmwpLnRoZW4ocmVzcG9uc2VIYW5kbGVyLnN1Y2Nlc3MpLmNhdGNoKHJlc3BvbnNlSGFuZGxlci5mYWlsZWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmb3Jtc0l0ZW0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGZvcm1zSXRlbVtpXS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZ2V0Rm9ybXMpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBmdW5jdGlvbiBmb3Jtc1Bvc3RIYW5kbGVyKGZvcm1FbCkge1xuICAgICAgICB2YXIgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoZm9ybUVsKTtcblxuICAgICAgICBmb3IgKHZhciBlSXRlbSA9IDA7IGVJdGVtIDwgZm9ybUVsLmVsZW1lbnRzLmxlbmd0aDsgZUl0ZW0rKykge1xuICAgICAgICAgICAgaWYgKGZvcm1FbC5lbGVtZW50c1tlSXRlbV0udGFnTmFtZS50b1VwcGVyQ2FzZSgpID09PSBcIkJVVFRPTlwiKSB7IGNvbnRpbnVlOyB9XG4gICAgICAgICAgICBpZiAoIWZvcm1FbC5lbGVtZW50c1tlSXRlbV0ucmVxdWlyZWQgJiYgIWZvcm1FbC5lbGVtZW50c1tlSXRlbV0udmFsdWUpIHtcbiAgICAgICAgICAgICAgICBmb3JtRGF0YS5zZXQoZm9ybUVsLmVsZW1lbnRzW2VJdGVtXS5uYW1lLCAxMTExMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZm9ybUFjdGlvbiA9IGZvcm1FbC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWFjdGlvblwiKTtcblxuICAgICAgICB2YXIgcHJvZ3Jlc3NDYiA9IHtcbiAgICAgICAgICAgIHByb2dyZXNzOiBmdW5jdGlvbihldikge1xuXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbG9hZDogZnVuY3Rpb24oZXYpIHtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhldik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcmVzcG9uc2VIYW5kbGVyID0ge1xuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgIGZvcm1zSGFuZGxlci5oYW5kbGUucmVtb3ZlKCk7XG5cbiAgICAgICAgICAgICAgICB2YXIgY29uZmlybU1zZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZm9ybS0tY29uZmlybWF0aW9uLW1lc3NhZ2VcIik7XG4gICAgICAgICAgICAgICAgY29uZmlybU1zZy5jbGFzc0xpc3QuYWRkKFwibWVzc2FnZS0tc2hvd25cIik7XG5cbiAgICAgICAgICAgICAgICB2YXIgbXNnVGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbmZpcm1Nc2cuY2xhc3NMaXN0LnJlbW92ZShcIm1lc3NhZ2UtLXNob3duXCIpO1xuICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQobXNnVGltZW91dCk7XG4gICAgICAgICAgICAgICAgfSwgNTAwMCk7XG5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmYWlsZWQ6IGZ1bmN0aW9uKHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHN0YXR1cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHZhciB4aHJlcXVlc3QgPSBuZXcgWEhSZXF1ZXN0KHByb2dyZXNzQ2IpO1xuICAgICAgICB4aHJlcXVlc3QucG9zdChmb3JtQWN0aW9uLCBmb3JtRGF0YSkudGhlbihyZXNwb25zZUhhbmRsZXIuc3VjY2VzcykuY2F0Y2gocmVzcG9uc2VIYW5kbGVyLmZhaWxlZCk7XG4gICAgfVxuXG5cblxuXG4gICAgLy8gZnVuY3Rpb24gaGFuZGxlciBmb3IgaGFuZGxpbmcgc2xpZGVyIGZyb20gdGhlIGluZGV4IHBhZ2VcbiAgICBmdW5jdGlvbiBzbGlkZXJIYW5kbGVyKCkge1xuICAgICAgICB2YXIgc2xpZGVyQnRucyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJzbGlkZXItLWJ0blwiKTtcbiAgICAgICAgdmFyIHNsaWRlckl0ZW1zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInNsaWRlci0taXRlbVwiKTtcblxuICAgICAgICBpZiAoIXNsaWRlckJ0bnMubGVuZ3RoIHx8ICFzbGlkZXJJdGVtcy5sZW5ndGgpIHsgcmV0dXJuOyB9XG4gICAgICAgIHZhciBwcmV2QnRuO1xuICAgICAgICB2YXIgbmV4dEJ0bjtcbiAgICAgICAgdmFyIGN1cnJlbnRJZHg7XG4gICAgICAgIHZhciBpdGVtSW50ZXJ2YWw7XG5cblxuICAgICAgICBmdW5jdGlvbiBpbnRlcnZhbFNsaWRlckl0ZW0ocm12KSB7XG4gICAgICAgICAgICBpZiAoIXJtdikge1xuICAgICAgICAgICAgICAgIGl0ZW1JbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudElkeCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaWR4ID0gMDsgaWR4IDwgc2xpZGVySXRlbXMubGVuZ3RoOyBpZHgrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50SWR4ID09PSBzbGlkZXJJdGVtc1tpZHhdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpdGVtID0gaWR4IC0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlkeCAtIDEgPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IHNsaWRlckl0ZW1zLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2VTbGlkZXJJdGVtKGN1cnJlbnRJZHgsIHNsaWRlckl0ZW1zW2l0ZW1dKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgMjAwMCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaXRlbUludGVydmFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG1ha2luZyBjaGFuZ2VzIHRvIHRoZSBzbGlkZXJcbiAgICAgICAgZnVuY3Rpb24gY2hhbmdlU2xpZGVySXRlbShjdXJyZW50LCBpdGVtKSB7XG4gICAgICAgICAgICBjdXJyZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJzbGlkZXItLWl0ZW0tY3VycmVudFwiKTtcbiAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChcInNsaWRlci0taXRlbS1jdXJyZW50XCIpO1xuICAgICAgICAgICAgY3VycmVudElkeCA9IGl0ZW07XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vIGhhbmRsZXIgZm9yIGJ0bnMgYW5kIHNsaWRlciBpdGVtc1xuICAgICAgICB2YXIgc0NvbnRyb2wgPSB7XG4gICAgICAgICAgICBwcmV2aW91czogZnVuY3Rpb24oYnRuKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5leHRCdG4gJiYgbmV4dEJ0bi5kaXNhYmxlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICBuZXh0QnRuLmRpc2FibGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaWR4ID0gMDsgaWR4IDwgc2xpZGVySXRlbXMubGVuZ3RoOyBpZHgrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2xpZGVySXRlbXNbaWR4XS5jbGFzc0xpc3QuY29udGFpbnMoXCJzbGlkZXItLWl0ZW0tY3VycmVudFwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlkeCArIDEgPT09IHNsaWRlckl0ZW1zLmxlbmd0aCApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidG4uZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSBpZHggKyAxO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2VTbGlkZXJJdGVtKHNsaWRlckl0ZW1zW2lkeF0sIHNsaWRlckl0ZW1zW2l0ZW1dKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG5leHQ6IGZ1bmN0aW9uKGJ0bikge1xuICAgICAgICAgICAgICAgIGlmIChwcmV2QnRuICYmIHByZXZCdG4uZGlzYWJsZWQgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJldkJ0bi5kaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGZvciAodmFyIGlkeCA9IDA7IGlkeCA8IHNsaWRlckl0ZW1zLmxlbmd0aDsgaWR4KyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNsaWRlckl0ZW1zW2lkeF0uY2xhc3NMaXN0LmNvbnRhaW5zKFwic2xpZGVyLS1pdGVtLWN1cnJlbnRcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpZHggLSAxIDwgMCApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidG4uZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpdGVtID0gaWR4IC0gMTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlU2xpZGVySXRlbShzbGlkZXJJdGVtc1tpZHhdLCBzbGlkZXJJdGVtc1tpdGVtXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGV2ZW50IGxpc3RlbmVyIGhhbmRsZXIsIGRldGVybWluaW5nIHRoZSBidG4gYW5kIGNhbGxpbmcgdGhlIHJpZ2h0IGFjdGlvblxuICAgICAgICBmdW5jdGlvbiBzQnRuSGFuZGxlcihldikge1xuICAgICAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgICAgICBpbnRlcnZhbFNsaWRlckl0ZW0odHJ1ZSk7XG5cbiAgICAgICAgICAgIHN3aXRjaCh0aGlzLm5hbWUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIFwicHJldmlvdXMtLWJ0blwiOlxuICAgICAgICAgICAgICAgICAgICBzQ29udHJvbC5wcmV2aW91cyh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgcHJldkJ0biA9IHRoaXM7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJuZXh0LS1idG5cIjpcbiAgICAgICAgICAgICAgICAgICAgc0NvbnRyb2wubmV4dCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgbmV4dEJ0biA9IHRoaXM7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICAvLyBsb29wcyB0byBhZGQgZXZlbnQgbGlzdGVuZXJzIHRvIGJ0bnMgYW5kIGl0ZXJhdGluZyBvdmVyIHNsaWRlciBpdGVtc1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNsaWRlckJ0bnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHNsaWRlckJ0bnNbaV0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHNCdG5IYW5kbGVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAodmFyIGlkeCA9IDA7IGlkeCA8IHNsaWRlckl0ZW1zLmxlbmd0aDsgaWR4KyspIHtcbiAgICAgICAgICAgIGlmIChpZHggPT09IHNsaWRlckl0ZW1zLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgICAgICBzbGlkZXJJdGVtc1tpZHhdLmNsYXNzTGlzdC5hZGQoXCJzbGlkZXItLWl0ZW0tY3VycmVudFwiKTtcbiAgICAgICAgICAgICAgICBjdXJyZW50SWR4ID0gc2xpZGVySXRlbXNbaWR4XTtcbiAgICAgICAgICAgICAgICBpbnRlcnZhbFNsaWRlckl0ZW0oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXG5cbiAgICBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcImRvY3VtZW50IHJlYWR5IVwiKTtcbiAgICB9XG5cblxuICAgIGZ1bmN0aW9uIG5hdkhhbmRsZXIoKSB7XG4gICAgICAgIHZhciBoYW1CdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhhbS0tYnV0dG9uXCIpO1xuICAgICAgICB2YXIgbmF2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYWluLS1uYXZcIik7XG5cbiAgICAgICAgaGFtQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihldikge1xuICAgICAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICBpZiAoIW5hdi5jbGFzc0xpc3QuY29udGFpbnMoXCJuYXYtLXNob3duXCIpKSB7XG4gICAgICAgICAgICAgICAgbmF2LmNsYXNzTGlzdC5hZGQoXCJuYXYtLXNob3duXCIpO1xuICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgbmF2LmNsYXNzTGlzdC5yZW1vdmUoXCJuYXYtLXNob3duXCIpO1xuICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0gXG5cbiAgICBkb2N1bWVudC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09IFwiY29tcGxldGVcIikge1xuICAgICAgICAgICAgaW5pdCgpO1xuICAgICAgICAgICAgbmF2SGFuZGxlcigpO1xuICAgICAgICAgICAgZm9ybXNIYW5kbGVyID0gbmV3IEZvcm1zSGFuZGxlcigpO1xuICAgICAgICAgICAgZm9ybXNIYW5kbGVyLmluaXQoKTtcbiAgICAgICAgICAgIHNsaWRlckhhbmRsZXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxufSgpKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyByZXNvdXJjZXMvYXNzZXRzL2pzL2FwcC5qcyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9");

/***/ }
/******/ ]);