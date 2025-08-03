/**
 * 角色生成和管理功能
 */

// 初始化角色管理器
const characterManager = new CharacterManager();

// 生成随机角色
function generateRandomCharacter() {
    // 使用CharacterManager生成新角色
    const character = characterManager.generateNewCharacter();
    if (character) {
        // 保存新生成的角色
        characterDetails[character.name] = character;
        
        // 添加到角色列表中
        addCharacterToList(character.name);
        
        // 显示角色详情
        showCharacterDetail(character.name);
        
        // 提示用户
        // 检查story-content元素是否存在
        const storyContent = document.getElementById('story-content');
        if (storyContent) {
            appendStoryContent(`你遇到了一位新角色：${character.name}`);
        }
    }
}

// 添加角色到列表
function addCharacterToList(characterName) {
    const relationshipList = document.querySelector('.relationship-list');
    if (relationshipList) {
        const characterItem = document.createElement('div');
        characterItem.className = 'relationship-item';
        characterItem.onclick = function() { showCharacterDetail(characterName); };
        
        const nameElement = document.createElement('strong');
        nameElement.textContent = characterName;
        
        characterItem.appendChild(nameElement);
        relationshipList.appendChild(characterItem);
    }
}

// 添加生成随机角色按钮
function addGenerateCharacterButton() {
    const characterList = document.querySelector('.character-list');
    if (characterList) {
        // 检查是否已经存在按钮
        if (document.querySelector('.generate-character-container')) {
            return;
        }
        
        const generateButtonContainer = document.createElement('div');
        generateButtonContainer.className = 'generate-character-container';
        generateButtonContainer.style.marginTop = '20px';
        generateButtonContainer.style.textAlign = 'center';
        
        const generateButton = document.createElement('button');
        generateButton.className = 'btn';
        generateButton.textContent = '遇见新角色';
        generateButton.onclick = generateRandomCharacter;
        
        generateButtonContainer.appendChild(generateButton);
        characterList.appendChild(generateButtonContainer);
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 添加生成随机角色按钮
    addGenerateCharacterButton();
});
