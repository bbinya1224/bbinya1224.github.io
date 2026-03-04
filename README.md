# We have Today!

> https://bbinya1224.github.io/

깃허브로 블로그를 드디어 만들었습니다.

UI에 있어서 엄청난 수정이 있었어요.  
심플함을 더 추구하고, 가독성을 가장 먼저 생각하고 있습니다.  
모바일에서도 술술 읽히는 경험을 만들기 위해 계속 다듬어 가는 중입니다.

[티스토리](https://bbinya.tistory.com/)에서  
[벨로그](https://velog.io/@subin1224/posts)를 거쳐,  
지금은 이 공간에서 오래 글을 쌓아가려 합니다.

## Blog Philosophy

이 블로그의 핵심은 "기술을 잘 쓰는 글"보다 "잘 읽히는 글"입니다.

- 어려운 주제도 문장과 예시를 통해 부담 없이 읽히게 만들기
- 디자인은 화려함보다 집중을 돕는 방향으로 유지하기
- 포스트 하나가 검색, 공유, 아카이빙까지 자연스럽게 이어지게 만들기

## Architecture Direction (Lightweight)

이 프로젝트는 Astro 기반의 라이트 아키텍처를 사용합니다.  
FSD 전체 레이어를 강하게 도입하기보다, 콘텐츠 중심 블로그에 맞는 최소 구조를 유지합니다.

### Why This Way

- 블로그의 본질은 "포스트 전달력"이기 때문
- 구조 복잡도보다 작성/수정 속도와 유지보수 가독성이 더 중요하기 때문
- Astro의 강점(정적 HTML, 빠른 초기 로딩, SEO 친화성)을 최대한 살리기 위해서

### Folder Guide

```text
src/
  pages/        # 라우트와 페이지 조립 (가능한 얇게 유지)
  layouts/      # 공통 레이아웃
  components/   # 정적/표현 중심 UI(.astro 우선)
  islands/      # 상호작용이 필요한 UI(React, client:* 대상)
  content/      # 포스트/문서 콘텐츠
  lib/          # 순수 유틸, 데이터 가공, SEO 보조 로직
public/         # 정적 에셋(이미지, robots, favicon 등)
```

### Working Rules

- 페이지에서 복잡한 상태 로직이 필요해지면 `islands`로 분리
- 인터랙션이 없다면 `.astro` 컴포넌트 우선
- 공통 문자열/메타/유틸은 `lib`로 모아 중복 방지
- "읽기 경험"을 해치는 과도한 JS는 피하고, 필요한 만큼만 하이드레이션

## SEO and Content Delivery

기본적으로 아래 항목을 꾸준히 점검합니다.

- `sitemap.xml`, `robots.txt`, `rss.xml` 정상 노출
- 페이지별 title/description/canonical/OG 메타 정합성
- 본문 타이포와 코드블록 가독성
- 모바일에서의 문단 간격, 줄 길이, 터치 탐색성

## Local Development

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

## Closing

이 저장소는 단순한 템플릿이 아니라,  
프론트엔드 개발자로서 "기술을 어떻게 전달할지"를 계속 실험하는 기록입니다.

좋은 글, 오래 남는 글을 목표로 천천히 단단하게 운영해보겠습니다.
