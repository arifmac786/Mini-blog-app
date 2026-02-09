class ApiResponse {
    constructor(statusCode,message ,data,token=''){
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.token = token
    }
}

export default ApiResponse;