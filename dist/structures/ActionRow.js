"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Button_1 = __importDefault(require("./Button"));
class ActionRow {
    constructor(data = {}) {
        this.type = 1 /* ACTION_ROW */;
        this.components = data.components?.map((component, index) => {
            switch (component.type) {
                case 2 /* BUTTON */:
                    return new Button_1.default(component);
                default:
                    throw new TypeError(`"data.components[${index}].type" was not recognized: ${component.type}`);
            }
        }) ?? [];
    }
    /**
     * -------------------------------------------------------
     * * Methods
     * -------------------------------------------------------
     */
    addComponents(components) {
        this.components.push(...components);
        return this;
    }
    setComponents(components) {
        this.spliceComponents(0, this.components.length, components);
        return this;
    }
    spliceComponents(index, deleteCount, components) {
        this.components.splice(index, deleteCount, ...components);
        return this;
    }
    toJSON() {
        return {
            components: this.components.map((component) => component.toJSON()),
            type: this.type,
        };
    }
}
exports.default = ActionRow;
