"use client"

import ContentManagement from "@/app/admin/components/ContentManagement"
import { useChapters } from "../../../../../../hooks/useBook"
import { Loader } from "lucide-react";
import { useParams } from "next/navigation";

const Content = () => {

    // get book id from params
    const params = useParams();
    const bookId = params.id as string;
    if(!bookId) {
        return <Loader className="animate-spin" />
    }

    const { data, isFetching } = useChapters(bookId); 

    return (
      <>
        <ContentManagement chapters={data} bookId={bookId} />
      </>
    )
}

export default Content;