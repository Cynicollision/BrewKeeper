import { IOperationResponse, OperationResponse } from '../../shared/contracts/OperationResponse';

export class ResponseUtil {
    static succeed<T>(data: T): OperationResponse<T> {
        return {
            success: true,
            message: null,
            data: data,
        };
    }
    static fail<T>(message: string, inner?: IOperationResponse): OperationResponse<T> {
        return {
            success: false,
            message: message,
            innerOperation: inner,
            data: <T>null,
        };
    }
}
