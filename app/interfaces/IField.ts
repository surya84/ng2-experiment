export interface IField {
    name: string;
    label: string;
    type?: string;
    value?: any;
    control: string;
    isRequired?: boolean;
    resources?: {
        list?: {
            url?: string;
            key?: string;
            value?: string;
        },
        items?: Array<any>;
    }
}