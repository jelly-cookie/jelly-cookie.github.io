# AI Promport

AI 프롬프트 공유 및 검색 플랫폼입니다. 다양한 AI 모델을 위한 프롬프트를 한곳에서 찾고 공유할 수 있습니다.

## 기능

- 카테고리별 프롬프트 분류
- 변수가 포함된 프롬프트 템플릿
- 원클릭 프롬프트 복사
- 모바일 반응형 디자인

## 개발 환경 설정

### 필수 요구사항

- Ruby 2.7.0 이상
- Bundler 2.0.0 이상
- Node.js 14.0.0 이상

### 로컬 개발 환경 구성

1. 저장소 클론:
```bash
git clone https://github.com/USERNAME/AI-Promport.git
cd AI-Promport
```

2. 의존성 설치:
```bash
bundle install
npm install
```

3. 로컬 서버 실행:
```bash
bundle exec jekyll serve
```

4. 브라우저에서 확인:
```
http://localhost:4000/AI-Promport/
```

## GitHub Pages 배포

이 프로젝트는 GitHub Actions를 사용하여 자동으로 GitHub Pages에 배포됩니다.

### 배포 설정 방법

1. GitHub 저장소로 이동하여 "Settings" 탭 클릭
2. 왼쪽 사이드바에서 "Pages" 섹션 클릭
3. "Source" 섹션에서 "GitHub Actions"를 선택
4. 이 후 main 브랜치에 변경사항을 푸시하면 자동으로 배포가 이루어집니다.

### 수동 배포

GitHub 저장소의 "Actions" 탭에서 "Deploy to GitHub Pages" 워크플로우를 수동으로 실행할 수 있습니다.

## 프로젝트 커스터마이징

### _config.yml 설정

`_config.yml` 파일에서 다음 항목을 수정하세요:

```yaml
url: "https://사용자명.github.io"
baseurl: "/저장소-이름"
repository: "사용자명/저장소-이름"
```

### 카테고리 수정

`_data/categories.yml` 파일에서 카테고리와 서브카테고리를 수정할 수 있습니다.

## 라이선스

이 프로젝트는 MIT 라이선스에 따라 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참고하세요.
