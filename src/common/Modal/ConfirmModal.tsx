import { Modal, ModalHeader, ModalBody, ModalFooter, ModalOverlay, ModalContent, Text, HStack } from '@chakra-ui/react'
import { MouseEventHandler } from 'react';
import { TextColor } from '../../constants/colors';
import Button from '../Button/Button';


interface ConfirmModalProps {
    isOpen: boolean;
    onConfirm: Function;
    onClose?: () => void;
    header?: string | any;
    message?: string | number;
    subMessage?: string | number;
}

function ConfirmModal({
    isOpen,
    onConfirm,
    onClose,
    header,
    message,
    subMessage,
}: ConfirmModalProps) {

    const handleYes: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation()
        onClose && onClose()
        onConfirm()
    }
    const handleNo: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation()
        onClose && onClose()
    }

    return (
        <Modal isOpen={isOpen} onClose={() => onClose && onClose()} size='md' isCentered>
            <ModalOverlay backdropFilter='blur(8px)' />
            <ModalContent w='sm' maxW='90vw'>
                <ModalHeader>{header}</ModalHeader>
                <ModalBody textAlign='center'>
                    <Text
                        color={TextColor.upperLabel}
                        fontSize='md'
                        fontWeight={500}
                    >
                        {message ?? 'Are you sure ?'}
                    </Text>
                    {subMessage && 
                        <Text
                            padding='10px' 
                            color={TextColor.label}
                            fontSize='md'
                        >
                            {subMessage}
                        </Text>
                    }
                </ModalBody>
                <ModalFooter>
                    <HStack justifyContent='space-between' w='full'>
                        <Button
                            text='Yes'
                            onClick={handleYes}
                            w='50%'
                            size='md'
                        />
                        <Button
                            text='No'
                            variant='outline'
                            color={TextColor.error}
                            onClick={handleNo}
                            w='50%'
                            size='md'
                        />
                    </HStack>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ConfirmModal