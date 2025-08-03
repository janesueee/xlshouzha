// 全局对象定义
let player = {
    name: '',
    qiYun: 0,
    wuXing: 0,
    personalTraits: [],
    currentStage: 'main-menu'
};

// 游戏状态对象
let gameState = {
    stamina: 5,
    maxStamina: 10,
    spiritStone: 800,
    cultivationLevel: '筑基',
    spiritualPower: 100,
    maxSpiritualPower: 1000,
    currentLocation: '药王谷',
    currentTime: '天元1年9月8日15时',
    playerName: '',
    intelligence: 0,
    luck: 0,
    currentCharacter: '',
    lastInteraction: ''
};

// 游戏开始函数
function startGame(gameData) {
    if (gameData) {
        // 更新 player 对象
        player.name = gameData.name || '未设置';
        player.qiYun = gameData.qiYun || 75;
        player.wuXing = gameData.wuXing || 68;
        player.personalTraits = gameData.personalTraits || [];
        player.currentStage = gameData.currentStage || 'game-main';
        
        // 更新 gameState
        if (gameData.gameState) {
            Object.assign(gameState, gameData.gameState);
        }
        
        showPage('game-main');
        updateGameUI();
        updateStatusBar();
        updatePlayerInfo();
    }
}

// 保存游戏函数
function saveGame() {
    if (!player.name || player.name.trim() === '') {
        alert('请先创建角色并输入名字，然后才能保存！');
        return;
    }

    const savedGames = JSON.parse(localStorage.getItem('savedGames')) || {};
    const slotId = document.getElementById('save-game-slot-id').value || `slot-${Object.keys(savedGames).length + 1}`;
    
    const gameData = {
        name: player.name,
        qiYun: player.qiYun,
        wuXing: player.wuXing,
        personalTraits: player.personalTraits,
        currentStage: player.currentStage,
        gameState: { ...gameState },
        saveDate: new Date().toISOString()
    };
    
    savedGames[slotId] = gameData;
    localStorage.setItem('savedGames', JSON.stringify(savedGames));
    alert('存档成功！');
}

// 随机生成玩家属性
function generateRandomStats() {
    player.qiYun = Math.floor(Math.random() * (100 - 60 + 1)) + 60;
    player.wuXing = Math.floor(Math.random() * (100 - 60 + 1)) + 60;
}

// 随机生成游戏状态属性
function randomizeAttributes() {
    gameState.intelligence = Math.floor(Math.random() * 101);
    gameState.luck = Math.floor(Math.random() * 101);
    
    const intelligenceElement = document.getElementById('intelligence');
    const luckElement = document.getElementById('luck');
    
    if (intelligenceElement) {
        intelligenceElement.textContent = gameState.intelligence;
    }
    if (luckElement) {
        luckElement.textContent = gameState.luck;
    }
}

// 创建角色函数
function createCharacter() {
    const name = document.getElementById('player-name').value;
    if (!name || name.trim() === '') {
        alert('请输入角色名字！');
        return;
    }

    const traits = Array.from(document.querySelectorAll('.trait-checkbox:checked')).map(cb => cb.value);
    
    // 获取个人属性
    const personalTraits = document.getElementById('personal-traits').value;
    
    // 更新玩家对象
    player.name = name;
    player.personalTraits = traits;
    player.currentStage = 'game-main';  // 确保更新玩家的当前阶段为游戏主界面
    
    // 获取已经随机生成的属性值
    const intelligence = document.getElementById('intelligence').textContent;
    const luck = document.getElementById('luck').textContent;
    
    // 同步到游戏状态
    gameState.playerName = name;
    gameState.intelligence = parseInt(intelligence);
    gameState.luck = parseInt(luck);
    gameState.personalTraits = personalTraits; // 保存个人属性
    
    // 显示游戏主界面
    showPage('game-main');  // 跳转到游戏主界面
    // 移除对未定义函数的调用
    updateStatusBar();
    updatePlayerInfo();
    
    // 自动保存到默认存档
    autoSaveDefault();
}

