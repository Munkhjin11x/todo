import React from "react";

export interface ButtonProps 
extends React.DetailedHTMLProps
<React.ButtonHTMLAttributes<HTMLButtonElement>,
HTMLButtonElement>,React.AriaAttributes{
    variant?:'primary'|'ghost'|'outline'|'del'
}
export const Button =({children , onClick, variant}:ButtonProps) => {
    return <button className={`rounded-lg w-fit bg-gray-800 text-white  ${variant === 'ghost' && 'bg-gray-600 py-2 px-4  text-gray-700'}
    ${
      variant === 'outline' && 'py-2 px-4  bg-white border border-gray-900 text-gray-900'
    } ${variant=== 'del' && 'bg-red-500 px-2 py-1'}`} onClick={onClick}>
{children}
    </button>
}