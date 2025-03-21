// 카테고리 메뉴 토글
document.addEventListener('DOMContentLoaded', function() {
  // 초기 상태로 모든 서브카테고리 접기
  const categoryGroups = document.querySelectorAll('.category-group');
  
  categoryGroups.forEach(group => {
    // 초기에는 모든 그룹을 접은 상태로 설정
    group.classList.add('collapsed');
    
    const heading = group.querySelector('h3');
    const sublist = group.querySelector('ul');
    
    // 클릭 이벤트 핸들러
    heading.addEventListener('click', () => {
      const isCollapsed = group.classList.contains('collapsed');
      
      // 부드러운 애니메이션 효과
      if (isCollapsed) {
        group.classList.remove('collapsed');
        sublist.style.maxHeight = sublist.scrollHeight + 'px';
      } else {
        group.classList.add('collapsed');
        sublist.style.maxHeight = '0';
      }
    });
  });
  
  // 사이드바 스크롤 효과
  const sidebar = document.querySelector('.sidebar');
  if (sidebar) {
    window.addEventListener('scroll', () => {
      const scrollPos = window.scrollY;
      if (scrollPos > 100) {
        sidebar.classList.add('scrolled');
      } else {
        sidebar.classList.remove('scrolled');
      }
    });
  }
  
  // 헤더 스크롤 효과
  const masthead = document.querySelector('.masthead');
  if (masthead) {
    window.addEventListener('scroll', () => {
      const scrollPos = window.scrollY;
      if (scrollPos > 50) {
        masthead.classList.add('scrolled');
      } else {
        masthead.classList.remove('scrolled');
      }
    });
  }
  
  // 모바일 메뉴 토글
  const menuToggle = document.querySelector('.greedy-nav__toggle');
  const visibleLinks = document.querySelector('.visible-links');
  if (menuToggle && visibleLinks) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('close');
      visibleLinks.classList.toggle('visible');
    });
  }
});

// 프롬프트 복사 기능
function copyPrompt(button) {
  const card = button.closest('.prompt-card');
  const title = card.querySelector('.prompt-card__title').textContent;
  const excerpt = card.querySelector('.prompt-card__excerpt').textContent;
  
  // 애니메이션 효과
  card.classList.add('copying');
  setTimeout(() => card.classList.remove('copying'), 300);
  
  // 변수 값 수집
  const variables = {};
  const inputs = card.querySelectorAll('.variable-input input');
  inputs.forEach(input => {
    variables[input.id || input.dataset.varName] = input.value;
  });
  
  // 프롬프트 텍스트 생성
  let promptText = `${title}\n\n${excerpt}\n\n`;
  
  // 변수 값 추가
  if (Object.keys(variables).length > 0) {
    promptText += '변수:\n';
    for (const [key, value] of Object.entries(variables)) {
      if (value) {
        promptText += `${key}: ${value}\n`;
      }
    }
  }
  
  // 클립보드에 복사
  navigator.clipboard.writeText(promptText).then(() => {
    // 복사 성공 표시
    const originalText = button.textContent;
    const originalIcon = button.innerHTML.includes('<i') 
      ? button.innerHTML.match(/<i[^>]*>[^<]*<\/i>/)[0] 
      : '';
    
    button.innerHTML = '<i class="fas fa-check"></i> 복사됨!';
    button.classList.add('copied');
    
    setTimeout(() => {
      button.innerHTML = originalIcon ? originalIcon + ' ' + originalText : originalText;
      button.classList.remove('copied');
    }, 2000);
  });
}

// 좋아요 기능
document.addEventListener('DOMContentLoaded', function() {
  const likeButtons = document.querySelectorAll('.stat-btn.likes');
  
  likeButtons.forEach(button => {
    button.addEventListener('click', function() {
      const icon = button.querySelector('i');
      const count = button.querySelector('span');
      let likes = parseInt(count.textContent);
      
      // 애니메이션 효과
      button.classList.add('clicked');
      setTimeout(() => button.classList.remove('clicked'), 300);
      
      button.classList.toggle('active');
      
      if (button.classList.contains('active')) {
        icon.classList.remove('far');
        icon.classList.add('fas');
        icon.style.color = 'var(--danger)';
        count.textContent = likes + 1;
      } else {
        icon.classList.remove('fas');
        icon.classList.add('far');
        icon.style.color = '';
        count.textContent = likes - 1;
      }
    });
  });
});

// 부드러운 스크롤 효과
document.addEventListener('DOMContentLoaded', function() {
  const categoryLinks = document.querySelectorAll('.category-link');
  
  categoryLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // 카테고리 필터링 구현 (향후 추가)
      const category = this.dataset.category;
      const subcategory = this.dataset.subcategory;
      
      // 현재 활성화된 링크 스타일 변경
      document.querySelectorAll('.category-link.active').forEach(el => {
        el.classList.remove('active');
      });
      this.classList.add('active');
      
      // 모바일에서 사이드바 닫기 구현 (향후 추가)
    });
  });
});

// 페이지 로드 애니메이션
document.addEventListener('DOMContentLoaded', function() {
  document.body.classList.add('loaded');
}); 