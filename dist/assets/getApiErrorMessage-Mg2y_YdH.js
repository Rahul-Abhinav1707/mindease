import{b as o}from"./ThemeToggle-B6vw9KUK.js";/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const i=o("LoaderCircle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]);function c(n,t){var r,a;if(!n.response)return"Cannot reach the MindEase API. Make sure the backend server and MongoDB are running.";const e=((a=(r=n.response)==null?void 0:r.data)==null?void 0:a.message)||t;return e!=null&&e.includes("buffering timed out")||e!=null&&e.includes("users.findOne")?"Database connection is not ready. Check MongoDB Atlas Network Access and Railway MONGO_URI.":e}export{i as L,c as g};
