// 'use client'

import React from 'react'
import { Checkbox as ChakraCheckbox, CheckboxProps as ChakraCheckboxProps, FormControl, FormLabel, HStack, Stack, Text } from '@chakra-ui/react'
import { TextColor } from '../../constants/colors';


export interface CheckBoxProps extends ChakraCheckboxProps {
    name: string;
    label?: string;
    subLabel?: string;
    labelStyle?: any;
    placeholder?: string;
    disabled?: boolean;
    readOnly?: boolean;
    required?: boolean;
    isRequired?: boolean;
    radius?: string;
    errors?: any;
    labelColor?: string;
    placeholderStyle?: any;
    custom?: boolean;
    noPlaceholder?: boolean;
    layout?: string;
}

export const CheckBox = React.forwardRef<HTMLInputElement, CheckBoxProps>(({
    label,
    subLabel,
    name,
    labelColor,
    labelStyle,
    value,
    onChange,
    errors,
    required,
    isRequired,
    disabled,
    readOnly,
    custom,
    ...props
}, ref) => {
    return (
        <FormControl paddingBottom='10px' w={props.w} isInvalid={(errors && errors[name])}>
            <HStack spacing={4} align='center'>
                <ChakraCheckbox
                    ref={ref}
                    id={`${name} ${label}`}
                    name={name}
                    onChange={onChange}
                    isChecked={Boolean(value ?? false)}
                    size='md'
                    isReadOnly={readOnly}
                    isDisabled={disabled}
                    isRequired={required}
                    {...props}
                />
                {label &&
                    <Stack spacing={'0'}>
                        <FormLabel
                            htmlFor={`${name} ${label}`}
                            color={custom ? TextColor.error : labelColor || TextColor.label}
                            fontSize='14px'
                            minWidth={160}
                            cursor='pointer'
                            sx={labelStyle}
                        >
                            {label}
                        </FormLabel>
                        {subLabel && <Text mt={'-2'} color={'gray.500'} fontSize={'12px'}>{subLabel}</Text>}
                    </Stack>
                }
            </HStack>
            
            {errors && (errors[name] &&
                <Text fontSize={'10px'} mt='6px' mb={0} color='crimson'>
                    {errors[name]}
                </Text>
            )}
        </FormControl>
    )
})

CheckBox.displayName = 'CheckBox'