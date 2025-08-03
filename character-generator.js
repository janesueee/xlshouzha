/**
 * 仙侠游戏角色生成系统
 * 基于模板随机生成角色信息
 */

// 角色生成器类
class CharacterGenerator {
    constructor() {
        // 初始化数据库
        this.initializeDatabase();
        
        // 存储已生成的姓名，避免重复
        this.generatedNames = new Set();
    }

    // 初始化数据库
    initializeDatabase() {
        // 姓氏库
        this.lastNames = [
            "司", "洛", "言", "岑", "沈", "姬", "萧", "顾", "封", "容", "谢", "霍", 
            "赫连", "燕", "花", "玄", "楚", "陆", "阮", "纪", "林", "云", "江", "苏", 
            "夜", "尹", "秦", "闻人", "白", "莫", "唐", "季", "柏", "宁", "展", "韩", 
            "钟离", "温", "孟", "魏", "南宫", "荆", "仲", "桑", "梁", "沈", "叶", "步", 
            "明", "司马", "蓝", "慕容", "风"
        ];

        // 名字库
        this.firstNames = [
            "墨", "烨", "珩", "澈", "尘", "昙", "璃", "珂", "卿", "澜", "翊", "暝", 
            "昭", "渊", "栩", "衡", "湛", "霁", "漓", "辰", "弦", "祁", "霖", "炽", 
            "翎", "锦", "煦", "骁", "瑾", "澈", "岚", "衍", "枫", "璟", "烨", "溟", 
            "觞", "子潇", "无垢", "若尘", "澈言", "夜煜", "青漓", "清岚", "辰光", 
            "云归", "寒生", "璃歌", "玄澈", "烨霖", "昭明", "子衍", "玉笙", "靖玄", 
            "晏歌", "无霜", "凌羽", "初晗", "疏影", "辞月", "远舟", "芷言", "寒烛", 
            "镜寒", "玉珩", "修然", "浮黎", "灵虚", "绛流", "顾昀", "归晚", "羽策", 
            "长珩", "青瑜", "玄璇", "流觞", "鹤羽", "江迟", "夜衡", "风吟", "落修", 
            "曜阳", "夜阑", "暮楚", "云翎", "晏临", "沉曜", "明烬"
        ];

        // 性别
        this.genders = ["男性", "女性"];

        // 关系
        this.relationships = [
            "师父", "同门", "情敌", "道侣", "救命恩人", "仇人", "守护者", "上司", "徒弟", "爱慕者"
        ];

        // 修炼类型及对应门派
        this.cultivationTypes = {
            "剑修": "万剑山",
            "法修": ["修仙世家", "凌霄宗"],
            "丹修": "药王谷",
            "符修": "星机阁",
            "音修": "妙音门",
            "双修": "合欢宗",
            "妖修": "十万大山",
            "佛修": "大自在殿",
            "魔修": "魔域"
        };

        // 门派与身份对应关系
        this.sectIdentities = {
            "药王谷": ["长老", "弟子", "谷主"],
            "凌霄宗": ["长老", "弟子", "宗主"],
            "妙音门": ["长老", "弟子", "门主"],
            "万剑山": ["长老", "弟子", "剑尊"],
            "星机阁": ["长老", "弟子", "阁主"],
            "合欢宗": ["长老", "弟子", "宗主"],
            "大自在殿": ["长老", "弟子", "佛子"],
            "魔域": ["长老", "人士", "魔尊"],
            "修仙世家": ["普通家族", "名门望族"],
            "十万大山": ["狼族", "虎族", "兔族", "蛇族", "狐族"]
        };

        // 修为阶段
        this.cultivationLevels = [
            "练气", "筑基", "金丹", "元婴", "化神", "炼虚", "合体", "大乘", "渡劫", "飞升"
        ];

        // 修为阶段细分
        this.cultivationSubLevels = ["初期", "中期", "后期", "巅峰"];

        // 发型颜色
        this.hairColors = [
            "红", "橙", "黄", "绿", "青", "蓝", "紫", "黑", "墨绿", "黛", "棕", "银", "白色"
        ];

        // 发型样式
        this.hairStyles = ["长发披散", "长发竖起", "长发编成辫子", "短发"];

        // 眼睛类型
        this.eyeTypes = ["丹凤眼", "桃花眼", "狭长鹰目"];

        // 瞳色
        this.eyeColors = [
            "血红", "纯白", "红色", "橙色", "黄色", "绿色", "青色", "紫色", "黑色", 
            "金色", "粉色", "灰色", "银色"
        ];

        // 肤色
        this.skinTones = [
            "冷白", "偏黑", "小麦色", "蜜色", "古铜色", "苍白", "粉白", "正常"
        ];

        // 特质 - 女性
        this.femaleTraits = ["柔美", "小家碧玉", "英气飒爽", "面若桃花"];

        // 特质 - 男性
        this.maleTraits = ["喉结明显", "英气逼人", "剑眉星目", "棱角分明", "面如冠玉"];

        // 特质 - 通用
        this.commonTraits = [
            "五官精致", "表情淡漠", "似笑非笑", "面容俊秀", "长睫毛", "眼带疤", 
            "脸部红斑", "显眼胎记", "耳朵打孔", "朱砂痣", "气质优雅", "鼻梁高挺", "眼神空洞"
        ];

        // 服饰 - 按门派
        this.attiresBySect = {
            "药王谷": [
                "月白色宽袖长袍", "衣角暗绣草药纹", "腰间悬铜铃", 
                "青绿色双层袍衣", "云纹滚边", "背负药箱", 
                "灰白长衫", "袖口淡蓝", "佩有玉瓶与药匙", 
                "藕荷色对襟长衫", "衣摆绘有灵芝图腾"
            ],
            "万剑山": [
                "深蓝束腰劲装", "背负长剑", "左肩银纹剑徽", 
                "玄青修身战袍", "衣袖内藏短刃", "腰挂玉牌", 
                "墨色云纹披风", "内衫铁青", "右肩挂剑穗", 
                "银灰色长袍", "衣角剑气符文", "绣有飞剑标志"
            ],
            "十万大山": [
                "短打劲衣", "披兽皮", "棕色轻甲外罩", 
                "腰系兽牙", "肌肉外露", "赤足无鞋", 
                "腰挂骨饰", "灰白羽裘", "膝缠藤蔓护甲"
            ],
            "散修人士": [
                "桔黄色粗布衣", "简洁长袍", "金丝织就华服", 
                "短裳", "兽纹斗篷", "轻衫", 
                "披风", "素白粗麻衣", "漆黑短打束衣"
            ],
            "星机阁": [
                "淡紫星纹长袍", "袖口浮光跃彩", "衣角绣云辰图", 
                "浅蓝纱衣", "衣面点点星尘流转", "胸口佩灵镜", 
                "白色轻袍", "领口绣星盘", "左袖藏占卜纸符", 
                "银蓝渐变长衫", "腰挂星砂囊", "背绘流光图阵"
            ],
            "凌霄宗": [
                "素白云纹道袍", "淡蓝宽袖长袍", "银线织雾气图案", 
                "腰系玉佩", "月华银衫", "肩披蓝缎披风", 
                "冰蓝立领道袍", "内衬寒纹锦缎", "足踏白靴", 
                "颈缀冰羽挂坠"
            ],
            "修仙世家": [
                "青缎暗花袍", "金丝绣族徽", "手戴玉指环", 
                "银灰直襟长衫", "袍边嵌青玉流纹", "靴面光亮如镜", 
                "深蓝方领服饰", "衣襟镶翠金线", "肩饰家族印记", 
                "紫玉纹锦衣", "银白流苏缀带", "背系长飘巾"
            ],
            "妙音门": [
                "月白轻纱衣", "袖角悬银铃", "步履无声", 
                "浅粉曳地长裙", "胸饰花形琴纹", "腰缠柔云飘带", 
                "水绿织音裙", "鞋头藏金片音珠", "耳垂金坠细响", 
                "紫烟半袖纱衫", "鬓边插骨笛", "手戴凤羽音环"
            ],
            "合欢宗": [
                "绯红露肩长裙", "袖边绣梅", "腰系金链珠挂", 
                "黑紫贴身劲衣", "裙开叉至腿根", "胸口绣曼陀罗花", 
                "桃粉薄纱", "半披长袖", "颈圈坠心型琉璃", 
                "烟灰低胸软袍", "后腰绸缎蝴蝶结", "足踏红纹高履"
            ],
            "大自在殿": [
                "灰色麻布僧衣", "腰束素绦", "足踏木屐", 
                "褐红宽袖法袍", "胸前绘金轮纹", "手执念珠", 
                "素白直裾", "袍袖无饰", "颈佩檀木佛牌", 
                "黄麻高领袍", "袍襟刻咒文图案", "足履草编履"
            ],
            "魔域": [
                "黑红长袍", "衣角刻咒阵", "袍背张裂翼图腾", 
                "深紫紧身服", "肩披冥纹披风", "手指缠黑雾戒", 
                "鬼青法袍", "袖内藏骨刃", "脚踏邪火软靴", 
                "血纹玄黑斗篷", "下摆拖地", "胸口镶嵌魔晶", 
                "黑紫色裘衣", "袖口藏红", "银链缠绕颈侧", 
                "暗红皮衣", "衣摆形如鬼面", "耳戴骨制饰物", 
                "乌金披风", "长袍内衬血符", "脚踩黑纹靴", 
                "碧黑修身长衣", "左臂缠绷带", "胸口符箓若隐"
            ]
        };

        // 身材 - 男性
        this.maleBodyTypes = ["清瘦", "宽肩窄腰", "健壮魁梧", "瘦削有力"];

        // 身材 - 女性
        this.femaleBodyTypes = ["柔软", "纤细", "凹凸有致", "玲珑身段", "丰腴"];

        // 身材 - 通用
        this.commonBodyTypes = ["身形修长"];

        // 性器 - 男性
        this.maleGenitals = ["尺寸小巧", "适中", "粗长", "硕大"];

        // 性器 - 女性
        this.femaleGenitals = ["正常", "无毛"];

        // 气味 - 按门派
        this.scentsBySect = {
            "凌霄宗": ["寒梅香", "雪松气", "松脂香"],
            "十万大山": ["兽皮味", "野草香", "山泉气息"],
            "修仙世家": ["沉香", "书墨香", "朱砂味"],
            "妙音门": ["檀香", "花蜜气", "琴弦余音"],
            "合欢宗": ["麝香", "红莲香", "甜果味"],
            "大自在殿": ["佛香", "焚香烟气", "古木香"],
            "魔域": ["血腥气", "腐败甜香", "魔气外溢"]
        };

        // 气味 - 按性格
        this.scentsByPersonality = {
            "清冷疏离": ["霜雪味", "银叶冷香"],
            "温柔体贴": ["茉莉香", "杏花甜香"],
            "暴躁嗜杀": ["铁锈味", "焦木气"],
            "多情": ["体香浓郁", "蜜桃味"],
            "冷静理智": ["淡墨香", "青竹气"],
            "依赖": ["甜中带涩的花香", "焚心香气"]
        };

        // 性格
        this.personalities = [
            "清冷疏离", "心思缜密", "掌控欲强", "喜怒不形于色", "外柔内刚", 
            "理智克制", "依赖", "极度偏执", "宠溺纵容", "暴躁冲动", 
            "伪善温柔", "口是心非", "绝对服从", "极强自尊", "孤傲冷淡", 
            "极端理想主义", "多疑善变", "恬静安然", "癫狂不羁", "温润如玉", 
            "偏执占有", "冷酷无情", "羞涩内敛", "口嫌体正直"
        ];

        // 爱情观
        this.loveConcepts = [
            "玩世不恭，情不入心", "专一", "为爱疯魔，无所不用", "若即若离，以爱为枷", 
            "占有欲强，掌控欲强", "情种", "追求大道", "崇尚自由"
        ];

        // 性癖
        this.sexualPreferences = [
            "抖m", "抖s", "施虐欲", "束缚", "道具", "主仆调教", "讨好对方", 
            "捆绑", "异族特征", "舔舐", "啃咬标记"
        ];

        // 爱好
        this.hobbies = [
            "养花种草", "炼丹制器", "读古籍", "品茶", "练剑习武", "抚琴作画", 
            "游山访道", "收集稀世灵材", "研究心法", "制作香囊", "饲养灵兽", 
            "听雨观星", "漫步夜市", "喜写日记", "偷听八卦"
        ];

        // 特质
        this.specialTraits = [
            "炼丹奇才", "浴火重生", "天之骄子", "心魔深种", "身藏禁术", 
            "九死一生", "命带孤星", "前世恋人"
        ];

        // 态度
        this.attitudes = [
            "心生恋慕", "极度迷恋", "冷淡疏离", "暗藏杀意", "忠诚守护", 
            "畏惧", "依赖", "好奇", "欣赏", "厌恶", "面和心冷", 
            "亲昵", "渴望接近", "隐忍妒意", "抱有戒心", "信任", "言听计从"
        ];
    }

