**등산 커뮤니티 - 무야호**(powerd by ![Django](https://img.shields.io/badge/django-%23092E20.svg?style=for-the-badge&logo=django&logoColor=white))
=============


![muyaho_logo](https://user-images.githubusercontent.com/96563192/160894923-adefb59a-cbcf-4be1-a261-1f7291855499.png)


## 소개 🦻
- 등산을 좋아하신분, 등산을 즐기고 싶은 분들은 무야호 앱을 통해 산을 추천받습니다. 
- 자신의 등산 일지를 생성하고 다른 사람들이랑 공유할 수 있습니다.

## 홈페이지 & 시연 👀
- [무야호 서비스 보기](https://beloved-coder.shop/)
- [무야호 시연영상 보기](https://youtu.be/yeTPDyd0Q14)

## 개발 기간 🗓
- 2022년 3월 8일 ~ 2022년 3월 31일 (개발)
- 2022년 3월 31일 ~ 2022년 4월 12일(피드백 수용 후 개발)
 
## Contributors 👫
- **Front-end**
  - [최중재](https://github.com/joong8812): 로그인/회원가입, 메인, 전체산/상세산, 마이페이지, 헤더/푸터, 배포, 팀장
  - [이호진](https://github.com/hojin9car): 전체글/상세글, 글쓰기, 고객센터(공지사항, 리뷰), 시연영상
- **Back-end**
  - [이용헌](https://github.com/yongheon-Lee): 로그인/회원가입, 포스팅, 마이페이지, 배포
  - [유민호](https://github.com/YuMinho915): 주변산/계절별 산 추천, 메인, 전체산/상세산, 공지사항/리뷰, 시연영상
- **A.I**
  - [김미지](https://github.com/KIMMIJIDLQSLEK): 산 기반 추천, 사용자 기반 추천, AI서버 통신, PPT작성
  
## 무야호만의 특징 👍
- 친숙한 ux/ui : 등산커뮤니티의 장점을 살려 만든 사용하기 편리한 사이트. 데스크탑/모바일 둘다 호환가능!

- 유저의 궁금증 해소 : 위치, 높이, 산정보뿐만 아니라 주변 맛집, 등산로까지!

- 강력한 소통 : 초보자도, 고인물도 자신을 표현하여 다양한 산 정보와 색다른 정보도 함께 공유 가능!


## 기능 ⭐️
- 로그인, 회원가입 기능
- 추천서비스
: 관심있어하는 산을 기반으로 산, 키워드 추천!
: 유저 포스팅 추천!
: 사용자 위치기반 주변 산 추천!
: 계절별 산 추천!
- 유저 포스팅 기능 : 댓글, 좋아요, 별점, 신고까지 유저끼리 소통 가능! 
- 산 주변 맛집 : 네이버 지도 기반 맛집 검색
- 산 등산로 정보 : 가고 싶은 산의 여러 코스를 확인해보자
- 마이페이지 : 나의 정보, 업로드한 사진, 좋아요한 포스팅 확인하기
- 공지사항, 리뷰 : 사용자들과 개발자의 소통!
- 마이페이지 : 나의 정보, 업로드한 사진, 좋아요한 포스팅 확인하기


## 패치 노트 🗒
### 2022-04-12
- 전체 글 보기를 무한스크롤 방식으로 변경하였습니다.

### 2022-04-11
- 인공지능의 성능이 강화되었습니다.
- 전체적인 ui/ux 성능을 개선하였습니다.
- 로그인시 이메일아이디를 기억할 수 있는 기능이 추가되었습니다. 
- 비회원도 참여할 수 있는 체험 기능을 추가했습니다.
- 로고 클릭시 메인 페이지로 넘어갈 수 있습니다.
- 전체 산을 지역별로 구분하였습니다. 
- 로그인 조건을 강화시켰습니다.
- 등산로 표시를 개선시켰습니다.
- 커뮤니티 기능을 강화시켰습니다.(작성자 페이지 열람, 해당 산 관련 포스팅 보여주기)
- 보안 기능을 강화하였습니다. 

## Tools 🛠

![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white) 
: **와이어 프레임, 데이터베이스 설계**

![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
: **S3, RDS, Elastic Beanstalk**

![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
: **버젼관리**

![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
: **데이터베이스**

![Notion](https://img.shields.io/badge/Notion-%23000000.svg?style=for-the-badge&logo=notion&logoColor=white)
: **api설계, 아이디어 기획, 일정 공유**


## 아키텍쳐 🔍
<img width="651" alt="architecture" src="https://user-images.githubusercontent.com/18342765/162980457-69ba6a41-5b13-4d0e-9fc7-c65b162eda47.png">


## 와이어프레임 🏢
<img width="883" alt="wireframe_and_design" src="https://user-images.githubusercontent.com/18342765/162860365-b65d1c0d-fe32-439a-983f-d705e9f3435c.png">

## DB 구성 (ERD) 🪜
<img width="1123" alt="erd" src="https://user-images.githubusercontent.com/18342765/162860649-10073e61-7ce8-4a80-a29d-66c2cba91634.png">

## API 설계 🔖
<img width="1491" alt="api1" src="https://user-images.githubusercontent.com/18342765/162860739-d892e3fe-3680-4dcd-a246-916a657c9f7d.png">
<img width="1493" alt="api2" src="https://user-images.githubusercontent.com/18342765/162860800-99c588fc-23cc-453a-b7c1-fce80ad16486.png">
<img width="1486" alt="admin_api" src="https://user-images.githubusercontent.com/18342765/162860852-9d845cf6-7b9c-4ecc-8de8-febea40868c3.png">

## AI 서버 저장소 🚌
### [mooyaho-ai](https://github.com/KIMMIJIDLQSLEK/mooyaho-ai)

## 위키 📚
### [Local DB 구성 가이드](https://github.com/joong8812/mooyaho/wiki/Local-DB-%EA%B5%AC%EC%84%B1-%EA%B0%80%EC%9D%B4%EB%93%9C)
### [AWS RDS 데이터 Local DB로 dump하기 (옮기기)](https://github.com/joong8812/mooyaho/wiki/AWS-RDS-%EB%8D%B0%EC%9D%B4%ED%84%B0-Local-DB%EB%A1%9C-dump%ED%95%98%EA%B8%B0-(%EC%98%AE%EA%B8%B0%EA%B8%B0))
