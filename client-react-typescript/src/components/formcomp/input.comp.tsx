import { Fragment } from "react";
import { InputProps } from "../../types/field-types";


const Input: React.FC<InputProps> = ({labelName, type, name, value, onChange }) => {
    return (
        <Fragment>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={labelName}>
                {labelName}
            </label>

            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className="border rounded w-full py-2 px-3"
            />
        </Fragment>

    );
};

export default Input;