// 更新状态栏
function updateStatusBar() {
    // 获取所有UI元素
    const elements = {
        stamina: document.getElementById('stamina-value'),
        spiritStone: document.getElementById('spirit-stone'),
        cultivationLevel: document.getElementById('cultivation-level'),
        spiritualPower: document.getElementById('spiritual-power'),
        currentLocation: document.getElementById('current-location'),
        currentTime: document.getElementById('current-time')
    };
    
    // 更新文本内容
    if (elements.stamina) elements.stamina.textContent = `${gameState.stamina}/${gameState.maxStamina}`;
    if (elements.spiritStone) elements.spiritStone.textContent = gameState.spiritStone;
    if (elements.cultivationLevel) elements.cultivationLevel.textContent = gameState.cultivationLevel;
    if (elements.spiritualPower) elements.spiritualPower.textContent = `${gameState.spiritualPower}/${gameState.maxSpiritualPower}`;
    if (elements.currentLocation) elements.currentLocation.textContent = gameState.currentLocation;
    if (elements.currentTime) elements.currentTime.textContent = gameState.currentTime;
    
    // 计算进度条
    const progress = {
        stamina: (gameState.stamina / gameState.maxStamina) * 100,
        spiritual: (gameState.spiritualPower / gameState.maxSpiritualPower) * 100
    };
    
    // 更新进度条
    const progressBars = {
        stamina: document.querySelector('.status-bar .status-item:nth-child(1) .progress-fill'),
        spiritual: document.querySelector('.status-bar .status-item:nth-child(4) .progress-fill')
    };
    
    if (progressBars.stamina) progressBars.stamina.style.width = `${progress.stamina}%`;
    if (progressBars.spiritual) progressBars.spiritual.style.width = `${progress.spiritual}%`;
    
    // 自动保存
    autoSaveDefault();
}

// 更新玩家信息
function updatePlayerInfo() {
    const elements = {
        name: document.getElementById('player-name'),
        qiYun: document.getElementById('qi-yun'),
        wuXing: document.getElementById('wu-xing'),
        traits: document.getElementById('personal-traits')
    };
    
    if (elements.name) elements.name.textContent = player.name;
    if (elements.qiYun) elements.qiYun.textContent = player.qiYun;
    if (elements.wuXing) elements.wuXing.textContent = player.wuXing;
    if (elements.traits) elements.traits.textContent = player.personalTraits.join(', ');
}

// 更新故事内容
function updateStoryContent(content) {
    const storyContent = document.getElementById('story-content');
    if (storyContent) {
        storyContent.innerHTML = content;
        storyContent.scrollTop = storyContent.scrollHeight;
    }
    
    // 自动保存到默认存档
    autoSaveDefault();
}

// 故事区域文本堆叠并本地保存最近100条
function appendStoryContent(text) {
    const storyContent = document.getElementById('story-content');
    let storyList = JSON.parse(localStorage.getItem('storyList')) || [];
    storyList.push(text);
    if (storyList.length > 100) storyList = storyList.slice(-100);
    localStorage.setItem('storyList', JSON.stringify(storyList));
    renderStoryContent();
}

function renderStoryContent() {
    const storyContent = document.getElementById('story-content');
    let storyList = JSON.parse(localStorage.getItem('storyList')) || [];
    storyContent.innerHTML = '';
    storyList.forEach(entry => {
        const newEntry = document.createElement('div');
        newEntry.className = 'story-entry';
        newEntry.innerHTML = entry;
        storyContent.appendChild(newEntry);
    });
    storyContent.scrollTop = storyContent.scrollHeight;
}

// 更新玩家信息显示
function updatePlayerInfo() {
    const playerNameDisplay = document.getElementById('player-name-display');
    const playerLevelDisplay = document.getElementById('player-level-display');
    const playerLuckDisplay = document.getElementById('player-luck-display');
    const playerIntelligenceDisplay = document.getElementById('player-intelligence-display');
    const playerPersonalTraitsDisplay = document.getElementById('player-personal-traits-display');

    // 姓名优先显示 gameState.playerName，且不为空时才显示
    if (playerNameDisplay) {
        const name = gameState.playerName || '';
        playerNameDisplay.textContent = name.trim() || '未设置';
    }
    if (playerLevelDisplay) playerLevelDisplay.textContent = gameState.cultivationLevel || '未知';
    if (playerLuckDisplay) playerLuckDisplay.textContent = gameState.luck || 0;
    if (playerIntelligenceDisplay) playerIntelligenceDisplay.textContent = gameState.intelligence || 0;
    if (playerPersonalTraitsDisplay) playerPersonalTraitsDisplay.textContent = gameState.personalTraits || '未设置';
}

