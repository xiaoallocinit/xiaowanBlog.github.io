// 回到顶部功能
(function() {
    'use strict';

    // 创建回到顶部按钮
    function createBackToTopButton() {
        const button = document.createElement('div');
        button.id = 'back-to-top';
        button.innerHTML = '<i class="fa fa-chevron-up"></i>';
        button.setAttribute('title', '回到顶部');
        
        // 添加样式
        const styles = {
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            width: '50px',
            height: '50px',
            backgroundColor: '#0085a1',
            color: 'white',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            opacity: '0',
            transition: 'opacity 0.3s, transform 0.3s',
            zIndex: '1000',
            fontSize: '18px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
            transform: 'translateY(20px)'
        };

        Object.assign(button.style, styles);
        document.body.appendChild(button);
        return button;
    }

    // 显示/隐藏按钮
    function toggleButton(button, show) {
        if (show) {
            button.style.opacity = '1';
            button.style.transform = 'translateY(0)';
        } else {
            button.style.opacity = '0';
            button.style.transform = 'translateY(20px)';
        }
    }

    // 平滑滚动到顶部
    function scrollToTop() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > 0) {
            window.requestAnimationFrame(() => {
                window.scrollTo(0, scrollTop - scrollTop / 8);
                scrollToTop();
            });
        }
    }

    // 初始化
    function init() {
        const button = createBackToTopButton();
        
        // 鼠标悬停效果
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(0) scale(1.1)';
            this.style.backgroundColor = '#006b7d';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.backgroundColor = '#0085a1';
        });

        // 点击事件
        button.addEventListener('click', scrollToTop);

        // 滚动监听
        let ticking = false;
        function handleScroll() {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    toggleButton(button, scrollTop > 300);
                    ticking = false;
                });
                ticking = true;
            }
        }

        window.addEventListener('scroll', handleScroll);
    }

    // DOM 加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();