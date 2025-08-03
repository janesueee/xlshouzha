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
    lastInteraction: '',
    lastExplorationDirection: '', // 记录上次探索的方向
    lastExplorationTarget: '' // 记录上次探索的目标地点
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
        // 移除对未定义函数的调用
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
    
    // 清空故事列表，确保每个存档有独立的文本内容
    localStorage.removeItem('storyList');

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
    try {
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
            stamina: document.querySelector('.status-bar .status-item:nth-child(6) .progress-fill'),
            spiritual: document.querySelector('.status-bar .status-item:nth-child(5) .progress-fill')
        };
        
        if (progressBars.stamina) progressBars.stamina.style.width = `${progress.stamina}%`;
        if (progressBars.spiritual) progressBars.spiritual.style.width = `${progress.spiritual}%`;
        
        // 自动保存
        autoSaveDefault();
    } catch (error) {
        console.error('更新状态栏时出错:', error);
    }
}

// 更新玩家信息
function updatePlayerInfo() {
    try {
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
        
        // 更新玩家信息显示
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
    } catch (error) {
        console.error('更新玩家信息时出错:', error);
    }
}

// 更新故事内容
function updateStoryContent(content) {
    try {
        const storyContent = document.getElementById('story-content');
        if (storyContent) {
            storyContent.innerHTML = content;
            storyContent.scrollTop = storyContent.scrollHeight;
        }
        
        // 自动保存到默认存档
        autoSaveDefault();
    } catch (error) {
        console.error('更新故事内容时出错:', error);
    }
}

// 故事区域文本堆叠并本地保存最近30条
function appendStoryContent(text) {
    try {
        const storyContent = document.getElementById('story-content');
        let storyList = JSON.parse(localStorage.getItem('storyList')) || [];
        storyList.push(text);
        if (storyList.length > 30) storyList = storyList.slice(-30);
        localStorage.setItem('storyList', JSON.stringify(storyList));
        renderStoryContent();
    } catch (error) {
        console.error('添加故事内容时出错:', error);
    }
}

function renderStoryContent() {
    try {
        const storyContent = document.getElementById('story-content');
        if (!storyContent) return;
        
        let storyList = JSON.parse(localStorage.getItem('storyList')) || [];
        storyContent.innerHTML = '';
        storyList.forEach(entry => {
            const newEntry = document.createElement('div');
            newEntry.className = 'story-entry';
            newEntry.innerHTML = entry;
            storyContent.appendChild(newEntry);
        });
        storyContent.scrollTop = storyContent.scrollHeight;
    } catch (error) {
        console.error('渲染故事内容时出错:', error);
    }
}

// 修炼功能 - 修复错误处理
function cultivate() {
    try {
        if (gameState.stamina > 0) {
            gameState.stamina--;
            gameState.spiritualPower = Math.min(gameState.maxSpiritualPower, gameState.spiritualPower + 50);
            updateStatusBar();
            appendStoryContent('你开始修炼，消耗了一些体力，但灵力有所提升。');
        } else {
            appendStoryContent('体力不足，无法修炼。请先休息。');
        }
    } catch (error) {
        console.error('修炼功能出错:', error);
        alert('修炼功能出错，请查看控制台获取详细信息');
    }
}

// 休息功能 - 修复错误处理
function rest() {
    try {
        gameState.stamina = Math.min(gameState.maxStamina, gameState.stamina + 3);
        updateStatusBar();
        appendStoryContent('你休息了一会儿，体力有所恢复。');
    } catch (error) {
        console.error('休息功能出错:', error);
        alert('休息功能出错，请查看控制台获取详细信息');
    }
}

// 探索功能 - 替代原来的跳过一年功能
function explore() {
    try {
        // 获取当前位置
        const currentLocation = gameState.currentLocation;
        
        // 如果有上次探索的方向且未到达目标地点，则只提供该方向
        if (gameState.lastExplorationDirection && gameState.lastExplorationTarget === currentLocation) {
            // 直接使用上次的方向继续探索
            startExploration(currentLocation, gameState.lastExplorationDirection);
        } else {
            // 获取可用方向
            const availableDirections = getAvailableDirections(currentLocation);
            
            // 创建方向选择弹窗
            showDirectionModal(currentLocation, availableDirections);
        }
    } catch (error) {
        console.error('探索功能出错:', error);
        alert('探索功能出错，请查看控制台获取详细信息');
    }
}