// 初始化游戏状态
function initializeGameState() {
    updateStatusBar();
    updateStoryContent('欢迎来到修仙世界！你正在药王谷中，准备开始你的修仙之旅。');
    showPage('main-menu');  // 添加这行，确保默认进入主菜单
}

// 处理AI回复文本
function cleanLLMResponse(rawText) {
    // 使用正则表达式去除特殊标记
    const regex = /(<disclaimer>.*?<\/disclaimer>)|(<guifan>.*?<\/guifan>)|```start|<content>|<\/content>|```end|<done>|`<done>`|(<!--[\s\S]*?-->(\s*))|(.*?<\/think(ing)?>(\n)?)|(<think(ing)?>[\s\S]*<\/think(ing)?>(\n)?)/gs;
    return rawText.replace(regex, '').trim();
}

// 构建prompt
function buildPrompt(userMessage) {
    // 获取玩家名和当前交互角色
    const userName = gameState.playerName || '玩家';
    const charName = gameState.currentCharacter || ''; // 需要你添加currentCharacter到gameState中

    // 获取最近的故事记录
    const storyList = JSON.parse(localStorage.getItem('storyList')) || [];
    const history = storyList.slice(-10).join('\n');

    // 加载基础prompt
    const basePrompt = localStorage.getItem('basePrompt') || ''; // 你需要在某处存储basePrompt

    // 替换变量
    let prompt = basePrompt
        .replace(/\{\{user\}\}/g, userName)
        .replace(/\{\{char\}\}/g, charName)
        .replace(/\{\{lastUserMessage\}\}/g, userMessage);

    // 添加交互历史
    prompt += `\n[交互历史]\n${history}`;

    return prompt;
}

// 发送消息
function sendMessage() {
    const input = document.getElementById('player-input');
    const sendBtn = document.getElementById('send-btn');
    const message = input.value.trim();
    
    if (!message) return;

    // 禁用发送按钮
    if (sendBtn) sendBtn.disabled = true;
    
    // 显示用户消息
    appendStoryContent(`你说："${message}"`);
    input.value = '';

    // 显示处理中提示
    appendStoryContent('系统正在思考中...');

    // 获取API设置
    const settings = JSON.parse(localStorage.getItem('apiSettings') || '{}');
    if (!settings.apiUrl || !settings.apiKey || !settings.model) {
        appendStoryContent('错误：请先完成API设置');
        if (sendBtn) sendBtn.disabled = false;
        return;
    }

    // 构建prompt
    const prompt = buildPrompt(message);

    // 调用API
    fetch(settings.apiUrl.replace(/\/$/, '') + '/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + settings.apiKey,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: settings.model,
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.7,
            max_tokens: 2000
        })
    })
    .then(res => res.json())
    .then(data => {
        // 移除处理中提示
        let storyList = JSON.parse(localStorage.getItem('storyList') || '[]');
        storyList.pop();
        localStorage.setItem('storyList', JSON.stringify(storyList));

        // 处理回复
        const response = cleanLLMResponse(data.choices[0].message.content);
        appendStoryContent(response);

        // 恢复发送按钮
        if (sendBtn) sendBtn.disabled = false;
    })
    .catch(err => {
        appendStoryContent('错误：AI响应失败，请检查API设置');
        if (sendBtn) sendBtn.disabled = false;
    });
}

// 修炼功能
function cultivate() {
    if (gameState.stamina > 0) {
        gameState.stamina--;
        gameState.spiritualPower = Math.min(gameState.maxSpiritualPower, gameState.spiritualPower + 50);
        updateStatusBar();
        updateStoryContent('你开始修炼，消耗了一些体力，但灵力有所提升。');
    } else {
        updateStoryContent('体力不足，无法修炼。请先休息。');
    }
}

