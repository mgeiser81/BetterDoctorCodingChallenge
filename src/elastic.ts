import * as es from 'elasticsearch';

export default class EsClient {
    client: es.Client;
    isConnected: boolean = false;

    constructor() {
        this.client = new es.Client({
            host: 'localhost:9200'
        });
    }

    matchAll(index: string, type: string) {
        return this.client.search({
            index: index,
            type: type
        });
    }

    addDoctorDocument(uid: string, doctor: any) {
        this.client.index({
            index: 'doctors',
            type: 'doctor', 
            id: uid,
            body: doctor
        });
    }
}