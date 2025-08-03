/**
 * 世界地图数据
 */

const worldMap = {
    // 路径数据：每条路径都定义了起点、终点和距离
    paths: [
        // ====== 东洲内部路径 ======
        {
            source: "东洲", target: "百草山脉", direction: "向内探索",
            distance: 50, regions: ["东洲"] // 5 * 10
        },
        {
            source: "百草山脉", target: "东洲", direction: "向外探索",
            distance: 50, regions: ["百草山脉"] // 5 * 10
        },
        {
            source: "百草山脉", target: "药王谷", direction: "向内探索",
            distance: 30, regions: ["百草山脉"] // 3 * 10
        },
        {
            source: "药王谷", target: "百草山脉", direction: "向外探索",
            distance: 30, regions: ["百草山脉"] // 3 * 10
        },

        // ====== 东洲与其他大区域的路径 ======
        {
            source: "东洲", target: "中州", direction: "西",
            distance: 80, regions: ["东洲", "中州"] // 8 * 10
        },
        {
            source: "中州", target: "东洲", direction: "东",
            distance: 80, regions: ["中州", "东洲"] // 8 * 10
        },
        {
            source: "东洲", target: "北地", direction: "北",
            distance: 100, regions: ["东洲"] // 10 * 10
        },
        {
            source: "北地", target: "东洲", direction: "南",
            distance: 100, regions: ["北地"] // 10 * 10
        },
        {
            source: "东洲", target: "南荒", direction: "南",
            distance: 100, regions: ["东洲"] // 10 * 10
        },
        {
            source: "南荒", target: "东洲", direction: "北",
            distance: 100, regions: ["南荒"] // 10 * 10
        },

        // ====== 西漠内部路径 ======
        {
            source: "西漠", target: "通天剑冢", direction: "向内探索",
            distance: 40, regions: ["西漠"] // 4 * 10
        },
        {
            source: "通天剑冢", target: "西漠", direction: "向外探索",
            distance: 40, regions: ["通天剑冢"] // 4 * 10
        },
        {
            source: "西漠", target: "灵山", direction: "向内探索",
            distance: 60, regions: ["西漠"] // 6 * 10
        },
        {
            source: "灵山", target: "西漠", direction: "向外探索",
            distance: 60, regions: ["灵山"] // 6 * 10
        },
        {
            source: "西漠", target: "万剑山", direction: "向内探索",
            distance: 70, regions: ["西漠"] // 7 * 10
        },
        {
            source: "万剑山", target: "西漠", direction: "向外探索",
            distance: 70, regions: ["万剑山"] // 7 * 10
        },
        {
            source: "灵山", target: "大自在殿", direction: "向内探索",
            distance: 20, regions: ["灵山"] // 2 * 10
        },
        {
            source: "大自在殿", target: "灵山", direction: "向外探索",
            distance: 20, regions: ["大自在殿"] // 2 * 10
        },

        // ====== 西漠与其他大区域的路径 ======
        {
            source: "西漠", target: "中州", direction: "东",
            distance: 80, regions: ["西漠", "中州"] // 8 * 10
        },
        {
            source: "中州", target: "西漠", direction: "西",
            distance: 80, regions: ["中州", "西漠"] // 8 * 10
        },
        {
            source: "西漠", target: "南荒", direction: "南",
            distance: 60, regions: ["西漠"] // 6 * 10
        },
        {
            source: "南荒", target: "西漠", direction: "北",
            distance: 60, regions: ["南荒"] // 6 * 10
        },

        // ====== 中州内部路径 ======
        {
            source: "中州", target: "琼华京", direction: "向内探索",
            distance: 50, regions: ["中州"] // 5 * 10
        },
        {
            source: "琼华京", target: "中州", direction: "向外探索",
            distance: 50, regions: ["琼华京"] // 5 * 10
        },
        {
            source: "琼华京", target: "修仙世家", direction: "向内探索",
            distance: 20, regions: ["琼华京"] // 2 * 10
        },
        {
            source: "修仙世家", target: "琼华京", direction: "向外探索",
            distance: 20, regions: ["修仙世家"] // 2 * 10
        },
        {
            source: "中州", target: "天柱峰", direction: "向内探索",
            distance: 60, regions: ["中州"] // 6 * 10
        },
        {
            source: "天柱峰", target: "中州", direction: "向外探索",
            distance: 60, regions: ["天柱峰"] // 6 * 10
        },
        {
            source: "天柱峰", target: "凌霄宗", direction: "向内探索",
            distance: 30, regions: ["天柱峰"] // 3 * 10
        },
        {
            source: "凌霄宗", target: "天柱峰", direction: "向外探索",
            distance: 30, regions: ["凌霄宗"] // 3 * 10
        },

        // ====== 南荒内部路径 ======
        {
            source: "南荒", target: "欲望之都", direction: "向内探索",
            distance: 50, regions: ["南荒"] // 5 * 10
        },
        {
            source: "欲望之都", target: "南荒", direction: "向外探索",
            distance: 50, regions: ["欲望之都"] // 5 * 10
        },
        {
            source: "欲望之都", target: "合欢宗", direction: "向内探索",
            distance: 20, regions: ["欲望之都"] // 2 * 10
        },
        {
            source: "合欢宗", target: "欲望之都", direction: "向外探索",
            distance: 20, regions: ["合欢宗"] // 2 * 10
        },
        {
            source: "南荒", target: "仙音岛", direction: "向内探索",
            distance: 70, regions: ["南荒"] // 7 * 10
        },
        {
            source: "仙音岛", target: "南荒", direction: "向外探索",
            distance: 70, regions: ["仙音岛"] // 7 * 10
        },
        {
            source: "仙音岛", target: "妙音门", direction: "向内探索",
            distance: 30, regions: ["仙音岛"] // 3 * 10
        },
        {
            source: "妙音门", target: "仙音岛", direction: "向外探索",
            distance: 30, regions: ["妙音门"] // 3 * 10
        },
        {
            source: "南荒", target: "十万大山", direction: "向内探索",
            distance: 80, regions: ["南荒"] // 8 * 10
        },
        {
            source: "十万大山", target: "南荒", direction: "向外探索",
            distance: 80, regions: ["十万大山"] // 8 * 10
        },

        // ====== 北地内部路径 ======
        {
            source: "北地", target: "观星崖", direction: "向内探索",
            distance: 40, regions: ["北地"] // 4 * 10
        },
        {
            source: "观星崖", target: "北地", direction: "向外探索",
            distance: 40, regions: ["观星崖"] // 4 * 10
        },
        {
            source: "观星崖", target: "星机阁", direction: "向内探索",
            distance: 20, regions: ["观星崖"] // 2 * 10
        },
        {
            source: "星机阁", target: "观星崖", direction: "向外探索",
            distance: 20, regions: ["星机阁"] // 2 * 10
        },
        {
            source: "北地", target: "魔域", direction: "向内探索",
            distance: 60, regions: ["北地"] // 6 * 10
        },
        {
            source: "魔域", target: "北地", direction: "向外探索",
            distance: 60, regions: ["魔域"] // 6 * 10
        },
    ],
    // 这里可以存储每个地点的详细描述
    locations: {
        "东洲": "广阔的修仙大陆，以繁荣的贸易和众多的宗门闻名。",
        "百草山脉": "东洲境内的一处广袤山脉，以其丰富的草药资源而闻名。",
        "药王谷": "百草山脉中的一处山谷，药香弥漫，灵气充裕。",
        "西漠": "广袤无垠的沙漠地带，隐藏着古老的遗迹和强大的剑冢。",
        "通天剑冢": "西漠深处的神秘剑冢，埋葬着无数仙剑。",
        "灵山": "西漠中的一座灵山，佛音袅袅，是修炼者的圣地。",
        "大自在殿": "灵山之巅的一座雄伟大殿。",
        "万剑山": "一座由无数剑气凝聚而成的山峰。",
        "中州": "大陆的中心地带，皇权与仙门并立。",
        "琼华京": "中州的主城，凡人与修仙者混居。",
        "修仙世家": "琼华京内的修仙世家府邸。",
        "天柱峰": "中州的一座高耸入云的山峰。",
        "凌霄宗": "天柱峰上的修仙大宗。",
        "南荒": "充满毒虫瘴气的神秘地域，也是妖兽和魔道的乐园。",
        "欲望之都": "南荒的一座不夜城，充满诱惑与交易。",
        "合欢宗": "欲望之都内的宗门。",
        "仙音岛": "南荒海域中的一座孤岛，常年被仙音环绕。",
        "妙音门": "仙音岛上的宗门。",
        "十万大山": "南荒深处绵延不绝的山脉。",
        "北地": "冰雪覆盖的严寒之地，隐藏着古老的秘密。",
        "观星崖": "北地的一处悬崖，是观星的好地方。",
        "星机阁": "观星崖上的宗门，以推演天机闻名。",
        "魔域": "北地深处的魔道聚集地。"
    },
    // 已知地点列表
    knownLocations: [
        "东洲", "百草山脉", "药王谷", 
        "北地", "观星崖", "星机阁"
    ]
};

