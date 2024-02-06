


export function paginateData<T>(array: T[], pageSize: number, pageNumber: number) {
    return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
}



export const onStart = <T>(
    allData: T[],
    paginatedData: T[],
    setPaginatedData: React.Dispatch<React.SetStateAction<T[]>>,
    currentPage: number,
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
    pageSize: number,
) => {

    if (allData?.length > 1) {

        const totalPages = Math.ceil(allData.length / pageSize);

        console.log({
            totalPages,
            pageSize,
            currentPage
        })
        if (currentPage > 1) {

            const data_ = paginateData(allData, pageSize, currentPage - 1);
            // setPaginatedCountries([...paginatedCountries,...data,]);
            setPaginatedData(data_)
            setCurrentPage(currentPage - 1);
        }
    }
}

export const onEnd = <T>(
    allData: T[],
    paginatedData: T[],
    setPaginatedData: React.Dispatch<React.SetStateAction<T[]>>,
    currentPage: number,
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
    pageSize: number,
) => {

    if (allData?.length > 0) {

        const totalPages = Math.ceil(allData.length / pageSize);

        console.log({
            totalPages,
            pageSize,
            currentPage
        })
        if (currentPage < totalPages) {

            const data_ = paginateData(allData, pageSize, currentPage + 1);
            // setPaginatedData([...paginatedData.slice(-pageSize), ...data_]);
            setPaginatedData([...paginatedData, ...data_]);
            // setPaginatedData(data_);
            setCurrentPage(currentPage + 1);
        }
    }
}