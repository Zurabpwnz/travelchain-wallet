import axios from 'axios';
import AuthData from '../AuthData';

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
        // this.redirectURL = "http://data.travelchain.io/";
    }

    getGoto() {}
    process(data) {}
}

export class Google extends Social {
    constructor() {
        super('google-plus', 'google.token', 'https://accounts.google.com/o/oauth2/v2/auth');
    }

    getGoto() {
        let goto = this.url +'?';
        goto += 'client_id='+ AuthData.google.id +'&';
        goto += 'redirect_uri='+ encodeURIComponent(this.redirectURL) +'&';
        goto += 'response_type=token' +'&';
        goto += 'scope='+ encodeURIComponent('profile email') +'&';

        return goto;
    }

    process(data) {
        axios.get('https://www.googleapis.com/oauth2/v1/userinfo?access_token='+ data.access_token)
        .then((userinfo) => {
            this.sd.setName( userinfo.data.name );
            this.sd.setAvatar( userinfo.data.picture );
        });
    }
}

export class VK extends Social {
    constructor() {
        super('vk', 'vk.token', 'http://oauth.vk.com/authorize');
    }

    getGoto() {
        let goto = this.url +'?';
        goto += 'client_id='+ AuthData.vk.id +'&';
        goto += 'redirect_uri='+ encodeURIComponent(this.redirectURL) +'&';
        goto += 'response_type=token' +'&';
        goto += 'scope=4525214' +'&';
        goto += 'revoke=1' +'&';

        return goto;
    }

    process(data) {
        let fields = [
            'uid',
            'first_name',
            'last_name',
            'screen_name',
            'photo'
        ].join(',');

        axios.get('https://api.vk.com/method/users.get?fields='+ fields +'&access_token='+ data.access_token, {

        })
        .then((userinfo) => {
            this.sd.setName( userinfo.data.response[0].first_name +' '+ userinfo.data.response[0].last_name );
            this.sd.setAvatar( userinfo.data.response[0].photo );
        });
    }
}

export class Facebook extends Social {
    constructor() {
        super('facebook', 'facebook.token', 'https://www.facebook.com/dialog/oauth');
    }

    getGoto() {
        let goto = this.url +'?';
        goto += 'client_id='+ AuthData.facebook.id +'&';
        goto += 'redirect_uri='+ encodeURIComponent(this.redirectURL) +'&';
        goto += 'response_type=token' +'&';

        return goto;
    }

    process(data) {
        let fields = [
            'id',
            'name'
        ].join(',');

        axios.get('https://graph.facebook.com/me?fields='+ fields +'&access_token='+ data.access_token)
        .then((userinfo) => {
            this.sd.setName( userinfo.data.name );
            return axios.get('https://graph.facebook.com/'+ userinfo.data.id +'/picture?access_token='+ data.access_token)
        })
        .then((avatar) => {
            this.sd.setAvatar( avatar );
        });
    }
}