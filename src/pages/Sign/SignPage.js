import classes from './SignPage.module.scss'
import Button from '../../UI/Button/Button'
import Input from '../../UI/Input/Input';

import patternBig from '../../static/image/pattern/patternBig.svg';
import { Link, useSearchParams } from 'react-router-dom';
import ModalPassword from '../../components/Sign/ModalPassword/ModalPassword';
import HeaderImg from '../../UI/HeaderImg/HeaderImg';
import { useState } from 'react';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { fetchRegister, fetchLogin } from '../../store/actions/auth-actions';

const SignPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ searchParam ] = useSearchParams();
    const isLogin = searchParam.get('mode') === 'signIn';
    const signClass = `${classes.signBox} ${isLogin ? classes.signIn : ''}`;
    const [ isModalPassword, setIsModalPassword ] = useState(false);
    const [ valuePassword, setPasswordValue ] = useState('');

    const passwordChanger = (newValue) => setPasswordValue(newValue);

    const clickPasswordHandler = (ev) => {
        ev.preventDefault();
        setIsModalPassword((prevState) => !prevState);
    }

    const registerHandler = async (ev) => {
        ev.preventDefault();
        const registrationData = {
            firstName: ev.target.elements.firstName.value,
            lastName: ev.target.elements.lastName.value,
            nickname: ev.target.elements.nickname.value,
            birthday: ev.target.elements.birthday.value,
            email: ev.target.elements.email.value,
            password: ev.target.elements.password.value
        };
        dispatch(fetchRegister(registrationData, navigate));
    };

    const loginHandler = async (ev) => {
        ev.preventDefault();
        const loginData = {
            email: ev.target.elements.email.value,
            password: ev.target.elements.password.value
        };
        dispatch(fetchLogin(loginData, navigate));
    };

    return <div className={classes.content}>
        {isModalPassword && <ModalPassword value={valuePassword} passwordChanger={passwordChanger} onHiddenCart={clickPasswordHandler}/>}
        <div className={signClass}>
            <form className={classes.registerForm} onSubmit={registerHandler}>
                <HeaderImg className={classes.headerImg} left={0} top={0} position={'absolute'}/>
                <h2 className={classes.mobileTitle}>Реєстрація</h2>
                <div className={classes.buttonBox}>
                    <Button active={true}>Реєстрація</Button>
                    <Link to={'/sign?mode=signIn'}><Button type="noBorder">Вхід</Button></Link>
                </div>
                <div className={classes.inputBox}>
                    <Input
                        label="Ім'я"
                        placeholder="Введіть Ім'я"
                        name="firstName"
                    />
                    <Input
                        label="Прізвище"
                        placeholder="Введіть Прізвище"
                        name="lastName"
                    />
                    <Input
                        label="Нікнейм"
                        placeholder="Введіть Нікнейм"
                        name="nickname"
                    />
                    <Input
                        label="День народження"
                        placeholder="Введіть День народження"
                        name="birthday"
                    />
                    <Input
                        label="Пошта"
                        placeholder="Введіть Пошта"
                        name="email"
                    />
                    <Input
                        type="password"
                        onClick={clickPasswordHandler}
                        value={valuePassword}
                        readOnly={true}
                        label="Пароль"
                        placeholder="Введіть Пароль"
                        name="password"
                    />
                </div>
                <Button height={'fit-content'}>Зареєструватися</Button>
                <div className={classes.mobileButtonBox}>
                    <p>Уже маєте аккаунт?</p>
                    <Link to={'/sign?mode=signIn'} >Увійти</Link>
                </div>
            </form>
            <form className={classes.loginForm} onSubmit={loginHandler}>
                <h2 className={classes.mobileTitle}>Увійти</h2>
                <div className={classes.buttonBox}>
                    <Button active={true}>Вхід</Button>
                    <Link to={'/sign?mode=signUp'}><Button type="noBorder">Реєстрація</Button></Link>
                </div>
                <div className={classes.inputBox}>
                    <Input
                        label="Пошта"
                        placeholder="Введіть Пошта"
                        name="email"
                    />
                    <Input
                        label="Пароль"
                        placeholder="Введіть Пароль"
                        name="password"
                    />
                    <a className={classes.forgetPassword}>Забули пароль?</a>
                </div>
                <Button height={'fit-content'}>Увійти</Button>
                <div className={classes.mobileButtonBox}>
                    <p>Не маєте акаунту?</p>
                    <Link to={'/sign?mode=signUp'}>Зареєструватися</Link>
                </div>
            </form>
            <div className={classes.imgBox}>
                <img src={patternBig} alt=""></img>
            </div>
        </div>
    </div>
}
export default SignPage;