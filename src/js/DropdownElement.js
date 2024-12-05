import { Component, define } from "@default-js/defaultjs-html-components";
import { toNodeName } from "@default-js/defaultjs-html-components/src/utils/DefineComponentHelper";
import DropdownContentElement from "./DropdownContentElement";

const BODY = document.body;
const TOUCH_ONLY = window.matchMedia("(any-hover: none)").matches;

const isOnContent = (event, dropdown) => {
	if (!event) return false;
	const { top, bottom, left, right } = dropdown.getDropdownContent().getBoundingClientRect();
	const { x, y } = event;
	return top <= y && y <= bottom && left <= x && x <= right;
};

/**
 * @type {DropdownElement | HTMLElement}
 */
let OPEN_DROPDOWN = null;
/**
 * @function closeActiveDropdown
 * @param {MouseEvent} event
 */
const closeActiveDropdown = (event) => {
	if (OPEN_DROPDOWN) {		
		if (!(isOnContent(event, OPEN_DROPDOWN))) {
			OPEN_DROPDOWN.active = false;
			OPEN_DROPDOWN = null;
		}
	}
};
BODY.on("click", closeActiveDropdown);

const NODENAME = toNodeName("dropdown");
const DROPDOWN_CONTENT_SELECTOR = `${DropdownContentElement.NODENAME}, .dropdown-content`;

const EVENT__CLOSE = `${NODENAME}--close`;
const MODE_CLICK = "click";

const ATTRIBUTE_MODE = "mode";
const ATTRIBUTE_ACTIVE = "active";
export default class DropdownElement extends Component {
	static get NODENAME() {
		return NODENAME;
	}

	#initialied = false;
	#active = false;

	constructor() {
		super();
		this.root.on(EVENT__CLOSE, (event) => {
			event.preventDefault();
			event.stopPropagation();
			if (this.active) closeActiveDropdown();
		});
	}

	async init() {
		await super.init();

		if (!this.#initialied) {
			let mouseleaveTimeout = null;
			const clickMode = this.attr(ATTRIBUTE_MODE) == MODE_CLICK || TOUCH_ONLY;
			const eventType = clickMode ? "click" : "mouseover";
			this.on(eventType, (event) => {
				const target = event.target;
				const onContent = target.is(DROPDOWN_CONTENT_SELECTOR) || target.parent(DROPDOWN_CONTENT_SELECTOR);
				if (!onContent) {
					if (!this.active) {
						event.preventDefault();
						event.stopPropagation();
						this.active = true;
					}
				}
				clearTimeout(mouseleaveTimeout);
			});
			if (!TOUCH_ONLY) {
				this.on("mouseleave", (event) => {
					if (mouseleaveTimeout) clearTimeout(mouseleaveTimeout);
					mouseleaveTimeout = setTimeout(() => {
						if (this.active) {
							event.preventDefault();
							event.stopPropagation();
							this.active = false;
						}
						mouseleaveTimeout = null;
					}, 200);
				});
			}
		}
	}
	/**
	 * @returns {HTMLElement}
	 */
	getDropdownContent() {
		return this.root.find(DROPDOWN_CONTENT_SELECTOR).first();
	}

	get active() {
		return this.#active;
	}

	set active(value) {
		if (value && OPEN_DROPDOWN != this) {
			closeActiveDropdown();
			OPEN_DROPDOWN = this;
		}
		this.#active = value;
		this.attr(ATTRIBUTE_ACTIVE, value ? "" : null);
	}
}

define(DropdownElement);
