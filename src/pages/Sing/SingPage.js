import classes from './SingPage.module.scss'
import Button from '../../UI/Button/Button'
import Input from '../../UI/Input/Input';

import patternBig from '../../static/image/pattern/patternBig.svg';
import { Link, useSearchParams } from 'react-router-dom';
import ModalPassword from '../../components/Sing/ModalPassword/ModalPassword';
import HeaderImg from '../../UI/HeaderImg/HeaderImg';
import { useState } from 'react';

const SingPage = () => {

    const [ searchParam ] = useSearchParams();
    const isLogin = searchParam.get('mode') === 'singIn';
    const singClass = `${classes.singBox} ${isLogin ? classes.singIn : ''}`;
    const [ isModalPassword, setIsModalPassword ] = useState(false);
    const [ valuePassword, setPasswordValue ] = useState('');

    const passwordChanger = (newValue) => setPasswordValue(newValue);

    const clickPasswordHandler = (ev) => {
        ev.preventDefault();
        setIsModalPassword((prevState) => !prevState);
    }

    return <div className={classes.content}>
        {isModalPassword && <ModalPassword value={valuePassword} passwordChanger={passwordChanger} onHiddenCart={clickPasswordHandler}/>}
        <div className={singClass}>
            <form className={classes.registerForm}>
                <HeaderImg className={classes.headerImg} left={0} top={0} position={'absolute'}/>
                <h2 className={classes.mobileTitle}>Реєстрація</h2>
                <div className={classes.buttonBox}>
                    <Button active={true}>Реєстрація</Button>
                    <Link to={'/sing?mode=singIn'}><Button type="noBorder">Вхід</Button></Link>
                </div>
                <div className={classes.inputBox}>
                    <Input
                        label="Ім'я"
                        placeholder="Введіть Ім'я"
                    />
                    <Input
                        label="Прізвище"
                        placeholder="Введіть Прізвище"
                    />
                    <Input
                        label="Нікнейм"
                        placeholder="Введіть Нікнейм"
                    />
                    <Input
                        label="День народження"
                        placeholder="Введіть День народження"
                    />
                    <Input
                        label="Пошта"
                        placeholder="Введіть Пошта"
                    />
                    <Input
                        type="password"
                        onClick={clickPasswordHandler}
                        value={valuePassword}
                        readOnly={true}
                        label="Пароль"
                        placeholder="Введіть Пароль"
                    />
                </div>
                <Button height={'fit-content'}>Зареєструватися</Button>
                <div className={classes.mobileButtonBox}>
                    <p>Уже маєте аккаунт?</p>
                    <Link to={'/sing?mode=singIn'} >Увійти</Link>
                </div>
            </form>
            <form className={classes.loginForm}>
                <h2 className={classes.mobileTitle}>Увійти</h2>
                <div className={classes.buttonBox}>
                    <Button active={true}>Вхід</Button>
                    <Link to={'/sing?mode=singUp'}><Button type="noBorder">Реєстрація</Button></Link>
                </div>
                <div className={classes.inputBox}>
                    <Input
                        label="Пошта"
                        placeholder="Введіть Пошта"
                    />
                    <Input
                        label="Пароль"
                        placeholder="Введіть Пароль"
                    />
                    <a className={classes.forgetPassword}>Забули пароль?</a>
                </div>
                <Button height={'fit-content'}>Увійти</Button>
                <div className={classes.mobileButtonBox}>
                    <p>Не маєте акаунту?</p>
                    <Link to={'/sing?mode=singUp'}>Зареєструватися</Link>
                </div>
            </form>
            <div className={classes.imgBox}>
                <img src={patternBig} alt=""></img>
            </div>
        </div>
    </div>
}
export default SingPage;