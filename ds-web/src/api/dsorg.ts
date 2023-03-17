/**
 * dsorg api
 */
import request from "@dscloud/utils/request";
const contextPath = "/dsmain";
export default {
  // #region Dept 岗位管理
  getPositionMetaPage() {
    return request({
      url: contextPath + "/position/metapage",
      method: "post",
    });
  },
  getPositionPage(data: object) {
    return request({
      url: contextPath + "/position/page",
      method: "post",
      data: data,
    });
  },
  removePosition(id: String) {
    return request({
      url: contextPath + "/position/remove",
      method: "post",
      params: {
        id: id,
      },
    });
  },
  getPositionEntity(id: String) {
    return request({
      url: contextPath + "/position/get",
      method: "post",
      params: {
        id: id,
      },
    });
  },
  updatePosition(data: object) {
    return request({
      url: contextPath + "/position/update",
      method: "post",
      data: data,
    });
  },
  insertPosition(data: object) {
    return request({
      url: contextPath + "/position/insert",
      method: "post",
      data: data,
    });
  },
  batchRemovePosition(ids: String[]) {
    return request({
      url: contextPath + "/position/removeMulti",
      method: "post",
      data: ids,
    });
  },
  // #endregion
  // #region Dept 部门管理
  insertDept(data: object) {
    return request({
      url: contextPath + "/dept/insert",
      method: "post",
      data: data,
    });
  },
  removeDept(id: string) {
    return request({
      url: contextPath + "/dept/remove",
      method: "post",
      params: { id: id },
    });
  },
  updateDept(data: object) {
    return request({
      url: contextPath + "/dept/update",
      method: "post",
      data: data,
    });
  },
  getDeptList() {
    return request({
      url: contextPath + "/dept/findList",
      method: "post",
    });
  },
  adjustDept(data: object) {
    return request({
      url: contextPath + "/dept/adjust",
      method: "post",
      data: data,
    });
  },
  // #endregion
  // #region  Role 角色管理
  getRoleMetaPage() {
    return request({
      url: contextPath + "/role/metapage",
      method: "post",
    });
  },
  getRolePage(data: object) {
    return request({
      url: contextPath + "/role/page",
      method: "post",
      data: data,
    });
  },
  getRoleEntity(id: String) {
    return request({
      url: contextPath + "/role/get",
      method: "post",
      params: {
        id: id,
      },
    });
  },
  insertRole(data: object) {
    return request({
      url: contextPath + "/role/insert",
      method: "post",
      data: data,
    });
  },
  updateRole(data: object) {
    return request({
      url: contextPath + "/role/update",
      method: "post",
      data: data,
    });
  },
  removeRole(id: string) {
    return request({
      url: contextPath + "/role/remove",
      method: "post",
      params: { id: id },
    });
  },
  batchRemoveRole(ids: String[]) {
    return request({
      url: contextPath + "/role/removeMulti",
      method: "post",
      data: ids,
    });
  },
  // #endregion
  // #region User 角色成员管理
  getRole4UserMetaPage() {
    return request({
      url: contextPath + "/role4User/metapage",
      method: "post",
    });
  },
  getRole4UserPage(data: object) {
    return request({
      url: contextPath + "/role4User/page",
      method: "post",
      data: data,
    });
  },
  // getRole4EmployeeMetaPage() {
  //   return request({
  //     url: contextPath + "/role4employee/metapage",
  //     method: "post",
  //   });
  // },
  // 获取角色列表数据
  // getRole4EmployeePage(data: object) {
  //   return request({
  //     url: contextPath + "/role4employee/page",
  //     method: "post",
  //     data: data,
  //   });
  // },
  // 编辑角色成员
  updateMemberOfRoleRole(data: object) {
    return request({
      url: contextPath + "/user/updateMulti",
      method: "post",
      data: data,
    });
  },
  getUserPage(data: object) {
    return request({
      url: contextPath + "/user/page",
      method: "post",
      data: data,
    });
  },
  getModuleData(parentId: string) {
    return request({
      url: contextPath + "/module/getlistbypid",
      method: "post",
      params: { parentId: parentId },
    });
  },
  getMenuListByPid(moduleId: string) {
    return request({
      url: contextPath + "/role//findMenuData",
      method: "post",
      params: {
        moduleId: moduleId,
      },
    });
  },
  getClientPage(data: object) {
    return request({
      url: contextPath + "/client/page",
      method: "post",
      data: data,
    });
  },
  getRoleapiMetaPage() {
    return request({
      url: contextPath + "/roleapi/metapage",
      method: "post",
    });
  },
  getRoleapiPage(data: object) {
    return request({
      url: contextPath + "/roleapi/page",
      method: "post",
      data: data,
    });
  },
  // #endregion
  // #region systemparams系统参数
  getSystemParams(data: object) {
    console.log(data);
    return request({
      url: contextPath + "/parameter/get",
      method: "post",
      data: data,
    });
  },
  saveSystemParams(data: object) {
    console.log(data);
    return request({
      url: contextPath + "/parameter/save",
      method: "post",
      data: data,
    });
  },
  //#endregion

};