// 休息功能
function rest() {
    gameState.stamina = Math.min(gameState.maxStamina, gameState.stamina + 3);
    updateStatusBar();
    updateStoryContent('你休息了一会儿，体力有所恢复。');
}

// 跳过一年
function skipYear() {
    gameState.currentTime = '天元2年9月8日15时';
    gameState.stamina = gameState.maxStamina;
    gameState.spiritualPower = gameState.maxSpiritualPower;
    updateStatusBar();
    updateStoryContent('时间飞逝，一年过去了。你的体力和灵力都恢复了。');
}

// 旅行功能
function travelTo(location) {
    let staminaCost = 1;
    
    if (location === '十万大山-狼妖家') {
        staminaCost = 3;
    }
    
    if (gameState.stamina >= staminaCost) {
        gameState.stamina -= staminaCost;
        gameState.currentLocation = location;
        updateStatusBar();
        updateStoryContent(`你来到了${location}。`);
        showPage('game-main');
    } else {
        alert('体力不足，无法前往该地点。');
    }
}

// 切换地点展开/收起
function toggleLocation(locationId) {
    const childrenElement = document.getElementById(locationId + '-children');
    const parentElement = childrenElement.previousElementSibling;
    const toggleIcon = parentElement.querySelector('.toggle-icon');
    
    if (childrenElement.classList.contains('expanded')) {
        childrenElement.classList.remove('expanded');
        toggleIcon.textContent = '▼';
        toggleIcon.style.transform = 'rotate(0deg)';
    } else {
        childrenElement.classList.add('expanded');
        toggleIcon.textContent = '▲';
        toggleIcon.style.transform = 'rotate(180deg)';
    }
}

// 保存游戏
function saveGame() {
    const savedGames = JSON.parse(localStorage.getItem('savedGames') || '{}');
    const slotId = `存档_${new Date().getTime()}`; // 使用时间戳创建唯一的存档ID
    
    // 创建存档数据
    savedGames[slotId] = {
        saveDate: new Date().toISOString(),
        playerName: gameState.playerName,  // 确保存储了 playerName
        cultivationLevel: gameState.cultivationLevel,
        intelligence: gameState.intelligence,
        luck: gameState.luck,
        personalTraits: gameState.personalTraits, // 保存个人属性
        gameState: JSON.parse(JSON.stringify(gameState)) // 深拷贝确保数据完整性
    };
    
    // 保存到localStorage
    localStorage.setItem('savedGames', JSON.stringify(savedGames));
    autoSaveDefault(); // 同时更新默认存档
    console.log('保存游戏状态:', savedGames[slotId]); // 调试用
    alert('游戏已保存！');
}


// 读取游戏
function loadGame() {
    showPage('load-game-page');
    const savedGamesContainer = document.getElementById('saved-games-container');
    savedGamesContainer.innerHTML = '';

    const savedGames = JSON.parse(localStorage.getItem('savedGames')) || {};

    if (Object.keys(savedGames).length === 0) {
        savedGamesContainer.innerHTML = '<p>没有找到存档。</p>';
    } else {
        // 使用不同的变量名来避免混淆，例如使用 `slotId`
        for (const slotId in savedGames) {
            const gameData = savedGames[slotId];
            const saveDate = new Date(gameData.saveDate).toLocaleString();
            const slotElement = document.createElement('div');
            slotElement.classList.add('load-game-slot');
            // 将slotId存储在data属性中
            slotElement.dataset.slotId = slotId;
            slotElement.innerHTML = `
                <div class="slot-name">${slotId}</div>
                <div class="slot-details">
                    <span>气运: ${gameData.luck}</span>
                    <span>悟性: ${gameData.intelligence}</span>
                </div>
                <div class="slot-date">存档时间: ${saveDate}</div>
            `;
            savedGamesContainer.appendChild(slotElement);
        }

        // 这里的事件监听器才是关键
        document.querySelectorAll('.load-game-slot').forEach(slot => {
            slot.addEventListener('click', () => {
                const slotId = slot.dataset.slotId; // 从点击的元素中获取slotId
                const loadedGameData = savedGames[slotId]; // 使用slotId从savedGames对象中获取对应的存档数据
                startGame(loadedGameData); // 将正确的存档数据对象传递给startGame
            });
        });
    }
}

