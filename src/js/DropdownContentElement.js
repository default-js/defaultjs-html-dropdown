import { Component, define } from "@default-js/defaultjs-html-components";
import {toNodeName} from "@default-js/defaultjs-html-components/src/utils/DefineComponentHelper";


const NODENAME = toNodeName("dropdown-content");

export default class DropdownContentElement extends Component {
	static get NODENAME() {
		return NODENAME;
	}
	constructor() {
		super();
	}
};


define(DropdownContentElement);