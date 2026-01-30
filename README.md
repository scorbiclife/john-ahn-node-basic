# Node basic setup boilerplate


## Installation

Devcontainer를 활용했습니다. IDE의 devcontainer 지원을 사용해서 간편하게 열어보셔도 되고,
`.devcontainer/docker-compose.yml`을 참고하셔서 직접 로컬 환경을 세팅하는 것도 가능하도록 설계하였습니다.

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
