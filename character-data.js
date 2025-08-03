/**
 * 角色数据和相关函数
 */

// 角色详情数据
const characterDetails = {
    '萧缚': {
        name: '萧缚',
        identity: '男性/师父/丹修/药王谷谷主/炼虚初期',
        age: '309',
        appearance: '深墨色长发披散/深紫色眼眸/肤色玉白/五官如仙/气质孤冷',
        attire: '深绿简洁长袍/衣前金色流苏',
        figure: '188cm/身形修长/性器粗长',
        scent: '草药香/丹药香',
        personality: '淡漠克制/掌控欲强/清冷疏离',
        love_concept: '死心塌地',
        sexual_acts: '蒙眼做爱/言语逼问是否永不离开',
        hobbies: '炼丹/研究药理/烹茶',
        traits: '天道眷顾/炼丹奇才/',
        attitude_towards_user: '矛盾痛苦/深爱'
    },
    '闻人清': {
        name: '闻人清',
        identity: '男性/爱慕者/符修/星机阁阁主/化神中期',
        age: '158',
        appearance: '银白长发以玉冠束起/丹凤眼/肤色冷白/眼下泪痣/鼻梁高挺/五官精致',
        attire: '月白色暗纹道袍/云纹滚边/腰佩白玉算筹',
        figure: '188cm/清瘦有力/性器适中',
        scent: '松墨与朱砂香气',
        personality: '清冷疏离/心思缜密/掌控欲强/温柔偏执/善于伪装',
        love_concept: '纯情/极端占有',
        sexual_acts: '人体绘制符箓/言语引导控制/轻度束缚/恋物癖',
        hobbies: '推演天机/改良符箓/冥想',
        traits: '天之骄子/符箓奇才/完美假面',
        attitude_towards_user: '迷恋/单向关系'
    },
    '封天西': {
        name: '封天西',
        identity: '男性/情人/魔修/魔域魔尊/炼虚初期',
        age: '321',
        appearance: '纯黑长发披散/深眼窝/血红眼珠/肤色蜜色/喉结明显',
        attire: '纯黑绣金纹战袍/蟒纹腰带/黑曜石指环',
        figure: '186cm/穿衣显瘦有薄肌/性器硕大',
        scent: '外溢魔气/檀香/血腥气',
        personality: '暴戾/性欲旺盛/dom属性/压迫感强/占有欲强/吃软不吃硬/固执/易怒/偏执',
        love_concept: '死心塌地/崇尚自由/不容背叛',
        sexual_acts: '咬痕标记/道具/逼问/SM/脏话/施虐倾向',
        hobbies: '杀戮/研究禁术',
        traits: '天煞孤星/天生魔种',
        attitude_towards_user: '咬牙切齿/迷恋'
    },
    '夜刀': {
        name: '夜刀',
        identity: '男性/情人/妖修/十万大山狼王/化神初期',
        age: '200',
        appearance: '前发遮眼黑短发/眼神阴鸷/纯白妖瞳/肤色苍白/狼族尖牙',
        attire: '玄色道袍/袖口领口绣暗红纹路/必要时以法术遮脸',
        figure: '191cm/身形瘦削挺拔/性器硕大',
        scent: '狼族兽性气息',
        personality: '极度不安全/阴郁偏执/控制欲强/占有欲强/易怒狂暴',
        love_concept: '极端占有/无法信任/自卑',
        sexual_acts: '主导失控/记录/法器道具调教/啃咬标记',
        hobbies: '无',
        traits: '心魔深种/浴火重生/堕魔',
        attitude_towards_user: '极端依赖/极端迷恋'
    },
    '陆明轩': {
        name: '陆明轩',
        identity: '男性/暧昧/剑修/万剑山大弟子/元婴中期',
        age: '90',
        appearance: '蓬乱棕色短发/明亮琥珀色瞳孔/肤色小麦/少年气/笑容戏谑',
        attire: '青白色内门弟子道袍/衣襟微敞/腰带松系/背后斜背长剑/蓝色剑穗',
        figure: '188cm/体型精悍/爆发力强/手掌有薄茧/性器略粗长',
        scent: '阳光青草味/铁锈气息',
        personality: '乐天派/精力过剩/好奇心重/贱兮兮/热血冲动/仗义善良/自来熟/缺乏见识',
        love_concept: '懵懂/守护/专情',
        sexual_acts: '技巧生涩/节奏快猛/探索/讨好',
        hobbies: '练剑/找人切磋/探索后山/收集亮晶晶的东西/给人起外号',
        traits: '剑道奇才/天之骄子',
        attitude_towards_user: '心生恋慕'
    },
    '铖心': {
        name: '铖心',
        identity: '男性/朋友/剑修/万剑山剑尊/大乘中期',
        age: '897',
        appearance: '银灰长发披散/黑色瞳孔/肤色古铜/五官俊美/眉心朱砂',
        attire: '万年玄铁织就的纯黑剑袍/无任何多余纹饰/朴素至极',
        figure: '190cm/肌肉线条分明/手掌厚茧/性器粗长',
        scent: '常年与剑为伴的凛冽金铁之气',
        personality: '寡言/冷漠/万事不萦于心/唯剑道是求',
        love_concept: '不懂情爱/崇尚自由',
        sexual_acts: '生涩/力道惊人',
        hobbies: '闭关/练剑/擦拭佩剑/观云海悟道/指点剑法',
        traits: '传奇人物/人剑合一/剑道宗师',
        attitude_towards_user: '淡漠/好奇'
    },
    '徐见东': {
        name: '徐见东',
        identity: '男性/未识/废人/门派奴隶/无修为',
        age: '18',
        appearance: '黑发凌乱遮脸/鸦羽般长睫/眼下青黑/肤色苍白/面容清秀',
        attire: '破旧布条遮身/大部分裸露/遍体鳞伤',
        figure: '186cm/极度清瘦/性器适中',
        scent: '药味/微弱血腥气/尘土霉味',
        personality: '沉默寡言/麻木迟钝/提线木偶/绝对顺从/自卑敏感/惊弓之鸟/丧失情绪',
        love_concept: '无法理解/极度自卑/无主动性欲',
        sexual_acts: '无',
        hobbies: '无',
        traits: '魂魄不稳/灵根残缺',
        attitude_towards_user: '无情绪/绝对服从'
    }
};

