"use strict";
(function() {
  let e2 = document.createElement(`link`).relList;
  if (e2 && e2.supports && e2.supports(`modulepreload`)) return;
  for (let e3 of document.querySelectorAll(`link[rel="modulepreload"]`)) n2(e3);
  new MutationObserver((e3) => {
    for (let t3 of e3) if (t3.type === `childList`) for (let e4 of t3.addedNodes) e4.tagName === `LINK` && e4.rel === `modulepreload` && n2(e4);
  }).observe(document, { childList: true, subtree: true });
  function t2(e3) {
    let t3 = {};
    return e3.integrity && (t3.integrity = e3.integrity), e3.referrerPolicy && (t3.referrerPolicy = e3.referrerPolicy), t3.credentials = e3.crossOrigin === `use-credentials` ? `include` : e3.crossOrigin === `anonymous` ? `omit` : `same-origin`, t3;
  }
  function n2(e3) {
    if (e3.ep) return;
    e3.ep = true;
    let n3 = t2(e3);
    fetch(e3.href, n3);
  }
})();
var e = new URL("./assets/menu-sprites-DCrbbOWn.png", import.meta.url).href, t = [`settings`, `chat`, `profile`, `brightness`, `exit`, `calendar`, `grid`, `globe`, `battery`, `bell`, `clock`, `person`, `desk`, `trophy`], n = { settings: [278, 295], chat: [326, 295], profile: [374, 295], brightness: [422, 295], exit: [277, 444], calendar: [369, 444], grid: [507, 444], globe: [277, 490], battery: [323, 490], bell: [369, 490], clock: [415, 490], person: [461, 490], desk: [507, 490], trophy: [553, 490] }, r = (e2) => e2.replace(/[&<>"']/g, (e3) => ({ "&": `&amp;`, "<": `&lt;`, ">": `&gt;`, '"': `&quot;`, "'": `&#39;` })[e3]), i = (e2, t2, n2) => Math.max(t2, Math.min(n2, Number.isFinite(e2) ? e2 : t2)), a = `
  :host([hidden]) { display:none!important; }
  :host { font-family:var(--ds-font,'DS System',Tahoma,sans-serif);font-size:calc(var(--ds-font-size,14px) * var(--dsi-ui-scale,1));line-height:1.5;color:var(--ds-ink,#282828);box-sizing:border-box;zoom:var(--dsi-ui-scale,1); }
  *,*::before,*::after { box-sizing:border-box; }
  button,input { font:inherit;color:inherit; }
  button { cursor:pointer;touch-action:manipulation; }
  button:disabled { cursor:not-allowed;color:#9b9b9b; }
  button:focus-visible,input:focus-visible { outline:2px solid var(--ds-blue,#0050e8);outline-offset:3px; }
  .sprite { display:block;width:42px;height:42px;flex-shrink:0;background-image:url('${e}');background-repeat:no-repeat;image-rendering:pixelated; }
  .key { display:inline-grid;place-items:center;min-width:15px;height:15px;font-family:var(--ds-font,'DS System',Tahoma,sans-serif);font-size:10px;line-height:1;border-radius:50%;background:#77745e;color:#fff;text-shadow:none; }
  @media(prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important}}
`;
function o(e2) {
  let [t2, r2] = n[e2] ?? n.settings;
  return `<span class="sprite" aria-hidden="true" style="background-position:-${t2}px -${r2}px"></span>`;
}
var s = class extends HTMLElement {
  root = this.attachShadow({ mode: `open`, delegatesFocus: true });
  connectedCallback() {
    this.update();
  }
  attributeChangedCallback() {
    this.isConnected && this.update();
  }
  update() {
    let e2 = this.root.activeElement?.getAttribute(`data-focus`);
    this.render(), e2 && this.root.querySelector(`[data-focus="${CSS.escape(e2)}"]`)?.focus({ preventScroll: true });
  }
  draw(e2, t2) {
    this.root.innerHTML = `<style>${a}${e2}</style>${t2}`;
  }
  emit(e2, t2) {
    this.dispatchEvent(new CustomEvent(e2, { detail: t2, bubbles: true, composed: true }));
  }
}, c = class extends s {
  static observedAttributes = [`disabled`, `key`, `variant`];
  render() {
    this.draw(`
      :host{display:inline-block}button{min-height:34px;min-width:94px;padding:4px 18px;display:flex;align-items:center;justify-content:center;gap:8px;border:1px solid #606060;background:linear-gradient(#fff 0%,#eee 48%,#d8d8d8 49%,#f8f8f8 100%);box-shadow:inset 0 0 0 2px #fff,1px 1px 0 #b8b8b8;text-shadow:1px 1px #fff}
      button:hover:not(:disabled){outline:2px solid #a8bbd0;outline-offset:1px}button:active:not(:disabled){background:#c9d7e5;box-shadow:inset 1px 1px 1px #789}
      :host([variant=primary]) button{border-color:#2868a8;background:linear-gradient(#eff8ff,#c0d6ed 50%,#a8c4e0 51%,#e4f0fc)}button:disabled{opacity:.52}
    `, `<button data-focus="button" type="button" ${this.hasAttribute(`disabled`) ? `disabled` : ``}>${this.hasAttribute(`key`) ? `<span class="key" aria-hidden="true">${r(this.getAttribute(`key`))}</span>` : ``}<slot></slot></button>`);
  }
}, l = class extends s {
  static observedAttributes = [`icon`, `label`, `selected`, `disabled`];
  render() {
    let e2 = this.getAttribute(`label`) ?? this.getAttribute(`icon`) ?? `Settings`;
    this.draw(`
      :host{display:inline-block}button{position:relative;padding:3px;border:1px solid #404040;background:#fff;box-shadow:inset 0 0 0 1px #a8a8a8;display:block}
      button::before,button::after{content:'';position:absolute;inset:-5px;pointer-events:none;opacity:0}
      button::before{border:2px solid #0050e8;clip-path:polygon(0 0,26% 0,26% 8%,8% 8%,8% 26%,0 26%,0 0,100% 0,100% 26%,92% 26%,92% 8%,74% 8%,74% 0,100% 0,100% 100%,74% 100%,74% 92%,92% 92%,92% 74%,100% 74%,100% 100%,0 100%,0 74%,8% 74%,8% 92%,26% 92%,26% 100%,0 100%)}
      :host([selected]) button::before,button:hover:not(:disabled)::before{opacity:1}button:disabled{filter:grayscale(1);opacity:.4}.label{font-size:12px;text-align:center;margin-top:9px;white-space:nowrap}
    `, `<button type="button" data-focus="tile" aria-label="${r(e2)}" aria-pressed="${this.hasAttribute(`selected`)}" ${this.hasAttribute(`disabled`) ? `disabled` : ``}>${o(this.getAttribute(`icon`) ?? `settings`)}</button>${this.hasAttribute(`label`) ? `<div class="label" aria-hidden="true">${r(e2)}</div>` : ``}`), this.root.querySelector(`button`).addEventListener(`click`, () => this.emit(`ds-select`, { icon: this.getAttribute(`icon`) ?? `settings` }));
  }
}, u = class extends s {
  static observedAttributes = [`heading`, `surface`, `selected`];
  render() {
    this.draw(`
      :host{display:block;position:relative}:host([selected]){outline:2px solid #0050e8;outline-offset:3px}.panel{border:1px solid #606060;background:#f8f8f8;box-shadow:inset 0 0 0 2px white}
      .heading{padding:4px 10px;border-bottom:1px solid #787878;background:linear-gradient(#b8c8d0,#608098);color:#fff;text-shadow:1px 1px #485868;font-size:13px;line-height:1.5}
      .body{padding:16px;min-height:64px}.grid{background-color:#f0f0f0;background-image:linear-gradient(#8884 1px,transparent 1px),linear-gradient(90deg,#8884 1px,transparent 1px),linear-gradient(#fff9 1px,transparent 1px),linear-gradient(90deg,#fff9 1px,transparent 1px);background-size:48px 48px,48px 48px,4px 4px,4px 4px}.scanline{background:repeating-linear-gradient(#fff 0 1px,#e0e0e0 1px 2px)}
    `, `<section class="panel">${this.hasAttribute(`heading`) ? `<div class="heading">${r(this.getAttribute(`heading`))}</div>` : ``}<div class="body ${this.getAttribute(`surface`) === `grid` ? `grid` : this.getAttribute(`surface`) === `scanline` ? `scanline` : ``}"><slot></slot></div></section>`);
  }
}, d = class extends s {
  static observedAttributes = [`label`, `description`, `icon`, `selected`, `disabled`];
  render() {
    this.draw(`
      :host{display:block;min-width:0}.row{width:100%;position:relative;display:flex;align-items:stretch;text-align:left;padding:3px;gap:4px;border:1px solid #686868;background:#fff;min-height:64px;box-shadow:1px 1px #b0b0b0}
      .image{display:grid;place-items:center;min-width:56px;border:1px solid #777;background:repeating-linear-gradient(#686868 0 1px,#484848 1px 2px)}.copy{flex:1;min-width:0}.title{padding:0 4px;background:#e0e0e0;font-size:13px;border-bottom:1px solid #c0c0c0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.description{min-height:34px;background:repeating-linear-gradient(#303030 0 1px,#282828 1px 2px);color:#fff;padding:3px 5px;font-size:12px;line-height:1.4}.row:disabled{opacity:.45}:host([selected]) .row{outline:2px solid #0050e8;outline-offset:2px}.row:hover:not(:disabled){outline:2px solid #8baee6;outline-offset:2px}
    `, `<button data-focus="row" class="row" type="button" aria-pressed="${this.hasAttribute(`selected`)}" ${this.hasAttribute(`disabled`) ? `disabled` : ``}><span class="image">${o(this.getAttribute(`icon`) ?? `settings`)}</span><span class="copy"><span class="title" style="display:block">${r(this.getAttribute(`label`) ?? `Settings`)}</span><span class="description" style="display:block">${r(this.getAttribute(`description`) ?? `Select an item to continue.`)}</span></span></button>`), this.root.querySelector(`button`).addEventListener(`click`, () => this.emit(`ds-select`, { label: this.getAttribute(`label`) ?? `Settings` }));
  }
}, f = class extends s {
  static observedAttributes = [`tone`, `dismissible`, `hidden`];
  render() {
    let e2 = this.getAttribute(`tone`) ?? `notice`;
    this.draw(`
      :host{display:block}:host([hidden]){display:none}.outline{background:var(--frame,#e8a000);padding:2px;clip-path:polygon(5px 0,calc(100% - 5px) 0,100% 5px,100% calc(100% - 5px),calc(100% - 5px) 100%,5px 100%,0 calc(100% - 5px),0 5px)}.inner{border:2px solid #080808;padding:2px;background:var(--frame,#e8a000)}.content{background:repeating-linear-gradient(#303030 0 1px,#1e1e1e 1px 2px);color:#fff;border:1px solid #080808;min-height:78px;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:14px 18px;text-align:center;font-size:13px}.success{--frame:#38c848}.info{--frame:#3088f0}button{margin-top:10px;color:#fff;background:#484848;border:1px solid #aaa;padding:2px 10px;font-size:11px}.key{margin-right:5px}
    `, `<div class="outline ${e2 === `success` ? `success` : e2 === `info` ? `info` : ``}"><div class="inner"><div class="content" role="status"><slot></slot>${this.hasAttribute(`dismissible`) ? `<button type="button" data-focus="dismiss"><span class="key">B</span>Close</button>` : ``}</div></div></div>`), this.root.querySelector(`button`)?.addEventListener(`click`, () => {
      this.hidden = true, this.emit(`ds-dismiss`, {});
    });
  }
}, p = class extends s {
  static observedAttributes = [`label`, `time`, `battery`, `online`];
  timer;
  connectedCallback() {
    super.connectedCallback(), this.timer = setInterval(() => {
      this.hasAttribute(`time`) || this.update();
    }, 3e4);
  }
  disconnectedCallback() {
    clearInterval(this.timer);
  }
  render() {
    let e2 = this.getAttribute(`time`) ?? (/* @__PURE__ */ new Date()).toLocaleTimeString(`en-GB`, { hour: `2-digit`, minute: `2-digit` }), t2 = i(Number(this.getAttribute(`battery`) ?? 100), 0, 100);
    this.draw(`
      :host{display:block}.bar{height:30px;display:flex;align-items:center;justify-content:space-between;padding:0 9px;background:linear-gradient(#b8c8d0,#88a0b0 42%,#608098);border:1px solid #606870;box-shadow:inset 0 1px #fff8;color:#202830;font-size:12px;text-shadow:0 1px #ffffff60}.indicators{display:flex;gap:9px;align-items:center}.signal{font-family:monospace;font-size:11px;letter-spacing:1px}.battery{position:relative;display:block;width:20px;height:9px;border:1px solid #283828;background:#d8e8d0;padding:1px}.battery::after{content:'';position:absolute;right:-3px;top:2px;width:2px;height:3px;background:#283828}.fill{height:100%;background:#38c848}.offline{opacity:.35}.time{border-right:1px dotted #405060;padding-right:10px}
    `, `<div class="bar"><span>${r(this.getAttribute(`label`) ?? `DSi Menu`)}</span><span class="indicators"><span class="time">${r(e2)}</span><span class="signal ${this.getAttribute(`online`) === `false` ? `offline` : ``}" role="img" aria-label="${this.getAttribute(`online`) === `false` ? `Offline` : `Online`}">\u2582\u2584\u2586</span><span class="battery" role="img" aria-label="Battery ${t2}%"><span class="fill" style="display:block;width:${t2}%"></span></span></span></div>`);
  }
}, m = class extends s {
  static observedAttributes = [`time`];
  timer;
  connectedCallback() {
    super.connectedCallback(), this.timer = setInterval(() => {
      this.hasAttribute(`time`) || this.update();
    }, 1e3);
  }
  disconnectedCallback() {
    clearInterval(this.timer);
  }
  render() {
    let e2 = this.getAttribute(`time`), t2 = /* @__PURE__ */ new Date(), n2 = e2?.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?$/), r2 = n2 ? i(Number(n2[1]), 0, 23) : t2.getHours(), a2 = n2 ? i(Number(n2[2]), 0, 59) : t2.getMinutes(), o2 = n2 ? i(Number(n2[3] ?? 0), 0, 59) : t2.getSeconds(), s2 = `${String(r2).padStart(2, `0`)}:${String(a2).padStart(2, `0`)}`, c2 = Array.from({ length: 12 }, (e3, t3) => `<rect x="47" y="9" width="3" height="3" transform="rotate(${t3 * 30} 49 49)" fill="#808080"/>`).join(``);
    this.draw(`:host{display:inline-block;width:148px}.clock{border:1px solid #383838;padding:2px;background:repeating-linear-gradient(#f8f8f8 0 1px,#e8e8e8 1px 2px)}svg{width:100%;display:block}text{font-family:var(--ds-font,'DS System',Tahoma,sans-serif);fill:#b0b0b0;font-size:22px}.caption{text-align:center;font-size:12px;margin-top:6px}`, `<div class="clock" role="img" aria-label="Clock, ${s2}"><svg viewBox="0 0 98 98" aria-hidden="true"><defs><pattern id="g" width="16" height="16" patternUnits="userSpaceOnUse"><path d="M16 0H0V16" fill="none" stroke="#b8b8b8" stroke-width=".5"/></pattern></defs><path fill="url(#g)" d="M0 0h98v98H0z"/>${c2}<text x="37" y="23">12</text><text x="80" y="59">3</text><text x="42" y="94">6</text><text x="3" y="59">9</text><path d="M49 49V24" stroke="#505050" stroke-width="2.5" transform="rotate(${r2 * 30 + a2 / 2} 49 49)"/><path d="M49 49V15" stroke="#686868" stroke-width="1.5" transform="rotate(${a2 * 6} 49 49)"/><path d="M49 55V14" stroke="#c05060" stroke-width=".8" transform="rotate(${o2 * 6} 49 49)"/><rect x="47" y="47" width="4" height="4" fill="#585858"/></svg></div><div class="caption">${s2}</div>`);
  }
};
function h(e2) {
  if (!e2 || !/^\d{4}-\d{2}-\d{2}$/.test(e2)) return /* @__PURE__ */ new Date();
  let [t2, n2, r2] = e2.split(`-`).map(Number), i2 = new Date(t2, n2 - 1, r2);
  return i2.getFullYear() === t2 && i2.getMonth() === n2 - 1 && i2.getDate() === r2 ? i2 : /* @__PURE__ */ new Date();
}
function g(e2) {
  return `${e2.getFullYear()}-${String(e2.getMonth() + 1).padStart(2, `0`)}-${String(e2.getDate()).padStart(2, `0`)}`;
}
var _ = { "ds-button": c, "ds-icon-tile": l, "ds-panel": u, "ds-menu-item": d, "ds-message": f, "ds-status-bar": p, "ds-clock": m, "ds-calendar": class extends s {
  static observedAttributes = [`value`];
  displayed;
  attributeChangedCallback() {
    this.displayed = h(this.getAttribute(`value`)), super.attributeChangedCallback();
  }
  render() {
    this.displayed ??= h(this.getAttribute(`value`));
    let e2 = this.displayed.getFullYear(), t2 = this.displayed.getMonth(), n2 = new Date(e2, t2, 1).getDay(), r2 = new Date(e2, t2 + 1, 0).getDate(), i2 = g(/* @__PURE__ */ new Date()), a2 = this.getAttribute(`value`) ?? i2, o2 = ``;
    for (let s2 = 0; s2 < Math.ceil((n2 + r2) / 7) * 7; s2++) {
      s2 % 7 == 0 && (o2 += `<tr>`);
      let c2 = s2 - n2 + 1, l2 = g(new Date(e2, t2, c2));
      o2 += `<td>${c2 > 0 && c2 <= r2 ? `<button type="button" data-focus="${l2}" data-date="${l2}" aria-label="${new Date(e2, t2, c2).toLocaleDateString(`en-GB`, { day: `numeric`, month: `long`, year: `numeric` })}" aria-pressed="${l2 === a2}" class="${l2 === i2 ? `today` : ``}">${c2}</button>` : ``}</td>`, s2 % 7 == 6 && (o2 += `</tr>`);
    }
    this.draw(`
      :host{display:inline-block;width:190px}.month{display:flex;align-items:center;justify-content:space-between;font-size:13px;gap:8px;margin-bottom:4px}.month button{border:0;background:none;min-width:26px;padding:0 4px;font-size:16px}table{table-layout:fixed;border-collapse:collapse;width:100%;background:#f8f8f8;font-size:11px}th,td{padding:0;text-align:center;border:1px solid #606060;height:24px}th{font-size:10px;font-weight:400;background:#383838;color:#fff}th:first-child{background:#b01848}th:last-child{background:#1840c0}td:first-child{background:#ffd0e0;color:#a01848}td:last-child{background:#c8d0ff;color:#1840c0}td button{display:block;width:100%;height:24px;padding:0;border:0;background:none;font-size:11px}td button[aria-pressed=true]{background:#3078f8;color:white;box-shadow:inset 0 0 0 1px #003898}.today{font-weight:bold;text-decoration:underline}td button:hover{outline:2px solid #3078f8;outline-offset:-2px}
    `, `<div class="month"><button type="button" data-focus="previous" aria-label="Previous month">\u2039</button><span>${String(t2 + 1).padStart(2, `0`)} / ${e2}</span><button type="button" data-focus="next" aria-label="Next month">\u203A</button></div><table aria-label="${this.displayed.toLocaleDateString(`en-GB`, { month: `long`, year: `numeric` })}"><thead><tr>${[`Su`, `Mo`, `Tu`, `We`, `Th`, `Fr`, `Sa`].map((e3) => `<th scope="col">${e3}</th>`).join(``)}</tr></thead><tbody>${o2}</tbody></table>`), this.root.querySelector(`[data-focus=previous]`).addEventListener(`click`, () => {
      this.displayed = new Date(e2, t2 - 1, 1), this.update();
    }), this.root.querySelector(`[data-focus=next]`).addEventListener(`click`, () => {
      this.displayed = new Date(e2, t2 + 1, 1), this.update();
    }), this.root.querySelectorAll(`[data-date]`).forEach((e3) => e3.addEventListener(`click`, () => {
      this.setAttribute(`value`, e3.dataset.date), this.emit(`ds-change`, { value: e3.dataset.date });
    }));
  }
}, "ds-toggle": class extends s {
  static observedAttributes = [`checked`, `disabled`, `label`];
  get checked() {
    return this.hasAttribute(`checked`);
  }
  set checked(e2) {
    this.toggleAttribute(`checked`, e2);
  }
  render() {
    this.draw(`
      :host{display:inline-block}label{display:flex;align-items:center;gap:12px;cursor:pointer;min-height:34px;font-size:13px}input{position:absolute;opacity:0;width:1px;height:1px}.switch{width:70px;height:26px;border:1px solid #686868;background:repeating-linear-gradient(#c0c0c0 0 1px,#b0b0b0 1px 2px);position:relative;display:flex;align-items:center;justify-content:flex-end;font-size:10px;padding:0 5px}.switch::before{content:'';position:absolute;top:2px;bottom:2px;left:2px;width:28px;background:linear-gradient(#fff,#e8e8e8 48%,#ccc 49%,#eee);border:1px solid #787878;box-shadow:inset 0 0 0 1px white}input:checked+.switch{background:#9ab8e0;justify-content:flex-start}input:checked+.switch::before{left:37px}input:focus-visible+.switch{outline:2px solid #0050e8;outline-offset:3px}input:disabled~*{opacity:.45}label:has(input:disabled){cursor:not-allowed}
    `, `<label><input data-focus="toggle" type="checkbox" ${this.checked ? `checked` : ``} ${this.hasAttribute(`disabled`) ? `disabled` : ``}><span class="switch" aria-hidden="true">${this.checked ? `ON` : `OFF`}</span><span>${r(this.getAttribute(`label`) ?? `Setting`)}</span></label>`), this.root.querySelector(`input`).addEventListener(`change`, (e2) => {
      this.checked = e2.target.checked, this.emit(`ds-change`, { checked: this.checked });
    });
  }
}, "ds-progress": class extends s {
  static observedAttributes = [`value`, `max`, `label`];
  render() {
    let e2 = Math.max(1, Number(this.getAttribute(`max`)) || 100), t2 = i(Number(this.getAttribute(`value`)), 0, e2), n2 = t2 / e2 * 100, a2 = this.getAttribute(`label`) ?? `Loading`;
    this.draw(`
      :host{display:block}.meta{font-size:12px;display:flex;justify-content:space-between;margin-bottom:6px}.track{height:20px;border:1px solid #585858;padding:3px;background:repeating-linear-gradient(#d8d8d8 0 1px,#c8c8c8 1px 2px);box-shadow:inset 1px 1px #999,inset -1px -1px white}.fill{height:100%;background:repeating-linear-gradient(90deg,#3078e8 0 9px,#90b8f8 9px 10px,transparent 10px 12px)}
    `, `<div class="meta"><span>${r(a2)}</span><span>${Math.round(n2)}%</span></div><div class="track" role="progressbar" aria-label="${r(a2)}" aria-valuemin="0" aria-valuemax="${e2}" aria-valuenow="${t2}"><div class="fill" style="width:${n2}%"></div></div>`);
  }
}, "ds-tabs": class extends s {
  static observedAttributes = [`items`, `selected`, `label`];
  render() {
    let e2 = (this.getAttribute(`items`) ?? `All|Design|Code`).split(`|`).filter(Boolean), t2 = Math.trunc(i(Number(this.getAttribute(`selected`)), 0, Math.max(0, e2.length - 1)));
    this.draw(`
      :host{display:block}.tabs{display:flex;gap:3px;border-bottom:2px solid #608098;padding:0 3px;background:repeating-linear-gradient(#e8e8e8 0 1px,#e0e0e0 1px 2px)}button{border:1px solid #888;border-bottom:0;background:linear-gradient(#fff,#d8d8d8);padding:7px 14px;min-width:64px;font-size:12px;box-shadow:inset 0 1px #fff;flex:1}button[aria-pressed=true]{color:#fff;background:linear-gradient(#96b0c0,#608098);text-shadow:1px 1px #405060;border-color:#486078}button:hover{border-color:#0050e8}
    `, `<div class="tabs" role="group" aria-label="${r(this.getAttribute(`label`) ?? `Categories`)}">${e2.map((e3, n3) => `<button type="button" data-focus="tab-${n3}" data-index="${n3}" aria-pressed="${n3 === t2}" tabindex="${n3 === t2 ? 0 : -1}">${r(e3)}</button>`).join(``)}</div>`);
    let n2 = (t3) => {
      this.setAttribute(`selected`, String(t3)), this.root.querySelector(`[data-index="${t3}"]`)?.focus(), this.emit(`ds-change`, { index: t3, label: e2[t3] });
    };
    this.root.querySelectorAll(`[data-index]`).forEach((e3) => e3.addEventListener(`click`, () => n2(Number(e3.dataset.index)))), this.root.addEventListener(`keydown`, this.onKey);
  }
  onKey = (e2) => {
    let t2 = e2, n2 = (this.getAttribute(`items`) ?? `All|Design|Code`).split(`|`).filter(Boolean).length, r2 = Math.trunc(i(Number(this.getAttribute(`selected`)), 0, Math.max(0, n2 - 1)));
    if ([`ArrowLeft`, `ArrowRight`, `Home`, `End`].includes(t2.key) && n2) {
      t2.preventDefault();
      let e3 = t2.key === `Home` ? 0 : t2.key === `End` ? n2 - 1 : (r2 + (t2.key === `ArrowRight` ? 1 : -1) + n2) % n2;
      this.root.querySelector(`[data-index="${e3}"]`)?.click();
    }
  };
}, "ds-input": class extends s {
  static observedAttributes = [`label`, `value`, `placeholder`, `type`, `disabled`];
  render() {
    let e2 = this.getAttribute(`label`) ?? `Text field`, t2 = this.getAttribute(`type`) === `search` ? `search` : `text`;
    this.draw(`
      :host{display:block;min-width:160px}.field{display:grid;gap:5px}.label{font-size:11px;color:#666}.input-wrap{display:flex;align-items:center;border:1px solid #707070;background:#fff;box-shadow:inset 1px 1px #c0c0c0,inset -1px -1px #fff}.input-wrap:focus-within{outline:2px solid #0050e8;outline-offset:2px}input{width:100%;min-height:31px;border:0;background:transparent;padding:4px 8px;outline:0;font-size:12px}input:disabled{background:#e5e5e5;color:#999}
    `, `<label class="field"><span class="label">${r(e2)}</span><span class="input-wrap"><input data-focus="input" type="${t2}" value="${r(this.getAttribute(`value`) ?? ``)}" placeholder="${r(this.getAttribute(`placeholder`) ?? ``)}" ${this.hasAttribute(`disabled`) ? `disabled` : ``} aria-label="${r(e2)}"></span></label>`);
    let n2 = this.root.querySelector(`input`);
    n2.addEventListener(`input`, () => this.emit(`ds-input`, { value: n2.value })), n2.addEventListener(`change`, () => this.emit(`ds-change`, { value: n2.value }));
  }
}, "ds-select": class extends s {
  static observedAttributes = [`label`, `value`, `options`, `disabled`];
  render() {
    let e2 = this.getAttribute(`label`) ?? `Choose an option`, t2 = (this.getAttribute(`options`) ?? `First option|Second option|Third option`).split(`|`).filter(Boolean), n2 = this.getAttribute(`value`) ?? t2[0] ?? ``;
    this.draw(`
      :host{display:block;min-width:190px}.field{display:grid;gap:5px}.label{font-size:11px;color:#666}select{appearance:none;width:100%;min-height:32px;padding:4px 28px 4px 8px;border:1px solid #707070;background:linear-gradient(45deg,transparent 50%,#485868 50%) calc(100% - 14px) 13px/5px 5px no-repeat,linear-gradient(135deg,#485868 50%,transparent 50%) calc(100% - 9px) 13px/5px 5px no-repeat,linear-gradient(#fff,#ececec);box-shadow:inset 1px 1px #fff,1px 1px #c0c0c0;font-size:12px}select:focus-visible{outline:2px solid #0050e8;outline-offset:2px}select:disabled{opacity:.5}
    `, `<label class="field"><span class="label">${r(e2)}</span><select data-focus="select" aria-label="${r(e2)}" ${this.hasAttribute(`disabled`) ? `disabled` : ``}>${t2.map((e3) => `<option value="${r(e3)}" ${e3 === n2 ? `selected` : ``}>${r(e3)}</option>`).join(``)}</select></label>`), this.root.querySelector(`select`).addEventListener(`change`, (e3) => {
      let t3 = e3.target;
      this.setAttribute(`value`, t3.value), this.emit(`ds-change`, { value: t3.value, label: t3.selectedOptions[0]?.textContent ?? t3.value });
    });
  }
}, "ds-slider": class extends s {
  static observedAttributes = [`label`, `value`, `min`, `max`, `step`, `disabled`];
  render() {
    let e2 = this.getAttribute(`label`) ?? `Volume`, t2 = Number(this.getAttribute(`min`) ?? 0), n2 = Number(this.getAttribute(`max`) ?? 100), a2 = i(Number(this.getAttribute(`value`) ?? 50), t2, n2);
    this.draw(`
      :host{display:block;min-width:180px}.meta{display:flex;justify-content:space-between;gap:14px;font-size:11px;color:#666;margin-bottom:7px}.value{color:#315f98;font-weight:bold}input{appearance:none;width:100%;height:17px;margin:0;background:repeating-linear-gradient(#c4c4c4 0 1px,#b4b4b4 1px 2px);border:1px solid #686868;padding:4px 6px}input::-webkit-slider-thumb{appearance:none;width:15px;height:23px;background:linear-gradient(#fff,#d8d8d8);border:1px solid #626262;box-shadow:inset 0 0 0 1px #fff}input::-moz-range-thumb{width:15px;height:21px;background:linear-gradient(#fff,#d8d8d8);border:1px solid #626262}input:focus-visible{outline:2px solid #0050e8;outline-offset:3px}input:disabled{opacity:.45}
    `, `<div class="meta"><span>${r(e2)}</span><span class="value">${a2}</span></div><input data-focus="slider" type="range" min="${t2}" max="${n2}" step="${r(this.getAttribute(`step`) ?? `1`)}" value="${a2}" aria-label="${r(e2)}" ${this.hasAttribute(`disabled`) ? `disabled` : ``}>`), this.root.querySelector(`input`).addEventListener(`input`, (e3) => {
      let t3 = e3.target;
      this.root.querySelector(`.value`).textContent = t3.value, this.emit(`ds-change`, { value: Number(t3.value) });
    });
  }
}, "ds-checkbox": class extends s {
  static observedAttributes = [`label`, `checked`, `disabled`];
  render() {
    let e2 = this.getAttribute(`label`) ?? `Remember this setting`;
    this.draw(`
      :host{display:inline-block}label{display:flex;align-items:center;gap:9px;cursor:pointer;font-size:12px}input{appearance:none;width:19px;height:19px;margin:0;border:1px solid #606060;background:linear-gradient(#fff,#ddd);box-shadow:inset 0 0 0 2px #fff}input:checked{background:#3078f8;box-shadow:inset 0 0 0 2px #fff, inset 0 0 0 5px #3078f8}input:checked::after{content:'\u2713';display:block;color:#fff;font-family:var(--ds-font,'DS System',Tahoma,sans-serif);font-size:14px;line-height:15px;text-align:center}input:focus-visible{outline:2px solid #0050e8;outline-offset:3px}input:disabled{opacity:.45}label:has(input:disabled){cursor:not-allowed;color:#999}
    `, `<label><input data-focus="checkbox" type="checkbox" ${this.hasAttribute(`checked`) ? `checked` : ``} ${this.hasAttribute(`disabled`) ? `disabled` : ``} aria-label="${r(e2)}"><span>${r(e2)}</span></label>`), this.root.querySelector(`input`).addEventListener(`change`, (e3) => {
      let t2 = e3.target.checked;
      this.toggleAttribute(`checked`, t2), this.emit(`ds-change`, { checked: t2 });
    });
  }
}, "ds-breadcrumb": class extends s {
  static observedAttributes = [`items`, `active`];
  render() {
    let e2 = (this.getAttribute(`items`) ?? `Home|Selected work`).split(`|`).filter(Boolean), t2 = i(Number(this.getAttribute(`active`) ?? e2.length - 1), 0, Math.max(e2.length - 1, 0));
    this.draw(`
      :host{display:block}nav{display:flex;align-items:center;flex-wrap:wrap;gap:6px;font-size:11px;color:#6f6f6f}button{border:0;background:transparent;padding:2px;color:#315f98;text-decoration:underline;font-size:11px}button[aria-current=true]{color:#555;text-decoration:none}button:hover{background:#dce8f7}.chevron{font-family:var(--ds-font,'DS System',Tahoma,sans-serif);color:#aaa}
    `, `<nav aria-label="Breadcrumb">${e2.map((e3, n2) => `${n2 ? `<span class="chevron" aria-hidden="true">\u203A</span>` : ``}<button data-focus="crumb-${n2}" type="button" aria-current="${n2 === t2 ? `true` : `false`}">${r(e3)}</button>`).join(``)}</nav>`), this.root.querySelectorAll(`button`).forEach((t3, n2) => t3.addEventListener(`click`, () => {
      this.setAttribute(`active`, String(n2)), this.emit(`ds-navigate`, { index: n2, label: e2[n2] });
    }));
  }
}, "ds-badge": class extends s {
  static observedAttributes = [`tone`, `label`];
  render() {
    let e2 = this.getAttribute(`tone`) ?? `neutral`, t2 = this.getAttribute(`label`) ?? `Ready`;
    this.draw(`
      :host{display:inline-block}.badge{display:inline-flex;align-items:center;gap:6px;padding:3px 8px;border:1px solid #777;background:#e8e8e8;box-shadow:inset 0 0 0 1px #fff;font-size:10px}.dot{width:5px;height:5px;border-radius:50%;background:#888}.success{background:#ddf0dc;border-color:#79a579;color:#3d713d}.success .dot{background:#38b848}.info{background:#dce9f8;border-color:#789bc4;color:#315f98}.info .dot{background:#3078f8}.warning{background:#fff0c8;border-color:#bf9c4e;color:#7d6221}.warning .dot{background:#d8a000}.danger{background:#f6d8df;border-color:#ba7586;color:#8b3347}.danger .dot{background:#c03058}
    `, `<span class="badge ${[`success`, `info`, `warning`, `danger`].includes(e2) ? e2 : ``}" role="status"><span class="dot" aria-hidden="true"></span>${r(t2)}</span>`);
  }
}, "ds-pagination": class extends s {
  static observedAttributes = [`page`, `pages`, `label`];
  render() {
    let e2 = Math.max(1, Math.trunc(Number(this.getAttribute(`pages`) ?? 5))), t2 = Math.max(1, Math.min(e2, Math.trunc(Number(this.getAttribute(`page`) ?? 1))));
    this.draw(`
      :host{display:block}.pager{display:flex;align-items:center;gap:3px}.pager button{min-width:25px;height:26px;padding:2px 7px;border:1px solid #777;background:linear-gradient(#fff,#ddd);box-shadow:inset 0 0 0 1px #fff;font-size:11px}.pager button[aria-current=true]{background:#3078f8;border-color:#1b4f9e;color:#fff;box-shadow:inset 0 0 0 1px #9ec0ff}.pager button:disabled{opacity:.4}.summary{margin-left:8px;font-size:10px;color:#888}
    `, `<nav class="pager" aria-label="${r(this.getAttribute(`label`) ?? `Pagination`)}"><button data-action="previous" type="button" aria-label="Previous page" ${t2 === 1 ? `disabled` : ``}>\u2039</button>${Array.from({ length: e2 }, (e3, n3) => `<button type="button" data-page="${n3 + 1}" aria-label="Page ${n3 + 1}" aria-current="${t2 === n3 + 1 ? `true` : `false`}">${n3 + 1}</button>`).join(``)}<button data-action="next" type="button" aria-label="Next page" ${t2 === e2 ? `disabled` : ``}>\u203A</button><span class="summary">${t2} / ${e2}</span></nav>`);
    let n2 = (t3) => {
      this.setAttribute(`page`, String(t3)), this.emit(`ds-change`, { page: t3, pages: e2 });
    };
    this.root.querySelectorAll(`[data-page]`).forEach((e3) => e3.addEventListener(`click`, () => n2(Number(e3.dataset.page)))), this.root.querySelector(`[data-action=previous]`)?.addEventListener(`click`, () => n2(t2 - 1)), this.root.querySelector(`[data-action=next]`)?.addEventListener(`click`, () => n2(t2 + 1));
  }
}, "ds-list": class extends s {
  static observedAttributes = [`items`, `selected`];
  render() {
    let e2 = (this.getAttribute(`items`) ?? `First item|Second item|Third item`).split(`|`).filter(Boolean), t2 = i(Math.trunc(Number(this.getAttribute(`selected`) ?? -1)), -1, e2.length - 1);
    this.draw(`
      :host{display:block}.list{border:1px solid #777;background:#fff;box-shadow:inset 0 0 0 1px #fff}.item{width:100%;display:flex;align-items:center;gap:9px;text-align:left;border:0;border-bottom:1px solid #c0c0c0;background:repeating-linear-gradient(#fff 0 1px,#eee 1px 2px);padding:7px 9px;font-size:12px}.item:last-child{border-bottom:0}.item::before{content:'\u203A';font-family:var(--ds-font,'DS System',Tahoma,sans-serif);color:#4773a2;font-size:16px}.item[aria-selected=true]{background:#dce8f7;color:#174f96}.item:hover{background:#e8f1fc}.meta{font-size:10px;color:#999;margin-top:10px}
    `, `<div class="list" role="listbox" aria-label="List">${e2.map((e3, n2) => `<button data-focus="item-${n2}" class="item" type="button" role="option" aria-selected="${n2 === t2}">${r(e3)}</button>`).join(``)}</div><div class="meta">${e2.length} items</div>`), this.root.querySelectorAll(`[role=option]`).forEach((t3, n2) => t3.addEventListener(`click`, () => {
      this.setAttribute(`selected`, String(n2)), this.emit(`ds-select`, { index: n2, label: e2[n2] });
    }));
  }
}, "ds-dialog": class extends HTMLElement {
  static observedAttributes = [`open`, `heading`];
  root = this.attachShadow({ mode: `open` });
  previousFocus = null;
  connectedCallback() {
    this.root.innerHTML = `<style>${a}:host{display:contents}dialog{width:400px;max-width:calc(100vw - 32px);padding:0;border:2px solid #303030;background:#f8f8f8;box-shadow:0 0 0 2px white,0 0 0 3px #686868,8px 8px #0004;color:#282828}dialog::backdrop{background:#10182888}.heading{padding:6px 12px;background:linear-gradient(#b8c8d0,#608098);color:#fff;border-bottom:1px solid #606060;font-size:14px;text-shadow:1px 1px #405060}.body{padding:24px;font-size:14px;line-height:1.8;background:repeating-linear-gradient(#f8f8f8 0 1px,#e8e8e8 1px 2px)}.footer{padding:10px 14px;background:#d8e0e0;border-top:1px solid #989898;display:flex;justify-content:flex-end;gap:10px}button{border:1px solid #686868;background:linear-gradient(white,#d8d8d8);box-shadow:inset 0 0 0 2px #fff;min-width:88px;padding:5px 13px;font-size:13px}.key{margin-right:6px}</style><dialog aria-labelledby="dialog-title"><div class="heading" id="dialog-title"></div><div class="body"><slot></slot></div><div class="footer"><button type="button" data-action="cancel"><span class="key">B</span>Cancel</button><button type="button" data-action="confirm"><span class="key">A</span>Confirm</button></div></dialog>`, this.root.querySelector(`[data-action=cancel]`).addEventListener(`click`, () => this.finish(`cancel`)), this.root.querySelector(`[data-action=confirm]`).addEventListener(`click`, () => this.finish(`confirm`)), this.root.querySelector(`dialog`).addEventListener(`cancel`, (e2) => {
      e2.preventDefault(), this.finish(`cancel`);
    }), this.sync();
  }
  attributeChangedCallback() {
    this.isConnected && this.sync();
  }
  show() {
    this.setAttribute(`open`, ``);
  }
  close() {
    this.removeAttribute(`open`);
  }
  finish(e2) {
    this.close(), this.dispatchEvent(new CustomEvent(`ds-${e2}`, { bubbles: true, composed: true }));
  }
  sync() {
    let e2 = this.root.querySelector(`dialog`);
    e2 && (this.root.querySelector(`#dialog-title`).textContent = this.getAttribute(`heading`) ?? `System message`, this.hasAttribute(`open`) && !e2.open ? (this.previousFocus = document.activeElement, e2.showModal()) : !this.hasAttribute(`open`) && e2.open && (e2.close(), this.previousFocus?.focus()));
  }
} };
function v() {
  for (let [e2, t2] of Object.entries(_)) customElements.get(e2) || customElements.define(e2, t2);
}
v();

export { _ as components };
