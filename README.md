# Node basic setup boilerplate

## Goals

- [John Ahn 선생님의 Node.js 기초 강의](https://www.youtube.com/playlist?list=PL9a7QRYt5fqkZC9jc7jntD1WuAogjo_9T)를
  따라가면서 간단한 서버 구현을 할 때 결정 및 실행해야 하는 **일**들에 대해 알아보고자 하였습니다.

## Installation

Devcontainer를 활용했습니다. IDE의 devcontainer 지원을 사용해서 간편하게 열어보셔도 되고,
`.devcontainer/docker-compose.yml`을 참고하셔서 직접 로컬 환경을 세팅하는 것도 가능하도록 설계하였습니다.

### Installation - Devcontainers

데이터베이스 비밀번호 등 기밀 정보를 설정하기 위해 `secrets.example` 디렉터리 내용을 참고하여
`secrets` 디렉터리에 필요한 정보들을 설정해주시면 됩니다.

`secrets.example`을 템플릿으로 사용하시고자 하시는 경우 다음 명령어를 참고해주시면 감사합니다.
```sh
cp secrets.example/* secrets/
```

## Design Choices

- Devcontainers
    - 이전에 `.env`와 `dotenv`를 통해 애플리케이션 설정 문제를 해결한 적이 있습니다.
      그러나 비밀과 관련된 정보도 `.env` 파일에 저장한다는 점이 아쉬웠습니다.
      그래서 이번에는 컨테이너 기반 환경으로 개발, 스테이징, 운영 환경을 경험해보고자
      devcontainer를 배워 세팅해보았습니다.
      docker의 문서를 활용해서 컨테이너에 환경 변수와 비밀을 주입하였고
      현재로서는 만족스럽습니다.
    - 장점
        - 개발 환경 세팅의 용이성 (오류가 없는 경우)
        - 개발 환경의 문서화 효과
    - 단점
        - 개발 환경 세팅의 불필요한 시간 소모 (오류가 있는 경우)

- Singleton objects
    - 개인적으로 이보다 객체를 만들어 의존성 주입을 하는 것을 선호합니다.
      하지만 DI Framework가 없는 상황에서 강의를 따라가야 한다는 제약 조건을 고려했을 때
      db connection 의존성 주입과 관련된 보일러플레이트로 얼마만큼의 시간이 소모될지 예측이 어려운 상황이었습니다.
      그래서 절충안으로 singleton을 만들되 singleton에 의존하는 부분들을 최소화하는 방향으로 설계 방향을 잡았습니다.

- Express의 라우터의 route nesting 기능 사용하지 않고 모든 라우터를 root route에 mount한 이유
    - Controller를 위한 Integration test를 진행하는 상황에서 각 endpoint의 route에 대한 정보를 구해야 했습니다.
      이를 위해 `#src/config/routes.js`를 진리의 원천으로 두고 다른 route 관련 코드가 모두 여기에 의존하도록
      설계하였습니다.

- 강의의 흐름을 따라가기 위해서 JWT를 사용하였으나 현재 데이터베이스에 세션 정보를 저장하는 구조에서는
  JWT를 사용할 필요 없이 랜덤 바이트 문자열 등 토큰으로서의 기능을 하기만 해도 상관없다고 판단됩니다.
    - 서버의 세션 저장소로 별도의 인메모리 데이터베이스를 두는 것도 고려해볼 것 같습니다.
