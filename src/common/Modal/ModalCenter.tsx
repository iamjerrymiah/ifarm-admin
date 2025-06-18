import React from 'react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react'

interface ModalCenterProps {
    isOpen: boolean;
    onClose: () => void;
    size?: string;
    width?: string;
    header?: any;
    height?: string;
    body?: React.ReactNode;
    footer?: React.ReactNode;
    noClose?: boolean;
    dark?: boolean;
    headerColor?: string;
}

function ModalCenter({
    isOpen,
    onClose,
    size,
    width,
    height,
    header,
    body,
    footer,
    noClose,
    headerColor,
    dark
}: ModalCenterProps) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            scrollBehavior='outside'
            size={size}
            isCentered
        >
            <ModalOverlay backdropFilter='blur(8px)' />
            {isOpen ? 
                <ModalContent h={height} minW={width} bgColor={dark ? 'blackAlpha.300' : ''}>
                    <ModalHeader color={headerColor}>{header}</ModalHeader>
                    {!noClose && <ModalCloseButton color={dark ? 'white' : ''}/>}
                    <ModalBody overflow='auto' className='scroll-custom'>{body}</ModalBody>
                    <ModalFooter>{footer}</ModalFooter>
                </ModalContent>
            : null}
        </Modal>
    )
}

export default ModalCenter