// 显示方向选择弹窗
function showDirectionModal(currentLocation, directions) {
    // 创建弹窗
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'direction-modal';
    
    // 创建弹窗内容
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    // 添加标题
    const title = document.createElement('h2');
    title.textContent = '选择探索方向';
    modalContent.appendChild(title);
    
    // 添加当前位置信息
    const locationInfo = document.createElement('p');
    locationInfo.textContent = `当前位置：${currentLocation}`;
    modalContent.appendChild(locationInfo);
    
    // 添加方向按钮
    const buttonContainer = document.createElement('div');
    buttonContainer.style.display = 'flex';
    buttonContainer.style.flexDirection = 'column';
    buttonContainer.style.gap = '10px';
    buttonContainer.style.marginTop = '20px';
    
    directions.forEach(direction => {
        const button = document.createElement('button');
        button.className = 'btn';
        button.textContent = direction;
        button.onclick = function() {
            startExploration(currentLocation, direction);
            closeDirectionModal();
        };
        buttonContainer.appendChild(button);
    });
    
    modalContent.appendChild(buttonContainer);
    
    // 添加关闭按钮
    const closeButton = document.createElement('button');
    closeButton.className = 'btn close-btn';
    closeButton.textContent = '取消';
    closeButton.onclick = closeDirectionModal;
    closeButton.style.marginTop = '20px';
    modalContent.appendChild(closeButton);
    
    // 组装弹窗
    modal.appendChild(modalContent);
    
    // 添加到页面
    document.body.appendChild(modal);
}

// 关闭方向选择弹窗
function closeDirectionModal() {
    const modal = document.getElementById('direction-modal');
    if (modal) {
        document.body.removeChild(modal);
    }
}

// 开始探索
function startExploration(currentLocation, direction) {
    // 获取目标信息
    const targetInfo = getTargetByDirection(currentLocation, direction);
    
    if (!targetInfo) {
        appendStoryContent(`你向${direction}方向探索，但没有发现任何有价值的地点。`);
        return;
    }
    
    // 默认使用10点体力进行探索
    const maxStaminaToUse = 10;
    
    // 检查体力是否足够至少1点
    if (gameState.stamina < 1) {
        appendStoryContent(`探索需要至少1点体力，但你的体力已耗尽。`);
        return;
    }
    
    // 实际可用的体力值（不超过10点且不超过当前拥有的体力）
    const availableStamina = Math.min(maxStaminaToUse, gameState.stamina);
    
    // 开始探索过程
    let staminaUsed = 0;
    let distanceTraveled = 0;
    let foundLocation = false;
    
    // 模拟探索过程
    while (staminaUsed < availableStamina && !foundLocation) {
        // 每次消耗1点体力，前进10单位距离
        staminaUsed++;
        distanceTraveled += 10;
        
        // 检查是否到达目标
        if (distanceTraveled >= targetInfo.distance) {
            foundLocation = true;
        }
    }
    
    // 消耗体力
    gameState.stamina -= staminaUsed;
    
    // 更新状态栏
    updateStatusBar();
    
    // 处理探索结果
    if (foundLocation) {
        // 添加到已知地点
        addKnownLocation(targetInfo.target);
        
        // 更新当前位置
        gameState.currentLocation = targetInfo.target;
        
        // 清除上次探索方向记录，因为已经到达目标
        gameState.lastExplorationDirection = '';
        gameState.lastExplorationTarget = '';
        
        // 更新状态栏
        updateStatusBar();
        
        // 显示探索结果
        const description = getLocationDescription(targetInfo.target);
        appendStoryContent(`你向${direction}方向探索，消耗了${staminaUsed}点体力，发现了${targetInfo.target}。`);
        appendStoryContent(description);
        
        // 更新地图事件页面
        updateMapLocations();
    } else {
        // 记录上次探索的方向和目标，以便下次继续
        gameState.lastExplorationDirection = direction;
        gameState.lastExplorationTarget = targetInfo.target;
        
        // 显示探索结果
        appendStoryContent(`你向${direction}方向探索，消耗了${staminaUsed}点体力，但还没有到达目的地。`);
        
        // 如果经过了某些区域，显示区域信息
        if (targetInfo.regions && targetInfo.regions.length > 0) {
            const region = targetInfo.regions[Math.floor(distanceTraveled / (targetInfo.distance / targetInfo.regions.length))];
            appendStoryContent(`你现在位于${region}区域。`);
        }
    }
}

