---
title: "AWS 아키텍처 설계 검토"
excerpt: "클라우드 인프라 보안과 확장성 평가"
date: 2024-03-21
last_modified_at: 2024-03-21
category: "DevOps"
subcategory: "AWS"
difficulty: "고급"
tags: 
  - EC2
  - S3
  - Lambda
  - CloudFormation
  - 보안
variables:
  - name: "서비스유형"
    desc: "아키텍처 유형 (서버리스/컨테이너/하이브리드)"
    required: true
  - name: "규모"
    desc: "예상 트래픽/사용자 규모"
    required: false
  - name: "예산"
    desc: "월간 예상 비용 범위"
    required: false
---

### 프롬프트:
{서비스유형} 기반 AWS 아키텍처를 검토해주세요.

분석 요청 사항:

1. 인프라 구성
- VPC 설계 검토
- 서브넷 구성
- 가용성 영역 활용
- 네트워크 토폴로지

2. 보안 설정
- IAM 정책 검토
- 보안 그룹 구성
- 암호화 적용 상태
- 접근 제어 전략

3. 확장성/가용성
- 오토스케일링 설정
- 로드밸런싱 구성
- 장애 복구 전략
- 백업 정책

4. 비용 최적화
- 리소스 사이징
- 예약 인스턴스 활용
- 스팟 인스턴스 검토
- 비용 모니터링

5. 운영 관리
- 모니터링 체계
- 로깅 전략
- 알림 설정
- 배포 자동화

### 설계 문서 가이드:
1. 아키텍처 다이어그램
2. 인프라 코드 (IaC)
3. 보안 정책 문서
4. 운영 가이드

### 기대 산출물:
1. 아키텍처 개선안
2. 보안 강화 방안
3. 비용 최적화 전략
4. 운영 효율화 제안

💡 AWS 아키텍처는 보안, 확장성, 비용을 균형있게 고려해야 합니다. 