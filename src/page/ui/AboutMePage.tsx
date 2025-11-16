import MailIcon from "@/shared/icons/ic_mail.svg";
import TistoryIcon from "@/shared/icons/ic_tistory.svg";
import VelogIcon from "@/shared/icons/ic_velog.svg";
import Badge from "@/shared/ui/Badge";

const AboutMePage = () => {
  const myTechStacks = [
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "GSAP",
    "Storybook",
    "Jotai",
    "Vue3",
  ];

  const badgeColors = {
    React: "bg-blue-100 dark:bg-blue-900",
    "Next.js": "bg-gray-100 dark:bg-gray-800",
    TypeScript: "bg-blue-100 dark:bg-blue-900",
    "Tailwind CSS": "bg-cyan-100 dark:bg-cyan-900",
    GSAP: "bg-purple-100 dark:bg-purple-900",
    Storybook: "bg-pink-100 dark:bg-pink-900",
    Jotai: "bg-orange-100 dark:bg-orange-900",
    Vue3: "bg-green-100 dark:bg-green-900",
  };

  return (
    <section className="card-base relative mx-auto h-full w-full px-6 py-6 shadow-xl sm:py-4 sm:pr-2 sm:pl-7">
      <article className="mb-4 flex flex-row-reverse items-center justify-between gap-4 border-b border-gray-200 pb-5 dark:border-slate-700">
        <div className="flex size-full flex-col gap-4">
          <h1 className="relative ml-[5px] text-3xl font-bold before:absolute before:top-[5px] before:left-[-10px] before:h-7 before:w-1 before:rounded-md before:bg-amber-300">
            We Have Today!
          </h1>
          <div className="flex flex-row flex-wrap items-center gap-x-4 gap-y-2">
            <Badge className="bg-amber-200 dark:bg-amber-700">
              높은 수용성
            </Badge>
            <Badge className="bg-blue-300 dark:bg-blue-700">
              투철한 책임감
            </Badge>
            <Badge className="bg-red-300 dark:bg-red-700">강한 인정 욕심</Badge>
            <Badge className="bg-green-300 dark:bg-green-700">
              능숙한 커뮤니케이션
            </Badge>
          </div>
          <div className="flex flex-row flex-wrap justify-between gap-4">
            <div className="flex flex-1 flex-col flex-wrap gap-1">
              <h3 className="text-primary text-2xl font-bold dark:text-gray-300">
                My Blog
              </h3>
              <p className="transition-opacity hover:opacity-50">
                <a
                  href="https://bbinya.tistory.com"
                  className="relative inline-flex items-center gap-2"
                  aria-label="go to my tistory blog"
                >
                  <TistoryIcon className="size-6" />

                  <span className="font-bold text-[#333] dark:text-[#ededed]">
                    https://bbinya.tistory.com/
                  </span>
                </a>
              </p>
              <p className="transition-opacity hover:opacity-50">
                <a
                  href="https://velog.io/@subin1224/posts"
                  className="relative inline-flex items-center gap-2"
                  aria-label="go to my Velog"
                >
                  <VelogIcon className="size-6" />

                  <span className="font-bold text-[#333] dark:text-[#ededed]">
                    https://velog.io/@subin1224
                  </span>
                </a>
              </p>
            </div>
            <div className="flex flex-1 flex-col gap-1">
              <h3 className="text-primary text-2xl font-bold dark:text-gray-300">
                Contact
              </h3>
              <p className="transition-opacity hover:opacity-50">
                <a
                  href="mailto:bbinya1224@gmail.com"
                  className="relative inline-flex items-center gap-2"
                  aria-label="Send email to bbinya1224@gmail.com"
                >
                  <MailIcon className="size-5" />

                  <span className="font-bold text-[#333] dark:text-[#ededed]">
                    bbinya1224@gmail.com
                  </span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </article>
      <article className="relative mb-4 border-b border-gray-200 pb-5 dark:border-slate-700">
        <h1 className="relative mb-1 ml-[5px] text-3xl font-bold before:absolute before:top-[5px] before:left-[-10px] before:h-7 before:w-1 before:rounded-md before:bg-amber-300">
          About Me
        </h1>
        <div className="prose dark:prose-invert mt-2 max-w-full text-base break-keep">
          <p>
            안녕하세요! 사용자 경험의 디테일에서 가치를 찾는 3년차 프론트엔드
            개발자 이수빈입니다.
          </p>
          <p>
            사용자에게 즐거움과 편리함을 주는 인터페이스를 만드는 것이 저의
            목표입니다.
          </p>
          <p></p>Vue와 React, Next.js를 중심으로 프론트엔드 개발을 해왔으며
          디자이너, 백엔드, 동료 개발자들과의 협업을 통해 제품을 발전시키는
          과정에서 큰 보람을 느낍니다.
          <p>
            최근에는 AI 기술과 웹을 결합한 새로운 사용자 경험에 도전하며, 꾸준히
            배우고 실험하는 프론트엔드 개발자로 성장하고 있습니다.
          </p>
          <p>어제보다 더 나은 오늘을 위해 꾸준히 성장하고 있어요. 🌱</p>
          <p className="text-gray-400">
            저에 대해 자세하게 알고싶으시다면 이메일 주세요!
          </p>
        </div>
      </article>
      <article>
        <h1 className="relative ml-[5px] text-3xl font-bold before:absolute before:top-[5px] before:left-[-10px] before:h-7 before:w-1 before:rounded-md before:bg-amber-300">
          Tech Stacks
        </h1>
        <span className="text-gray-400">
          제가 주로 사용했던 기술 스택들 입니다.
        </span>
        <div className="mt-2">
          <ul className="flex flex-wrap gap-2 sm:gap-3 md:gap-3">
            {myTechStacks.map((skill) => (
              <li key={skill} className="cursor-default">
                <Badge
                  className={
                    badgeColors[skill as keyof typeof badgeColors] ||
                    "bg-blue-100 dark:bg-blue-900"
                  }
                >
                  {skill}
                </Badge>
              </li>
            ))}
          </ul>
        </div>
      </article>
    </section>
  );
};

export default AboutMePage;
