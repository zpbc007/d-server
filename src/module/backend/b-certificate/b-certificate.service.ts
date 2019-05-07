import { Injectable } from '@nestjs/common'
import { BCertificateApi } from './b-certificate.api'
import { IListItem } from '@type-comp/list-item'

@Injectable()
export class BCertificateService {
    constructor(private readonly certificateApi: BCertificateApi) {}

    /**
     * 通过用户id获取业务单元一览
     * @param userId 用户id
     */
    async getBussinessUnitByUserId(userId: string) {
        // TODO: 用户id到组织架构id的转换
        const orgId = '1001'
        const res = await this.certificateApi.getBussinessUnitByOrgId(orgId)

        return (res || []).map(({ businessUnitCode, businessUnitName }) => ({
            value: businessUnitCode,
            text: businessUnitName,
        })) as IListItem[]
    }

    /**
     * 根据业务单元 id 获取对应的所有的 table 列定义
     * @param bUnitId 业务单元id
     */
    async getCertificateMetaByBUnitId(bUnitId: string) {
        // 凭证列表
        const res = await this.certificateApi.getCertificateMetaByBUnitId(bUnitId)

        return (res || []).map(({ certificateMetaId, certificateName }) => ({
            value: certificateMetaId,
            text: certificateName,
        })) as IListItem[]
    }

    /** 根据业务单元 id 和 凭证 metaId 获取对应table的数据 */
    async getCertificateMetaToken(bUnitId: string, metaId: string) {
        const res = await this.certificateApi.getCertificateMetaToken(bUnitId, metaId)

        return res.map(({ tokenId, fields = [] }) => {
            return {
                tokenId,
                ...fields.reduce(
                    (data, { key, jsonData }) => ({
                        ...data,
                        [key]: jsonData,
                    }),
                    {} as any,
                ),
            }
        })
    }
}
