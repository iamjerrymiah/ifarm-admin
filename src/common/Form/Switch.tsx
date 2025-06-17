import React, { ChangeEventHandler } from 'react'
import { Switch as ChakraSwitch, SwitchProps as ChakraSwitchProps, FormControl, FormLabel, Stack, Text } from '@chakra-ui/react';
import { TextColor } from '../../constants/colors';

export interface SwitchProps {
    label?: string;
    rightLabel?: string;
    subLabel?: string;
    labelStyle?: any;
    name: string;
    value: boolean;
    onChange: ChangeEventHandler<HTMLInputElement>;
    size?: string;
    color?: string;
    disabled?: boolean;
    readOnly?: boolean;
    required?: boolean;
    isRequired?: boolean;
    w?: string | number;
}

function Switch({
    label,
    rightLabel,
    subLabel,
    labelStyle,
    name,
    value,
    onChange,
    size = 'sm',
    color,
    required,
    isRequired,
    disabled,
    readOnly,
    ...props
}: SwitchProps) {
    return (
        <FormControl display='flex' alignItems='center' w={props.w} {...props}>
            {label &&
                <FormLabel
                    htmlFor={`${name} ${label}`}
                    color={TextColor.upperLabel}
                    fontSize='14px'
                    minWidth={160}
                    mb={1}
                    sx={labelStyle}
                    fontWeight={500}
                >   
                    
                    {label}
                </FormLabel>
            }
            <ChakraSwitch
                id={`${name} ${label}`}
                name={name}
                isChecked={value}
                isDisabled={disabled}
                isRequired={required}
                isReadOnly={readOnly}
                onChange={onChange}
                colorScheme='green'
            />

            {rightLabel &&
            <Stack spacing={'0'} mb={1}>
                <FormLabel
                    htmlFor={`${name} ${rightLabel}`}
                    color={TextColor.upperLabel}
                    fontSize='14px'
                    minWidth={160}
                    sx={labelStyle}
                    fontWeight={500}
                    pl={'10px'}
                >   
                    
                    {rightLabel}
                </FormLabel>
                {subLabel && <Text mt={'-2'} pl={'10px'} color={'gray.500'} fontSize={'12px'}>{subLabel}</Text>}
            </Stack>
            }
        </FormControl>
    )
}

export default Switch