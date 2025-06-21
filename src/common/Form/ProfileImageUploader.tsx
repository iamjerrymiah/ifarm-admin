
import { Avatar, FormLabel, Input } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { ElementColor } from '../../constants/colors';

export default function ProfileImageUploader({
    name, 
    setFile, 
    avatarName, 
    avatarSrc 
}: {
    name: string;
    setFile: any;
    avatarName: any;
    avatarSrc: any;
}) {

    const [imageSrc, setImageSrc] = useState(avatarSrc)
    
    const handleChange = (event:any) => {
        const file = event.target.files[0];
        if (file) {
            const src = URL.createObjectURL(file);
            setImageSrc(src);
            setFile(file); // Assuming you have a function to set the file in parent component
            // Notify.info("Image Uploaded");
        }
    };

    const checkImageUrlUnavailabilty = useMemo(() => {
        const unusual = [null, 'null', undefined, 'undefined', '']
        const check = unusual.includes(imageSrc)
        
        return check
    }, [imageSrc])

    return (
        <>
                <FormLabel 
                    htmlFor='file-input'
                    display='flex'
                    flexDirection='column'
                    alignItems='center'
                    pt={6}
                >

                <Input
                    id="file-input"
                    type="file"
                    name={name}
                    multiple={false}
                    onChange={handleChange}
                    display='none'
                />
                    
                    <Avatar 
                        src={checkImageUrlUnavailabilty ? avatarSrc : imageSrc} 
                        name={avatarName} 
                        size='2xl'
                        objectFit='contain'
                        outline={`2px solid ${ElementColor.primary}`}
                        cursor={'pointer'}
                        transition='200ms ease-in-out'
                        aspectRatio={1}
                        _hover={{ outline: `${`8px solid ${ElementColor.primary}`}` }}
                    /> 

                </FormLabel>
        </>
    );
}
