'use client'

import { ComponentProps, forwardRef, useState } from 'react'

import { Eye, EyeOff, Info } from 'lucide-react'

interface InputProps extends ComponentProps<'input'> {
  error?: string
}

// export function Input2({ error, type = 'text', className, ...props }: InputProps) {
//   const [stateType, setStateType] = useState(type);
//   return (
//     <div className="group w-full h-16 bg-teal-50 rounded-lg flex items-center justify-center gap-2 p-4 data-[error=true]:bg-rose-50 relative" data-error={!!error}>

//       {error && <span className="text-rose-500 absolute font-sans text-xs top-1 left-4 flex items-center justify-center gap-1">
//         <Info size={12} />
//         {error}
//       </span>}

//       <input
//         type={stateType}
//         className={`bg-transparent border-none outline-none size-full font-sans placeholder:text-teal-700 ${className}`}
//         {...props}
//       />
//       {type === 'password' &&
//         (stateType === 'password' ? (
//           <Eye
//             className="cursor-pointer text-teal-700"
//             size={24}
//             onClick={() => setStateType('text')}
//           />
//         ) : (
//           <EyeOff
//             className="cursor-pointer text-teal-700"
//             size={24}
//             onClick={() => setStateType('password')}
//           />
//         ))}
//     </div>
//   );
// }

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, type = 'text', className, ...props }, ref) => {
    const [stateType, setStateType] = useState(type)
    return (
      <div
        className="group w-full h-16 bg-teal-50 rounded-lg flex items-center justify-center gap-2 p-4 data-[error=true]:bg-rose-50 relative"
        data-error={!!error}
      >
        {error && (
          <span className="text-rose-500 absolute font-sans text-xs top-1 left-4 flex items-center justify-center gap-1">
            <Info size={12} />
            {error}
          </span>
        )}

        <input
          type={stateType}
          ref={ref}
          className={`bg-transparent border-none outline-none size-full font-sans placeholder:text-teal-700 ${className}`}
          {...props}
        />
        {type === 'password' &&
          (stateType === 'password' ? (
            <Eye
              className="cursor-pointer text-teal-700"
              size={24}
              onClick={() => setStateType('text')}
            />
          ) : (
            <EyeOff
              className="cursor-pointer text-teal-700"
              size={24}
              onClick={() => setStateType('password')}
            />
          ))}
      </div>
    )
  },
)

Input.displayName = 'Input'
