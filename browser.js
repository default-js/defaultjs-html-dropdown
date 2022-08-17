import Global from "@default-js/defaultjs-common-utils/src/Global";
import "@default-js/defaultjs-extdom";
import {DropdownElement, DropdownContentElement} from "./src/js"

Global.defaultjs = Global.defaultjs || {};
Global.defaultjs.html = Global.defaultjs.html || {};
Global.defaultjs.html.dropdown = Global.defaultjs.html.dropdown || {
    VERSON: "${version}",
    DropdownElement, 
    DropdownContentElement};

export {DropdownElement, DropdownContentElement};