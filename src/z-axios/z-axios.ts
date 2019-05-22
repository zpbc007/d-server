import { AxiosRequestConfig } from 'axios'
import { ZAxios } from '@hinata_hyuga/z-axios'

// 获取z-axios 实例
export function getReqIns<T = AxiosRequestConfig>(baseURL: string) {
    return new ZAxios<T>({
        newIns: true,
        insConfig: {
            baseURL,
        },
    })
}