// 更新地图事件页面中的地点
function updateMapLocations() {
    try {
        // 获取地图页面
        const mapPage = document.getElementById('map-events');
        if (!mapPage) return;
        
        // 获取地图区域
        const mapSection = mapPage.querySelector('.map-section');
        if (!mapSection) return;
        
        // 获取地点列表
        const locationList = mapSection.querySelector('.location-list');
        if (!locationList) return;
        
        // 清空现有地点列表
        locationList.innerHTML = '';
        
        // 根据已知地点重新构建地图
        const knownLocations = worldMap.knownLocations;
        
        // 主要区域
        const mainRegions = ["东洲", "西漠", "南荒", "北地", "中州"];
        
        // 为每个主要区域创建一个组
        mainRegions.forEach(region => {
            // 检查该区域是否已知
            const isKnown = knownLocations.includes(region);
            
            // 创建区域组
            const regionGroup = document.createElement('div');
            regionGroup.className = 'location-group';
            
            // 创建区域父元素
            const regionParent = document.createElement('div');
            regionParent.className = 'location-parent';
            
            if (isKnown) {
                // 如果区域已知，添加点击事件和展开/收起图标
                regionParent.onclick = function() { toggleLocation(region.toLowerCase()); };
                
                const regionName = document.createElement('strong');
                regionName.textContent = region;
                
                const toggleIcon = document.createElement('span');
                toggleIcon.className = 'toggle-icon';
                toggleIcon.textContent = '▼';
                
                regionParent.appendChild(regionName);
                regionParent.appendChild(toggleIcon);
                
                // 创建子地点容器
                const childrenContainer = document.createElement('div');
                childrenContainer.className = 'location-children';
                childrenContainer.id = `${region.toLowerCase()}-children`;
                
                // 添加该区域的已知子地点
                knownLocations.forEach(location => {
                    // 检查该地点是否属于当前区域的子地点
                    const isChildOfRegion = worldMap.paths.some(path => 
                        path.source === region && 
                        path.target === location && 
                        (path.direction === "向外探索" || path.direction.match(/[东南西北]/))
                    );
                    
                    if (isChildOfRegion) {
                        // 创建子地点组
                        const childGroup = document.createElement('div');
                        childGroup.className = 'location-group';
                        childGroup.style.marginLeft = '20px';
                        
                        // 创建子地点父元素
                        const childParent = document.createElement('div');
                        childParent.className = 'location-parent';
                        childParent.onclick = function() { toggleLocation(location.toLowerCase().replace(/\s+/g, '')); };
                        
                        const childName = document.createElement('strong');
                        childName.textContent = location;
                        
                        const childToggleIcon = document.createElement('span');
                        childToggleIcon.className = 'toggle-icon';
                        childToggleIcon.textContent = '▼';
                        
                        childParent.appendChild(childName);
                        childParent.appendChild(childToggleIcon);
                        
                        childGroup.appendChild(childParent);
                        
                        // 创建孙地点容器
                        const grandchildrenContainer = document.createElement('div');
                        grandchildrenContainer.className = 'location-children';
                        grandchildrenContainer.id = `${location.toLowerCase().replace(/\s+/g, '')}-children`;
                        
                        // 添加该子地点的已知孙地点
                        knownLocations.forEach(grandchild => {
                            // 检查该地点是否属于当前子地点的孙地点
                            const isGrandchildOfChild = worldMap.paths.some(path => 
                                path.source === location && 
                                path.target === grandchild && 
                                path.direction === "向外探索"
                            );
                            
                            if (isGrandchildOfChild) {
                                // 创建孙地点项
                                const grandchildItem = document.createElement('div');
                                grandchildItem.className = 'location-item';
                                grandchildItem.onclick = function() { travelTo(grandchild); };
                                
                                const grandchildName = document.createElement('strong');
                                grandchildName.textContent = grandchild;
                                
                                const staminaCost = document.createElement('span');
                                staminaCost.textContent = '体力消耗：1';
                                
                                grandchildItem.appendChild(grandchildName);
                                grandchildItem.appendChild(staminaCost);
                                
                                grandchildrenContainer.appendChild(grandchildItem);
                            }
                        });
                        
                        childGroup.appendChild(grandchildrenContainer);
                        childrenContainer.appendChild(childGroup);
                    }
                });
                
                regionGroup.appendChild(regionParent);
                regionGroup.appendChild(childrenContainer);
            } else {
                // 如果区域未知，显示为未知
                const unknownName = document.createElement('strong');
                unknownName.textContent = '未知';
                
                regionParent.appendChild(unknownName);
                regionGroup.appendChild(regionParent);
            }
            
            locationList.appendChild(regionGroup);
        });
    } catch (error) {
        console.error('更新地图地点时出错:', error);
    }
}

