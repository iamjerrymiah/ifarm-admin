'use client'

import { InputProps as ChakraInputProps, InputGroup, InputRightElement, InputLeftElement, Input as ChakraInput, FormControl, FormLabel, Box, Text, Tooltip } from '@chakra-ui/react'
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
import React, { ChangeEvent, ChangeEventHandler, HTMLInputTypeAttribute } from 'react'
import { RiErrorWarningFill } from 'react-icons/ri'
import { TextColor } from '../../constants/colors'
import { inputDateFormat } from '../../utils/utils'

export interface InputProps extends ChakraInputProps {
    name?: string;
    value: any;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    minDate?: string;
    maxDate?: string;
    label?: string;
    upperLabel?: string | React.ReactNode;
    labelStyle?: any;
    h?: string;
    placeholder?: string;
    layout?: string;
    disabled?: boolean;
    readOnly?: boolean;
    required?: boolean;
    isRequired?: boolean;
    type?: string;
    margin?: string;
    radius?: string;
    errors?: any;
    color?: string;
    leftElement?: React.ReactNode;
    rightElement?: React.ReactNode;
    onRightElementClick?: Function;
    rightElementColor?: string;
    labelColor?: string;
    focusBorder?: string;
    style?: any;
    placeholderStyle?: any;
    custom?: boolean;
    decimal?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({
    label,
    upperLabel,
    name = '',
    value = '',
    onChange,
    min,
    max,
    minDate,
    maxDate,
    placeholder,
    placeholderStyle,
    className,
    type,
    leftElement,
    rightElement,
    onRightElementClick,
    rightElementColor,
    required,
    isRequired,
    disabled,
    readOnly,
    focusBorder,
    radius,
    style,
    errors,
    labelStyle,
    labelColor,
    fontSize = '14px',
    bgColor,
    color,
    custom,
    decimal,
    onBlur,
    ...props
}, ref) => {
    const [show, setShow] = React.useState(false)

    const handleClick = () => type === 'password' ? setShow(!show) : onRightElementClick && onRightElementClick()

    const format = (val = '') => {
        if (decimal) {
            // Format the value with commas and allow for decimal points
            const number = parseFloat(val.replace(/,/g, ''));
            return isNaN(number) ? '' : number.toLocaleString('en-US', { maximumFractionDigits: 2 });
        } else {
            return val ? parseInt(val, 10).toLocaleString() : "";
        }
    }

    const parse = (val = '') => {
        // Remove all characters except digits, commas, and decimal points
        return val.replace(/[^\d.,]/g, "").replace(/,/g, '');
    }

    const handleMoneyChange: ChangeEventHandler<HTMLInputElement> = (ev) => {
        let e = ev
        e.target.value = parse(e.target.value)
        onChange && onChange(e);
    }

    const handleNumberChange: ChangeEventHandler<HTMLInputElement> = (ev) => {
        let e = ev
        e.target.value = ((min && Number(e.target.value) < Number(min)) || (max && Number(e.target.value) > Number(max))) ? value : e.target.value
        onChange && onChange(e);
    }

    const handleDateChange: ChangeEventHandler<HTMLInputElement> = (ev) => {
        let e = ev
        e.target.value = ['INVALID', 'Invalid'].includes(e.target.value) ? '' : e.target.value
        onChange && onChange(e);
    }

    const handlePercentChange: ChangeEventHandler<HTMLInputElement> = (ev) => {
        let e = ev
        e.target.value = (Number(e.target.value) < 0 || Number(e.target.value) > 100) ? value : e.target.value
        onChange && onChange(e);
    }

    const handleType = (type: HTMLInputTypeAttribute = 'text') => {
        if (type === 'percent') {
            return 'number'
        } else if (type === 'password') {
            return show ? "text" : "password"
        } else if (type === 'money') {
            return 'text'
        } else if (type === 'file') {
            return 'file'
        } else return type ?? 'text'
    }

    const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
        return type === 'money' ? handleMoneyChange(ev) : type === 'percent' ? handlePercentChange(ev) : type === 'date' ? handleDateChange(ev) : type === 'number' ? handleNumberChange(ev) : onChange && onChange(ev)
    }

    const containerLayout: any = props.layout === "breathe" ?
        {
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
                <InputGroup>
                    {leftElement &&
                        <InputLeftElement
                            onClick={handleClick}
                            left={2}
                            top={0}
                            cursor='pointer'
                        >
                            {leftElement}
                            {/* {required && <span> * </span>} */}
                        </InputLeftElement>
                    }
                    <ChakraInput
                        ref={ref}
                        id={`${name} ${label}`}
                        name={name}
                        onChange={handleChange}
                        value={type === 'date' ? inputDateFormat(value) : type === 'money' ? format(value) : value}
                        onBlur={onBlur ?? undefined}
                        isDisabled={disabled}
                        isRequired={required}
                        isReadOnly={readOnly}
                        type={handleType(type)}
                        size='md'
                        fontSize={fontSize}
                        color={custom ? TextColor.error : color || TextColor.black}
                        pl={leftElement ? '50px' : '12px'}
                        pr={rightElement ? '50px' : '12px'}
                        h={props.h || '40px'}
                        borderColor='gray.300'
                        _focus={{ borderLeft: required && (props.variant != "unstyled" && props.variant != "flushed") ? '3px solid #03723D': '' }}
                        placeholder={type === 'password' ? '.........' : placeholder}
                        _placeholder={props._placeholder || { color: TextColor.label, fontSize: "14px" }}
                        borderRadius={custom ? '100px' : radius || '4px'}
                        sx={style}
                        min={type === 'date' || 'datetime-local' ? minDate : undefined}
                        max={type === 'date' || 'datetime-local' ? maxDate : undefined}
                        className={className}
                        bgColor={bgColor}
                        {...props}
                        w='full'
                    />
                    {(rightElement || type === 'password') &&
                        <InputRightElement
                            onClick={handleClick}
                            right={0}
                            top={0}
                            cursor='pointer'
                        >
                            {type === 'password' ? show ?
                                <AiFillEyeInvisible color={rightElementColor || TextColor.label} size={20} /> :
                                <AiFillEye color={rightElementColor || TextColor.label} size={20} /> : rightElement
                            }
                        </InputRightElement> 
                    }
                </InputGroup>

                {errors && (errors[name] &&
                    <Tooltip label={(props.id || name) && errors[props.id as keyof typeof errors ?? name as keyof typeof errors]} placement="top" hasArrow>
                        <Box w="fit-content" pos="absolute" top='30%' right="-10px">
                            <RiErrorWarningFill size="20px" color="#FCA400"/>
                        </Box>
                    </Tooltip>
                )}
            </Box>

            <Box pos="absolute" right='15px'  >
                {errors && (errors[name] &&
                    <Text fontSize={'10px'} mt='4px' mb={0} color='crimson'>
                        {errors[name]}
                    </Text>
                )}
            </Box>
        </FormControl>
    )
})

Input.displayName = 'Input'