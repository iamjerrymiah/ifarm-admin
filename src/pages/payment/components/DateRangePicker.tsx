import {
  HStack,
  Input,
  InputGroup,
} from "@chakra-ui/react";
import Button from "../../../common/Button/Button";

interface Props {
    today: any;
    range: any;
    setRange: any;
    onFilter: any;
    formatDate: any;
    onChange?: (range: { start_date: string; end_date: string }) => void;
}

const DateRangeInput = ({ today, range, setRange, onFilter, formatDate }: Props) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        // Block selecting dates beyond today
        const selectedDate = new Date(value);
        if (selectedDate > today) return;

        setRange((prev:any) => ({ ...prev, [name]: value }));
    };

    // useEffect(() => { onChange(range); }, [range, onChange]);

    return (
        <HStack spacing={2}>
            <HStack border="1px solid #CBD5E0" borderRadius="md" spacing={1}>
                <InputGroup>
                    <Input
                        type="date"
                        name="start_date"
                        value={range.start_date}
                        onChange={handleChange}
                        max={formatDate(today)}
                        placeholder="Start"
                        fontSize={['11px',"sm"]}
                        border="none"
                        _focus={{ boxShadow: "none" }}
                    />
                </InputGroup>

                <InputGroup>
                    <Input
                        type="date"
                        name="end_date"
                        value={range.end_date}
                        onChange={handleChange}
                        max={formatDate(today)}
                        placeholder="End"
                        fontSize={['11px',"sm"]}
                        border="none"
                        _focus={{ boxShadow: "none" }}
                    />
                </InputGroup>
            </HStack>
            <Button 
                text='Filter'
                size={'md'}
                iconType='filter'
                variant='outline'
                color={'#344054'}
                onClick={onFilter}
            />
        </HStack>
    );
};

export default DateRangeInput;