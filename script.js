document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 60,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Bell Schedule Interactive Table
    const bellScheduleContainer = document.getElementById('bell-schedule');
    if (!bellScheduleContainer) {
        console.error('Bell schedule container not found!');
    }
    const scheduleTabs = document.querySelectorAll('.schedule-tab');
    
    // Bell schedule data
    const scheduleData = {
        regular: [
            { period: '1', start: '8:00 AM', end: '8:41 AM' },
            { period: '2', start: '8:45 AM', end: '9:26 AM' },
            { period: '3', start: '9:30 AM', end: '10:14 AM' },
            { period: '4', start: '10:18 AM', end: '10:59 AM' },
            { period: '5', start: '11:03 AM', end: '11:44 AM' },
            { period: '6', start: '11:48 AM', end: '12:29 PM' },
            { period: '7', start: '12:33 PM', end: '1:14 PM' },
            { period: '8', start: '1:18 PM', end: '1:59 PM' },
            { period: '9', start: '2:03 PM', end: '2:44 PM' },
            { period: '10', start: '2:48 PM', end: '3:29 PM' }
        ],
        homeroom: [
            { period: '1', start: '8:00 AM', end: '8:40 AM' },
            { period: '2', start: '8:44 AM', end: '9:24 AM' },
            { period: '3', start: '9:28 AM', end: '10:08 AM' },
            { period: 'HR', start: '10:12 AM', end: '10:24 AM' },
            { period: '4', start: '10:28 AM', end: '11:08 AM' },
            { period: '5', start: '11:12 AM', end: '11:52 AM' },
            { period: '6', start: '11:56 AM', end: '12:36 PM' },
            { period: '7', start: '12:40 PM', end: '1:20 PM' },
            { period: '8', start: '1:24 PM', end: '2:04 PM' },
            { period: '9', start: '2:08 PM', end: '2:48 PM' },
            { period: '10', start: '2:52 PM', end: '3:32 PM' }
        ],
        conference: [
            { period: '1', start: '8:00 AM', end: '8:37 AM' },
            { period: '2', start: '8:41 AM', end: '9:18 AM' },
            { period: '3', start: '9:22 AM', end: '9:59 AM' },
            { period: '4', start: '10:03 AM', end: '10:40 AM' },
            { period: '5', start: '10:44 AM', end: '11:21 AM' },
            { period: '6', start: '11:25 AM', end: '12:02 PM' },
            { period: '7', start: '12:06 PM', end: '12:43 PM' },
            { period: '8', start: '12:47 PM', end: '1:24 PM' },
            { period: '9', start: '1:28 PM', end: '2:05 PM' },
            { period: '10', start: '2:09 PM', end: '2:46 PM' }
        ],
        extended: [
            { period: '1', start: '8:00 AM', end: '8:37 AM' },
            { period: '2', start: '8:41 AM', end: '9:18 AM' },
            { period: '3', start: '9:22 AM', end: '9:59 AM' },
            { period: 'HR', start: '10:03 AM', end: '10:33 AM' },
            { period: '4', start: '10:37 AM', end: '11:14 AM' },
            { period: '5', start: '11:18 AM', end: '11:55 AM' },
            { period: '6', start: '11:59 AM', end: '12:36 PM' },
            { period: '7', start: '12:40 PM', end: '1:17 PM' },
            { period: '8', start: '1:21 PM', end: '1:58 PM' },
            { period: '9', start: '2:02 PM', end: '2:39 PM' },
            { period: '10', start: '2:43 PM', end: '3:20 PM' }
        ]
    };
    
    // Function to create the bell schedule table
    function createBellScheduleTable(scheduleType) {
        console.log('Creating table for schedule type:', scheduleType);
        console.log('Schedule data available:', Object.keys(scheduleData));
        
        // Clear previous content
        bellScheduleContainer.innerHTML = '';
        
        // Create table
        const table = document.createElement('table');
        table.classList.add('schedule-table-content');
        
        // Create header
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        
        const periodHeader = document.createElement('th');
        periodHeader.textContent = 'Period';
        
        const startHeader = document.createElement('th');
        startHeader.textContent = 'Start Time';
        
        const endHeader = document.createElement('th');
        endHeader.textContent = 'End Time';
        
        headerRow.appendChild(periodHeader);
        headerRow.appendChild(startHeader);
        headerRow.appendChild(endHeader);
        thead.appendChild(headerRow);
        table.appendChild(thead);
        
        // Create table body
        const tbody = document.createElement('tbody');
        
        scheduleData[scheduleType].forEach((period, index) => {
            const row = document.createElement('tr');
            
            // Add alternating row colors
            if (index % 2 === 0) {
                row.classList.add('even-row');
            } else {
                row.classList.add('odd-row');
            }
            
            // Highlight homeroom period if present
            if (period.period === 'HR') {
                row.classList.add('homeroom-row');
            }
            
            const periodCell = document.createElement('td');
            periodCell.textContent = period.period;
            
            const startCell = document.createElement('td');
            startCell.textContent = period.start;
            
            const endCell = document.createElement('td');
            endCell.textContent = period.end;
            
            row.appendChild(periodCell);
            row.appendChild(startCell);
            row.appendChild(endCell);
            
            tbody.appendChild(row);
        });
        
        table.appendChild(tbody);
        bellScheduleContainer.appendChild(table);
        
        // Add animation
        table.style.opacity = '0';
        table.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            table.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            table.style.opacity = '1';
            table.style.transform = 'translateY(0)';
        }, 50);
    }
    
    // Initialize with regular schedule
    createBellScheduleTable('regular');
    
    // Add event listeners to tabs
    scheduleTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            console.log('Tab clicked:', this.getAttribute('data-schedule'));
            
            // Remove active class from all tabs
            scheduleTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Get schedule type from data attribute
            const scheduleType = this.getAttribute('data-schedule');
            
            // Create table for selected schedule
            createBellScheduleTable(scheduleType);
        });
    });
    
    // Add animation to cards on scroll
    const animateOnScroll = function() {
        const cards = document.querySelectorAll('.contact-card, .counselor-card, .place-item, .whats-that-item, .headline, .fact, .resource');
        
        cards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (cardTop < windowHeight - 100) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial styles for animation
    const cards = document.querySelectorAll('.contact-card, .counselor-card, .place-item, .whats-that-item, .headline, .fact, .resource');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run animation on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Scroll to top button
    const scrollTopBtn = document.querySelector('.scroll-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
