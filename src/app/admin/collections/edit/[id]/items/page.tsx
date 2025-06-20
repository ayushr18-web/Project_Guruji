"use client";
import { useState, useEffect } from "react";
import { useBooks } from "../../../../../../../hooks/useBook";
import Button from "../../../../../../../components/Button";
import { Plus } from "lucide-react";
import { useGetStories } from "../../../../../../../hooks/useStories";
import { useGetTeachings } from "../../../../../../../hooks/useTeachings";
import { useActiveItems, useAddCollectionItem, useGetCollectionItems, useRemoveCollectionItem } from "../../../../../../../hooks/useCollections";
import { useParams } from "next/navigation";
import CollectionItemCard from "../../../components/CollectionItemCard";

const ManageItemsPage = () => {
    const params = useParams();
    const collectionId = params.id as string;
    const [searchText, setSearchText] = useState("");
    const [activeTab, setActiveTab] = useState<"Story" | "Book" | "Teaching" | null>(null);
    const [selectedItems, setSelectedItems] = useState<{ type: string; label: string }[]>([]);

    const { data: searchItems, isFetching, refetch } = useActiveItems(activeTab, searchText);
    const { data: collectionItems, isFetching: isCollectionFetching, refetch: refetchItems } = useGetCollectionItems(collectionId);
    const searchData = searchItems?.data || {};
    const addItemMutation = useAddCollectionItem(collectionId);
    const deleteItemMutation = useRemoveCollectionItem(collectionId);
    // Fetch books when searchText changes
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (searchText.length > 1) {
                refetch(activeTab, searchText);
            }
        }, 300); // debounce

        return () => clearTimeout(timeout);
    }, [searchText, activeTab]);

    const handleSelectItem = (id: string) => {
        setSearchText("");
        if (activeTab) {
            addItemMutation.mutate(
                { content_id: id, collection_id: collectionId, sort_order: 0, notes: "" },
                {
                    onSuccess: () => {
                        refetchItems();
                    },
                    onError: (err) => {
                        console.error("Failed to create book:", err);
                    },
                }
            );
        }

        setActiveTab(null);
    };

    const handleDeleteItem = (itemId: string) => {
        console.log("Deleting item with ID:", itemId);
        if (!itemId) return;
        deleteItemMutation.mutate(itemId, {
            onSuccess: () => {
                refetchItems();
            },
            onError: (error) => {
            },
        });
    }

    return (
        <div className="flex flex-col gap-4 mx-auto mt-8 p-4">
            <h1 className="text-2xl font-bold">Manage Items</h1>
            <p className="text-gray-600">Here you can manage the items in your collection.</p>

            <div className="flex gap-2">
                {["Story", "Book", "Teaching"].map((tab) => (
                    <Button
                        variant="secondary"
                        text={`Add ${tab}`}
                        key={tab}
                        onClick={() => {
                            setActiveTab(tab as any);
                            setSearchText("");
                        }}
                        leftIcon={<Plus />} // You can add an icon here if needed
                        className="px-2 py-2"
                    />
                ))}
            </div>


            <div className="relative">
                {activeTab && <input
                    type="text"
                    placeholder={`Search for a ${activeTab}...`}
                    className="mt-2 w-full border px-3 py-2 rounded"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />}

                {searchText.length > 1 && !isFetching && searchData?.items?.length > 0 && (
                    <ul className="absolute z-10 w-full bg-white border rounded shadow mt-1 max-h-40 overflow-y-auto">
                        {searchData?.items?.map((item) => (
                            <li
                                key={item.id}
                                className="..."
                                onClick={() => handleSelectItem(item.id)}
                            >
                                {item.title}
                            </li>
                        ))}
                    </ul>
                )}

                {(isFetching) && (
                    <div className="absolute mt-2 text-sm text-gray-500">Searching...</div>
                )}
            </div>

            {/* Add list of selected items */}
            <div className="mt-6">
                <h2 className="font-semibold mb-2">Items Added</h2>
                {collectionItems?.items?.length === 0 ? (
                    <p className="text-gray-500">No items added yet.</p>
                ) : (
                    <div className="flex flex-wrap gap-4">
                        {
                            collectionItems?.items?.map((collection) => (
                                <CollectionItemCard key={collection.content_id} content={collection.content} handleDelete={handleDeleteItem} />
                            ))
                        }
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageItemsPage;
