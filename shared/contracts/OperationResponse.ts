export abstract class EmptyOperationResponse {
    message?: string;
    success: boolean = false;
}

export abstract class OperationResponse<T> extends EmptyOperationResponse {
    data?: T;
}