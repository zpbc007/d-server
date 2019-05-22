// import { Controller, Get, Param } from '@nestjs/common'
// import { UserService } from './user/user.service'
// import { LinkMsg } from './message/link'
// import { MessageService } from './message.service'

// @Controller('ding')
// export class DingController {
//     constructor(
//         private readonly userService: UserService,
//         private readonly messageService: MessageService,
//     ) {}

//     /** 测试信息发送 */
//     @Get('/message/send')
//     async sendMessage() {
//         const { admin_list } = await this.userService.getAdmins()
//         const msg = new LinkMsg({
//             messageUrl: 'http://172.16.0.27:8888',
//             picUrl: 'http://pic19.nipic.com/20120321/3001435_141555714185_2.jpg',
//             title: '测试分享',
//             text: '信息内容',
//         })
//         return this.messageService.sendMsg(
//             {
//                 userid_list: [admin_list[0].userid],
//             },
//             msg,
//         )
//     }

//     @Get('/message/progress/:taskId')
//     getMsgProgress(@Param('taskId') taskId: number) {
//         return this.messageService.getMsgProgress(taskId)
//     }

//     @Get('/message/result/:taskId')
//     getMsgResult(@Param('taskId') taskId: number) {
//         return this.messageService.getMsgResult(taskId)
//     }

//     /** 获取动态表单定义与数据 */
//     @Get('/dynamic-form')
//     async getDynamicFormSchemaAndData() {
//         return {
//             formSchema: {
//                 bumen: {
//                     ui_disabled: false,
//                     ui_title: '部门',
//                     ui_widget: 'input_drawer',
//                     ui_metaId: 'yiyuan_bumen',
//                 },
//                 keshi: {
//                     ui_disabled: false,
//                     ui_title: '科室',
//                     ui_widget: 'input_drawer',
//                     ui_metaId: 'yiyuan_keshi',
//                 },
//                 shenqingshijian: {
//                     ui_disabled: false,
//                     ui_title: '申请时间',
//                     ui_widget: 'date_picker',
//                 },
//                 shenpiyijian: {
//                     ui_disabled: false,
//                     ui_title: '审批意见',
//                     ui_widget: 'input',
//                 },
//                 shifoutongguo: {
//                     ui_disabled: false,
//                     ui_title: '是否通过',
//                     ui_widget: 'checkbox',
//                 },
//                 rukushijian: {
//                     ui_disabled: false,
//                     ui_title: '入库时间',
//                     ui_widget: 'date_picker',
//                 },
//                 shenqingren: {
//                     ui_disabled: false,
//                     ui_title: '申请人',
//                     ui_widget: 'input',
//                 },
//                 shenheren: {
//                     ui_disabled: false,
//                     ui_title: '审核人',
//                     ui_widget: 'input',
//                 },
//                 pofuzeren: {
//                     ui_disabled: false,
//                     ui_title: '负责人',
//                     ui_widget: 'input',
//                 },
//                 ui_verifySchema: {
//                     bumen: {
//                         ui_required: false,
//                         ui_type: 'select',
//                     },
//                     keshi: {
//                         ui_required: false,
//                         ui_type: 'select',
//                     },
//                     shenqingshijian: {
//                         ui_required: false,
//                         ui_type: 'date',
//                     },
//                     shenpiyijian: {
//                         ui_required: false,
//                         ui_type: 'string',
//                     },
//                     shifoutongguo: {
//                         ui_required: false,
//                         ui_type: 'boolean',
//                     },
//                     rukushijian: {
//                         ui_required: false,
//                         ui_type: 'date',
//                     },
//                     shenqingren: {
//                         ui_required: false,
//                         ui_type: 'string',
//                     },
//                     shenheren: {
//                         ui_required: false,
//                         ui_type: 'string',
//                     },
//                     pofuzeren: {
//                         ui_required: false,
//                         ui_type: 'string',
//                     },
//                 },
//                 ui_relationSchema: {
//                     bumen: {
//                         bumen: 'bumen',
//                     },
//                     keshi: {
//                         keshi: 'keshi',
//                     },
//                 },
//                 ui_readonly: false,
//                 ui_order: ['_default'],
//                 _default: {
//                     ui_title: '',
//                     ui_order: [
//                         'bumen',
//                         'keshi',
//                         'shenqingshijian',
//                         'shenpiyijian',
//                         'shifoutongguo',
//                         'rukushijian',
//                         'shenqingren',
//                         'shenheren',
//                         'pofuzeren',
//                     ],
//                 },
//             },
//             formData: {
//                 bumen: {
//                     value: '1',
//                     showValue: '护理部',
//                 },
//                 keshi: {
//                     value: '2',
//                     showValue: '内科',
//                 },
//                 shenqingshijian: '2018-11-19 00:00:00.0',
//                 shenpiyijian: '同意',
//                 shifoutongguo: 'true',
//                 rukushijian: '2018-11-27 00:00:00.0',
//                 shenqingren: '钱天工',
//                 shenheren: '丛初雪',
//                 pofuzeren: '程梓菱',
//             },
//         }
//     }
// }
