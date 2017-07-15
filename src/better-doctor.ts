import * as requestify from 'requestify';

export default class BetterDoctorApi {
    userKey: string = '1e20625f8e099e706eaf056ace770738';
    baseUrl: string = 'https://api.betterdoctor.com/2016-03-01/';

    constructor() { }

    doctorSearch(name: string, skip: number = 0, limit: number = 10): Promise<any> {
        return new Promise((resolve, reject) => {
            requestify.get(`${this.baseUrl}doctors?name=${name}&skip=${skip}&limit=${limit}&user_key=${this.userKey}`)
            .then(response => {
                resolve(response.getBody());
            })
            .catch(err => {
                reject(err);
            })
        });
    }
}