// 新的startGame函数，直接接收单个存档对象
function startGame(gameData = {}) {
    if (gameData && gameData.gameState) {
        // 完全替换gameState
        gameState = JSON.parse(JSON.stringify(gameData.gameState));
        
        // 确保关键属性被正确加载
        gameState.playerName = gameData.playerName || '未设置';
        
        // 修正: 从存档中读取气运与悟性
        gameState.intelligence = gameData.intelligence || Math.floor(Math.random() * 101);
        gameState.luck = gameData.luck || Math.floor(Math.random() * 101);
        
        gameState.cultivationLevel = gameData.cultivationLevel || '筑基';
        
        // 加载个人属性
        gameState.personalTraits = gameData.personalTraits || '未设置';
        
        updateStatusBar();
        updatePlayerInfo();
        showPage('game-main');
        alert('存档加载成功！');
    } else {
        alert('无法加载存档，数据可能已损坏');
    }
}


// 自动保存到默认存档
function autoSaveDefault() {
    const saveData = {
        name: '默认存档',
        time: new Date().toLocaleString(),
        gameState: JSON.parse(JSON.stringify(gameState)), // 深拷贝确保数据完整性
        playerName: gameState.playerName,
        cultivationLevel: gameState.cultivationLevel,
        intelligence: gameState.intelligence,
        luck: gameState.luck,
        personalTraits: gameState.personalTraits
    };
    localStorage.setItem('saveData_default', JSON.stringify(saveData));
    console.log('自动保存状态:', saveData); // 调试用
}

// 获取存档列表
function getSaveSlots() {
    const saves = JSON.parse(localStorage.getItem('gameSaves') || '[]');
    return saves.map((save, index) => `存档 ${index + 1}`);
}

// 存档列表展示默认存档
function showLoadGameList() {
    const container = document.querySelector('#load-game .info-section');
    let html = '<ul>';
    
    // 默认存档
    const defaultData = localStorage.getItem('saveData_default');
    if (defaultData) {
        const save = JSON.parse(defaultData);
        html += `<li><strong>${save.name}</strong> <span style='color:#888;'>${save.time}</span>
                <button class='btn' onclick='loadDefaultSave()'>读取</button></li>`;
    }
    
    // 其他存档
    const saves = JSON.parse(localStorage.getItem('gameSaves') || '[]');
    saves.forEach((save, idx) => {
        html += `<li>
            <strong>存档 ${idx + 1}</strong>
            <span style='color:#888;'>${save.saveDate || '未知时间'}</span>
            <span style='color:#666;'>角色：${save.playerName || '未知'}</span>
            <button class='btn' onclick='loadGameFromList(${idx})'>读取</button>
        </li>`;
    });
    
    html += '</ul>';
    if (html === '<ul></ul>') html = '<p>暂无存档</p>';
    container.innerHTML = html;
}

function loadDefaultSave() {
    const data = localStorage.getItem('saveData_default');
    if (data) {
        const save = JSON.parse(data);
        if (save.gameState) {
            // 完全替换gameState而不是合并
            gameState = JSON.parse(JSON.stringify(save.gameState));
            
            // 确保关键属性被正确加载
            gameState.playerName = save.playerName || '未设置';
            gameState.intelligence = save.intelligence || 0;
            gameState.luck = save.luck || 0;
            gameState.personalTraits = save.personalTraits || '未设置';
            
            console.log('加载的默认存档状态:', gameState); // 用于调试
            updateStatusBar();
            updatePlayerInfo();
            alert(`加载了默认存档`);
            showPage('game-main');
        } else {
            alert('默认存档数据不完整，无法加载');
        }
    } else {
        alert('暂无默认存档数据');
    }
}

