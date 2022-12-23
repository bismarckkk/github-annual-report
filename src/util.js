let client_id = '';
if (process.env.NODE_ENV !== 'production') {
    client_id = ''; // test id
}
const authorize_uri = 'https://github.com/login/oauth/authorize';
const code_uri = 'http://192.168.1.10:8013/code2token';
const redirect_uri = 'http://192.168.1.10:3000/oauth/redirect';

export const getToken = async () => {
    let token = '';
    if (/\?code=(.+)&?/.test(window.location.search)) {
        let code = window.location.search.match(/\?code=(.+)&?/)[1];
        let res = await window.fetch(`${code_uri}?code=${code}`, {
            headers: {
                Accept: 'application/json'
            },
            mode: 'cors'
        })
        if (res) {
            let r = await res.text()
            if (r !== 'error') {
                console.log(r)
                set('token', r)
                return r
            } else {
                alert('认证失败，请重新认证')
            }
        }
    } else {
        token = await get('token');
    }
    console.log(`get token ${token}`)
    return token;
};

export const getLoginUrl = () => {
    return `${authorize_uri}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=repo`
}

export const days2Now = created_at => {
    const now = +new Date();
    const last = +new Date(created_at);
    return Math.floor((now - last) / (1000 * 60 * 60 * 24));
};

export const dealTime = created_at => {
    return new Date(created_at)
        .toLocaleString()
        .match(/(.*)\s/)[0]
        .replace(/\//g, '-');
};

export const set = (key, value) => {
    localStorage.setItem(
        key,
        typeof value === 'object' ? JSON.stringify(value) : value
    );
};

export const get = key => {
    let value;
    try {
        value = localStorage.getItem(key);
        return JSON.parse(value);
    } catch (_) {
        return value;
    }
};

export const is2019 = created_at => {
    const time = +new Date(created_at);
    const startTime = 1640966400000; // Tue Jan 01 2019 00:00:00 GMT+0800
    const endTime = 1672502400000; // Tue Jan 01 2020 00:00:00 GMT+0800
    return time > startTime && time < endTime;
};

export const setStatusBarStyle = which => {
    const color = getComputedStyle(document.body).getPropertyValue(which);
    document.querySelectorAll('.theme-color').forEach(item => {
        item.setAttribute('content', color);
    });
};
