# 공공 AX 로컬 시리즈 5 v0.1.0

## Windows에서 바로 실행

1. `GonggongAX-Series5-Resource-Extractor-0.1.0-win-x64.zip`을 받습니다.
2. `Source code (zip)`이 아닌 위 이름의 파일인지 확인합니다.
3. ZIP을 마우스 오른쪽 버튼으로 눌러 `모두 압축 풀기`를 선택합니다.
4. 압축을 푼 폴더의 `시리즈5_실행.cmd`를 더블클릭합니다.

Node.js 설치와 관리자 권한은 필요하지 않습니다. 현재 EXE는 코드 서명되지 않았으므로
SmartScreen 경고가 나오면 저장소 주소, 파일명, 아래 SHA-256을 먼저 확인하세요.

## SHA-256

```text
c364fdbb6c5e744a2306fa13e20aa8f05a26c44f4a447eb98ff340ff966518e3  GonggongAX-Series5-Resource-Extractor-0.1.0-win-x64.zip
5cb044277177b041e54e4c20c0eec5857224748015ad0a2b1f1d73b9d506a4f2  GonggongAX-Series5-Beginner-Comic.zip
```

각 ZIP 옆의 `.sha256` 파일에도 같은 값이 들어 있습니다.

## 주요 기능

- ZIP 패키지 문서 33종 지원
- 이미지, 영상, 오디오, 첨부, 글꼴, 서식, 스크립트·매크로, 문서 구조 분류
- 파일명·내부 경로·크기·사용 위치 확인
- 개별 `파일 저장`과 분류별 `전체 ZIP`
- 문서 데이터 브라우저 메모리 처리, 외부 업로드 API 없음
- 원본 파일 변경 없음, 매크로·실행 파일 실행 없음

## 지원 문서

- HWPX
- DOCX, DOCM, DOTX, DOTM
- PPTX, PPTM, POTX, POTM, PPSX, PPSM
- XLSX, XLSM, XLSB, XLTX, XLTM
- ODT, ODS, ODP, ODG, OTT, OTS, OTP, OTG
- VSDX, VSDM, VSSX, VSSM, VSTX, VSTM
- XPS, OXPS, EPUB

HWP·DOC·PPT·XLS 같은 구형 바이너리 문서, PDF, 일반 ZIP, 암호·DRM·손상 문서,
ZIP64·분할 ZIP은 지원하지 않습니다. 원본은 최대 100 MB이며 비정상적인 해제 용량과
내부 항목 수는 안전 한도에서 중단합니다.

상세 절차와 문제 해결은 `docs/BEGINNER_GUIDE.md`, 만화 5장은
`public/series5/comic/README.md`를 확인하세요.
