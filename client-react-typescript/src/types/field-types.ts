export interface InputProps{
    type?: string,
    labelName?: string,
    name?: string,
    value?: string,
    onChange?: (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>)=> void;
}
export interface TextareaProps extends Omit<InputProps, 'type'>{}
export interface SelectProps extends Omit<InputProps, 'type'>{
    options?: string[]
}
export interface ButtonProps {
    name?: string;
    bg?: string;
    hoverColor?: string;
    onClick?: (e:any)=> void;
}