// 获取从当前位置可以前往的方向
function getAvailableDirections(currentLocation) {
    // 过滤出以当前位置为起点的所有路径
    const availablePaths = worldMap.paths.filter(path => path.source === currentLocation);
    
    // 提取这些路径的方向
    const directions = availablePaths.map(path => path.direction);
    
    // 返回去重后的方向列表
    return [...new Set(directions)];
}

// 获取从当前位置沿指定方向可以到达的目标
function getTargetByDirection(currentLocation, direction) {
    // 过滤出以当前位置为起点且方向匹配的路径
    const matchingPaths = worldMap.paths.filter(
        path => path.source === currentLocation && path.direction === direction
    );
    
    // 如果找到匹配的路径，返回目标位置
    if (matchingPaths.length > 0) {
        return {
            target: matchingPaths[0].target,
            distance: matchingPaths[0].distance,
            regions: matchingPaths[0].regions
        };
    }
    
    // 如果没有找到匹配的路径，返回null
    return null;
}

// 检查位置是否已知
function isLocationKnown(location) {
    return worldMap.knownLocations.includes(location);
}

// 添加新的已知位置
function addKnownLocation(location) {
    if (!isLocationKnown(location)) {
        worldMap.knownLocations.push(location);
    }
}

// 获取位置描述
function getLocationDescription(location) {
    return worldMap.locations[location] || "一个神秘的地方";
}
