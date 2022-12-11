// mock数据模拟
import Mock from 'mockjs'

// 图表数据
let list = []
export default {
    getStatisticalData: () => {
        // Mock.Random.float产生随机数100到8000之间 保留小数 最小0位
        for (let i = 0; i < 7; i++) {
            list.push(
                Mock.mock({
                    iphone: Mock.Random.float(100, 8000, 0, 0),
                    vivo: Mock.Random.float(100, 8000, 0, 0),
                    oppo: Mock.Random.float(100, 8000, 0, 0),
                    meizu: Mock.Random.float(100, 8000, 0, 0),
                    xiaomi: Mock.Random.float(100, 8000, 0, 0),
                    sumsung: Mock.Random.float(100, 8000, 0, 0),

                })
            )
        }
        return {
            code: 20000,
            data: {
                // 饼图·
                videoData: [

                    {
                        name: 'xiaomi',
                        value: 2999
                    },
                    {
                        name: 'iphone',
                        value: 5999
                    },
                    {
                        name: 'vivo',
                        value: 1899
                    },
                    {
                        name: 'oppo',
                        value: 3999
                    },
                    {
                        name: 'sumsung',
                        value: 4599
                    },
                    {
                        name: 'meizu',
                        value: 1999
                    },
                ],
                // 柱状图
                userData: [{
                        date: '周一',
                        new: 100,
                        active: 200
                    },
                    {
                        date: '周二',
                        new: 200,
                        active: 500
                    },
                    {
                        date: '周三',
                        new: 280,
                        active: 550
                    },
                    {
                        date: '周四',
                        new: 320,
                        active: 600
                    },
                    {
                        date: '周五',
                        new: 500,
                        active: 700
                    },
                    {
                        date: '周六',
                        new: 290,
                        active: 300
                    },
                    {
                        date: '周日',
                        new: 100,
                        active: 600
                    },
                ],
                // 折线图
                orderData: {
                    date: ['20221001', '20221002', '20221003', '20221004', '20221005', '20221006', '20221007'],
                    data: list
                },
                tableData: [{
                        name: "iphone",
                        todayBuy: 100,
                        monthBuy: 300,
                        totalBuy: 800,
                    },
                    {
                        name: "vivo",
                        todayBuy: 100,
                        monthBuy: 300,
                        totalBuy: 800,
                    },
                    {
                        name: "三星",
                        todayBuy: 100,
                        monthBuy: 300,
                        totalBuy: 800,
                    },
                    {
                        name: "小米",
                        todayBuy: 100,
                        monthBuy: 300,
                        totalBuy: 800,
                    },
                    {
                        name: "OPPO",
                        todayBuy: 100,
                        monthBuy: 300,
                        totalBuy: 800,
                    },
                    {
                        name: "魅族",
                        todayBuy: 100,
                        monthBuy: 300,
                        totalBuy: 800,
                    },
                ],
            }
        }
    }
}