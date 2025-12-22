import Link from "next/link";
import { Project } from "@/entities/project/model/types";
import LinkedInIcon from "@/shared/icons/ic_linkedin.svg";
import MailIcon from "@/shared/icons/ic_mail.svg";
import TistoryIcon from "@/shared/icons/ic_tistory.svg";
import VelogIcon from "@/shared/icons/ic_velog.svg";
import Badge from "@/shared/ui/Badge";
import { ProjectList } from "@/widgets/project-list/ui/ProjectList";

interface AboutMePageProps {
  projects: Project[];
}

const AboutMePage = ({ projects }: AboutMePageProps) => {
  const myTechStacks = [
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "GSAP",
    "Storybook",
    "Jotai",
    "FSD",
    "Sentry",
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
    FSD: "bg-yellow-100 dark:bg-yellow-900",
    Sentry: "bg-red-100 dark:bg-red-900",
    Vue3: "bg-green-100 dark:bg-green-900",
  };

  return (
    <section className="relative mx-auto h-full w-full py-6 sm:py-4 sm:pr-2 sm:pl-7 lg:px-0">
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
                My Blog History
              </h3>
              <p className="transition-opacity hover:opacity-50">
                <Link
                  href="https://bbinya.tistory.com"
                  target="_blank"
                  className="relative inline-flex items-center gap-2"
                  aria-label="go to my tistory blog"
                >
                  <TistoryIcon className="size-6" />

                  <span className="font-bold text-[#333] dark:text-[#ededed]">
                    https://bbinya.tistory.com/
                  </span>
                </Link>
              </p>
              <p className="transition-opacity hover:opacity-50">
                <Link
                  href="https://velog.io/@subin1224/posts"
                  target="_blank"
                  className="relative inline-flex items-center gap-2"
                  aria-label="go to my Velog"
                >
                  <VelogIcon className="size-6" />

                  <span className="font-bold text-[#333] dark:text-[#ededed]">
                    https://velog.io/@subin1224
                  </span>
                </Link>
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
              <p className="transition-opacity hover:opacity-50">
                <Link
                  href="https://www.linkedin.com/in/bbinya"
                  target="_blank"
                  className="relative inline-flex items-center gap-2"
                  aria-label="go to my LinkedIn"
                >
                  <LinkedInIcon className="size-5" />

                  <span className="font-bold text-[#333] dark:text-[#ededed]">
                    Linked In
                  </span>
                </Link>
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
            프론트엔드 개발은 화면을 그리는 일을 넘어, 팀과 서비스의 흐름을
            연결하는 역할이라고 생각합니다.
          </p>
          <p>
            저는 혼자 빠르게 구현하는 개발자보다, 팀 전체의 생산성과 결과를
            끌어올리는 개발자가 되기 위해 고민해 왔습니다.
          </p>
          <p>
            단순한 기능 구현이 아니라 “왜 이 구조가 필요한지”를 설명하고
            합의하는 과정 자체를 중요하게 여깁니다. 앞으로도 저는 코드의 품질뿐
            아니라, 협업 방식과 개발 문화까지 함께 개선하는 프론트엔드 개발자로
            성장하고자 합니다.
          </p>

          <p className="text-gray-400">
            저에 대해 자세하게 알고싶으시다면 이메일 주세요!
          </p>
        </div>
      </article>

      <article className="relative mb-4 border-b border-gray-200 pb-5 dark:border-slate-700">
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

      <article className="border-b border-gray-200 pb-5 lg:border-b-0 lg:pb-0 dark:border-slate-700">
        <h1 className="relative ml-[5px] text-3xl font-bold before:absolute before:top-[5px] before:left-[-10px] before:h-7 before:w-1 before:rounded-md before:bg-amber-300">
          Side Projects
        </h1>

        <div className="mt-4">
          <ProjectList projects={projects} />
        </div>
      </article>
    </section>
  );
};

export default AboutMePage;
