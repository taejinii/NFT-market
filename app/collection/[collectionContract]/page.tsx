import {
  getCollectionDetail,
  getCollectionNFTs,
  getCollectionInfo,
} from "@/api/CollectionAPI";
import { Suspense } from "react";
import CollectionDetail from "@/components/page/Collection/CollectionDetail/CollectionDetail";
import CollectionInfo from "@/components/page/Collection/CollectionDetail/CollectionInfo";
import CollectionList from "@/components/page/Collection/CollectionDetail/CollectionList";
import CollectionListLoading from "@/components/ui/Skeleton/CollectionListLoading";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { collectionContract: string };
}): Promise<Metadata> {
  const { collectionContract } = params;
  const info = await getCollectionInfo(collectionContract);
  return {
    title: `${info.name} | QWERO`,
    description: info.description,
    openGraph: {
      images: { url: info.logo, alt: info.name },
      title: info.name,
      description: info.description,
      url: `/collection/${collectionContract}`,
    },
  };
}

export default async function CollectionDetailPage({
  params,
}: {
  params: { collectionContract: string };
}) {
  const { collectionContract } = params;

  const [detail, info] = await Promise.all([
    getCollectionDetail(collectionContract),
    getCollectionInfo(collectionContract),
  ]);

  const nftListData = getCollectionNFTs(collectionContract, 20);
  return (
    <>
      <header className="flex flex-col items-start gap-10 py-10 mt-10 font-bold">
        <CollectionInfo info={info} />
        <CollectionDetail detail={detail} />
      </header>
      <Suspense fallback={<CollectionListLoading />}>
        <CollectionList promise={nftListData} />
      </Suspense>
    </>
  );
}
