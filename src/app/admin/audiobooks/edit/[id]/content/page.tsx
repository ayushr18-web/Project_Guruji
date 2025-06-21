"use client"

import { Loader } from "lucide-react";
import { useParams } from "next/navigation";
import { useChapters } from "../../../../../../../hooks/useBook";
import ChaptersContent from "../../../components/ChaptersContent";

const Content = () => {

    // get book id from params
    const params = useParams();
    const id = params.id as string;
    if(!id) {
        return <Loader className="animate-spin" />
    }

    const { data, isFetching } = useChapters(id); 

    return (
      <>
        <ChaptersContent chapters={data} id={id} />
      </>
    )
}

export default Content;