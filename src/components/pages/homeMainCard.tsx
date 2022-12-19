import { HTMLAttributes } from "react";
import useSWR from "swr";
import { authFetcher } from "../../utils/fetcher";
import Link from "next/link";
import { Article, PagedApiResponse } from "../../types/api";

function HomeMainCard() {
  const { data, mutate } = useSWR<PagedApiResponse<Article>>(`/articles/2/1`, authFetcher);
  return (
    <Link href="/articles/1">
      <div className="flex flex-col w-full h-[60vh] sm:col-span-1 md:col-span-2 row-span-2 mx-2 mb-4 rounded-xl bg-cp-1">
        <div></div>
        <div className="w-full h-full p-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur euismod vitae arcu at
          elementum. Donec nec placerat orci. Donec ut pharetra justo, eget ultricies urna. Sed nec
          convallis eros. Mauris in molestie est. Nunc dolor tortor, ornare in semper quis, pharetra
          sed est. Maecenas elementum purus sed enim faucibus, eget sodales felis ultrices.
        </div>
      </div>
    </Link>
  );
}

export default HomeMainCard;
