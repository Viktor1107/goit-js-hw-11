import{S as $,i as g}from"./assets/vendor-0fc460d7.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function o(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=o(r);fetch(r.href,s)}})();const O="45237903-940e6dd06b8edc671dac0e6f2",w="https://pixabay.com/api/";function h(e,t){const o=`${w}?key=${O}&q=${encodeURIComponent(e)}&image_type=photo&orientation=horizontal&safesearch=true&page=${t}&per_page=12`;return fetch(o).then(n=>{if(!n.ok)throw new Error("Failed to fetch images");return n.json()})}function y(e){return e.map(({webformatURL:t,largeImageURL:o,tags:n,likes:r,views:s,comments:a,downloads:I})=>`<li class="gallery-list">
        <a class="gallery-link" href="${o}" >
          <img
            class="gallery-image"
            src="${t}"
            alt="${n}"
          />
          <ul class="gallery-block">
            <li>
              <p class="gallery-text">Likes</p>
              <p class="gallery-info">${r}</p>
            </li>
            <li>
              <p class="gallery-text">Views</p>
              <p class="gallery-info">${s}</p>
            </li>
            <li>
              <p class="gallery-text">Comments</p>
              <p class="gallery-info">${a}</p>
            </li>
            <li>
              <p class="gallery-text">Downloads</p>
              <p class="gallery-info">${I}</p>
            </li>
          </ul>
        </a>
      </li>`).join("")}function x(){document.querySelector(".gallery").innerHTML=""}function L(e){document.querySelector(".gallery").insertAdjacentHTML("beforeend",e)}const c=document.getElementById("search-form"),p=document.getElementById("search-input"),l=document.querySelector(".load-more"),S=document.getElementById("loader"),f={text:""},b="search-form-state";P();let i="",u=1,E;c.addEventListener("input",q);c.addEventListener("submit",D);l.addEventListener("click",k);function q(e){const{name:t,value:o}=e.target;f[t]=o.trim(),localStorage.setItem(b,JSON.stringify(f))}function P(){try{const e=localStorage.getItem(b);if(!e)return;const t=JSON.parse(e);for(const[o,n]of Object.entries(t))c.elements[o]&&(c.elements[o].value=n,f[o]=n)}catch(e){console.error("Error parsing localStorage data:",e)}}function D(e){if(e.preventDefault(),i=p.value.trim(),!i){m();return}x(),u=1,l.classList.add("is-hidden"),v(),h(i,u).then(t=>{if(d(),t.hits.length===0){M();return}const o=y(t.hits);L(o),E=new $(".gallery a",{captionsData:"alt",captionDelay:250,captionPosition:"bottom",className:"simple-lightbox"}),t.hits.length<12?l.classList.add("is-hidden"):l.classList.remove("is-hidden"),p.value=""}).catch(()=>{d(),m()})}function k(){u+=1,v(),h(i,u).then(e=>{d();const t=y(e.hits);L(t),E.refresh(),e.hits.length<12&&l.classList.add("is-hidden")}).catch(()=>{d(),m()})}function m(e){g.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"})}function M(e){g.info({title:"",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"})}function v(){S.style.display="block"}function d(){S.style.display="none"}
//# sourceMappingURL=commonHelpers.js.map
