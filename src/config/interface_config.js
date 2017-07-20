export default {
    'PAGE_SIZE': '32',
    'GET_BRAND_WITH_CATEGORYLIST': '/GetBrandWithCategory_List/', // 品牌列表页获取品牌信息
    'GET_BUY_CAR_GOOD_LIST': '/GetBuyCarGoodList/', // 点击底部导航栏进入购物袋页面获取购物袋列表数据
    'GET_USER_ACCOUNT_LIST': '/Get_User_AccountList/', // 个人中心用户余额记录列表
    'GET_USER_REDPACK_LIST': '/Get_user_red_packList/', // 个人中心用户红包记录列表
    'GET_POINT_LIST': '/Get_PointList/', // 个人中心用户积分记录列表
    'GET_MEMBERINFO_BONUSLIST': '/Get_MemberInfo_BonusList/', // 个人中心优惠券列表页
    'GET_APP_VARIOUSTYPE_ORDER_LIST': '/Get_APP_VariousType_OrderList/', // 个人中心手机订单
    'GET_MWIN_ORDER_LIST': '/Get_MWIN_OrderList_ByMemberId/', // 个人中心店铺订单
    'GET_ALL_ORDER_ENTITY': '/Get_ALLOrderEntity/', // 订单详情
    'GET_USER_ADDRESS_LIST': '/GetUserAddressList/', // 用户地址列表
    'UPDATE_ADDRESS_IS_DEFAULT': '/Update_AddressIsDefault/', // 更新默认地址
    'GET_ADDRESS_LIST': '/GetAddressList', // 获取省市区数据
    'ADD_ADDRESS': '/Add_Address/', // 新增地址上传数据
    'EDIT_ADDRESS': '/Edit_Address/', // 编辑地址上传数据
    'DEL_ADDRESS': '/Del_Address/', // 编辑地址上传数据
    'GET_FAVOURITE_GOODS_LIST': '/Get_FavoriteGoodsList/', // 获取收藏列表数据
    'DELETE_FAVOURITE_GOODS': '/Delete_FavoriteGoods/', // 删除选中的收藏商品
    'GET_ARTICLE_LIST': '/GetArticle_List/', // 获取文章列表数据
    'DEL_BUY_GOODS': '/DelBuyGood/', // 购物袋列表页删除选中的商品
    'BATCH_OPTIMIZE_BUY_CAR': '/BatchOptimize_BuyCar/', // 购物袋列表页商品批量删除
    'GET_BRAND_WITH_CATEGORY_PLUS_LIST': '/GetBrandWithCategoryPlus_List/', // 获取商品列表页顶部分类类别
    'GET_APP_PROPERTY_LIST': '/Get_APP_Property_List/', // 获取商品能被用于做过滤条件的属性
    'GET_ALL_GOODS_DETAIL_LIST': '/Get_ALL_Goods_Detail_List/', // 获取所有商品列表
    'GET_APP_SEARCH_GOOD_DETAIL_LIST_FORPRO': '/Get_APP_SearchGoodDetailList_ForPro/', // 使用过滤条件时获取商品列表
    'GET_SEARCH_LOG_LIST': '/Get_SearchLog_List/', // 搜索页获取热门搜索列表
    'GET_GOODS_DETAIL_LIST_GOODSID_MESSAGE': '/GetGoodsDetailList_GoodsIdMessage/',
    'GET_GOODS_SIZE': '/GetGoods_Size/', // 普通商品尺码
    'GET_SECKILL_GOODS_SIZE': '/GetSeckillGoods_Size/', // 秒杀活动的商品尺码
    'GET_INTERNAL_GOODS_SIZE': '/Get_Internal_GoodsSize/', // 员工内购专场商品尺码
    'CREATE_BUYCAR_INSERT': '/Create_BuyCar_Insert/', // 登录状态下添加商品到购物车
    'CREATE_INSERT_BUYCAR_UNLOGININ': '/Create_Insert_BuyCar_UnLoginIn/', // 未登录状态下添加商品到购物车
    'ADD_FAVORITEGOODS': '/Add_FavoriteGoods/', // 添加商品到我的收藏
    'DELETE_FAVORITEGOODS': '/Delete_FavoriteGoods/', // 取消收藏当前商品
    'GETSTOREAGECOUNT': '/GetStoreageCount/', // 获取购物车商品数量
    'GOODDETAIL_STORE_INVENTORY_QUERY': '/GoodDetail_StoreInventoryQuery/', // 获取库存查询结果列表
    'SEND_SMS': '/Send_SMS/', // 获取验证码
    'LOGIN_BY_CAPTCHA_BIND_PUSH': '/LoginInByCaptchaBindPush/', // 获取验证码
    'GET_USERINFO_PUSH': '/GetUserInfo_Push/', // 获取用户信息
    'GET_APP_ORDERCOUNT_BY_USERID': '/Get_APP_OrderCount_ByUserID/', // 获取个人中心订单信息

    /**
     * {userId}&{userName}&{sex}&{birthday}&{email}
     * userName为昵称
     */
    'UPDATEUSERS': '/UpdateUsers/', // 获取个人更新个人信息

    /**
     * {user_id}&{captcha}&{mobile_num}
     */
    'MODIFYUSERNAME': '/ModifyUserName/', // 修改绑定手机

    /**
     * {orderId}&{userId}
     */
    'CONFIRMGETGOODS': '/ConfirmGetGoods/', // 确认收货
    'GET_REASON_LIST': '/GetReason_List', // 获取退货原因列表


    /**
     * {related_order_id}
     * {userId}
     * {return_type} 目前只有退货，值为 1
     * {return_reason_Id}
     * {return_remark}
     * {consignee}
     * {telephone}
     * {districtId}
     * {addr}
     * {return_goodsnum}
     * {goods_id}
     * {product_id}
     * {goods_type}
     */
    'CREATE_RESHIPORDER': '/Create_ReshipOrder/', // 申请退换货
    'GET_MOTO_ORDER_CANCEL_REASON_LIST': '/Get_moto_order_cancel_reasonList', // 取消订单原因列表

    /**
     * {orderId}&{userId}&{cancelReasonId}
     */
    'CANCEL_ORDER_INFO': '/Cancel_OrderInfo/', // 取消订单

    /**
     * {orderId}
     */
    'GET_AUTO_CANCEL_TIME_BY_ORDER_ID': '/Get_AutoCancelTime_ByOrderID/', // 取消订单剩余时间




    /**
     * {userId}
     * {rec_ids}
     * {bonusId}
     * {IsUsePoint}
     * {IsUseBalance}
     * {IsStore} 传0
     * {addressId}
     * {isUsePromote}
     * {isUseRedPacket}
     */
    'GET_JIESUAN_LIST': '/Get_JieSuanList/', // 获取结算信息
    'GET_PAYMENT_LIST': '/GetPaymentList', // 获取支付方式
    'GET_RECETIME_LIST': '/GetReceTimeList', // 获取收货时间

    /**
     * {user_id}
     * {bonus_ids} 默认为0~如有需要可在跳转到优惠券选择列表时在url后带上请求参数
     * {pageIndex}
     * {pageSize}
     */
    'GET_BONUS_LIST': '/Get_BonusList/', // 结算页跳转到使用优惠券列表

    /**
     * {userId}&{addressId}&{paymentId}
     * {besttimeId} 收货时间id
     * {changeType} 目前为 1
     * {changeValue} 积分变动
     * {rec_ids}&{isStore}&{bonusId}&{surplus}&{postscript}&{condition_ids}&{redPacket}
     */
    'ADD_ORDERINFO_FOR_CHANGE_BY_PRODUCTIDS': '/Add_OrderInfo_ForChangeByProductIds/', // 提交订单
}
