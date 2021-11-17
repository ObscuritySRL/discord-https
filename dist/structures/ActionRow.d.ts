import { ComponentType } from '../util/Constants';
import Button, { ButtonData } from './Button';
export interface ActionRowData {
    components?: (ButtonData)[];
    type?: ComponentType;
}
export default class ActionRow {
    constructor(data?: ActionRowData);
    /**
     * -------------------------------------------------------
     * * Properties
     * -------------------------------------------------------
     */
    components: (Button)[];
    type: ComponentType;
    /**
     * -------------------------------------------------------
     * * Methods
     * -------------------------------------------------------
     */
    addComponents(components: (Button)[]): this;
    setComponents(components: (Button)[]): this;
    spliceComponents(index: number, deleteCount: number, components: (Button)[]): this;
    toJSON(): ActionRowData;
}
