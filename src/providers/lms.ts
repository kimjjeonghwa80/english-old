import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
export const LMS_URL = "http://onlineenglish.kr";
export const LMS_ENDPOINT_URL = LMS_URL + "/ajax.php";
export interface TEACHER {
    birthday: string;
    classid: string;
    gender: string;
    greeting: string;
    id: string;
    idx: string;
    major: string;
    name: string;
    nickname: string;
    photo: string;
    teaching_year: number;
    url_youtube: string;
};
export type TEACHERS = Array< TEACHER >;
@Injectable()
export class LMS {
    constructor( private http: Http ) {

    }
    get url() {
        return LMS_URL;
    }
    getTeachers( success: (teachers: TEACHERS) => void ) {
        let url = LMS_ENDPOINT_URL + "?function=teacher_list";
        this.http.get( url ).subscribe( re => {
            console.log(re);
            let json = null;
            try {
                json = JSON.parse( re['_body'] );
            }
            catch ( e ) {
                alert("Parse ERROR on lms::getTeachers()");
            }

            console.log(json);
            success( json['data'] );
        });
    }


    register( data, success, failure: ( error : string ) => void ){
        let url = LMS_ENDPOINT_URL + `?id=${data['id']}&name=${data['name']}&email=${data['email']}&mobile=${data['mobile']}&classid=${data['classid']}&domain=englishfordevelopers.com&function=user_insert`;
        
        this.http.get( url ).subscribe( re =>{
            console.log( ' user_insert :: ' + re );
            if( re ) success( re );
            else failure( ' error on lms registration ' );
        })
    }

    update( data, success, failure: ( error: string) => void ){
        let id =  data['id'];
        let url = LMS_ENDPOINT_URL + `?id=${data['id']}&name=${data['name']}&email=${data['email']}&mobile=${data['mobile']}&classid=${data['classid']}&domain=englishfordevelopers.com&function=user_update`;

        this.http.get( url ).subscribe( re =>{
            console.log( ' user_update :: ' + re );
            if( re ) success( re );
            else failure( ' error on lms update user ' );
        })
    }

    
}