import { Fragment } from "react"
import { SelectProps } from "../../types/field-types"




const Select: React.FC<SelectProps> = ({labelName, name, value, options, onChange}) => {

    return (
        <Fragment>

            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={labelName}>
                {labelName}
            </label>
            <select
                id={labelName}
                name={name}
                value={value}
                onChange={onChange}
                className="border rounded w-full py-2 px-3"
            >
               <option value="" disabled>
                    Select a catogery
                </option>
              {
                options?.map((opt)=>
                <option value={opt}>{opt}</option>
                )}
                {/* Add more categories as needed */}
            </select>
        </Fragment>
    )


}



export default Select;