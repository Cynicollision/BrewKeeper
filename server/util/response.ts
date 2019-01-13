import * as mongoose from 'mongoose';
import { Brew } from '../../shared/models/Brew';
import { OperationResponse } from '../../shared/contracts/OperationResponse';

export class ResponseUtil {
    static succeed<T>(data: T): OperationResponse<T> {
        return {
            success: true,
            message: null,
            data: data,
        };
    }
    static fail<T>(message: string): OperationResponse<T> {
        return {
            success: false,
            message: message,
            data: null,
        };
    }
}
