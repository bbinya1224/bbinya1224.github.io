"use client";

import Image from "next/image";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import SocialLinks from "@/widgets/sidebar/ui/profile/SocialLinks";

const Profile = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="flex w-full flex-col items-center">
      <div className="relative aspect-square h-auto w-3xs overflow-hidden rounded-3xl lg:w-full">
        {!isLoaded && (
          <Skeleton
            className="absolute inset-0"
            borderRadius="1rem"
            height="100%"
            width="100%"
          />
        )}
        <Image
          src="/img/main/img_profile.png"
          alt="profile Image"
          fill
          className={`object-cover transition-opacity duration-500 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          priority
          onLoad={() => setIsLoaded(true)}
        />
      </div>
      <div className="mt-3">
        <span className="text-2xl">삔야</span>
      </div>
      <div className="mx-auto my-2 h-1 w-5 rounded-full bg-amber-300 transition"></div>

      <p className="mb-4 text-center text-base">
        코드와 커뮤니케이션을 함께 설계하려고 노력하는 4년차 프론트엔드 개발자
        삔야 입니다.
        <br />
        이것저것 글을 쓰는걸 좋아해요.
      </p>

      <SocialLinks />
    </div>
  );
};

export default Profile;
