import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';

export const API_BASE_URL = new InjectionToken<string>('https://localhost:5000');

@Injectable({
  providedIn: 'root'
})
export class ClientService {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
    }

    /**
     * @return Success
     */
    booksGETAll(order: string): Observable<BookList> {
        let url_ = this.baseUrl + "/api/Books/{order}";
        if (order === undefined || order === null)
            throw new Error("The parameter 'order' must be defined.");
        url_ = url_.replace("{order}", encodeURIComponent("" + order));
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processBooksGET(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processBooksGET(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<BookList>;
                }
            } else
                return _observableThrow(response_) as any as Observable<BookList>;
        }));
    }

    protected processBooksGET(response: HttpResponseBase): Observable<BookList> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = BookList.fromJS(resultData200);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<BookList>(null as any);
    }

    /**
     * @return Success
     */
    booksGETById(id: number): Observable<BookDetailsVm> {
        let url_ = this.baseUrl + "/api/Books/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processBooksGET2(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processBooksGET2(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<BookDetailsVm>;
                }
            } else
                return _observableThrow(response_) as any as Observable<BookDetailsVm>;
        }));
    }

    protected processBooksGET2(response: HttpResponseBase): Observable<BookDetailsVm> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = BookDetailsVm.fromJS(resultData200);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<BookDetailsVm>(null as any);
    }

    /**
     * @return Success
     */
    booksDELETE(id: number, secret: string): Observable<void> {
        let url_ = this.baseUrl + "/api/Books/{id}/{secret}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        if (secret === undefined || secret === null)
            throw new Error("The parameter 'secret' must be defined.");
        url_ = url_.replace("{secret}", encodeURIComponent("" + secret));
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
            })
        };

        return this.http.request("delete", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processBooksDELETE(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processBooksDELETE(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<void>;
                }
            } else
                return _observableThrow(response_) as any as Observable<void>;
        }));
    }

    protected processBooksDELETE(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return _observableOf<void>(null as any);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<void>(null as any);
    }

    /**
     * @param body (optional) 
     * @return Success
     */
    booksPOST(body: CreateUpdateBookCommand | undefined): Observable<number> {
        let url_ = this.baseUrl + "/api/Books";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Accept": "application/json"
            })
        };

        return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processBooksPOST(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processBooksPOST(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<number>;
                }
            } else
                return _observableThrow(response_) as any as Observable<number>;
        }));
    }

    protected processBooksPOST(response: HttpResponseBase): Observable<number> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = resultData200 !== undefined ? resultData200 : <any>null;
    
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<number>(null as any);
    }

    /**
     * @param body (optional) 
     * @return Success
     */
    review(id: number, body: AddReviewDto | undefined): Observable<number> {
        let url_ = this.baseUrl + "/api/Books/{id}/review";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Accept": "application/json"
            })
        };

        return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processReview(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processReview(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<number>;
                }
            } else
                return _observableThrow(response_) as any as Observable<number>;
        }));
    }

    protected processReview(response: HttpResponseBase): Observable<number> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = resultData200 !== undefined ? resultData200 : <any>null;
    
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<number>(null as any);
    }

    /**
     * @param body (optional) 
     * @return Success
     */
    rate(id: number, body: AddRateDto | undefined): Observable<number> {
        let url_ = this.baseUrl + "/api/Books/{id}/rate";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Accept": "application/json"
            })
        };

        return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processRate(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processRate(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<number>;
                }
            } else
                return _observableThrow(response_) as any as Observable<number>;
        }));
    }

    protected processRate(response: HttpResponseBase): Observable<number> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = resultData200 !== undefined ? resultData200 : <any>null;
    
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<number>(null as any);
    }

    /**
     * @return Success
     */
    recommended(genre: string): Observable<BookList> {
        let url_ = this.baseUrl + "/api/Recommended/{genre}";
        if (genre === undefined || genre === null)
            throw new Error("The parameter 'genre' must be defined.");
        url_ = url_.replace("{genre}", encodeURIComponent("" + genre));
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "text/plain"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processRecommended(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processRecommended(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<BookList>;
                }
            } else
                return _observableThrow(response_) as any as Observable<BookList>;
        }));
    }

    protected processRecommended(response: HttpResponseBase): Observable<BookList> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = BookList.fromJS(resultData200);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<BookList>(null as any);
    }
}

export class AddRateDto implements IAddRateDto {
    score?: number;

    constructor(data?: IAddRateDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.score = _data["score"];
        }
    }

    static fromJS(data: any): AddRateDto {
        data = typeof data === 'object' ? data : {};
        let result = new AddRateDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["score"] = this.score;
        return data;
    }
}

export interface IAddRateDto {
    score?: number;
}

export class AddReviewDto implements IAddReviewDto {
    message?: string | undefined;
    reviewer?: string | undefined;

    constructor(data?: IAddReviewDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.message = _data["message"];
            this.reviewer = _data["reviewer"];
        }
    }

    static fromJS(data: any): AddReviewDto {
        data = typeof data === 'object' ? data : {};
        let result = new AddReviewDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["message"] = this.message;
        data["reviewer"] = this.reviewer;
        return data;
    }
}

export interface IAddReviewDto {
    message?: string | undefined;
    reviewer?: string | undefined;
}

