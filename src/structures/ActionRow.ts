import { ComponentType } from '../util/Constants';
import Button, { ButtonData } from './Button';

export interface ActionRowData {
  components?: (ButtonData)[];
  type?: ComponentType;
}

export default class ActionRow {
  constructor(data: ActionRowData = {}) {
    this.components = data.components?.map((component, index) => {
      switch (component.type) {
        case ComponentType.BUTTON:
          return new Button(component);

        default:
          throw new TypeError(`"data.components[${index}].type" was not recognized: ${component.type}`);
      }
    }) ?? [];
  }

  /**
   * -------------------------------------------------------
   * * Properties
   * -------------------------------------------------------
   */

  components: (Button)[];

  type = ComponentType.ACTION_ROW;

  /**
   * -------------------------------------------------------
   * * Methods
   * -------------------------------------------------------
   */

  addComponents(components: (Button)[]): this {
    this.components.push(...components);

    return this;
  }

  setComponents(components: (Button)[]): this {
    this.spliceComponents(0, this.components.length, components);

    return this;
  }

  spliceComponents(index: number, deleteCount: number, components: (Button)[]): this {
    this.components.splice(index, deleteCount, ...components);

    return this;
  }

  toJSON(): ActionRowData {
    return {
      components: this.components.map((component) => component.toJSON()),
      type: this.type,
    };
  }
}
