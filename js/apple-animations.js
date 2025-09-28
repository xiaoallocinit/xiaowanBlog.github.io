// Apple风格动画和交互效果
(function() {
    'use strict';

    // 初始化所有Apple风格动效
    function initAppleAnimations() {
        initCardAnimations();
        initParallaxEffects();
        initMagneticEffects();
        initRippleEffects();
        initScrollAnimations();
    }

    // 卡片动画效果
    function initCardAnimations() {
        const cards = document.querySelectorAll('.apple-post-card');
        
        cards.forEach(card => {
            // 鼠标进入效果
            card.addEventListener('mouseenter', function(e) {
                this.style.transform = 'translateY(-8px) scale(1.02)';
                
                // 添加微妙的旋转效果
                const rect = this.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const mouseX = e.clientX;
                const mouseY = e.clientY;
                
                const rotateX = (mouseY - centerY) / 20;
                const rotateY = (centerX - mouseX) / 20;
                
                this.style.transform += ` perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });

            // 鼠标移动时的动态倾斜
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const mouseX = e.clientX;
                const mouseY = e.clientY;
                
                const rotateX = (mouseY - centerY) / 30;
                const rotateY = (centerX - mouseX) / 30;
                
                this.style.transform = `translateY(-8px) scale(1.02) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });

            // 鼠标离开效果
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1) perspective(1000px) rotateX(0deg) rotateY(0deg)';
            });

            // 点击效果
            card.addEventListener('mousedown', function() {
                this.style.transform = 'translateY(-4px) scale(0.98)';
                this.style.transition = 'all 0.15s cubic-bezier(0.4, 0.0, 0.2, 1)';
            });

            card.addEventListener('mouseup', function() {
                this.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            });
        });
    }

    // 视差滚动效果
    function initParallaxEffects() {
        const cards = document.querySelectorAll('.apple-post-card');
        
        function handleScroll() {
            const scrollTop = window.pageYOffset;
            
            cards.forEach((card, index) => {
                const rect = card.getBoundingClientRect();
                const speed = 0.05 + (index % 3) * 0.02;
                const yPos = -(scrollTop * speed);
                
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    card.style.transform += ` translateZ(${yPos}px)`;
                }
            });
        }

        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(handleScroll);
                ticking = true;
                setTimeout(() => ticking = false, 16);
            }
        });
    }

    // 磁性吸附效果（标签和按钮）
    function initMagneticEffects() {
        const magneticElements = document.querySelectorAll('.apple-tag, .apple-read-more');
        
        magneticElements.forEach(element => {
            element.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const mouseX = e.clientX;
                const mouseY = e.clientY;
                
                const deltaX = (mouseX - centerX) * 0.3;
                const deltaY = (mouseY - centerY) * 0.3;
                
                this.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.05)`;
            });
            
            element.addEventListener('mouseleave', function() {
                this.style.transform = 'translate(0px, 0px) scale(1)';
            });
        });
    }

    // 波纹点击效果
    function initRippleEffects() {
        const cards = document.querySelectorAll('.apple-post-card');
        
        cards.forEach(card => {
            card.addEventListener('click', function(e) {
                const ripple = document.createElement('div');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: radial-gradient(circle, rgba(0,113,227,0.3) 0%, transparent 70%);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s ease-out;
                    pointer-events: none;
                    z-index: 1;
                `;
                
                this.style.position = 'relative';
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
        
        // 添加波纹动画CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // 滚动驱动的动画
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.8s ease-out';
                    entry.target.style.opacity = '1';
                }
            });
        }, observerOptions);
        
        // 为所有卡片添加观察者
        const cards = document.querySelectorAll('.apple-post-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.animationDelay = `${index * 0.1}s`;
            observer.observe(card);
        });
    }

    // 流体动画背景
    function initFluidBackground() {
        const container = document.querySelector('.apple-blog-container');
        if (!container) return;
        
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            opacity: 0.03;
            pointer-events: none;
        `;
        
        document.body.appendChild(canvas);
        
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            const time = Date.now() * 0.001;
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, `hsla(${time * 20 % 360}, 70%, 60%, 0.1)`);
            gradient.addColorStop(1, `hsla(${(time * 20 + 180) % 360}, 70%, 60%, 0.1)`);
            
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            requestAnimationFrame(animate);
        }
        
        resizeCanvas();
        animate();
        window.addEventListener('resize', resizeCanvas);
    }

    // 性能优化：减少动画在低性能设备上的影响
    function checkPerformance() {
        const supportsReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
        
        if (supportsReduce || isLowEnd) {
            document.documentElement.style.setProperty('--animation-duration', '0.2s');
            return false;
        }
        return true;
    }

    // 初始化
    document.addEventListener('DOMContentLoaded', function() {
        if (checkPerformance()) {
            initAppleAnimations();
            // initFluidBackground(); // 可选：流体背景效果
        }
    });

    // 导出API供其他脚本使用
    window.AppleAnimations = {
        initCardAnimations,
        initParallaxEffects,
        initMagneticEffects,
        initRippleEffects
    };

})();