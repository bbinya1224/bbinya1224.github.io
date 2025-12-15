"use client";

import Image from "next/image";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import SocialLinks from "@/widgets/sidebar/ui/profile/SocialLinks";

const Profile = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="card-base flex w-full flex-col items-center p-4 shadow-xl lg:w-2xs">
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
          src="/img/profile/profile-10-09-19-08-28.jpeg"
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
        <span className="text-2xl">삔아</span>
      </div>
      <div className="mx-auto my-2 h-1 w-5 rounded-full bg-amber-300 transition"></div>

      <p className="mb-4 text-center text-base">
        이것저것 글을 쓰려고 노력하는 <br />
        프론트엔드 개발자 입니다.
      </p>

      <SocialLinks />
    </div>
  );
};

export default Profile;
