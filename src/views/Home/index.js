import React from 'react';
import { useHistory } from 'react-router-dom';
import MilkButton from '../../components/MilkButton';
import './index.scss';
import { getToken, set, setStatusBarStyle, getLoginUrl } from '../../util';


function Home() {
    const history = useHistory();
    setStatusBarStyle('--home-color');

    async function func() {
        let token = await getToken();
        if (token) {
            set('token', token);
            history.push(`/first`);
            return;
        }
    }
    func()
    return (
        <div className="home">
            <img src={require('../../assets/GitHub.png')} alt="github" />
            <h1>
                2022
                <br />
                Github年度报告
            </h1>
            <div
                onClick={() => {
                    window.location.href = getLoginUrl();
                }}
            >
                <MilkButton />
            </div>
        </div>
    );
}

export default Home;