export class BookDetailsVm implements IBookDetailsVm {
    id?: number;
    title?: string | undefined;
    cover?: string | undefined;
    content?: string | undefined;
    genre?: string | undefined;
    author?: string | undefined;
    rating?: number;
    reviews?: ReviewVm[] | undefined;

    constructor(data?: IBookDetailsVm) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.title = _data["title"];
            this.cover = _data["cover"];
            this.content = _data["content"];
            this.genre = _data["genre"];
            this.author = _data["author"];
            this.rating = _data["rating"];
            if (Array.isArray(_data["reviews"])) {
                this.reviews = [] as any;
                for (let item of _data["reviews"])
                    this.reviews!.push(ReviewVm.fromJS(item));
            }
        }
    }

    static fromJS(data: any): BookDetailsVm {
        data = typeof data === 'object' ? data : {};
        let result = new BookDetailsVm();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["title"] = this.title;
        data["cover"] = this.cover;
        data["content"] = this.content;
        data["genre"] = this.genre;
        data["author"] = this.author;
        data["rating"] = this.rating;
        if (Array.isArray(this.reviews)) {
            data["reviews"] = [];
            for (let item of this.reviews)
                data["reviews"].push(item.toJSON());
        }
        return data;
    }
}

export interface IBookDetailsVm {
    id?: number;
    title?: string | undefined;
    cover?: string | undefined;
    content?: string | undefined;
    genre?: string | undefined;
    author?: string | undefined;
    rating?: number;
    reviews?: ReviewVm[] | undefined;
}

export class BookList implements IBookList {
    books?: BookLookupDto[] | undefined;

    constructor(data?: IBookList) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            if (Array.isArray(_data["books"])) {
                this.books = [] as any;
                for (let item of _data["books"])
                    this.books!.push(BookLookupDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): BookList {
        data = typeof data === 'object' ? data : {};
        let result = new BookList();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.books)) {
            data["books"] = [];
            for (let item of this.books)
                data["books"].push(item.toJSON());
        }
        return data;
    }
}

export interface IBookList {
    books?: BookLookupDto[] | undefined;
}

export class BookLookupDto implements IBookLookupDto {
    id?: number;
    title?: string | undefined;
    author?: string | undefined;
    rating?: number;
    reviewsNumber?: number;

    constructor(data?: IBookLookupDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.title = _data["title"];
            this.author = _data["author"];
            this.rating = _data["rating"];
            this.reviewsNumber = _data["reviewsNumber"];
        }
    }

    static fromJS(data: any): BookLookupDto {
        data = typeof data === 'object' ? data : {};
        let result = new BookLookupDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["title"] = this.title;
        data["author"] = this.author;
        data["rating"] = this.rating;
        data["reviewsNumber"] = this.reviewsNumber;
        return data;
    }
}

export interface IBookLookupDto {
    id?: number;
    title?: string | undefined;
    author?: string | undefined;
    rating?: number;
    reviewsNumber?: number;
}

export class CreateUpdateBookCommand implements ICreateUpdateBookCommand {
    id?: number | undefined;
    title?: string | undefined;
    cover?: string | undefined;
    content?: string | undefined;
    author?: string | undefined;
    genre?: string | undefined;

    constructor(data?: ICreateUpdateBookCommand) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.title = _data["title"];
            this.cover = _data["cover"];
            this.content = _data["content"];
            this.author = _data["author"];
            this.genre = _data["genre"];
        }
    }

    static fromJS(data: any): CreateUpdateBookCommand {
        data = typeof data === 'object' ? data : {};
        let result = new CreateUpdateBookCommand();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["title"] = this.title;
        data["cover"] = this.cover;
        data["content"] = this.content;
        data["author"] = this.author;
        data["genre"] = this.genre;
        return data;
    }
}

export interface ICreateUpdateBookCommand {
    id?: number | undefined;
    title?: string | undefined;
    cover?: string | undefined;
    content?: string | undefined;
    author?: string | undefined;
    genre?: string | undefined;
}

export class ReviewVm implements IReviewVm {
    id?: number;
    message?: string | undefined;
    reviewer?: string | undefined;

    constructor(data?: IReviewVm) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.message = _data["message"];
            this.reviewer = _data["reviewer"];
        }
    }

    static fromJS(data: any): ReviewVm {
        data = typeof data === 'object' ? data : {};
        let result = new ReviewVm();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["message"] = this.message;
        data["reviewer"] = this.reviewer;
        return data;
    }
}

export interface IReviewVm {
    id?: number;
    message?: string | undefined;
    reviewer?: string | undefined;
}

export class ApiException extends Error {
    override message: string;
    status: number;
    response: string;
    headers: { [key: string]: any; };
    result: any;

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isApiException = true;

    static isApiException(obj: any): obj is ApiException {
        return obj.isApiException === true;
    }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): Observable<any> {
    if (result !== null && result !== undefined)
        return _observableThrow(result);
    else
        return _observableThrow(new ApiException(message, status, response, headers, null));
}

function blobToText(blob: any): Observable<string> {
    return new Observable<string>((observer: any) => {
        if (!blob) {
            observer.next("");
            observer.complete();
        } else {
            let reader = new FileReader();
            reader.onload = event => {
                observer.next((event.target as any).result);
                observer.complete();
            };
            reader.readAsText(blob);
        }
    });
}