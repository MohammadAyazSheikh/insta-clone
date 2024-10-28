import { stylesObjType } from '../../../../utils/functions/responsiveUtils';
import landscapeStyles from './landscapeStyles';
import portraitStyles from './portraitStyles';

export default function responsiveStyles({ widthToDp,heightToDp,isPortrait,colors}:stylesObjType) {

    return isPortrait ? portraitStyles(widthToDp, heightToDp, colors) : landscapeStyles(widthToDp, heightToDp, colors)
}


