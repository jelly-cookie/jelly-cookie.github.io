---
title: "전문적인 프론트엔드 코드 리뷰"
excerpt: "React/Vue 컴포넌트의 아키텍처와 성능을 분석합니다"
date: 2024-03-21
last_modified_at: 2024-03-21
category: "웹 개발"
subcategory: "프론트엔드"
difficulty: "중급"
tags: 
  - React
  - Vue
  - 성능최적화
  - 코드리뷰
  - 아키텍처
variables:
  - name: "프레임워크"
    desc: "사용한 프레임워크 (React/Vue/Svelte)"
    required: true
  - name: "상태관리도구"
    desc: "사용중인 상태관리 라이브러리 (Redux/Vuex/Pinia 등)"
    required: false
  - name: "타겟브라우저"
    desc: "지원해야 하는 브라우저 목록"
    required: false
---

### 프롬프트:
{프레임워크} 컴포넌트 구조에 대한 전문적인 리뷰를 요청드립니다.

분석 요청 사항:

1. 상태 관리 아키텍처
- {상태관리도구} 스토어 구조 평가
- 상태 정규화 수준 검토
- 비동기 액션 처리 패턴 분석

2. 성능 최적화
- 불필요한 리렌더링 발생 여부
- 메모이제이션 사용 적절성
- 코드 스플리팅 적용 상태
- 이미지/폰트 최적화 현황

3. 컴포넌트 설계
- 컴포넌트 책임 분리 적절성
- Props 인터페이스 설계
- 재사용성과 확장성 평가
- 커스텀 훅 활용도

4. 웹 표준/접근성
- ARIA 레이블 적용 상태
- 키보드 인터랙션 지원
- 시맨틱 마크업 사용
- 색상 대비율 준수

5. 크로스 브라우징
- {타겟브라우저} 호환성 이슈
- 폴리필 적용 현황
- CSS 벤더 프리픽스 관리

### 코드 첨부 가이드:
1. 핵심 컴포넌트 코드
2. 상태 관리 설정 파일
3. 성능 측정 결과 (있는 경우)
4. 패키지 의존성 목록

### 기대 산출물:
1. 주요 개선 필요 사항 (우선순위별)
2. 리팩토링 제안 코드 스니펫
3. 성능 최적화 체크리스트
4. 참고할만한 베스트 프랙티스 예시

💡 코드 리뷰는 비판이 아닌 개선을 위한 건설적인 제안에 초점을 맞춥니다. 