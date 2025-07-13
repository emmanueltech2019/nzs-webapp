import React, {createContext, useState, useCallback, useContext, ReactNode} from "react";

interface CollectedItem {
    id: number;
    name: string;
}

interface SimpleCollectedItemsContextType {
    collectedItems: CollectedItem[];
    addOrUpdateItem: (item: CollectedItem) => void;
    getCollectedItem: (itemId: number) => CollectedItem | undefined;
}

export const SimpleCollectedItemsContext = createContext<SimpleCollectedItemsContextType | undefined>(undefined)

export const SimpleCollectedItemsProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [collectedItems, setCollectedItems] = useState<CollectedItem[]>([]);
    
    const addOrUpdateItem = useCallback((newItem: CollectedItem) => {
        setCollectedItems(prevItems => {
            const existingIndex = prevItems.findIndex(item => item.id === newItem.id);

            if(existingIndex > -1) {
                const updatedItems = [...prevItems];
                updatedItems[existingIndex] = newItem;
                console.log(`Updated item with ID ${newItem.id}`, newItem);
                return updatedItems;
            } else{
                console.log(`Added new item:`, newItem);
                return [...prevItems, newItem];
            }
        })
    }, []);
    const getCollectedItem = useCallback((itemId: number) => {
        return collectedItems.find(item => item.id === itemId);
    }, [collectedItems])

    const contextValue = {
        collectedItems,
        addOrUpdateItem,
        getCollectedItem,
    }

    return (
        <SimpleCollectedItemsContext.Provider value={contextValue} >
            {children}
        </SimpleCollectedItemsContext.Provider>
    )
}

export const useSimpleCollectedItems = () => {
    const context = useContext(SimpleCollectedItemsContext);
    if(context === undefined) {
        throw new Error('useSimpleCollectedItems must be used within a SimpleCollectedItemsProvier');
    }
    return context
}