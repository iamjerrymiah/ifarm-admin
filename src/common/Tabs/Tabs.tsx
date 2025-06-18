import React from 'react'
import { Tabs as ChakraTabs, TabsProps as ChakraTabsProps, TabList, TabPanels, Tab, TabPanel, Center } from '@chakra-ui/react'
import { ElementColor, TextColor } from '../../constants/colors';

interface TabsProps {
    headings: string[] | any[] | React.ReactNode[],
    panels: any[],
    onClickTab?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    defaultIndex?: number;
    center?: boolean;
    hrm?: boolean;
    hrmLoader?: boolean;
    mt?: number;
    variant?: string;
    bb?: any;
    minW?: any;
    textColor?: any;
    setTabIndex?: any;
}

function Tabs({ 
    headings = [],
    panels = [],
    onClickTab,
    defaultIndex = 0,
    setTabIndex,
    center,
    mt,
    variant,
    bb,
    minW,
    textColor
 }: TabsProps) {
    return (
        <ChakraTabs isLazy variant={variant ?? 'unstyled'} defaultIndex={defaultIndex} onChange={setTabIndex ? (index) => setTabIndex(index) : ()=>{}} isFitted={false} mt={mt} w='full'>
            {center ?
                <Center>
                    <TabList overflowX='auto' className='scroll-custom' px={0} pb={[2, 2, 0]}>
                        {headings?.map((head, index) =>
                            <Tab
                                key={index}
                                fontSize='13px'
                                fontWeight={500}
                                border='none'
                                minW={minW ?? ['50%', '80px']}
                                _selected={{ bgColor: ElementColor.primary, borderBottom: `3px solid ${ElementColor.primary}`, color: TextColor.white}}
                                onClick={(e:any) => onClickTab && onClickTab(e?.target?.innerText)}
                            >
                                {head}
                            </Tab>
                        )}
                    </TabList>
                </Center> :  
                <TabList overflowX='auto' className='scroll-custom' px={0} pb={0} mb={2} borderBottom={bb ?? `1px solid ${'#EAECF0'}`}>
                    {headings?.map((head, index) => (
                        <Tab
                            key={index}
                            fontSize='13px'
                            fontWeight={500}
                            border='none'
                            color={'#667085'}
                            _selected={{ fontWeight: 500, color: textColor ? textColor :  ElementColor.primary, borderBottom: bb ?? `3px solid ${ElementColor.primary}`, }}
                            onClick={(e:any) => onClickTab && onClickTab(e?.target?.innerText)}
                            minW={minW ?? ['50%', '100px']}
                        >
                            {head}
                        </Tab>
                    ))}
                </TabList>
            }

            <TabPanels pt={4}>
                {panels?.map((panel, index) =>
                    <TabPanel key={index} px={0} pt={[0, 0, 0]}>
                        {panel}
                    </TabPanel>
                )}
            </TabPanels>
            
        </ChakraTabs>
    )
}

export default Tabs