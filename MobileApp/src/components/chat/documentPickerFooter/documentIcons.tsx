
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconFa from 'react-native-vector-icons/FontAwesome';


export const documentIcon = {
    pdf: <IconAnt
        name={'pdffile1'}
        size={30}
        color='#C81A0D'
    />,
    txt: <IconAnt
        name={'filetext1'}
        size={30}
        color='#57BA51'
    />,
    doc: <IconAnt
        name={'wordfile1'}
        size={30}
        color='#666699'
    />,
    docx: <IconAnt
        name={'wordfile1'}
        size={30}
        color='#666699'
    />,
    xls: <IconAnt
        name={'exclefile1'}
        size={30}
        color='#666699'
    />,
    xlsx: <IconAnt
        name={'exclefile1'}
        size={30}
        color='#666699'
    />,
    ppt: <IconAnt
        name={'pptfile1'}
        size={30}
        color='#D14A2A'
    />,
    pptx: <IconAnt
        name={'pptfile1'}
        size={30}
        color='#D14A2A'
    />,
    jpg: <IconAnt
        name={'jpgfile1'}
        size={30}
        color='#3CD7D5'
    />,
    png: <IconAnt
        name={'picture'}
        size={30}
        color='#E55153'
    />,
    gif: <IconAnt
        name={'picture'}
        size={30}
        color='#E55153'
    />,
    mp3: <IconAnt
        name={'sound'}
        size={30}
        color='#F9AB2C'
    />,
    mp4: <IconAnt
        name={'videocamera'}
        size={30}
        color='#F9AB2C'
    />,
    zip: <IconFa
        name={'file-zip-o'}
        size={30}
        color='#9D4475'
    />,
    rar: <IconFa
        name={'file-zip-o'}
        size={30}
        color='#9D4475'
    />,

    svg: <IconAnt
        name={'picture'}
        size={30}
        color='#E55153'
    />,

};
export const getDocumentIcon = (name: string):React.ReactNode => {

    const icon = documentIcon[name];
    if (icon)
        return icon;
    else
        return (
            <IconAnt
                name={'filetext1'}
                size={30}
                color='#57BA51'
            />)
}