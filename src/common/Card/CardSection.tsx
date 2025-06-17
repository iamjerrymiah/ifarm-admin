import { Card, CardBody, CardHeader, CardProps, TextProps, CardBodyProps, Heading } from "@chakra-ui/react";
import { Property } from "csstype";
import React from "react";
import { TextColor } from "../../constants/colors";

interface SectionProps {
    title?: string;
    children: React.ReactNode;
    headColor?: Property.Color;
    noIcon?: boolean;
    showHeader?: boolean;
    containerProps?: CardProps;
    headerTextProps?: TextProps;
    bodyProps?: CardBodyProps;
}

export function CardSection({
    title = "",
    children,
    showHeader = true,
    headColor,
    containerProps = {},
    headerTextProps = {
        fontSize: '22px',
        fontWeight: 600
    },
    bodyProps = {}
}: SectionProps) {
    return (
        <Card maxW='full' mb={6} {...containerProps}>
            {showHeader ?
           <CardHeader>
                <Heading text={title} color={headColor ?? TextColor.heading} {...headerTextProps}/>

           </CardHeader> : null }
           <CardBody {...bodyProps}>
                {children}
           </CardBody>
        </Card>
    )
}
