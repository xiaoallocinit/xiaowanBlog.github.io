// Apple风格页面导航和过渡效果
(function() {
    'use strict';

    // 页面过渡动画配置
    const TRANSITION_CONFIG = {
        duration: 600,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        stagger: 100
    };

    // 初始化导航效果
    function initAppleNavigation() {
        initCardClickAnimation();
        initPageTransition();
        initSmoothScroll();
        initProgressBar();
    }

    // 卡片点击动画
    function initCardClickAnimation() {
        const cards = document.querySelectorAll('.apple-post-card');
        
        cards.forEach(card => {
            card.addEventListener('click', function(e) {
                // 如果点击的是标签或链接，不执行页面跳转动画
                if (e.target.closest('.apple-tag, .apple-read-more')) {
                    return;
                }
                
                e.preventDefault();
                const url = this.getAttribute('data-href');
                
                if (!url) return;
                
                // 添加点击动画
                this.style.transform = 'scale(0.95)';
                this.style.transition = 'transform 0.2s ease';
                
                // 创建页面过渡效果
                createPageTransition(() => {
                    window.location.href = url;
                });
            });
            
            // 添加鼠标指针样式
            card.style.cursor = 'pointer';
        });
    }

    // 页面过渡效果
    function createPageTransition(callback) {
        // 创建过渡遮罩
        const overlay = document.createElement('div');
        overlay.className = 'apple-page-transition';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            z-index: 9999;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.4s ease;
        `;
        
        document.body.appendChild(overlay);
        
        // 触发动画
        requestAnimationFrame(() => {
            overlay.style.opacity = '1';
            overlay.style.pointerEvents = 'all';
        });
        
        // 延迟执行回调
        setTimeout(() => {
            if (callback) callback();
        }, 300);
    }

    // 页面进入动画
    function initPageTransition() {
        // 检查是否从其他页面跳转而来
        if (document.referrer && document.referrer.includes(window.location.hostname)) {
            // 添加页面进入动画
            document.body.style.opacity = '0';
            document.body.style.transform = 'translateY(20px)';
            
            window.addEventListener('load', () => {
                setTimeout(() => {
                    document.body.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    document.body.style.opacity = '1';
                    document.body.style.transform = 'translateY(0)';
                }, 100);
            });
        }
    }

    // 平滑滚动
    function initSmoothScroll() {
        // 为所有内部链接添加平滑滚动
        const internalLinks = document.querySelectorAll('a[href^="#"]');
        
        internalLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    smoothScrollTo(targetElement);
                }
            });
        });
    }

    // 平滑滚动到指定元素
    function smoothScrollTo(element) {
        const targetPosition = element.offsetTop - 80; // 预留导航栏空间
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = Math.min(Math.abs(distance) * 2, 1000); // 最长1秒
        let start = null;

        function animation(currentTime) {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const run = easeInOutQuart(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function easeInOutQuart(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t * t * t + b;
            t -= 2;
            return -c / 2 * (t * t * t * t - 2) + b;
        }

        requestAnimationFrame(animation);
    }

    // 阅读进度条
    function initProgressBar() {
        // 只在文章页面显示进度条
        if (document.querySelector('.apple-post-content')) {
            createProgressBar();
        }
    }

    function createProgressBar() {
        const progressBar = document.createElement('div');
        progressBar.className = 'apple-progress-bar';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #667eea, #764ba2);
            z-index: 1000;
            transition: width 0.2s ease;
            border-radius: 0 3px 3px 0;
        `;
        
        document.body.appendChild(progressBar);
        
        // 监听滚动事件
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateProgressBar);
                ticking = true;
            }
        });
        
        function updateProgressBar() {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            
            progressBar.style.width = Math.min(scrollPercent, 100) + '%';
            ticking = false;
        }
    }

    // 返回首页的优化交互
    function initBackToHome() {
        const backLinks = document.querySelectorAll('a[href="/"], a[href="' + window.location.origin + '/"]');
        
        backLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // 添加页面退出动画
                document.body.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                document.body.style.opacity = '0';
                document.body.style.transform = 'translateY(-20px)';
                
                setTimeout(() => {
                    window.location.href = this.href;
                }, 300);
            });
        });
    }

    // 文章内的图片懒加载和优化
    function initImageOptimization() {
        const images = document.querySelectorAll('.apple-post-content img');
        
        images.forEach(img => {
            // 添加加载动画
            img.style.opacity = '0';
            img.style.transform = 'scale(0.95)';
            img.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            img.onload = function() {
                this.style.opacity = '1';
                this.style.transform = 'scale(1)';
            };
            
            // 添加点击放大功能
            img.addEventListener('click', function() {
                createImageModal(this.src, this.alt);
            });
            
            img.style.cursor = 'zoom-in';
        });
    }

    // 图片模态框
    function createImageModal(src, alt) {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
            cursor: zoom-out;
        `;
        
        const img = document.createElement('img');
        img.src = src;
        img.alt = alt;
        img.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            border-radius: 12px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            transform: scale(0.8);
            transition: transform 0.3s ease;
        `;
        
        modal.appendChild(img);
        document.body.appendChild(modal);
        
        // 触发动画
        requestAnimationFrame(() => {
            modal.style.opacity = '1';
            img.style.transform = 'scale(1)';
        });
        
        // 点击关闭
        modal.addEventListener('click', () => {
            modal.style.opacity = '0';
            img.style.transform = 'scale(0.8)';
            setTimeout(() => modal.remove(), 300);
        });
        
        // ESC键关闭
        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                modal.click();
                document.removeEventListener('keydown', handleEsc);
            }
        };
        document.addEventListener('keydown', handleEsc);
    }

    // 键盘快捷键
    function initKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Alt + ← 返回上一页
            if (e.altKey && e.key === 'ArrowLeft') {
                e.preventDefault();
                window.history.back();
            }
            
            // Alt + → 前进下一页
            if (e.altKey && e.key === 'ArrowRight') {
                e.preventDefault();
                window.history.forward();
            }
            
            // 空格键/J键向下滚动，K键向上滚动
            if (!e.ctrlKey && !e.metaKey && !e.altKey) {
                if (e.key === ' ' || e.key === 'j') {
                    e.preventDefault();
                    window.scrollBy(0, window.innerHeight * 0.7);
                } else if (e.key === 'k') {
                    e.preventDefault();
                    window.scrollBy(0, -window.innerHeight * 0.7);
                }
            }
        });
    }

    // 初始化所有功能
    function init() {
        initAppleNavigation();
        initBackToHome();
        initImageOptimization();
        initKeyboardShortcuts();
        
        // 页面加载完成后的增强
        window.addEventListener('load', () => {
            // 延迟初始化某些功能以提高性能
            setTimeout(() => {
                // 可以在这里添加更多延迟加载的功能
            }, 1000);
        });
    }

    // DOM准备就绪时初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // 导出API
    window.AppleNavigation = {
        smoothScrollTo,
        createPageTransition,
        createImageModal
    };

})();