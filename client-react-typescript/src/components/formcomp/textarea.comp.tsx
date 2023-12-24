import React, { Fragment } from "react"
import { TextareaProps } from "../../types/field-types";


const Textarea:React.FC <TextareaProps> = ({labelName, name,value, onChange }) => {
    return (
        <Fragment>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={labelName}>
            {labelName}
            </label>
            <textarea
                id="description"
                name={name}
                value={value}
                onChange={onChange}
                className="border rounded w-full py-2 px-3"
            />
        </Fragment>
    )
}

export default Textarea;