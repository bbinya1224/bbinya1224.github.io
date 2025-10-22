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
            사용자에게는 풍부하고 재미있는 경험을, 개발자들에게는 읽기 쉽고
            이해하기 좋은 코드를 제공하는 것을 중요하게 생각하고 있습니다.
          </p>
          <p>
            주로 React와 TypeScript를 사용하여 유지보수성과 확장성이 뛰어난 웹
            애플리케이션을 개발하기 위해 노력하고 있습니다. 컴포넌트 기반
            아키텍처를 활용하여 재사용 가능한 UI 요소를 설계하고 스토리북을
            이용하여 커뮤니케이션을 좀 더 효율적으로 만들고 있습니다.
          </p>
          <p>
            뿐만아니라, 인터랙티브한 UI 구현 및 성능 최적화 및 최신 프론트엔드
            기술 스택에 관심이 많으며, 협업과 소통을 통해 더 나은 결과물을
            만들어가기 위해 노력 하는중 입니다.
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