    // 随机选择数组中的一个元素
    randomChoice(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    // 随机选择数组中的多个元素
    randomMultipleChoice(array, min, max) {
        const count = Math.floor(Math.random() * (max - min + 1)) + min;
        const result = [];
        const arrayCopy = [...array];
        
        for (let i = 0; i < count && arrayCopy.length > 0; i++) {
            const index = Math.floor(Math.random() * arrayCopy.length);
            result.push(arrayCopy[index]);
            arrayCopy.splice(index, 1);
        }
        
        return result;
    }

    // 生成随机年龄
    generateAge() {
        // 根据修为阶段调整年龄范围
        return Math.floor(Math.random() * (500 - 18 + 1)) + 18;
    }

    // 生成随机身高
    generateHeight() {
        return Math.floor(Math.random() * (195 - 155 + 1)) + 155;
    }

    // 生成姓名
    generateName() {
        let fullName;
        let attempts = 0;
        const maxAttempts = 100; // 防止无限循环
        
        do {
            const lastName = this.randomChoice(this.lastNames);
            const firstName = this.randomChoice(this.firstNames);
            fullName = lastName + firstName;
            attempts++;
        } while (this.generatedNames.has(fullName) && attempts < maxAttempts);
        
        this.generatedNames.add(fullName);
        return fullName;
    }

    // 生成身份
    generateIdentity() {
        const gender = this.randomChoice(this.genders);
        const relationship = this.randomChoice(this.relationships);
        
        // 随机选择修炼类型
        const cultivationType = this.randomChoice(Object.keys(this.cultivationTypes));
        
        // 获取对应的门派
        let sect;
        if (Array.isArray(this.cultivationTypes[cultivationType])) {
            sect = this.randomChoice(this.cultivationTypes[cultivationType]);
        } else {
            sect = this.cultivationTypes[cultivationType];
        }
        
        // 获取对应的身份
        let identity;
        if (sect === "散修") {
            identity = "散修人士";
        } else {
            const possibleIdentities = this.sectIdentities[sect];
            
            // 如果是十万大山，特殊处理
            if (sect === "十万大山") {
                const race = this.randomChoice(possibleIdentities);
                // 随机决定是否是妖王
                const isKing = Math.random() < 0.2; // 20%的概率是妖王
                identity = isKing ? `${race}妖王` : race;
            } else {
                identity = this.randomChoice(possibleIdentities);
                
                // 如果是首领身份，确保唯一性
                if (identity === "谷主" || identity === "宗主" || identity === "门主" || 
                    identity === "剑尊" || identity === "阁主" || identity === "佛子" || 
                    identity === "魔尊") {
                    // 这里应该检查是否已经存在该首领
                    // 但由于我们没有全局状态，暂时不实现这个检查
                }
            }
        }
        
        // 生成修为
        const cultivationLevel = this.randomChoice(this.cultivationLevels);
        const subLevel = this.randomChoice(this.cultivationSubLevels);
        const fullLevel = `${cultivationLevel}${subLevel}`;
        
        // 如果是长老/首领/妖王，确保修为在金丹以上
        if ((identity === "长老" || identity.includes("主") || identity.includes("尊") || 
             identity.includes("子") || identity.includes("妖王")) && 
            (cultivationLevel === "练气" || cultivationLevel === "筑基")) {
            // 重新生成更高的修为
            const highLevels = this.cultivationLevels.slice(2); // 从金丹开始
            const newLevel = this.randomChoice(highLevels);
            const newSubLevel = this.randomChoice(this.cultivationSubLevels);
            return `${gender}/${relationship}/${cultivationType}/${sect}${identity}/${newLevel}${newSubLevel}`;
        }
        
        return `${gender}/${relationship}/${cultivationType}/${sect}${identity}/${fullLevel}`;
    }

    // 生成外表
    generateAppearance(gender) {
        // 发型
        const hairColor = this.randomChoice(this.hairColors);
        const hairStyle = this.randomChoice(this.hairStyles);
        const hair = `${hairColor}${hairStyle}`;
        
        // 眼睛
        const eyeFeatures = [];
        // 随机决定是否有特殊眼型
        if (Math.random() < 0.7) { // 70%的概率有特殊眼型
            eyeFeatures.push(this.randomChoice(this.eyeTypes));
        }
        
        // 随机决定是否有特殊瞳色
        if (Math.random() < 0.8) { // 80%的概率有特殊瞳色
            eyeFeatures.push(`瞳色${this.randomChoice(this.eyeColors)}`);
        }
        
        // 随机决定是否失明
        if (Math.random() < 0.05) { // 5%的概率失明
            eyeFeatures.push("失明");
        }
        
        const eyes = eyeFeatures.join("/");
        
        // 肤色
        const skin = `肤色${this.randomChoice(this.skinTones)}`;
        
        // 特质
        let traits = [];
        if (gender === "女性") {
            traits = traits.concat(this.randomMultipleChoice(this.femaleTraits, 0, 1));
        } else {
            traits = traits.concat(this.randomMultipleChoice(this.maleTraits, 0, 1));
        }
        
        // 添加通用特质
        traits = traits.concat(this.randomMultipleChoice(this.commonTraits, 0, 2));
        
        const traitsStr = traits.length > 0 ? `/${traits.join("/")}` : "";
        
        return `${hair}/${eyes}/${skin}${traitsStr}`;
    }

    // 生成穿着
    generateAttire(identity) {
        // 从身份中提取门派
        const parts = identity.split("/");
        const sectPart = parts[3]; // 格式是"门派身份"
        
        // 提取门派名称
        let sect = "";
        for (const key of Object.keys(this.sectIdentities)) {
            if (sectPart.includes(key)) {
                sect = key;
                break;
            }
        }
        
        // 如果没有找到对应门派，使用散修人士的服饰
        if (!sect || !this.attiresBySect[sect]) {
            sect = "散修人士";
        }
        
        // 随机选择1-3个服饰特征
        const attireCount = Math.floor(Math.random() * 3) + 1;
        const attires = [];
        
        for (let i = 0; i < attireCount; i++) {
            if (this.attiresBySect[sect].length > 0) {
                const index = Math.floor(Math.random() * this.attiresBySect[sect].length);
                attires.push(this.attiresBySect[sect][index]);
                // 避免重复
                this.attiresBySect[sect].splice(index, 1);
                
                // 如果没有更多服饰可选，跳出循环
                if (this.attiresBySect[sect].length === 0) {
                    break;
                }
            }
        }
        
        return attires.join("/");
    }

    // 生成身材
    generateFigure(gender) {
        // 身高
        const height = this.generateHeight();
        
        // 身材
        let bodyType;
        if (gender === "男性") {
            bodyType = this.randomChoice([...this.maleBodyTypes, ...this.commonBodyTypes]);
        } else {
            bodyType = this.randomChoice([...this.femaleBodyTypes, ...this.commonBodyTypes]);
        }
        
        // 性器
        let genital;
        if (gender === "男性") {
            genital = `性器${this.randomChoice(this.maleGenitals)}`;
        } else {
            genital = `性器${this.randomChoice(this.femaleGenitals)}`;
        }
        
        return `${height}cm/${bodyType}/${genital}`;
    }

    // 生成气味
    generateScent(identity, personalities) {
        const scents = [];
        
        // 从身份中提取门派
        const parts = identity.split("/");
        const sectPart = parts[3]; // 格式是"门派身份"
        
        // 提取门派名称
        let sect = "";
        for (const key of Object.keys(this.scentsBySect)) {
            if (sectPart.includes(key)) {
                sect = key;
                break;
            }
        }
        
        // 如果找到对应门派的气味，添加一个
        if (sect && this.scentsBySect[sect]) {
            scents.push(this.randomChoice(this.scentsBySect[sect]));
        }
        
        // 根据性格添加气味
        for (const personality of personalities) {
            if (this.scentsByPersonality[personality]) {
                scents.push(this.randomChoice(this.scentsByPersonality[personality]));
                break;
            }
        }
        
        // 如果没有找到任何气味，添加一个默认气味
        if (scents.length === 0) {
            scents.push("淡淡的体香");
        }
        
        // 随机决定返回1个或多个气味
        const scentCount = Math.random() < 0.7 ? 1 : Math.min(scents.length, 2);
        return scents.slice(0, scentCount).join("/");
    }

    // 生成性格
    generatePersonality() {
        // 随机生成2-8个性格特点
        const count = Math.floor(Math.random() * 7) + 2; // 2到8个
        return this.randomMultipleChoice(this.personalities, count, count);
    }

    // 生成爱情观
    generateLoveConcept() {
        // 随机生成1-2个爱情观
        const count = Math.random() < 0.7 ? 1 : 2; // 70%概率是1个，30%概率是2个
        return this.randomMultipleChoice(this.loveConcepts, count, count);
    }

    // 生成性癖
    generateSexualPreference() {
        // 随机生成1-3个性癖
        const count = Math.floor(Math.random() * 3) + 1; // 1到3个
        return this.randomMultipleChoice(this.sexualPreferences, count, count);
    }

    // 生成爱好
    generateHobby() {
        // 随机生成1-3个爱好
        const count = Math.floor(Math.random() * 3) + 1; // 1到3个
        return this.randomMultipleChoice(this.hobbies, count, count);
    }

    // 生成特质
    generateSpecialTrait() {
        // 随机生成0-3个特质
        const count = Math.floor(Math.random() * 4); // 0到3个
        return this.randomMultipleChoice(this.specialTraits, count, count);
    }

    // 生成态度
    generateAttitude() {
        // 随机生成1个态度
        return this.randomChoice(this.attitudes);
    }

    // 生成完整的角色信息
    generateCharacter() {
        // 生成姓名
        const name = this.generateName();
        
        // 生成身份
        const identity = this.generateIdentity();
        const gender = identity.split("/")[0];
        
        // 生成年龄
        const age = this.generateAge();
        
        // 生成性格
        const personality = this.generatePersonality();
        
        // 生成外表
        const appearance = this.generateAppearance(gender);
        
        // 生成穿着
        const attire = this.generateAttire(identity);
        
        // 生成身材
        const figure = this.generateFigure(gender);
        
        // 生成气味
        const scent = this.generateScent(identity, personality);
        
        // 生成爱情观
        const loveConcept = this.generateLoveConcept().join("/");
        
        // 生成性癖
        const sexualPreference = this.generateSexualPreference().join("/");
        
        // 生成爱好
        const hobby = this.generateHobby().join("/");
        
        // 生成特质
        const specialTrait = this.generateSpecialTrait().join("/");
        
        // 生成态度
        const attitude = this.generateAttitude();
        
        // 返回完整的角色信息
        return {
            name,
            identity,
            age: age.toString(),
            appearance,
            attire,
            figure,
            scent,
            personality: personality.join("/"),
            love_concept: loveConcept,
            sexual_acts: sexualPreference,
            hobbies: hobby,
            traits: specialTrait,
            attitude_towards_user: attitude
        };
    }
}

// 角色管理器类
class CharacterManager {
    constructor() {
        this.generator = new CharacterGenerator();
        this.characters = {};
        this.leaderPositions = {
            "药王谷谷主": false,
            "凌霄宗宗主": false,
            "妙音门门主": false,
            "万剑山剑尊": false,
            "星机阁阁主": false,
            "合欢宗宗主": false,
            "大自在殿佛子": false,
            "魔域魔尊": false,
            "十万大山狼族妖王": false,
            "十万大山虎族妖王": false,
            "十万大山兔族妖王": false,
            "十万大山蛇族妖王": false,
            "十万大山狐族妖王": false
        };
    }

