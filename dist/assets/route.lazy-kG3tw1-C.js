import{b as s,d as x,u as p,r as g,j as e,S as m,e as v,f as u,g as f,h as j,i as y,k as l,L as N,l as k,H as M,m as S,T as w,M as b,n as I,O as z,c as T}from"./index-hDB3-laO.js";/**
 * @license @tabler/icons-react v3.24.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var C=s("outline","browser-check","IconBrowserCheck",[["path",{d:"M4 4m0 1a1 1 0 0 1 1 -1h14a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-14a1 1 0 0 1 -1 -1z",key:"svg-0"}],["path",{d:"M4 8h16",key:"svg-1"}],["path",{d:"M8 4v4",key:"svg-2"}],["path",{d:"M9.5 14.5l1.5 1.5l3 -3",key:"svg-3"}]]);/**
 * @license @tabler/icons-react v3.24.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var L=s("outline","notification","IconNotification",[["path",{d:"M10 6h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3",key:"svg-0"}],["path",{d:"M17 7m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0",key:"svg-1"}]]);/**
 * @license @tabler/icons-react v3.24.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var R=s("outline","palette","IconPalette",[["path",{d:"M12 21a9 9 0 0 1 0 -18c4.97 0 9 3.582 9 8c0 1.06 -.474 2.078 -1.318 2.828c-.844 .75 -1.989 1.172 -3.182 1.172h-2.5a2 2 0 0 0 -1 3.75a1.3 1.3 0 0 1 -1 2.25",key:"svg-0"}],["path",{d:"M8.5 10.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0",key:"svg-1"}],["path",{d:"M12.5 7.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0",key:"svg-2"}],["path",{d:"M16.5 10.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0",key:"svg-3"}]]);/**
 * @license @tabler/icons-react v3.24.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var V=s("outline","tool","IconTool",[["path",{d:"M7 10h3v-3l-3.5 -3.5a6 6 0 0 1 8 8l6 6a2 2 0 0 1 -3 3l-6 -6a6 6 0 0 1 -8 -8l3.5 3.5",key:"svg-0"}]]);/**
 * @license @tabler/icons-react v3.24.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var A=s("outline","user","IconUser",[["path",{d:"M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0",key:"svg-0"}],["path",{d:"M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2",key:"svg-1"}]]);function F({className:c,items:t,...i}){const{pathname:n}=x(),r=p(),[o,h]=g.useState(n??"/settings"),d=a=>{h(a),r({to:a})};return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"p-1 md:hidden",children:e.jsxs(m,{value:o,onValueChange:d,children:[e.jsx(v,{className:"h-12 sm:w-48",children:e.jsx(u,{placeholder:"Theme"})}),e.jsx(f,{children:t.map(a=>e.jsx(j,{value:a.href,children:e.jsxs("div",{className:"flex gap-x-4 px-2 py-1",children:[e.jsx("span",{className:"scale-125",children:a.icon}),e.jsx("span",{className:"text-md",children:a.title})]})},a.href))})]})}),e.jsx(y,{orientation:"horizontal",type:"always",className:"hidden w-full min-w-40 bg-background px-1 py-2 md:block",children:e.jsx("nav",{className:l("flex space-x-2 py-1 lg:flex-col lg:space-x-0 lg:space-y-1",c),...i,children:t.map(a=>e.jsxs(N,{to:a.href,className:l(k({variant:"ghost"}),n===a.href?"bg-muted hover:bg-muted":"hover:bg-transparent hover:underline","justify-start"),children:[e.jsx("span",{className:"mr-2",children:a.icon}),a.title]},a.href))})})]})}function P(){return e.jsxs(e.Fragment,{children:[e.jsxs(M,{children:[e.jsx(S,{}),e.jsx("div",{className:"flex items-center ml-auto space-x-4",children:e.jsx(w,{})})]}),e.jsxs(b,{fixed:!0,children:[e.jsxs("div",{className:"space-y-0.5",children:[e.jsx("h1",{className:"text-2xl font-bold tracking-tight md:text-3xl",children:"Settings"}),e.jsx("p",{className:"text-muted-foreground",children:"Manage your account settings and set e-mail preferences."})]}),e.jsx(I,{className:"my-4 lg:my-6"}),e.jsxs("div",{className:"flex flex-col flex-1 space-y-2 overflow-hidden md:space-y-2 lg:flex-row lg:space-x-12 lg:space-y-0",children:[e.jsx("aside",{className:"top-0 lg:sticky lg:w-1/5",children:e.jsx(F,{items:B})}),e.jsx("div",{className:"flex w-full p-1 pr-4 overflow-y-hidden",children:e.jsx(z,{})})]})]})]})}const B=[{title:"Profile",icon:e.jsx(A,{size:18}),href:"/settings"},{title:"Account",icon:e.jsx(V,{size:18}),href:"/settings/account"},{title:"Appearance",icon:e.jsx(R,{size:18}),href:"/settings/appearance"},{title:"Notifications",icon:e.jsx(L,{size:18}),href:"/settings/notifications"},{title:"Display",icon:e.jsx(C,{size:18}),href:"/settings/display"}],H=T("/_authenticated/settings")({component:P});export{H as Route};
