// 图片懒加载脚本
(function() {
    'use strict';

    // 检查浏览器是否支持 IntersectionObserver
    if (!('IntersectionObserver' in window)) {
        // 不支持则直接加载所有图片
        loadAllImages();
        return;
    }

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                loadImage(img);
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px'
    });

    function loadImage(img) {
        if (img.dataset.src) {
            img.src = img.dataset.src;
            img.classList.add('lazy-loaded');
            img.removeAttribute('data-src');
        }
    }

    function loadAllImages() {
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(loadImage);
    }

    function initLazyLoading() {
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }

    // DOM 加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLazyLoading);
    } else {
        initLazyLoading();
    }

    // 为动态添加的图片提供手动初始化方法
    window.initLazyImages = initLazyLoading;
})();

// 添加图片加载样式
const style = document.createElement('style');
style.textContent = `
    img[data-src] {
        filter: blur(5px);
        transition: filter 0.3s;
    }
    img.lazy-loaded {
        filter: none;
    }
    .loading-placeholder {
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 200% 100%;
        animation: loading 1.5s infinite;
    }
    @keyframes loading {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
    }
`;
document.head.appendChild(style);