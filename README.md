# todo-frontend

React + TypeScript + Vite로 만든 할 일 관리 앱 프론트엔드입니다. Tauri로 감싸서 Windows 데스크톱 앱과 모바일(Android/iOS) 앱도 빌드할 수 있습니다.

## 필요한 것

- [Node.js](https://nodejs.org/) 22.12 이상 (또는 24.x) — `@rolldown/plugin-babel` 이 요구합니다 (`node -v` 로 확인)
- npm (Node.js 설치 시 함께 설치됨)
- 백엔드 API 서버 (로그인/회원가입 등 인증 기능을 쓰려면 필요, 기본값 `http://localhost:3000`)
- (선택) Windows 데스크톱 앱을 실행/빌드하려면 [Rust](https://www.rust-lang.org/tools/install) 툴체인
- (선택) 모바일 앱을 실행/빌드하려면 Android Studio(Android) 또는 Xcode(iOS, macOS 전용)

## 1. 설치

```bash
git clone <이 저장소 URL>
cd todo-frontend
npm install
```

## 2. 환경 변수 설정

`.env.example` 을 복사해 `.env` 파일을 만들고, 백엔드 API 주소를 지정합니다.

```bash
cp .env.example .env
```

```env
VITE_API_URL=http://localhost:3000
```

백엔드 서버 주소가 다르면 이 값을 바꿔주세요. (백엔드 없이 화면 구조만 보고 싶다면 이 단계는 건너뛰어도 되지만, 로그인/회원가입은 실패합니다.)

## 3. 개발 서버 실행 (웹)

```bash
npm run dev
```

터미널에 뜨는 주소(기본 `http://localhost:5173`)를 브라우저로 열면 됩니다.

## 4. 그 외 명령어

```bash
npm run lint      # ESLint 검사
npm run build     # 타입체크 + 프로덕션 빌드 (dist/ 생성)
npm run preview   # 빌드 결과물 로컬 미리보기
```

## 5. 데스크톱 앱으로 실행 (Tauri / Windows)

Rust 툴체인이 설치되어 있어야 합니다.

```bash
npm run tauri:dev     # 개발 모드로 데스크톱 창 띄우기
npm run tauri:build   # Windows 설치 파일(.msi 등) 빌드
```

## 6. 모바일 앱으로 실행 (Tauri / Android, iOS)

최초 1회, 각 플랫폼 프로젝트를 생성해야 합니다.

```bash
npx tauri android init   # Android Studio/SDK 필요
npx tauri ios init        # Xcode 필요, macOS 전용
```

이후 실행/빌드:

```bash
npx tauri android dev     # 에뮬레이터/실기기에서 실행
npx tauri android build   # APK/AAB 빌드

npx tauri ios dev
npx tauri ios build
```

## 문제 해결

- **로그인/회원가입이 안 돼요**: `.env` 의 `VITE_API_URL` 이 실제로 떠 있는 백엔드 서버를 가리키는지 확인하세요.
- **`npm run build` 에서 타입 에러가 나요**: 저장소에 알려진 사소한 TypeScript 버전 관련 이슈가 있습니다. `npm run dev` 나 `npx vite build` (타입체크 생략)로 우회할 수 있습니다.
- **`npm i` 가 `EBADENGINE` 경고와 함께 `ENOTEMPTY: directory not empty, rename ...node_modules/acorn ...` 에러로 실패해요**: Node 버전이 낮거나(22.12 미만) 이전 설치가 중간에 중단되어 `node_modules` 가 꼬인 상태입니다. 아래처럼 완전히 지우고 다시 설치하세요.

  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```

  그래도 같은 에러가 나면 Node 버전을 22.12 이상으로 올린 뒤 다시 시도하세요(예: `nvm install 22 && nvm use 22`).
