import { BoxProps, VStack } from '@chakra-ui/react';
import React, { FormEventHandler }  from 'react'

interface FormProps extends Omit<BoxProps, 'onSubmit'> {
    children: React.ReactNode;
    onSubmit?: FormEventHandler<HTMLFormElement>;
    spacing?: number | string;
    style?: any;
}

function Form({
    onSubmit,
    children,
    spacing,
    style = {},
    ...props
}: FormProps) {

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        onSubmit && onSubmit(e)
    }
    return (
        <form onSubmit={handleSubmit} style={{ width: '100%', ...style }}>
            {spacing ? (
                <VStack w='full' align='start' spacing={spacing} {...props}>
                    {children}
                </VStack>
            ) : children}
        </form>
    )
}

export default Form