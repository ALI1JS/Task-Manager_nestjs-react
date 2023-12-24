import { ButtonProps } from "../../types/field-types"
 
const Button: React.FC<ButtonProps> = ({bg, hoverColor, name , onClick}) => {

    return (
        <button
            className={`${bg} ${hoverColor} text-white px-4 py-2 rounded`}
            onClick={onClick}
        >
            {name}
        </button>
    )
}


export default Button;