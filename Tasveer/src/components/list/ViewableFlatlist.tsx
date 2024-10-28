import React, { useState, useCallback, ReactElement } from "react";
import { FlatList, FlatListProps, ViewToken } from "react-native";


//flat list props
type FlatList_Prop<T> = Omit<FlatListProps<T>, 'renderItem'>;

type ViewableFlatListProp<T> = {
    renderItem: (props: { item: T, index: number, isVisible: boolean }) =>
        (ReactElement<null>),
    //used when two list is used (i.e horizontal ans vertical) 
    //to re-render renderItem function when any of visibility changes
    isVisibleParentList?: boolean,
    //adding this prop because the flatList item may have different name of unique key 
    uniqueKeyName: string | number,
} 
& FlatList_Prop<T>;

//view list object o=props
type itemsObjType<T> = {
    [key: string]: T
};

//viewableItemsProps callback prop
type viewableItemsProps = { changed: ViewToken[]; viewableItems: ViewToken[] };

const ViewableFlatList = function <T>(props: ViewableFlatListProp<T>) {

    //stat to store visible items list in object
    const [visibleItems, setVisibleItems] = useState<itemsObjType<T>>({})


    //render functions
    const renderItem = useCallback(({ item, index }: { item: T, index: number }) => {
        const key = item[props.uniqueKeyName];
        const isVisible = Boolean(visibleItems[key]);
        return props.renderItem({ item, index, isVisible });
    }, [visibleItems, props.isVisibleParentList])

    //function to track visible item
    const onViewableItemsChanged = useCallback(
        (info: viewableItemsProps): void => {
            //object to store visible items
            const visibleItemObj: itemsObjType<T> = {};
            //finding and storing visible item
            info.viewableItems.forEach((entry) => {
                if (entry.isViewable) {
                    visibleItemObj[entry.item[props.uniqueKeyName]] = entry.item;
                }
            })
            setVisibleItems(visibleItemObj);
        },
        []
    );

    return (
        <FlatList
            {
            ...props
            }
            renderItem={renderItem}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={
                props?.viewabilityConfig
                ||
                {
                    itemVisiblePercentThreshold: 70,
                    minimumViewTime: 1000,
                }
            }
        />
    )
}

export default ViewableFlatList;

