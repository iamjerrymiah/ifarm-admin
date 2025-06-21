import { FormControl, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { TextColor } from '../../constants/colors'

export default function FilterInput({
    onChange,
    placeholder,
    leftElement
}:any) {
    return (
        <FormControl>
            <InputGroup>
                {leftElement &&
                    <InputLeftElement left={2} top={0}>
                        {leftElement}
                    </InputLeftElement>
                }
                <Input 
                    placeholder={placeholder} 
                    onChange={onChange}
                    fontSize={'13px'}
                    _placeholder={{ color: TextColor.label, fontSize: "13px" }}
                    pl={'50px'}
                />
            </InputGroup>
        </FormControl>
    )
}
