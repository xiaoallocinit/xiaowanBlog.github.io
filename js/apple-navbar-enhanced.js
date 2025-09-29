// Apple Navigation Bar Enhanced Features
(function() {
    'use strict';
    
    // 等待DOM加载完成
    document.addEventListener('DOMContentLoaded', function() {
        initAppleNavbar();
    });
    
    function initAppleNavbar() {
        const navbar = document.getElementById('apple-navbar');
        const navLinks = document.querySelectorAll('.apple-nav-link');
        const currentPath = window.location.pathname;
        
        if (!navbar) return;
        
        // 设置当前页面的导航链接为活跃状态
        setActiveNavLink(navLinks, currentPath);
        
        // 初始化触摸手势支持
        initTouchGestures();
        
        // 初始化可访问性功能
        initAccessibility();
        
        // 初始化性能优化
        initPerformanceOptimizations();
        
        // 初始化导航栏磁吸效果
        initMagneticEffect();
    }
    
    // 设置活跃导航链接
    function setActiveNavLink(navLinks, currentPath) {
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            link.classList.remove('active');
            
            // 精确匹配首页
            if (currentPath === '/' && (href === '/' || href.endsWith('/'))) {
                link.classList.add('active');
            }
            // 匹配其他页面
            else if (currentPath !== '/' && href && currentPath.includes(href.replace(/\/$/, ''))) {
                link.classList.add('active');
            }
        });
    }
    
    // 触摸手势支持
    function initTouchGestures() {
        const mobileToggle = document.getElementById('apple-mobile-toggle');
        const navMenu = document.getElementById('apple-nav-menu');
        
        if (!mobileToggle || !navMenu) return;
        
        let touchStartY = 0;
        let touchEndY = 0;
        
        // 支持滑动关闭菜单
        navMenu.addEventListener('touchstart', function(e) {
            touchStartY = e.changedTouches[0].screenY;
        }, { passive: true });
        
        navMenu.addEventListener('touchend', function(e) {
            touchEndY = e.changedTouches[0].screenY;
            handleSwipeGesture();
        }, { passive: true });
        
        function handleSwipeGesture() {
            const swipeThreshold = 50;
            const swipeDistance = touchStartY - touchEndY;
            
            // 向上滑动关闭菜单
            if (swipeDistance > swipeThreshold && navMenu.classList.contains('apple-nav-menu-open')) {
                mobileToggle.click();
            }
        }
    }
    
    // 可访问性功能
    function initAccessibility() {
        const mobileToggle = document.getElementById('apple-mobile-toggle');
        const navMenu = document.getElementById('apple-nav-menu');
        const navLinks = document.querySelectorAll('.apple-nav-link');
        
        if (!mobileToggle || !navMenu) return;
        
        // 添加ARIA属性
        mobileToggle.setAttribute('aria-label', '打开导航菜单');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.setAttribute('aria-controls', 'apple-nav-menu');
        
        navMenu.setAttribute('aria-hidden', 'true');
        
        // 监听菜单状态变化
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    const isOpen = navMenu.classList.contains('apple-nav-menu-open');
                    mobileToggle.setAttribute('aria-expanded', isOpen.toString());
                    navMenu.setAttribute('aria-hidden', (!isOpen).toString());
                    
                    if (isOpen) {
                        mobileToggle.setAttribute('aria-label', '关闭导航菜单');
                        // 焦点管理：菜单打开时聚焦到第一个链接
                        setTimeout(() => {
                            const firstLink = navMenu.querySelector('.apple-nav-link');
                            if (firstLink) firstLink.focus();
                        }, 300);
                    } else {
                        mobileToggle.setAttribute('aria-label', '打开导航菜单');
                    }
                }
            });
        });
        
        observer.observe(navMenu, { attributes: true });
        
        // 键盘导航支持
        navLinks.forEach(link => {
            link.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    link.click();
                }
            });
        });
        
        // ESC键关闭菜单
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('apple-nav-menu-open')) {
                mobileToggle.click();
                mobileToggle.focus();
            }
        });
    }
    
    // 性能优化
    function initPerformanceOptimizations() {
        const navbar = document.getElementById('apple-navbar');
        if (!navbar) return;
        
        // 使用节流优化滚动事件
        let ticking = false;
        
        function updateNavbarOnScroll() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // 使用requestAnimationFrame确保平滑动画
            if (!ticking) {
                requestAnimationFrame(function() {
                    // 滚动状态检测
                    if (scrollTop > 50) {
                        navbar.classList.add('apple-navbar-scrolled');
                    } else {
                        navbar.classList.remove('apple-navbar-scrolled');
                    }
                    
                    ticking = false;
                });
                ticking = true;
            }
        }
        
        // 使用passive事件监听器提高性能
        window.addEventListener('scroll', updateNavbarOnScroll, { passive: true });
        
        // 预加载关键资源
        const criticalLinks = document.querySelectorAll('.apple-nav-link[href]');
        criticalLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('/')) {
                const preloadLink = document.createElement('link');
                preloadLink.rel = 'prefetch';
                preloadLink.href = href;
                document.head.appendChild(preloadLink);
            }
        });
    }
    
    // 磁吸效果（苹果风格的微交互）
    function initMagneticEffect() {
        const navLinks = document.querySelectorAll('.apple-nav-link');
        
        // 只在桌面设备上启用磁吸效果
        if (window.innerWidth <= 768) return;
        
        navLinks.forEach(link => {
            link.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px) scale(1.02)';
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
            
            // 鼠标移动时的微妙跟随效果
            link.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const deltaX = (x - centerX) / centerX;
                const deltaY = (y - centerY) / centerY;
                
                const maxTilt = 2; // 最大倾斜角度
                const tiltX = deltaY * maxTilt;
                const tiltY = -deltaX * maxTilt;
                
                this.style.transform = `translateY(-2px) scale(1.02) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
            });
        });
    }
    
    // 响应式断点检测
    function handleResponsiveBreakpoints() {
        const navbar = document.getElementById('apple-navbar');
        const mobileToggle = document.getElementById('apple-mobile-toggle');
        const navMenu = document.getElementById('apple-nav-menu');
        
        if (!navbar || !mobileToggle || !navMenu) return;
        
        function checkBreakpoint() {
            const isMobile = window.innerWidth <= 768;
            
            if (!isMobile && navMenu.classList.contains('apple-nav-menu-open')) {
                // 从移动端切换到桌面端时自动关闭菜单
                navMenu.classList.remove('apple-nav-menu-open');
                mobileToggle.classList.remove('apple-toggle-active');
                document.body.classList.remove('apple-nav-body-lock');
            }
        }
        
        // 防抖处理窗口大小变化
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(checkBreakpoint, 250);
        });
    }
    
    // 初始化响应式处理
    handleResponsiveBreakpoints();
    
    // 增强的动画控制
    function initAdvancedAnimations() {
        // 检测用户是否偏好减少动画
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (prefersReducedMotion) {
            // 如果用户偏好减少动画，添加相应的类
            document.documentElement.classList.add('reduce-motion');
        }
        
        // 监听偏好变化
        window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', function(e) {
            if (e.matches) {
                document.documentElement.classList.add('reduce-motion');
            } else {
                document.documentElement.classList.remove('reduce-motion');
            }
        });
    }
    
    // 初始化高级动画
    initAdvancedAnimations();
    
})();