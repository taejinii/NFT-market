"use client";
import NFTInfo from "./NFTInfo";
import NFTPrice from "./NFTPrice";
import NFTImage from "./NFTImage";
import CartButton from "../CartButton";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { OpenSeaCollectionListType } from "@/types/types";
export default function Card({
  identifier,
  contract,
  image_url,
  name,
  collection,
}: OpenSeaCollectionListType) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMouseHover, setIsMouseHover] = useState(false);

  const handleActiveCart = () => {
    setIsMouseHover(true);
  };
  const handleInactiveCart = () => {
    setIsMouseHover(false);
  };

  const handleRoute = (contract: string, identifier: string) => {
    if (invalidNFT) {
      alert("유효하지 않은 NFT 입니다.");
      return;
    }
    router.push(`/collection/${contract}/${identifier}`);
  };
  const invalidNFT =
    identifier?.length > 6 || !identifier || Number(identifier) === 0;
  return (
    <div
      onMouseOver={handleActiveCart}
      onMouseOut={handleInactiveCart}
      onClick={() => handleRoute(contract, identifier)}
      className={`relative z-10 flex flex-col drop-shadow-2xl w-full h-auto  max-h-96 gap-4 rounded-xl bg-[#18191E] ${
        invalidNFT ? "cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      <NFTImage image={image_url ?? "/images/error.png"} />
      <NFTInfo
        collection_name={collection}
        name={name}
        invalidNFT={invalidNFT}
        identifier={identifier}
      />
      <NFTPrice invalidNFT={invalidNFT} />
      {isMouseHover && (
        <CartButton
          collection={collection}
          identifier={identifier}
          name={name}
          image_url={image_url}
          contract={contract}
        />
      )}
    </div>
  );
}
