import React from 'react'
import { Select as ChakraSelect, SelectProps as ChakraSelectProps, FormControl, FormLabel, Text, Box, Center, BoxProps } from '@chakra-ui/react'
import { TextColor } from '../../constants/colors';
import { capCase } from '../../utils/utils';

export interface SelectProps extends ChakraSelectProps {
    name: string;
    value?: any;
    label?: string;
    upperLabel?: string;
    labelStyle?: any;
    h?: string;
    options: any[];
    displayValues?: any[];
    disabled?: boolean;
    readOnly?: boolean;
    required?: boolean;
    isRequired?: boolean;
    margin?: string;
    radius?: string;
    errors?: any;
    color?: string;
    leftElement?: React.ReactNode;
    labelColor?: string;
    focusBorder?: string;
    style?: any;
    placeholder?: string;
    placeholderStyle?: any;
    custom?: boolean;
    layout?: string;
    noPlaceholder?: boolean;
    containerProps?: BoxProps;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({ 
    label,
    upperLabel,
    labelStyle,
    options = [],
    displayValues,
    value,
    color,
    className,
    style,
    name,
    height,
    disabled,
    required,
    isRequired,
    readOnly,
    errors,
    radius,
    labelColor,
    placeholder,
    noPlaceholder,
    placeholderStyle,
    focusBorder,
    leftElement,
    custom,
    containerProps,
    ...props
}, ref) => {
    const containerLayout: any = props.layout === "breathe" ?
        {
            position: 'relative',
            display: "flex",
            flexDirection: "row", 
            justifyContent: "space-between",
            alignItems: "center" 
        } : {};
        
    return (
        <FormControl w={props.w} paddingBottom='15px' isInvalid={(errors && errors[name])}>
            <Box paddingRight={props.layout === "breathe" ? '15px' : ''} {...containerLayout}>
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
                {leftElement &&
                    <Center
                        position='absolute'
                        left='18px'
                        top='31%'
                    >
                        {leftElement}
                    </Center>
                }
                <ChakraSelect
                    ref={ref}
                    id={`${name} ${label}`}
                    name={name}
                    fontSize='13px'
                    isDisabled={disabled}
                    isRequired={required}
                    isReadOnly={readOnly}
                    h={height || '40px'}
                    color={custom ? TextColor.error : color || TextColor.label}
                    borderColor='gray.300'
                    _focus={{ borderLeft: required && (props.variant != "unstyled" && props.variant != "flushed") ? '3px solid #03723D': '' }}
                    borderRadius={custom ? '100px' : radius || '4px'}
                    value={value}
                    sx={style}
                    paddingStart='0px'
                    paddingInlineStart='0px'
                    className={className}
                    {...props}
                    w='full'
                >
                    {!noPlaceholder && <option value='' style={placeholderStyle}>{placeholder}</option>}
                    {options.map((optionValue, index) => (
                        value === optionValue ? (
                            <option key={index} value={value} style={{ color: TextColor.label }}>
                                {displayValues ? capCase(displayValues[index]) : capCase(value)}
                            </option>
                        ) : (
                            <option key={index} value={optionValue} style={{ color: TextColor.label }}>
                                {displayValues ? capCase(displayValues[index]) : capCase(optionValue)}
                            </option>
                        )
                    ))}
                </ChakraSelect>
                
            </Box>

            <Box position='absolute' right='10px' >
                {errors && (errors[name] &&
                    <Text fontSize={'10px'} mt='4px' mb={0} color='crimson'>
                        {errors[name]}
                    </Text>
                )}
            </Box> 
                
        </FormControl>
    )
})

Select.displayName = 'Select'