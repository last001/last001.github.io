/**
 * main api
 */
import request from '@dscloud/utils/request'
const contextPath = "/dsmain";
export default {
    //region Commons

    //endregion
    //region Exception
    getExceptionMetaPage() {
        return request({
            url: contextPath + '/exception/metapage',
            method: "post",
        });
    },
    getExceptionMasterPage(data: object) {
        return request({
            url: contextPath + '/exception/masterpage',
            method: "post",
            data: data
        });
    },
    getExceptionPage(data: object) {
        return request({
            url: contextPath + '/exception/page',
            method: "post",
            data: data
        });
    },
    getExceptionEntity(id: String) {
        return request({
            url: contextPath + '/exception/get',
            method: "post",
            params: {
                id: id
            }
        });
    },
    removeException(id: String) {
        return request({
            url: contextPath + '/exception/remove',
            method: "post",
            params: {
                id: id
            }
        });
    },
    batchRemoveException(ids: String[]) {
        return request({
            url: contextPath + '/exception/removemulti',
            method: "post",
            data: ids
        });
    },
    //endregion
    //region Log
    getLogMetaPage() {
        return request({
            url: contextPath + '/log/metapage',
            method: "post",
        });
    },
    getLogMasterPage(data: object) {
        return request({
            url: contextPath + '/log/masterpage',
            method: "post",
            data: data
        });
    },
    getLogPage(data: object) {
        return request({
            url: contextPath + '/log/page',
            method: "post",
            data: data
        });
    },
    //endregion
    //region Module
    getModuleTreeData() {
        return request({
            url: contextPath + '/module/getlist',
            method: "post",
        });
    },
    getModuleListByPid(parentId: string) {
        return request({
            url: contextPath + '/module/getlistbypid',
            method: "post",
            params: { parentId: parentId }
        });
    },
    insertModule(data: object) {
        return request({
            url: contextPath + '/module/insert',
            method: "post",
            data: data
        });
    },
    updateModule(data: object) {
        return request({
            url: contextPath + '/module/update',
            method: "post",
            data: data
        });
    },
    removeModule(id: string) {
        return request({
            url: contextPath + '/module/remove',
            method: "post",
            params: { id: id }
        });
    },
    adjustModule(data: object) {
        return request({
            url: contextPath + '/module/adjust',
            method: "post",
            data: data
        });
    },
    //endregion
    //region Menu
    getMenuTreeData(moduleId: string) {
        return request({
            url: contextPath + '/menu/getlist',
            method: "post",
            params: { moduleId: moduleId }
        });
    },
    getMenuListByPid(moduleId: string, parentId: string) {
        return request({
            url: contextPath + '/menu/getlistbypid',
            method: "post",
            params: {
                moduleId: moduleId,
                parentId: parentId
            }
        });
    },
    insertMenu(data: object) {
        return request({
            url: contextPath + '/menu/insert',
            method: "post",
            data: data
        });
    },
    updateMenu(data: object) {
        return request({
            url: contextPath + '/menu/update',
            method: "post",
            data: data
        });
    },
    removeMenu(id: string) {
        return request({
            url: contextPath + '/menu/remove',
            method: "post",
            params: { id: id }
        });
    },
    adjustMenu(data: object) {
        return request({
            url: contextPath + '/menu/adjust',
            method: "post",
            data: data
        });
    },
    getMenuEntity(id: string) {
        return request({
            url: contextPath + '/menu/get',
            method: "post",
            params: {
                id: id
            }
        });
    },
    getBreadcrumbByMenuId(menuId: string) {
        return request({
            url: contextPath + '/menu/getBreadcrumbByMenuId',
            method: "post",
            params: {
                menuId
            }
        });
    },
    //endregion
    //region Organization
    getOrganizationMetaPage() {
        return request({
            url: contextPath + '/org/metapage',
            method: "post",
        });
    },
    getOrganizationPage(data: object) {
        return request({
            url: contextPath + '/org/page',
            method: "post",
            data: data
        });
    },
    getSubOrganizationList(parentId: string) {
        return request({
            url: contextPath + '/org/getlistbypid',
            method: "post",
            params: {
                parentId
            }
        });
    },
    getOrganizationEntity(id: String) {
        return request({
            url: contextPath + '/org/get',
            method: "post",
            params: {
                id: id
            }
        });
    },
    removeOrganization(id: String) {
        return request({
            url: contextPath + '/org/remove',
            method: "post",
            params: {
                id: id
            }
        });
    },
    batchRemoveOrganization(ids: String[]) {
        return request({
            url: contextPath + '/org/removemulti',
            method: "post",
            data: ids
        });
    },
    inserOrganization(data: object) {
        return request({
            url: contextPath + '/org/add',
            method: "post",
            data: data
        });
    },
    updateOrganization(data: object) {
        return request({
            url: contextPath + '/org/update',
            method: "post",
            data: data
        });
    },
    //endregion
    //region User
    getUserMetaPage() {
        return request({
            url: contextPath + '/user/metapage',
            method: "post",
        });
    },
    getUserPage(data: object) {
        return request({
            url: contextPath + '/user/page',
            method: "post",
            data: data
        });
    },
    getUserEntity(id: String) {
        return request({
            url: contextPath + '/user/get',
            method: "post",
            params: {
                id: id
            }
        });
    },
    insertUser(data: object) {
        return request({
            url: contextPath + '/user/insert',
            method: "post",
            data: data
        });
    },
    updateUser(data: object) {
        return request({
            url: contextPath + '/user/update',
            method: "post",
            data: data
        });
    },
    removeUser(id: String) {
        return request({
            url: contextPath + '/user/remove',
            method: "post",
            params: {
                id: id
            }
        });
    },
    batchRemoveUser(ids: String[]) {
        return request({
            url: contextPath + '/user/removemulti',
            method: "post",
            data: ids
        });
    },
    //endregion
    //region Dictionary
    getDictionaryMetaPage() {
        return request({
            url: contextPath + '/dictionary/metapage',
            method: "post",
        });
    },
    getDictionaryMasterPage(data: object) {
        return request({
            url: contextPath + '/dictionary/masterpage',
            method: "post",
            data: data
        });
    },
    getDictionaryPage(data: object) {
        return request({
            url: contextPath + '/dictionary/page',
            method: "post",
            data: data
        });
    },
    addDictionary(data: object) {
        return request({
            url: contextPath + '/dictionary/insert',
            method: "post",
            data: data
        });
    },
    updateDictionary(data: object) {
        return request({
            url: contextPath + '/dictionary/update',
            method: "post",
            data: data
        });
    },
    getDictionaryEntity(id: String) {
        return request({
            url: contextPath + '/dictionary/get',
            method: "post",
            params: {
                id: id
            }
        });
    },
    removeDictionary(id: String) {
        return request({
            url: contextPath + '/dictionary/remove',
            method: "post",
            params: {
                id: id
            }
        });
    },
    batchRemoveDictionary(ids: String[]) {
        return request({
            url: contextPath + '/dictionary/removemulti',
            method: "post",
            data: ids
        });
    },
    addDictionaryItem(data: object) {
        return request({
            url: contextPath + '/dictionary/additem',
            method: "post",
            data: data
        });
    },
    updateDictionaryItem(data: object) {
        return request({
            url: contextPath + '/dictionary/updateitem',
            method: "post",
            data: data
        });
    },
    removeDictionaryItem(dicId: string, itemId: string) {
        return request({
            url: contextPath + '/dictionary/removeitem',
            method: "post",
            params: {
                dicId: dicId,
                itemId: itemId
            }
        });
    },
    getDictionaryItem(dicId: string, itemId: string) {
        return request({
            url: contextPath + '/dictionary/item',
            method: "post",
            params: {
                dicId: dicId,
                itemId: itemId
            }
        });
    },
    getDictionaryItemList(dicId: string) {
        return request({
            url: contextPath + '/dictionary/itemlist',
            method: "post",
            params: {
                dicId,
            }
        });
    },
    //endregion
    //region Tag
    addTag(data: object) {
        return request({
            url: contextPath + '/tag/insert',
            method: "post",
            data: data
        });
    },
    getTagList(tagType: string, dataRange: string) {
        return request({
            url: contextPath + '/tag/taglist',
            method: "post",
            params: {
                tagType,
                dataRange
            }
        });
    },
    searchTagList(data: object) {
        return request({
            url: contextPath + '/tag/list',
            method: "post",
            data: data
        });
    },
    removeTag(id: string) {
        return request({
            url: contextPath + '/tag/remove',
            method: "post",
            params: {
                id
            }
        });
    },
    subscribeTag(recordId: string, tagType: string, tagIds: []) {
        return request({
            url: contextPath + '/tag/subscribetag',
            method: "post",
            data: {
                recordId,
                tagType,
                tagIds
            }
        });
    },
    unsubscribeTag(recordId: string, tagType: string, tagIds: []) {
        return request({
            url: contextPath + '/tag/unsubscribetag',
            method: "post",
            data: {
                recordId,
                tagType,
                tagIds
            }
        });
    },
    //endregion
    //region Userinfo
    getUserModuleList() {
        return request({
            url: contextPath + '/userinfo/modulelist',
            method: "post"
        });
    },
    getUserServiceMenu(serviceName: string) {
        return request({
            url: contextPath + '/userinfo/pcmenulist',
            method: "post",
            params: {
                urlFirstSegment: serviceName
            }
        })
    },
    getUserModuleMenu(moduleId: string) {
        return request({
            url: contextPath + '/userinfo/modulemenulist',
            method: "post",
            params: {
                moduleId
            }
        })
    },
    //endregion
    //region Component
    requestComponentData(data: any) {
        return request({
            url: contextPath + '/component/request',
            method: "post",
            data: data
        });
    },
    //endregion
    //region EntityApi
    getEntityApiMetaPage() {
        return request({
            url: contextPath + '/entityapi/metapage',
            method: "post",
        });
    },
    getEntityApiPage(data: object) {
        return request({
            url: contextPath + '/entityapi/page',
            method: "post",
            data: data
        });
    },
    insertEntityApi(data: object) {
        return request({
            url: contextPath + '/entityapi/insert',
            method: "post",
            data: data
        });
    },
    updateEntityApi(data: object) {
        return request({
            url: contextPath + '/entityapi/update',
            method: "post",
            data: data
        });
    },
    getEntityApiEntity(id: String) {
        return request({
            url: contextPath + '/entityapi/get',
            method: "post",
            params: {
                id: id
            }
        });
    },
    removeEntityApi(id: String) {
        return request({
            url: contextPath + '/entityapi/remove',
            method: "post",
            params: {
                id: id
            }
        });
    },
    batchRemoveEntityApi(ids: String[]) {
        return request({
            url: contextPath + '/entityapi/removemulti',
            method: "post",
            data: ids
        });
    },
    //endregion
    //region Microservice
    getMicroserviceMetaPage() {
        return request({
            url: contextPath + '/microservice/metapage',
            method: "post",
        });
    },
    getMicroservicePage(data: object) {
        return request({
            url: contextPath + '/microservice/page',
            method: "post",
            data: data
        });
    },
    insertMicroservice(data: object) {
        return request({
            url: contextPath + '/microservice/insert',
            method: "post",
            data: data
        });
    },
    updateMicroservice(data: object) {
        return request({
            url: contextPath + '/microservice/update',
            method: "post",
            data: data
        });
    },
    getMicroserviceEntity(id: String) {
        return request({
            url: contextPath + '/microservice/get',
            method: "post",
            params: {
                id: id
            }
        });
    },
    removeMicroservice(id: String) {
        return request({
            url: contextPath + '/microservice/remove',
            method: "post",
            params: {
                id: id
            }
        });
    },
    batchRemoveMicroservice(ids: String[]) {
        return request({
            url: contextPath + '/microservice/removemulti',
            method: "post",
            data: ids
        });
    },
    //endregion
    //region Application
    getApplicationMetaPage() {
        return request({
            url: contextPath + '/client/metapage',
            method: "post",
        });
    },
    getApplicationPage(data: object) {
        console.log(data);
        return request({
            url: contextPath + '/client/page',
            method: "post",
            data: data
        });
    },
    insertApplication(data: object) {
        return request({
            url: contextPath + '/client/insert',
            method: "post",
            data: data
        });
    },
    updateApplication(data: object) {
        return request({
            url: contextPath + '/client/update',
            method: "post",
            data: data
        });
    },
    getApplicationEntity(id: String) {
        return request({
            url: contextPath + '/client/get',
            method: "post",
            params: {
                id: id
            }
        });
    },
    removeApplication(id: String) {
        return request({
            url: contextPath + '/client/removeClient',
            method: "post",
            params: {
                id: id
            }
        });
    },
    batchRemoveApplication(ids: String[]) {
        return request({
            url: contextPath + '/client/removemulti',
            method: "post",
            data: ids
        });
    },
    //endregion
    //#region Interface
    getInterfaceMetaPage() {
        return request({
            url: contextPath + '/interface/metapage',
            method: "post",
        });
    },
    getInterfacePage(data: object) {
        return request({
            url: contextPath + '/interface/page',
            method: "post",
            data: data
        });
    },
    insertInterface(data: object) {
        return request({
            url: contextPath + '/interface/insert',
            method: "post",
            data: data
        });
    },
    updateInterface(data: object) {
        return request({
            url: contextPath + '/interface/update',
            method: "post",
            data: data
        });
    },
    getInterfaceEntity(id: String) {
        return request({
            url: contextPath + '/interface/get',
            method: "post",
            params: {
                id: id
            }
        });
    },
    removeInterface(id: String) {
        return request({
            url: contextPath + '/interface/remove',
            method: "post",
            params: {
                id: id
            }
        });
    },
    batchRemoveInterface(ids: String[]) {
        return request({
            url: contextPath + '/interface/removemulti',
            method: "post",
            data: ids
        });
    },
    //#endregion
    //#region DataLog
    getDataLogMetaPage() {
        return request({
            url: contextPath + '/datalog/metapage',
            method: "post",
        });
    },
    getDataLogPage(data: object) {
        return request({
            url: contextPath + '/datalog/page',
            method: "post",
            data: data
        });
    },
    getDataLogEntity(id: String) {
        return request({
            url: contextPath + '/datalog/get',
            method: "post",
            params: {
                id: id
            }
        });
    },
    //#endregion

    //#region ApplicationDetail
    getClientApiMetaPage() {
        return request({
            url: contextPath + '/clientapi/metapage',
            method: "post",
        });
    },
    getClientApiPage(data: object) {
        console.log(data);
        return request({
            url: contextPath + '/clientapi/page',
            method: "post",
            data: data
        });
    },
    getNotAuthorizationMetaPage() {
        return request({
            url: contextPath + '/clientapi/queryClientApi',
            method: "post",
        });
    },
    getNotAuthorizationPage(data: object) {
        console.log(data);
        const newData = { "limit": data.limit, "pageSize": data.pageSize, "pageNo": data.pageNo, "clientId": data.criteria.items[0] }

        return request({
            url: contextPath + '/clientapi/queryClientApi',
            method: "post",
            data: newData
        });
    }

    //#endregion

}
