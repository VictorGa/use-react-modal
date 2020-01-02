"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var UseModalContext_1 = __importDefault(require("./UseModalContext"));
var react_useportal_1 = __importDefault(require("react-useportal"));
var body_scroll_lock_1 = require("body-scroll-lock");
var utils_1 = require("./utils");
var use_ssr_1 = __importDefault(require("use-ssr"));
var defaults = {
    onOpen: function () { },
    onClose: function () { },
    background: ''
};
var modalStyles = "\n  position: fixed;\n  left: 50%;\n  top: 50%;\n  // transform: translate(-50%,-50%);\n  z-index: 1000;\n";
exports.useModal = function (_a) {
    if (_a === void 0) { _a = defaults; }
    var onOpen = _a.onOpen, onClose = _a.onClose, background = _a.background, config = __rest(_a, ["onOpen", "onClose", "background"]);
    var isServer = use_ssr_1.default().isServer;
    var context = react_1.useContext(UseModalContext_1.default);
    var bg = background === null ? '' : background || context.background;
    var modal = react_1.useRef();
    var _b = react_useportal_1.default(__assign({ onOpen: function (event) {
            if (isServer)
                return;
            body_scroll_lock_1.disableBodyScroll(document.body);
            // eslint-disable-next-line no-param-reassign
            event.portal.current.style.cssText = "\n        position: absolute;\n        background: " + (bg ? bg : 'transparent') + ";\n        width: 100vw;\n        height: 100vh;\n        top: " + window.scrollY + "px;\n        left: 0;\n        z-index: 1000;\n      ";
            if (onOpen)
                onOpen(event);
        },
        onClose: function (event) {
            if (isServer)
                return;
            body_scroll_lock_1.enableBodyScroll(document.body);
            // eslint-disable-next-line no-param-reassign
            event.portal.current.removeAttribute('style');
            if (onClose)
                onClose(event);
        },
        onPortalClick: function (_a) {
            var target = _a.target;
            var clickingOutsideModal = modal && modal.current && !modal.current.contains(target);
            if (clickingOutsideModal)
                closePortal();
        } }, config)), isOpen = _b.isOpen, togglePortal = _b.togglePortal, openPortal = _b.openPortal, closePortal = _b.closePortal, Backdrop = _b.Portal, ref = _b.ref, portalRef = _b.portalRef;
    var ModalWithBackdrop = react_1.useCallback(function (props) { return (react_1.default.createElement(Backdrop, null,
        react_1.default.createElement("div", __assign({ ref: modal, style: utils_1.parseCSSText(modalStyles) }, props)))); }, [modalStyles]);
    // you cannot spread in this because it will give different values for ModalWithBackdrop
    // when doing array vs object destructuring
    return Object.assign([openPortal, closePortal, isOpen, ModalWithBackdrop, togglePortal, ref, portalRef, modal], {
        Modal: ModalWithBackdrop,
        toggleModal: togglePortal,
        openModal: openPortal,
        closeModal: closePortal,
        isOpen: isOpen,
        targetRef: ref,
        backdropRef: portalRef,
        modalRef: modal,
    });
};
exports.default = exports.useModal;
//# sourceMappingURL=useModal.js.map