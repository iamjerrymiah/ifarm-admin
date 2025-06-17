// 'use client'

import React from 'react'
import { FormControl, FormLabel, Textarea, TextareaProps as ChakraTextAreaProps, Box, Text } from '@chakra-ui/react'
import { TextColor } from '../../constants/colors';


export interface TextAreaProps extends ChakraTextAreaProps {
    name: string ;
    value: any;
    label?: string;
    upperLabel?: string;
    labelStyle?: any;
    h?: string;
    disabled?: boolean;
    required?: boolean;
    isRequired?: boolean;
    readOnly?: boolean;
    radius?: string;
    errors?: any;
    color?: string;
    labelColor?: string;
    focusBorder?: string;
    placeholderStyle?: any;
    custom?: boolean;
    layout?: string;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(({
    name,
    label,
    upperLabel,
    labelStyle,
    h,
    disabled,
    required,
    isRequired,
    readOnly,
    margin,
    radius,
    errors,
    color,
    labelColor,
    focusBorder,
    style,
    placeholder,
    placeholderStyle,
    custom,
    ...props
}, ref) => {
    const containerLayout: any = props.layout === "breathe" ?
        {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "start"
        } : {};

    return (
        <FormControl w={props.w} paddingBottom='15px' isInvalid={errors && errors[name]}>
            <Box w='full' paddingRight={props.layout === "breathe" ? '15px' : ''} {...containerLayout}>
                {upperLabel && 
                    <FormLabel
                        htmlFor={`${name} ${upperLabel}`}
                        color={custom ? TextColor.error : labelColor || TextColor.upperLabel}
                        fontSize='14px'
                        minWidth={160}
                        mb={1}
                        sx={labelStyle}
                        fontWeight={500}
                    >   
                        
                        {upperLabel}
                    </FormLabel>
                }
                {label &&
                    <FormLabel
                        htmlFor={`${name} ${label}`}
                        color={custom ? TextColor.error : labelColor || TextColor.label}
                        fontSize='13px'
                        minWidth={160}
                        mb={1}
                        sx={labelStyle}
                    >
                        {label}
                    </FormLabel>
                }
                <Textarea
                    ref={ref}
                    id={`${name} ${label}`}
                    name={name}
                    fontSize='13px'
                    color={custom ? TextColor.error : color || TextColor.black}
                    height={h || '140px'}
                    isDisabled={disabled}
                    isReadOnly={readOnly}
                    borderColor='gray.300'
                    placeholder={placeholder}
                    _placeholder={props._placeholder || { color: TextColor.label, fontSize: "13px" }}
                    isRequired={required}
                    borderRadius={custom ? '100px' : radius || '4px'}
                    sx={style}
                    pl='12px'
                    {...props}
                    w='full'
                />

            </Box>
            
            <Box position='absolute' right='15px' >
                {errors && (errors[name] &&
                    <Text fontSize={'10px'} mt='4px' mb={0} color='crimson'>
                        {errors[name]}
                    </Text>
                )}
            </Box> 
        </FormControl>
    )
})

TextArea.displayName = 'TextArea'