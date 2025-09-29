// Apple Category Dropdown 功能
(function() {
    'use strict';
    
    // 等待DOM加载完成
    document.addEventListener('DOMContentLoaded', function() {
        initCategoryDropdown();
    });
    
    function initCategoryDropdown() {
        const categoryDropdown = document.getElementById('category-dropdown');
        const categoryMenu = document.getElementById('category-menu');
        
        if (!categoryDropdown || !categoryMenu) return;
        
        // 生成分类菜单内容
        generateCategoryMenu();
        
        // 初始化下拉菜单交互
        initDropdownInteractions();
    }
    
    function generateCategoryMenu() {
        const categoryContent = document.querySelector('.apple-dropdown-content');
        if (!categoryContent) return;
        
        // 从页面中获取所有文章的年月信息
        const articles = collectArticlesByDate();
        
        // 按年份分组文章
        const groupedByYear = groupArticlesByYear(articles);
        
        // 生成HTML
        const menuHTML = generateMenuHTML(groupedByYear);
        categoryContent.innerHTML = menuHTML;
    }
    
    function collectArticlesByDate() {
        const articles = [];
        
        // 从首页的文章卡片中收集信息
        const postCards = document.querySelectorAll('.simple-post-card');
        postCards.forEach(card => {
            const dateElement = card.querySelector('.post-date');
            const titleElement = card.querySelector('.post-title');
            const linkElement = card.querySelector('a[href]');
            
            if (dateElement && titleElement && linkElement) {
                const dateText = dateElement.textContent.trim();
                const title = titleElement.textContent.trim();
                const url = linkElement.getAttribute('href');
                
                // 解析日期 (假设格式为 "2024年01月15日")
                const dateMatch = dateText.match(/(\d{4})年(\d{2})月/);
                if (dateMatch) {
                    const year = parseInt(dateMatch[1]);
                    const month = parseInt(dateMatch[2]);
                    
                    articles.push({
                        year,
                        month,
                        title,
                        url,
                        dateText
                    });
                }
            }
        });
        
        return articles;
    }
    
    function groupArticlesByYear(articles) {
        const grouped = {};
        
        articles.forEach(article => {
            const year = article.year;
            const month = article.month;
            
            if (!grouped[year]) {
                grouped[year] = {};
            }
            
            if (!grouped[year][month]) {
                grouped[year][month] = [];
            }
            
            grouped[year][month].push(article);
        });
        
        return grouped;
    }
    
    function generateMenuHTML(groupedByYear) {
        const years = Object.keys(groupedByYear).sort((a, b) => b - a); // 降序排列
        
        if (years.length === 0) {
            return '<div class="apple-no-articles">暂无文章</div>';
        }
        
        let html = '';
        
        years.forEach(year => {
            const yearData = groupedByYear[year];
            const months = Object.keys(yearData).sort((a, b) => b - a); // 降序排列
            
            html += `<div class="apple-dropdown-year">`;
            html += `<div class="apple-year-title">${year}年</div>`;
            html += `<ul class="apple-month-list">`;
            
            months.forEach(month => {
                const monthData = yearData[month];
                const monthName = getMonthName(parseInt(month));
                const articleCount = monthData.length;
                
                // 生成年月页面的URL
                const baseUrl = window.location.pathname.includes('/xiaowanBlog.github.io') 
                    ? '/xiaowanBlog.github.io' : '';
                const monthUrl = `${baseUrl}/archive-simple/?year=${year}&month=${parseInt(month)}`;
                
                html += `<li class="apple-month-item">`;
                html += `<a href="${monthUrl}" class="apple-month-link">`;
                html += `${monthName}<span class="month-count">(${articleCount})</span>`;
                html += `</a>`;
                html += `</li>`;
            });
            
            html += `</ul>`;
            html += `</div>`;
        });
        
        return html;
    }
    
    function getMonthName(month) {
        const monthNames = [
            '', '一月', '二月', '三月', '四月', '五月', '六月',
            '七月', '八月', '九月', '十月', '十一月', '十二月'
        ];
        return monthNames[month] || month + '月';
    }
    
    function initDropdownInteractions() {
        const categoryDropdown = document.getElementById('category-dropdown');
        const categoryMenu = document.getElementById('category-menu');
        const dropdownTrigger = categoryDropdown.querySelector('.apple-dropdown-trigger');
        
        let isMenuOpen = false;
        let hoverTimeout;
        
        // 鼠标悬停显示菜单
        categoryDropdown.addEventListener('mouseenter', function() {
            clearTimeout(hoverTimeout);
            showDropdown();
        });
        
        // 鼠标离开隐藏菜单（延迟）
        categoryDropdown.addEventListener('mouseleave', function() {
            hoverTimeout = setTimeout(() => {
                hideDropdown();
            }, 300);
        });
        
        // 点击触发器切换菜单
        dropdownTrigger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            if (isMenuOpen) {
                hideDropdown();
            } else {
                showDropdown();
            }
        });
        
        // 点击其他地方关闭菜单
        document.addEventListener('click', function(e) {
            if (!categoryDropdown.contains(e.target)) {
                hideDropdown();
            }
        });
        
        // ESC键关闭菜单
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && isMenuOpen) {
                hideDropdown();
                dropdownTrigger.focus();
            }
        });
        
        function showDropdown() {
            categoryDropdown.classList.add('active');
            categoryMenu.setAttribute('aria-hidden', 'false');
            isMenuOpen = true;
        }
        
        function hideDropdown() {
            categoryDropdown.classList.remove('active');
            categoryMenu.setAttribute('aria-hidden', 'true');
            isMenuOpen = false;
        }
        
        // 键盘导航支持
        categoryMenu.addEventListener('keydown', function(e) {
            const menuLinks = categoryMenu.querySelectorAll('.apple-month-link');
            const currentIndex = Array.from(menuLinks).indexOf(document.activeElement);
            
            switch(e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    const nextIndex = currentIndex < menuLinks.length - 1 ? currentIndex + 1 : 0;
                    menuLinks[nextIndex].focus();
                    break;
                    
                case 'ArrowUp':
                    e.preventDefault();
                    const prevIndex = currentIndex > 0 ? currentIndex - 1 : menuLinks.length - 1;
                    menuLinks[prevIndex].focus();
                    break;
                    
                case 'Enter':
                case ' ':
                    e.preventDefault();
                    if (document.activeElement && document.activeElement.classList.contains('apple-month-link')) {
                        document.activeElement.click();
                    }
                    break;
            }
        });
    }
    
    // 响应式处理：移动端关闭下拉菜单
    function handleMobileInteractions() {
        const categoryDropdown = document.getElementById('category-dropdown');
        
        // 移动端点击分类链接时的处理
        if (window.innerWidth <= 768) {
            const categoryLinks = categoryDropdown.querySelectorAll('.apple-month-link');
            categoryLinks.forEach(link => {
                link.addEventListener('click', function() {
                    // 关闭移动菜单
                    const mobileMenu = document.getElementById('apple-nav-menu');
                    const mobileToggle = document.getElementById('apple-mobile-toggle');
                    
                    if (mobileMenu && mobileToggle) {
                        mobileMenu.classList.remove('apple-nav-menu-open');
                        mobileToggle.classList.remove('apple-toggle-active');
                        document.body.classList.remove('apple-nav-body-lock');
                    }
                });
            });
        }
    }
    
    // 监听窗口大小变化
    window.addEventListener('resize', function() {
        handleMobileInteractions();
    });
    
    // 初始化移动端交互
    handleMobileInteractions();
    
})();