import { forwardRef, useEffect, useRef } from 'react';

const TextInput = forwardRef(function TextInput({
    type = 'search',
    className = '',
    isFocused = false,
    placeholder,
    value,
    onChange,
    ...props
}, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            type={type}
            className={
                'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ' +
                className
            }
            ref={input}
            placeholder={placeholder}
            value={value} // Controlled component
            onChange={onChange} // Handle changes
        />
    );
});

export default TextInput;
