"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapCustomer = mapCustomer;
exports.mapProduct = mapProduct;
exports.mapOrder = mapOrder;
exports.mapOrderItem = mapOrderItem;
exports.mapUserEvent = mapUserEvent;
function mapCustomer(row) {
    return { ...row, signup_date: new Date(row.signup_date) };
}
function mapProduct(row) {
    return row;
}
function mapOrder(row) {
    return { ...row, order_date: new Date(row.order_date) };
}
function mapOrderItem(row) {
    return row;
}
function mapUserEvent(row) {
    return { ...row, event_time: new Date(row.event_time) };
}
