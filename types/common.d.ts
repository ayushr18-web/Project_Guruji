export interface IAddEditFormProps {
    isLoading: boolean;
    onSubmit: (data: IStoryItem) => void;
    initialData?: Partial<IStoryItem>;
    categories?: any;
}