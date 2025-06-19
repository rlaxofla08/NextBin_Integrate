module.exports = {
    secret: "serfvhujkoolaserdcgyhnjkopl", // 비밀 키
    resave: false,  // 세션을 다시 저장할지 여부
    saveUninitialized: true,  // 초기화되지 않은 세션을 저장할지 여부
    cookie: { secure: true }  // 개발 환경에서는 false (https 환경에서는 true로 설정)
  };
  