// 旅行功能 - 修复错误处理
function travelTo(location) {
    try {
        let staminaCost = 1;
        
        if (location === '十万大山-狼妖家') {
            staminaCost = 3;
        }
        
        if (gameState.stamina >= staminaCost) {
            gameState.stamina -= staminaCost;
            gameState.currentLocation = location;
            updateStatusBar();
            appendStoryContent(`你来到了${location}。`);
            showPage('game-main');
        } else {
            alert('体力不足，无法前往该地点。');
        }
    } catch (error) {
        console.error('旅行功能出错:', error);
        alert('旅行功能出错，请查看控制台获取详细信息');
    }
}

// 切换地点展开/收起 - 修复错误处理
function toggleLocation(locationId) {
    try {
        const childrenElement = document.getElementById(locationId + '-children');
        if (!childrenElement) {
            console.error(`找不到元素: ${locationId}-children`);
            return;
        }
        
        const parentElement = childrenElement.previousElementSibling;
        if (!parentElement) {
            console.error(`找不到元素: ${locationId}-children 的前一个兄弟元素`);
            return;
        }
        
        const toggleIcon = parentElement.querySelector('.toggle-icon');
        if (!toggleIcon) {
            console.error(`找不到元素: .toggle-icon`);
            return;
        }
        
        if (childrenElement.classList.contains('expanded')) {
            childrenElement.classList.remove('expanded');
            toggleIcon.textContent = '▼';
            toggleIcon.style.transform = 'rotate(0deg)';
        } else {
            childrenElement.classList.add('expanded');
            toggleIcon.textContent = '▲';
            toggleIcon.style.transform = 'rotate(180deg)';
        }
    } catch (error) {
        console.error('切换地点展开/收起功能出错:', error);
    }
}

// 自动保存到默认存档
function autoSaveDefault() {
    try {
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
    } catch (error) {
        console.error('自动保存到默认存档时出错:', error);
    }
}

// 发送消息 - 修复API连接问题
function sendMessage() {
    try {
        const input = document.getElementById('player-input');
        const message = input.value.trim();
        
        if (!message) return;
        
        // 显示用户消息
        appendStoryContent(`你说："${message}"`);
        input.value = '';
        
        // 获取API设置
        const settings = JSON.parse(localStorage.getItem('apiSettings') || '{}');
        if (!settings.apiUrl || !settings.apiKey || !settings.model) {
            appendStoryContent('错误：请先完成API设置');
            return;
        }
        
        // 显示处理中提示
        appendStoryContent('系统正在思考中...');
        
        // 尝试多种API端点
        const endpoints = [
            '/v1/chat/completions',
            '/chat/completions',
            '/api/chat/completions',
            '/api/v1/chat/completions',
            '/v1/completions',
            '/completions',
            '/api/completions',
            '/api/v1/completions'
        ];
        
        // 尝试第一个端点
        tryApiRequest(0, message, settings, endpoints);
    } catch (error) {
        console.error('发送消息时出错:', error);
        appendStoryContent('发送消息时出错，请查看控制台获取详细信息');
    }
}

function tryApiRequest(endpointIndex, message, settings, endpoints) {
    if (endpointIndex >= endpoints.length) {
        // 所有端点都尝试过了，但都失败了
        appendStoryContent('错误：无法连接到API，请检查API设置或联系管理员');
        return;
    }
    
    const endpoint = endpoints[endpointIndex];
    const url = settings.apiUrl.replace(/\/$/, '') + endpoint;
    console.log(`尝试API请求: ${url}`);
    
    // 构建prompt
    const prompt = buildPrompt(message);
    
    // 根据端点选择请求格式
    let requestBody;
    if (endpoint.includes('chat/completions')) {
        // OpenAI格式
        requestBody = {
            model: settings.model,
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.7,
            max_tokens: 2000
        };
    } else {
        // 其他格式
        requestBody = {
            model: settings.model,
            prompt: prompt,
            temperature: 0.7,
            max_tokens: 2000
        };
    }
    
    fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + settings.apiKey,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
    .then(res => {
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
    })
    .then(data => {
        console.log('API响应数据:', data);
        
        // 保存成功的端点以供后续使用
        localStorage.setItem('apiEndpoint', endpoint);
        
        // 移除处理中提示
        let storyList = JSON.parse(localStorage.getItem('storyList') || '[]');
        storyList.pop();
        localStorage.setItem('storyList', JSON.stringify(storyList));
        
        // 从不同格式的响应中提取内容
        let responseContent = extractResponseContent(data);
        
        // 处理回复
        const response = cleanLLMResponse(responseContent);
        appendStoryContent(response);
    })
    .catch(err => {
        console.error(`端点 ${endpoint} 请求失败:`, err);
        // 尝试下一个端点
        tryApiRequest(endpointIndex + 1, message, settings, endpoints);
    });
}

