export const getPercentage = (value: number, percentage: number) => {
    return (value / 100 * percentage)
}


export const getBackDash = (length: number, numberOfArch: number, spaceSize: number) => {

    //if only one story don't add space
    if (numberOfArch < 2)
        return 0;

    //one space length
    const spaceLength = getPercentage(length, spaceSize);
    // total Dahs Length = total Length - total Space Length
    const totalDashLength = length - (numberOfArch * spaceLength);
    //one dash length
    const dashLength = totalDashLength / numberOfArch;

    const strokeDashArray = new Array(numberOfArch).fill(0)
        .map(() => `${dashLength}, ${spaceLength}`)
        .join();


    return strokeDashArray;
}

export const getDash = (length: number, numberOfArch: number,
    spaceSize: number, unViewedIndexes: number[]) => {

    //if only one story don't add space
    if (numberOfArch < 2)
        return 0;

    //one space length
    const spaceLength = getPercentage(length, spaceSize);
    // total Dahs Length = total Length - total Space Length
    const totalDashLength = length - (numberOfArch * spaceLength);
    //one dash length
    const dashLength = totalDashLength / numberOfArch;

    if (unViewedIndexes.length == 0)
        return length;

    const strokeDashArray = new Array(numberOfArch).fill(0)
        .map((_, index) => {
            //if user viewed story
            if (!unViewedIndexes.includes(index + 1))
                return `${dashLength}, ${spaceLength * dashLength}`
            //if not viewed yet
            return `${dashLength}, ${spaceLength}`
        })
        .join();


    return strokeDashArray;
}