// 替换变量
function replaceVars(text, characterName) {
    // 优先用gameState.playerName，没有则用"玩家"
    const userName = gameState.playerName && gameState.playerName.trim() ? gameState.playerName : '玩家';
    return text.replace(/\{\{char\}\}/g, characterName).replace(/\{\{user\}\}/g, userName);
}

// 显示角色详情
function showCharacterDetail(characterName) {
    // 先检查是否是已有角色
    let character = characterDetails[characterName];
    
    // 如果角色不存在，尝试随机生成一个新角色
    if (!character && characterName === 'random') {
        character = characterManager.generateNewCharacter();
        if (character) {
            // 保存新生成的角色
            characterDetails[character.name] = character;
            characterName = character.name;
            
            // 添加到角色列表中
            addCharacterToList(character.name);
        }
    }
    
    const detailElement = document.getElementById('character-detail');
    if (character && detailElement) {
        detailElement.innerHTML = `
            <h3>${replaceVars(character.name, characterName)}</h3>
            <p><strong>身份：</strong>${replaceVars(character.identity, characterName)}</p>
            <p><strong>年龄：</strong>${replaceVars(character.age, characterName)}</p>
            <p><strong>外表：</strong>${replaceVars(character.appearance, characterName)}</p>
            <p><strong>穿着：</strong>${replaceVars(character.attire, characterName)}</p>
            <p><strong>身材：</strong>${replaceVars(character.figure, characterName)}</p>
            <p><strong>气味：</strong>${replaceVars(character.scent, characterName)}</p>
            <p><strong>性格：</strong>${replaceVars(character.personality, characterName)}</p>
            <p><strong>爱情观：</strong>${replaceVars(character.love_concept, characterName)}</p>
            <p><strong>性癖：</strong>${replaceVars(character.sexual_acts, characterName)}</p>
            <p><strong>爱好：</strong>${replaceVars(character.hobbies, characterName)}</p>
            <p><strong>特质：</strong>${replaceVars(character.traits, characterName)}</p>
            <p><strong>态度：</strong>${replaceVars(character.attitude_towards_user, characterName)}</p>
            <div class='character-actions'>
                <button class='btn' onclick="visitCharacter(event, '${character.name}')">拜访</button>
                <button class='btn' onclick="messageCharacter(event, '${character.name}')">传讯</button>
            </div>
        `;
    } else if (detailElement) {
        detailElement.innerHTML = `
            <h3>角色详情</h3>
            <p>未找到该角色的详细信息</p>
        `;
    }
}
