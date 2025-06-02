# Modern Blog

Next.js 15와 TypeScript로 구축된 현대적인 블로그 플랫폼입니다.

## 주요 기능

- 🌓 다크/라이트 모드 지원
- 📱 완전 반응형 디자인
- 🔍 실시간 검색 기능
- 🏷️ 카테고리 및 태그 시스템
- 💻 코드 하이라이팅
- 📝 마크다운 지원
- 🖼️ 이미지 및 비디오 지원
- ⚡ 최적화된 성능

## 기술 스택

- **프레임워크**: Next.js 15
- **언어**: TypeScript
- **스타일링**: Tailwind CSS
- **UI 컴포넌트**: shadcn/ui
- **테마**: next-themes
- **아이콘**: Lucide React
- **코드 하이라이팅**: react-syntax-highlighter

## 시작하기

### 설치

\`\`\`bash
npm install
# 또는
yarn install
# 또는
pnpm install
\`\`\`

### 개발 서버 실행

\`\`\`bash
npm run dev
# 또는
yarn dev
# 또는
pnpm dev
\`\`\`

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 결과를 확인하세요.

### 빌드

\`\`\`bash
npm run build
npm run start
\`\`\`

## 프로젝트 구조

\`\`\`
├── app/                    # Next.js App Router
│   ├── blog/              # 블로그 페이지
│   ├── resume/            # 이력서 페이지
│   ├── globals.css        # 전역 스타일
│   ├── layout.tsx         # 루트 레이아웃
│   └── page.tsx           # 홈 페이지
├── components/            # 재사용 가능한 컴포넌트
│   ├── ui/               # shadcn/ui 컴포넌트
│   ├── header.tsx        # 헤더 컴포넌트
│   ├── theme-toggle.tsx  # 테마 토글
│   └── ...
├── styles/               # CSS 모듈
│   ├── components.css    # 컴포넌트 스타일
│   ├── blog.css         # 블로그 스타일
│   └── layout.css       # 레이아웃 스타일
├── lib/                 # 유틸리티 함수
└── public/              # 정적 파일
\`\`\`

## 커스터마이징

### 테마 색상 변경

`app/globals.css`에서 CSS 변수를 수정하여 테마 색상을 변경할 수 있습니다.

### 새 블로그 포스트 추가

`app/blog/[slug]/page.tsx`의 `blogPosts` 객체에 새 포스트를 추가하세요.

## 배포

### Vercel (권장)

1. GitHub에 프로젝트를 푸시
2. [Vercel](https://vercel.com)에서 프로젝트 import
3. 자동 배포 완료

### 기타 플랫폼

\`\`\`bash
npm run build
\`\`\`

빌드된 파일을 원하는 호스팅 플랫폼에 배포하세요.

## 라이선스

MIT License
