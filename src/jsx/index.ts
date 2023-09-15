// @include './lib/json2.js'

import { ns } from "../shared/shared";

import * as ppro from "./ppro/ppro";

let main: any;

switch (BridgeTalk.appName) {
  case "premierepro":
  case "premiereprobeta":
    main = ppro;
    break;
}
//@ts-ignore
const host = typeof $ !== "undefined" ? $ : window;
host[ns] = main;

export type Scripts = typeof ppro;
