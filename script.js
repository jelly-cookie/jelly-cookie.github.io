class CookieMaker {
    constructor() {
        this.currentColor = '#FF69B4';
        this.currentSize = 20;
        this.cookieDesign = [];
        this.isDragging = false;
        this.selectedTopping = null;
        this.canvas = document.getElementById('cookieCanvas');
        this.tooltip = this.createTooltip();
        
        this.initializeEventListeners();
        this.initializeToolsPanel();
    }

    initializeEventListeners() {
        // 드래그 앤 드롭 이벤트
        this.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
        document.addEventListener('mousemove', this.handleMouseMove.bind(this));
        document.addEventListener('mouseup', this.handleMouseUp.bind(this));
        
        // 터치 이벤트
        this.canvas.addEventListener('touchstart', this.handleTouchStart.bind(this));
        this.canvas.addEventListener('touchmove', this.handleTouchMove.bind(this));
        this.canvas.addEventListener('touchend', this.handleTouchEnd.bind(this));

        // 색상 선택 이벤트
        document.querySelectorAll('.color-option').forEach(option => {
            option.addEventListener('click', () => this.changeColor(option.style.background));
        });

        // 툴팁 이벤트
        document.querySelectorAll('button').forEach(button => {
            button.addEventListener('mouseenter', (e) => this.showTooltip(e, button.dataset.tooltip));
            button.addEventListener('mouseleave', () => this.hideTooltip());
        });
    }

    initializeToolsPanel() {
        const toolsPanel = document.createElement('div');
        toolsPanel.className = 'tools-panel';
        
        // 크기 조절 슬라이더 추가
        const sizeSlider = document.createElement('input');
        sizeSlider.type = 'range';
        sizeSlider.min = '10';
        sizeSlider.max = '50';
        sizeSlider.value = '20';
        sizeSlider.className = 'size-slider';
        sizeSlider.addEventListener('input', (e) => this.currentSize = parseInt(e.target.value));
        
        toolsPanel.appendChild(sizeSlider);
        this.canvas.parentElement.appendChild(toolsPanel);
    }

    createTooltip() {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.style.display = 'none';
        document.body.appendChild(tooltip);
        return tooltip;
    }

    showTooltip(event, text) {
        this.tooltip.textContent = text;
        this.tooltip.style.display = 'block';
        this.tooltip.style.left = event.pageX + 10 + 'px';
        this.tooltip.style.top = event.pageY + 10 + 'px';
    }

    hideTooltip() {
        this.tooltip.style.display = 'none';
    }

    changeColor(color) {
        this.currentColor = color;
        document.querySelectorAll('.color-option').forEach(option => {
            option.classList.remove('active');
            if (option.style.background === color) {
                option.classList.add('active');
            }
        });
    }

    addTopping(x, y) {
        const topping = document.createElement('div');
        topping.className = 'topping animate__animated animate__zoomIn';
        topping.style.backgroundColor = this.currentColor;
        topping.style.width = this.currentSize + 'px';
        topping.style.height = this.currentSize + 'px';
        topping.style.left = (x - this.currentSize / 2) + 'px';
        topping.style.top = (y - this.currentSize / 2) + 'px';
        
        topping.addEventListener('click', () => this.removeTopping(topping));
        this.canvas.appendChild(topping);
        this.cookieDesign.push({
            color: this.currentColor,
            size: this.currentSize,
            x: x,
            y: y
        });
    }

    removeTopping(topping) {
        topping.classList.add('animate__zoomOut');
        setTimeout(() => topping.remove(), 500);
    }

    handleMouseDown(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // 토핑 선택 확인
        const topping = e.target.classList.contains('topping') ? e.target : null;
        
        if (topping) {
            this.isDragging = true;
            this.selectedTopping = topping;
        } else {
            this.addTopping(x, y);
        }
    }

    handleMouseMove(e) {
        if (this.isDragging && this.selectedTopping) {
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            this.selectedTopping.style.left = (x - this.currentSize / 2) + 'px';
            this.selectedTopping.style.top = (y - this.currentSize / 2) + 'px';
        }
    }

    handleMouseUp() {
        this.isDragging = false;
        this.selectedTopping = null;
    }

    handleTouchStart(e) {
        const touch = e.touches[0];
        const rect = this.canvas.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        this.addTopping(x, y);
    }

    handleTouchMove(e) {
        e.preventDefault();
    }

    handleTouchEnd() {
        // 터치 종료 처리
    }

    changeShape() {
        const shapes = ['50%', '0%', '30% 70% 70% 30% / 30% 30% 70% 70%'];
        const currentShape = this.canvas.style.borderRadius;
        let nextShape = shapes[(shapes.indexOf(currentShape) + 1) % shapes.length];
        
        this.canvas.style.borderRadius = nextShape;
        this.canvas.classList.add('animate__animated', 'animate__rubberBand');
        setTimeout(() => {
            this.canvas.classList.remove('animate__animated', 'animate__rubberBand');
        }, 1000);
    }

    saveDesign() {
        const designData = {
            toppings: this.cookieDesign,
            shape: this.canvas.style.borderRadius
        };
        
        localStorage.setItem('cookieDesign', JSON.stringify(designData));
        this.showNotification('쿠키 디자인이 저장되었습니다! 🎉');
    }

    loadDesign() {
        const savedDesign = localStorage.getItem('cookieDesign');
        if (savedDesign) {
            const designData = JSON.parse(savedDesign);
            this.canvas.style.borderRadius = designData.shape;
            
            // 기존 토핑 제거
            this.canvas.querySelectorAll('.topping').forEach(topping => topping.remove());
            
            // 저장된 토핑 추가
            designData.toppings.forEach(topping => {
                this.currentColor = topping.color;
                this.currentSize = topping.size;
                this.addTopping(topping.x, topping.y);
            });
        }
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.left = '50%';
        notification.style.transform = 'translateX(-50%)';
        notification.style.background = 'rgba(0, 0, 0, 0.8)';
        notification.style.color = 'white';
        notification.style.padding = '10px 20px';
        notification.style.borderRadius = '25px';
        notification.style.zIndex = '1000';
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transition = 'opacity 0.5s';
            setTimeout(() => notification.remove(), 500);
        }, 2000);
    }

    shareDesign() {
        if (navigator.share) {
            navigator.share({
                title: '나만의 젤리 쿠키 디자인',
                text: '내가 만든 특별한 젤리 쿠키를 확인해보세요!',
                url: window.location.href
            });
        } else {
            const url = window.location.href;
            navigator.clipboard.writeText(url).then(() => {
                this.showNotification('링크가 클립보드에 복사되었습니다! 🔗');
            });
        }
    }
}

// 페이지 로드 시 쿠키 메이커 초기화
window.addEventListener('DOMContentLoaded', () => {
    window.cookieMaker = new CookieMaker();
}); 