// 设置页面相关逻辑
function fetchModelList() {
    const apiUrl = document.getElementById('api-url').value;
    const apiKey = document.getElementById('api-key').value;
    if (!apiUrl || !apiKey) {
        alert('请填写API地址和密钥');
        return;
    }
    const select = document.getElementById('model-select');
    select.innerHTML = '<option>拉取中...</option>';
    // 假设API为OpenAI风格：GET `${apiUrl}/v1/models`，Authorization: Bearer {apiKey}
    fetch(apiUrl.replace(/\/$/, '') + '/v1/models', {
        headers: {
            'Authorization': 'Bearer ' + apiKey
        }
    })
    .then(res => res.json())
    .then(data => {
        // 兼容OpenAI和Claude风格，需根据实际API调整
        let models = [];
        if (Array.isArray(data.data)) {
            models = data.data.map(m => ({ value: m.id, label: m.id }));
        } else if (Array.isArray(data.models)) {
            models = data.models.map(m => ({ value: m.name || m.id, label: m.name || m.id }));
        }
        if (models.length === 0) {
            select.innerHTML = '<option>未获取到模型</option>';
        } else {
            select.innerHTML = '';
            models.forEach(m => {
                const opt = document.createElement('option');
                opt.value = m.value;
                opt.textContent = m.label;
                select.appendChild(opt);
            });
            alert('模型列表已拉取');
        }
    })
    .catch(err => {
        select.innerHTML = '<option>拉取失败</option>';
        alert('模型拉取失败，请检查API地址和密钥');
    });
}

function saveSettings() {
    const apiUrl = document.getElementById('api-url').value;
    const apiKey = document.getElementById('api-key').value;
    const model = document.getElementById('model-select').value;
    if (!apiUrl || !apiKey || !model) {
        alert('请填写完整信息并选择模型');
        return;
    }
    localStorage.setItem('apiSettings', JSON.stringify({ apiUrl, apiKey, model }));
    alert('设置已保存');
}

function loadSettings() {
    const settings = JSON.parse(localStorage.getItem('apiSettings'));
    if (settings) {
        document.getElementById('api-url').value = settings.apiUrl;
        document.getElementById('api-key').value = settings.apiKey;
        // 拉取模型后自动选中
        fetchModelList();
        setTimeout(() => {
            document.getElementById('model-select').value = settings.model;
        }, 900);
    }
}

// 保存 prompt 到 localStorage
function initializePrompt() {
    // 如果basePrompt未定义，使用空字符串作为默认值
    const defaultPrompt = '';
    localStorage.setItem('basePrompt', defaultPrompt);
    console.log('Prompt 已初始化并保存到 localStorage');
}

// 当与角色交互时调用此函数
function messageCharacter(event, characterName) {
    event.preventDefault();
    gameState.currentCharacter = characterName;
    const character = characterDetails[characterName];
    if (character) {
        appendStoryContent(`你准备与${character.name}对话...`);
        showPage('chat-page'); // 确保你有一个聊天页面
    }
}

// 拜访角色
function visitCharacter(event, characterName) {
    event.preventDefault();
    gameState.currentCharacter = characterName;
    const character = characterDetails[characterName];
    if (character) {
        appendStoryContent(`你来到了${character.name}的住处...`);
        showPage('chat-page');
    }
}

// 页面切换函数
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    if (pageId === 'load-game') {
        showLoadGameList();
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('页面加载完成，开始初始化...');
    
    // 初始化 prompt
    initializePrompt();
    
    // 这是正确地处理表单提交的代码
    const characterForm = document.getElementById('character-form');
    if (characterForm) {
        characterForm.addEventListener('submit', (event) => {
            // 关键一步：阻止页面刷新！
            event.preventDefault();
            
            // 调用我们已经写好的 createCharacter 函数
            createCharacter();
        });
    }
      
    // 设置表单提交
    const settingsForm = document.getElementById('settings-form');
    if (settingsForm) {
        settingsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('设置已保存');
        });
    }
    
    // 初始化时随机生成属性
    randomizeAttributes();
    
    // 游戏状态初始化
    initializeGameState();
    
    console.log('初始化完成');
    
    // 自动渲染故事内容
    renderStoryContent();
    
    // 显示存档列表
    showLoadGameList();
});

// 确保所有函数在全局作用域中可用
window.showPage = showPage;
window.randomizeAttributes = randomizeAttributes;
window.sendMessage = sendMessage;
window.cultivate = cultivate;
window.rest = rest;
window.skipYear = skipYear;
window.travelTo = travelTo;
window.toggleLocation = toggleLocation;
window.saveGame = saveGame;
window.loadGame = loadGame;
window.showCharacterDetail = showCharacterDetail;