function extractResponseContent(data) {
    // OpenAI格式
    if (data.choices && data.choices[0] && data.choices[0].message) {
        return data.choices[0].message.content;
    }
    // Claude格式
    else if (data.completion) {
        return data.completion;
    }
    // 其他可能的格式
    else if (data.choices && data.choices[0] && data.choices[0].text) {
        return data.choices[0].text;
    }
    else if (data.output) {
        return data.output;
    }
    else if (data.response) {
        return data.response;
    }
    else if (data.generated_text) {
        return data.generated_text;
    }
    else if (typeof data === 'string') {
        return data;
    }
    else {
        // 如果无法识别格式，尝试将整个响应转为字符串
        return '无法解析AI响应，原始数据: ' + JSON.stringify(data);
    }
}

// 构建prompt
function buildPrompt(userMessage) {
    // 获取玩家名和当前交互角色
    const userName = gameState.playerName || '玩家';
    const charName = gameState.currentCharacter || '';
    
    // 获取最近的故事记录
    const storyList = JSON.parse(localStorage.getItem('storyList')) || [];
    const history = storyList.slice(-10).join('\n');
    
    // 加载基础prompt
    const basePrompt = localStorage.getItem('basePrompt') || '';
    
    // 替换变量
    let prompt = basePrompt
        .replace(/\{\{user\}\}/g, userName)
        .replace(/\{\{char\}\}/g, charName)
        .replace(/\{\{lastUserMessage\}\}/g, userMessage);
    
    // 添加交互历史
    prompt += `\n[交互历史]\n${history}`;
    
    return prompt;
}

// 处理AI回复文本
function cleanLLMResponse(rawText) {
    // 使用正则表达式去除特殊标记
    const regex = /(<disclaimer>.*?<\/disclaimer>)|(<guifan>.*?<\/guifan>)|```start|<content>|<\/content>|```end|<done>|`<done>`|(<!--[\s\S]*?-->(\s*))|(.*?<\/think(ing)?>(\n)?)|(<think(ing)?>[\s\S]*<\/think(ing)?>(\n)?)/gs;
    return rawText.replace(regex, '').trim();
}

// 设置页面相关逻辑 - 修复API连接问题
function fetchModelList() {
    const apiUrl = document.getElementById('api-url').value;
    const apiKey = document.getElementById('api-key').value;
    if (!apiUrl || !apiKey) {
        alert('请填写API地址和密钥');
        return;
    }
    const select = document.getElementById('model-select');
    select.innerHTML = '<option>拉取中...</option>';
    
    // 尝试多种API端点格式
    const endpoints = [
        '/v1/models',
        '/models',
        '/api/models',
        '/api/v1/models'
    ];
    
    // 尝试第一个端点
    tryFetchModels(0, apiUrl, apiKey, endpoints, select);
}

