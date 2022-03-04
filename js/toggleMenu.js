export default class Toggle {
  constructor() {
    if (!this.vars()) return false;
    this.setupEvents();
  }
  vars() {
    this.selectors = {
      hamburger: "data-hamburger",
      nav: "data-nav",
      open: "open",
      active: "header__nav-list--active",
      close: "header__nav-list--close",
    };

    this.hamburger = document.querySelector(`[${this.selectors.hamburger}]`);
    this.nav = document.querySelector(`[${this.selectors.nav}]`);

    if (!this.hamburger || !this.nav) return false;

    this.expanded = this.hamburger.getAttribute("aria-expanded") === "false" ? false : true;
    this.open = false;
    this.timer = false;
    return true;
  }

  // Hamburger event listener
  setupEvents() {
    this.hamburger.addEventListener("click", () => this.toggle());
  }

  // Toggle hamburger menu
  toggle() {
    !this.open ? this.show() : this.hide();
  }

  // Animation while hamburger is open
  show() {
    if (this.timer) return false;

    this.hamburger.classList.add(this.selectors.open);
    this.nav.classList.add(this.selectors.active);
    this.expanded = !this.expanded;
    this.hamburger.setAttribute("aria-expanded", this.expanded);
    this.open = true;
  }

  // Animation while hamburger is closed
  hide() {
    this.hamburger.classList.remove(this.selectors.open);
    this.nav.classList.add(this.selectors.close);
    this.expanded = !this.expanded;
    this.hamburger.setAttribute("aria-expanded", this.expanded);

    this.timer = window.setTimeout(() => {
      this.nav.classList.remove(this.selectors.active);
      this.nav.classList.remove(this.selectors.close);
      this.timer = false;
    }, 250);
    this.open = false;
  }
}
