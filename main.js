(()=>{"use strict";var e={d:(t,n)=>{for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};e.d({},{OP:()=>C,hU:()=>h,EG:()=>m,xd:()=>E,QS:()=>j,e0:()=>k,j0:()=>L,Md:()=>p,tb:()=>v,eU:()=>y,ED:()=>g,rC:()=>q});var t=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?t.classList.remove(n.buttonDisabled):t.classList.add(n.buttonDisabled)},n=function(e,t,n,o){var r=e.querySelector(".".concat(t.id,"-error"));r.classList.add(o.error),r.textContent=n,r.classList.add(o.errorActive),t.classList.add(o.inputDisabled)},o=function(e,t,n){var o=e.querySelector(".".concat(t.id,"-error"));o.classList.remove(n.error),o.classList.remove(n.errorActive),t.classList.remove(n.inputDisabled),o.textContent=""};function r(e){if("Escape"===e.key){var t=document.querySelector(".popup_opened");c(t)}}var c=function(e){e.classList.remove("popup_opened"),document.removeEventListener("keydown",r)},a=function(e,t){e.classList.add("popup_opened"),document.addEventListener("keydown",r)},i=function(e,n){if("popup__photo"!==e.id){var o=Array.from(e.querySelectorAll(n.input)),r=e.querySelector(n.button);t(o,r,n)}},u=function(e,t){e.textContent=t?"Сохранение...":"Сохранить"},s={baseUrl:"https://nomoreparties.co/v1/".concat("plus-cohort-26"),headers:{authorization:"b28805f4-ab65-4da3-9863-f9f73313226d","Content-Type":"application/json"},myId:null},l=function(e){return fetch(s.baseUrl+e,{headers:s.headers})},d=function(e){var t=C.querySelector(".cards__item").cloneNode(!0);return e.owner._id!==s.myId&&t.removeChild(t.querySelector("#cards__trash")),e.likes.some((function(e){return e._id===s.myId}))&&t.querySelector(".cards__item-info-btn").classList.add("cards__item-info-btn_active"),t.dataset.id=e._id,t.querySelector(".cards__item-img").src=e.link,t.querySelector(".cards__item-img").alt=e.name,t.querySelector(".cards__item-info-title").textContent=e.name,t.querySelector(".cards__item-info-like-count").textContent=e.likes.length,t},p=document.querySelector(".page"),f=p.querySelector(".profile__info-content-btn"),_=p.querySelector(".profile__btn"),m=p.querySelector("#popup__profile"),v=p.querySelector("#popup__place"),y=p.querySelector("#popup__photo"),h=p.querySelector(".cards"),b=p.querySelector("#profileForm"),S=p.querySelector("#placeFrom"),q=p.querySelector(".profile__info-content-title"),g=p.querySelector(".profile__info-content-job"),L=m.querySelector("#profileName"),k=m.querySelector("#profileJob"),C=h.querySelector("#card").content,E=y.querySelector(".popup__content-img"),j=y.querySelector(".popup__content-text"),x=p.querySelector(".profile__logo");L.value=q.textContent,k.value=g.textContent;var N,P,D=document.querySelectorAll(".popup"),A=p.querySelector(".profile__info-mirror"),U=p.querySelector("#avatarForm"),O=p.querySelector("#popup__avatar"),T={form:".popup__container-form",input:".popup__container-input",inputDisabled:"popup__container-input_disabled",button:".popup__container-btn",buttonDisabled:"popup__container-btn_disabled",error:"popup__container-form-error",errorActive:"popup__container-form-error_active"};l("/cards").then((function(e){return e.ok?e.json():Promise.reject(e)})).then((function(e){(function(e){e.forEach((function(e){h.append(e)}))})(e.map((function(e){return d(e)})))})).catch((function(e){console.error("Произошла ошибка, статус - ".concat(e))})),N={profileLogo:x,profileName:q,profileJob:g},l("/users/me").then((function(e){return e.ok?e.json():Promise.reject(e.status)})).then((function(e){N.profileLogo.src=e.avatar,N.profileName.textContent=e.name,N.profileJob.textContent=e.about,s.myId=e._id})).catch((function(e){console.log("Произошла ошибка, статус - ".concat(e))})),P=T,Array.from(document.querySelectorAll(P.form)).forEach((function(e){e.reset(),e.addEventListener("submit",(function(e){e.preventDefault()})),function(e,r){var c=Array.from(e.querySelectorAll(r.input)),a=e.querySelector(r.button);t(c,a,r),c.forEach((function(i){i.addEventListener("input",(function(){(function(e,t,r){t.validity.patternMismatch?t.setCustomValidity(t.dataset.profileError):(t.setCustomValidity(""),o(e,t,r)),t.validity.valid?o(e,t,r):n(e,t,t.validationMessage,r)})(e,i,r),t(c,a,r)}))}))}(e,P)})),f.addEventListener("click",(function(){L.value=q.textContent,k.value=g.textContent,a(m)})),_.addEventListener("click",(function(){S.reset(),i(v,T),a(v)})),A.addEventListener("click",(function(){U.reset(),i(O,T),a(O)})),D.forEach((function(e){e.addEventListener("mousedown",(function(t){t.target.classList.contains("popup_opened")&&c(e),t.target.classList.contains("popup__close-icon")&&c(e)}))})),b.addEventListener("submit",(function(e){return function(e){return e.preventDefault(),q.textContent=L.value,g.textContent=k.value,t=e.target,n={name:L.value,about:k.value},o=t.querySelector(".popup__container-btn"),fetch(s.baseUrl+"/users/me",{method:"PATCH",headers:s.headers,body:JSON.stringify({name:n.name,about:n.about})}).then((function(e){return u(o,!0),e.ok?e.json():Promise.reject(e.status)})).then((function(e){console.log(e)})).catch((function(e){console.log("Произошла ошибка, статус - ".concat(e))})).finally((function(){u(o,!1)})),c(m);var t,n,o}(e)})),S.addEventListener("submit",(function(e){return function(e,t){e.preventDefault();var n=e.target,o=n.elements.imgLink.value;return function(e,t){var n=e.querySelector(".popup__container-btn");fetch(s.baseUrl+"/cards",{method:"POST",headers:s.headers,body:JSON.stringify({name:t.name,link:t.link})}).then((function(e){return u(n,!0),e.ok?e.json():Promise.reject(e.status)})).then((function(e){var t=d(e);h.prepend(t)})).catch((function(e){console.log("Произошла ошибка, статус - ".concat(e))})).finally((function(){u(n,!1)}))}(n,{name:n.elements.placeName.value,link:o,owner:{_id:s.myId},likes:[]}),i(n,t),c(v)}(e,T)})),U.addEventListener("submit",(function(e){return function(e,t){e.preventDefault();var n=e.target.querySelector(".popup__container-input").value,o=e.target.querySelector(".popup__container-btn");return fetch(s.baseUrl+"/users/me/avatar",{method:"PATCH",headers:s.headers,body:JSON.stringify({avatar:n})}).then((function(e){return u(o,!0),e.ok?e.json():Promise.reject(e.status)})).then((function(e){var n;n=e.avatar,p.querySelector(".profile__logo").src=n,c(t)})).catch((function(e){console.log(e)})).finally((function(){u(o,!1)}))}(e,O)})),h.addEventListener("click",(function(e){return function(e,t){var n,o=e.target;if("cards__like"===o.id){var r=o.parentNode.parentNode.parentNode.dataset.id;o.classList.contains("cards__item-info-btn_active")?function(e,t){var n=t.parentNode.querySelector(".cards__item-info-like-count").textContent;fetch(s.baseUrl+"/cards/likes/".concat(e),{method:"DELETE",headers:s.headers}).then((function(e){return e.ok?e.json():Promise.reject(e.status)})).then((function(e){t.parentNode.querySelector(".cards__item-info-like-count").textContent=String(Number(n)-1),console.log(e)})).catch((function(e){console.log("Произошла ошибка, статус - ".concat(e))}))}(r,o):function(e,t){var n=t.parentNode.querySelector(".cards__item-info-like-count").textContent;fetch(s.baseUrl+"/cards/likes/".concat(e),{method:"PUT",headers:s.headers}).then((function(e){return e.ok?e.json():Promise.reject(e.status)})).then((function(e){t.parentNode.querySelector(".cards__item-info-like-count").textContent=String(Number(n)+1),console.log(e)})).catch((function(e){console.log("Произошла ошибка, статус - ".concat(e))}))}(r,o),o.classList.toggle("cards__item-info-btn_active")}else{if("cards__trash"===o.id)return function(e){fetch(s.baseUrl+"/cards/".concat(e),{method:"DELETE",headers:s.headers}).then((function(e){return e.ok?e.json():Promise.reject(e.status)})).then((function(e){console.log(e)})).catch((function(e){console.log("Произошла ошибка, статус - ".concat(e))}))}(o.parentNode.dataset.id),h.removeChild(e.target.parentNode);if(o.classList.contains("cards__item-img"))return n={src:o.src,name:o.alt},E.src=n.src,E.alt=n.name,j.textContent=n.name,a(y)}return!1}(e)}))})();