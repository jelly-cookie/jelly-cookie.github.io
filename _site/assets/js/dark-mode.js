// 다크 모드 토글 기능
document.addEventListener('DOMContentLoaded', function() {
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const body = document.body;
  
  // 사용자 기본 설정 확인
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const storedTheme = localStorage.getItem('theme');
  
  // 저장된 테마 또는 시스템 기본 설정 적용
  if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
    body.classList.add('dark-theme');
    darkModeToggle.checked = true;
  }
  
  // 다크 모드 토글 이벤트 리스너
  darkModeToggle.addEventListener('change', function() {
    if (this.checked) {
      body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
  });
}); 