function tryFetchModels(endpointIndex, apiUrl, apiKey, endpoints, select) {
    if (endpointIndex >= endpoints.length) {
        // 所有端点都尝试过了，但都失败了
        select.innerHTML = '<option>拉取失败</option>';
        alert('模型拉取失败，请检查API地址和密钥是否正确');
        return;
    }
    
    const endpoint = endpoints[endpointIndex];
    const url = apiUrl.replace(/\/$/, '') + endpoint;
    console.log(`尝试从 ${url} 获取模型列表`);
    
    fetch(url, {
        headers: {
            'Authorization': 'Bearer ' + apiKey
        }
    })
    .then(res => {
        if (!res.ok) {
            throw new Error(`端点 ${endpoint} 返回状态码 ${res.status}`);
        }
        return res.json();
    })
    .then(data => {
        console.log(`从 ${endpoint} 获取到数据:`, data);
        
        // 保存成功的端点以供后续使用
        localStorage.setItem('apiEndpoint', endpoint);
        
        // 处理不同API格式的响应
        let models = extractModels(data);
        
        if (models.length === 0) {
            select.innerHTML = '<option>未获取到模型</option>';
            alert('未能识别模型列表格式，请联系开发者');
        } else {
            select.innerHTML = '';
            models.forEach(m => {
                const opt = document.createElement('option');
                opt.value = m.value;
                opt.textContent = m.label;
                select.appendChild(opt);
            });
            alert(`成功获取到 ${models.length} 个模型`);
        }
    })
    .catch(err => {
        console.error(`端点 ${endpoint} 请求失败:`, err);
        // 尝试下一个端点
        tryFetchModels(endpointIndex + 1, apiUrl, apiKey, endpoints, select);
    });
}

function extractModels(data) {
    let models = [];
    
    // OpenAI格式
    if (Array.isArray(data.data)) {
        models = data.data.map(m => ({ value: m.id, label: m.id }));
    } 
    // Claude格式
    else if (Array.isArray(data.models)) {
        models = data.models.map(m => ({ value: m.name || m.id, label: m.name || m.id }));
    }
    // 其他可能的格式
    else if (Array.isArray(data)) {
        models = data.map(m => ({ 
            value: m.id || m.name || m, 
            label: m.id || m.name || m 
        }));
    }
    // 如果data本身是对象且有键，可能是模型列表
    else if (typeof data === 'object' && Object.keys(data).length > 0) {
        models = Object.keys(data).map(key => ({
            value: key,
            label: data[key].name || key
        }));
    }
    
    return models;
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

// 自动保存API设置
function autoSaveApiSettings() {
    const apiUrl = document.getElementById('api-url').value;
    const apiKey = document.getElementById('api-key').value;
    const model = document.getElementById('model-select').value;
    
    // 只有当所有字段都有值时才保存
    if (apiUrl && apiKey && model) {
        localStorage.setItem('apiSettings', JSON.stringify({ apiUrl, apiKey, model }));
        console.log('API设置已自动保存');
    }
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

// 页面切换函数
function showPage(pageId) {
    try {
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        const page = document.getElementById(pageId);
        if (!page) {
            console.error(`找不到页面: ${pageId}`);
            return;
        }
        page.classList.add('active');
        if (pageId === 'load-game') {
            if (typeof showLoadGameList === 'function') {
                showLoadGameList();
            } else {
                console.error('找不到函数: showLoadGameList');
            }
        }
    } catch (error) {
        console.error('页面切换时出错:', error);
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
            saveSettings();
        });
        
        // 为API设置字段添加change事件监听器，实现自动保存
        const apiUrl = document.getElementById('api-url');
        const apiKey = document.getElementById('api-key');
        const modelSelect = document.getElementById('model-select');
        
        if (apiUrl && apiKey && modelSelect) {
            apiUrl.addEventListener('change', autoSaveApiSettings);
            apiKey.addEventListener('change', autoSaveApiSettings);
            modelSelect.addEventListener('change', autoSaveApiSettings);
        }
    }
    
    // 初始化时随机生成属性
    randomizeAttributes();
    
    // 游戏状态初始化
    initializeGameState();
    
    console.log('初始化完成');
    
    // 自动渲染故事内容
    renderStoryContent();
    
    // 加载API设置
    loadSettings();
});

// 游戏状态初始化
function initializeGameState() {
    // 确保gameState对象包含所有必要的属性
    if (!gameState.knownLocations) {
        gameState.knownLocations = worldMap.knownLocations || [];
    }
    
    // 确保当前位置是已知位置
    if (!isLocationKnown(gameState.currentLocation)) {
        addKnownLocation(gameState.currentLocation);
    }
    
    console.log('游戏状态初始化完成');
}

// 确保所有函数在全局作用域中可用
window.showPage = showPage;
window.randomizeAttributes = randomizeAttributes;
window.sendMessage = sendMessage;
window.cultivate = cultivate;
window.rest = rest;
window.explore = explore; // 替换skipYear为explore
window.travelTo = travelTo;
window.toggleLocation = toggleLocation;
window.saveGame = saveGame;
window.loadGame = loadGame;
window.fetchModelList = fetchModelList;
window.saveSettings = saveSettings;
window.loadSettings = loadSettings;
