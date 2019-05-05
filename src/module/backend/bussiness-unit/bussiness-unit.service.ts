import { Injectable } from '@nestjs/common'

@Injectable()
export class BussinessUnitService {
    getBUnitByUserId(userId: string) {
        return [
            {
                // 业务id
                id: '1',
                // 业务名称
                text: '业务1',
            },
            {
                // 业务id]
                id: '2',
                // 业务名称
                text: '业务2',
            },
            {
                // 业务id
                id: '3',
                // 业务名称
                text: '业务3',
            },
            {
                // 业务id
                id: '4',
                // 业务名称
                text: '业务4',
            },
            {
                // 业务id
                id: '5',
                // 业务名称
                text: '业务5',
            },
            {
                // 业务id
                id: '6',
                // 业务名称
                text: '业务6',
            },
        ]
    }
}