    // 生成新角色
    generateNewCharacter() {
        let character;
        let attempts = 0;
        const maxAttempts = 10;
        
        do {
            character = this.generator.generateCharacter();
            attempts++;
            
            // 检查是否是首领身份
            const isLeader = this.isLeaderPosition(character.identity);
            
            // 如果是首领身份且该位置已被占用，重新生成
            if (isLeader && this.isPositionTaken(character.identity)) {
                character = null;
            }
        } while (character === null && attempts < maxAttempts);
        
        // 如果生成成功，保存角色并标记首领位置
        if (character) {
            this.characters[character.name] = character;
            
            // 如果是首领身份，标记该位置已被占用
            const leaderPosition = this.getLeaderPosition(character.identity);
            if (leaderPosition) {
                this.leaderPositions[leaderPosition] = true;
            }
        }
        
        return character;
    }

    // 检查是否是首领身份
    isLeaderPosition(identity) {
        return identity.includes("谷主") || 
               identity.includes("宗主") || 
               identity.includes("门主") || 
               identity.includes("剑尊") || 
               identity.includes("阁主") || 
               identity.includes("佛子") || 
               identity.includes("魔尊") || 
               identity.includes("妖王");
    }

    // 获取首领位置标识
    getLeaderPosition(identity) {
        const parts = identity.split("/");
        const sectPart = parts[3]; // 格式是"门派身份"
        
        for (const position of Object.keys(this.leaderPositions)) {
            if (sectPart.includes(position)) {
                return position;
            }
        }
        
        return null;
    }

    // 检查位置是否已被占用
    isPositionTaken(identity) {
        const position = this.getLeaderPosition(identity);
        return position ? this.leaderPositions[position] : false;
    }

    // 获取所有角色
    getAllCharacters() {
        return this.characters;
    }

    // 获取特定角色
    getCharacter(name) {
        return this.characters[name];
    }

    // 生成多个角色
    generateMultipleCharacters(count) {
        const characters = [];
        for (let i = 0; i < count; i++) {
            const character = this.generateNewCharacter();
            if (character) {
                characters.push(character);
            }
        }
        return characters;
    }
}

// 导出类
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        CharacterGenerator,
        CharacterManager
    };
}
