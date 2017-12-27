import axios from 'axios';
import AuthData from '../AuthData';
import { Alert } from 'quasar';

export class SocialData {
    public name: string;
    public avatar: string;
    private self: Social;

    constructor(obj) { this.self = obj; }

    setName(str) {
        this.name = str;
        this.update();
    }
    setAvatar(str) {
        this.avatar = str;
        this.update();
    }

    update() {
        this.self.info = {
            name: this.name,
            avatar: this.avatar
        };
    }
}

export default class Social {
    private alert;
    public url: string;
    public name: string;
    public store: string;
    public redirectURL: string;
    public info: object = {};
    protected sd = new SocialData(this);

    constructor(name, storekey, url) {
        this.name = name;
        this.store = storekey;
        this.url = url;
        this.redirectURL = window.location.origin;
    }

    getGoto(pars) {
        let goto = new Array();
        Object.keys(pars).forEach(function(key)
        {
            goto.push( key + '=' + pars[key] );
        });
        return this.url + '?' + goto.join('&');
    }
    process(data) {}

    notify(error) {
        let socialName = this.name.replace('-', ' ');
        socialName = socialName.split(' ').map((part) => {
            return part[0].toUpperCase() + part.substring(1);
        })
        .join(' ');

        let msg = !error ?
            'Successfully binded your social account from ' + socialName + '!' :
            'Failed bind your social account from ' + socialName + ':<br>' + error;

        if ( this.alert ) this.alert.dismiss();
        this.alert = Alert.create({
            html: msg,
            color: !error ? 'teal-5' : '',
            icon: !error ? 'done' : '',
            enter: 'bounceInRight',
            leave: 'slideOutRight',
        });
        if ( !error )
            setTimeout(() => { if ( this.alert ) this.alert.dismiss(); }, 5000 );
    }
}

export class Google extends Social {
    constructor() {
        super('google-plus', 'google.token', 'https://accounts.google.com/o/oauth2/v2/auth');
    }

    getGoto() {
        return super.getGoto({
            response_type: 'token',
            client_id: AuthData.google.id,
            redirect_uri: encodeURIComponent(this.redirectURL),
            scope: encodeURIComponent('profile email'),
        });
    }

    process(data) {
        axios.get('https://www.googleapis.com/oauth2/v1/userinfo?access_token=' + data.access_token)
        .then((userinfo) => {
            this.sd.setName( userinfo.data.name );
            this.sd.setAvatar( userinfo.data.picture );
            this.notify('');
        })
        .catch((err) => this.notify(err) );
    }
}

export class VK extends Social {
    constructor() {
        super('vk', 'vk.token', 'http://oauth.vk.com/authorize');
    }

    getGoto() {
        return super.getGoto({
            response_type: 'token',
            client_id: AuthData.vk.id,
            redirect_uri: encodeURIComponent(this.redirectURL),
            scope: 4525214,
            revoke: 1
        });
    }

    process(data) {
        let fields = [
            'uid',
            'first_name',
            'last_name',
            'screen_name',
            'photo'
        ].join(',');

        axios.get('https://api.vk.com/method/users.get?fields=' + fields + '&access_token=' + data.access_token, {
            headers: {
                // 'Allow-Control-Allow-Origin': "*"
            }
        })
        .then((userinfo) => {
            this.sd.setName( userinfo.data.response[0].first_name + ' ' + userinfo.data.response[0].last_name );
            this.sd.setAvatar( userinfo.data.response[0].photo );
            this.notify('');
        })
        .catch((err) => this.notify(err) );
    }
}

export class Facebook extends Social {
    constructor() {
        super('facebook', 'facebook.token', 'https://www.facebook.com/dialog/oauth');
    }

    getGoto() {
        return super.getGoto({
            response_type: 'token',
            client_id: AuthData.facebook.id,
            redirect_uri: encodeURIComponent(this.redirectURL),
        });
    }

    process(data) {
        let fields = [
            'id',
            'name'
        ].join(',');

        axios.get('https://graph.facebook.com/me?fields=' + fields + '&access_token=' + data.access_token)
        .then((userinfo) => {
            this.sd.setName( userinfo.data.name );
            return axios.get('https://graph.facebook.com/' + userinfo.data.id + '/picture?access_token=' + data.access_token);
        })
        .then((avatar) => {
            this.sd.setAvatar( avatar );
            this.notify('');
        })
        .catch((err) => this.notify(err) );
    }
}