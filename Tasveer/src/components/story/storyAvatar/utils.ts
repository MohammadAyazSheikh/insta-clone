export const getPercentage = (value: number, percentage: number) => {
    return (value / 100 * percentage)
}


export const getBackDash = (circumference: number, numberOfArch: number, spaceSize: number) => {

    //if only one story don't add space
    if (numberOfArch < 2)
        return 0;

    //one space length
    const spaceLength = getPercentage(circumference, spaceSize);
    // total Dahs Length = total Length - total Space Length
    const totalDashLength = circumference - (numberOfArch * spaceLength);
    //one dash length
    const dashLength = totalDashLength / numberOfArch;

    const strokeDashArray = new Array(numberOfArch).fill(0)
        .map(() => `${dashLength}, ${spaceLength}`)
        .join();


    return strokeDashArray;
}

export const getDash = (
    circumference: number,
    totalNumberOfArch: number,
    spaceSize: number,
    showNumberOfArch: number) => {

    //if only one story don't add space
    if (totalNumberOfArch < 2)
        return 0;

    //one space length
    const spaceLength = getPercentage(circumference, spaceSize);
    // total Dahs Length = total Length - total Space Length
    const totalDashLength = circumference - (totalNumberOfArch * spaceLength);
    //one dash length
    const dashLength = totalDashLength / totalNumberOfArch;

    //if no arch to show (every story is viewed)
    //return circumference and also assign 
    //offset equal to circumference to svg circle 
    //for hiding front circle stroke
    if (showNumberOfArch == 0)
        return circumference;


    const strokeDashArray = new Array(showNumberOfArch).fill(0)
        .map((_, index) => {

            //If it is last arch 1st we will draw last arch
            //and in the remaining space we will draw space
            if (showNumberOfArch - 1 == index) {
                //number of remaining arch
                const remaining = totalNumberOfArch - showNumberOfArch;

                //lastSpace = total remaining dash length + total remaining spaces length
                const lastSpace = (dashLength * remaining) + (remaining + 1) * spaceLength;

                return `${dashLength}, ${lastSpace}`
            }

            //if not last arch
            return `${dashLength}, ${spaceLength}`

        })
        .join();


    return strokeDashArray;
}