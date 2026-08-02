# 실제 사용 예제

업무 문서와 개인정보가 없는 공개 샘플입니다.

## PPTX 예제

파일: [`series5-comic-example.pptx`](series5-comic-example.pptx)

저장소의 만화 5장을 슬라이드 1~5에 한 장씩 넣었습니다. 실제 분석 결과는
이미지 5개, 테마·서식 7개, 문서 구조 30개로 총 42개입니다.

이 PPTX는 저장소에 포함된 Walnut Exporter 산출물입니다. 동일 파일을 다시 만드는
생성 스크립트는 제공하지 않으며, 아래 SHA-256으로 다운로드 파일을 확인합니다.

1. 문서 리소스 추출기를 실행합니다.
2. `파일 선택`에서 PPTX 예제를 고릅니다.
3. `이미지`의 숫자 `5`와 각 카드의 `슬라이드 N` 사용 위치를 확인합니다.
4. 오른쪽에서 만화 이미지를 미리보고 `파일 저장`을 확인합니다.
5. `테마·서식`에서 XML·RELS 분류를 확인합니다.

SHA-256:

```text
0839C5D5A0BA7D7EF6C87A95DAD18DBCCEED86A8685BECAF4178F152C8A0AA04
```

## EPUB 예제

파일: [`series5-resource-example.epub`](series5-resource-example.epub)

PNG·SVG 이미지, WAV 오디오, TXT 첨부 파일, CSS 서식, 분류 확인용 비실행
JavaScript와 EPUB 구조 파일이 들어 있습니다. JavaScript에는 동작 코드가 없으며,
추출기가 실행하지 않고 `스크립트·매크로`로 분류하는 동작을 확인하기 위한 주석만
포함합니다.

SHA-256:

```text
843ABB531C1160F588E869535414F20D8C04D3F001B650F24B4C293904C5BA5E
```

다시 만들기:

```powershell
npm run example:epub
```
