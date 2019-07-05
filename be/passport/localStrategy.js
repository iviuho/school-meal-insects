const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

module.exports = () => {
    passport.serializeUser((user, done) => {
        //성공 시 호출
        // console.log(user.userNo); // 출력 테스트 완료!
        done(null, user.id); //여기의 user가 deserializeUser의 첫번째 매개변수로 이동
    });

    passport.deserializeUser((id, done) => {
        //매 요청시 실행, passport.session() 미들웨어가 이 메서드 호출

    });

    passport.use(
        "user",
        new LocalStrategy({
                usernameField: "id",
                passwordField: "password",
                session: true,
                passReqToCallback: false
            },
            (id, password, done) => {
                const exUser = await User.find({
                    where: {
                        id
                    }
                });
                if (exUser) {
                    if (password == exUser.password) {
                        done(null, exUser);
                    } else {
                        done(null, false, {
                            message: '비밀번호가 일치하지 않습니다.'
                        });
                    }
                } else {
                    done(null, false, {
                        message: '가입되지 않은 회원입니다.'
                    });
                }

            }
        )
    );

};