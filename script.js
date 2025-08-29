document.addEventListener('DOMContentLoaded', function() {
    // --- Global DOM Elements ---
    const chatMessages = document.querySelector('.chat-messages');
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    const scrollToBottomBtn = document.querySelector('.scroll-to-bottom');
    const chatInput = document.getElementById('chatInput');
    const sendMessageBtn = document.getElementById('sendMessageBtn');
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const loginBtn = document.getElementById('loginBtn');

    // --- Tourism Spots Elements ---
    const toggleCityDropdown = document.getElementById('toggleCityDropdown');
    const cityDropdownList = document.getElementById('cityDropdownList');
    const cityDetailContainer = document.getElementById('cityDetailContainer');
    const cityDetailImage = document.getElementById('cityDetailImage');
    const cityDetailName = document.getElementById('cityDetailName');
    const cityDetailDescription = document.getElementById('cityDetailDescription');
    const cityDetailVideo = document.getElementById('cityDetailVideo');

    // --- Marketplace Elements ---
    const categoryFilterBtns = document.querySelectorAll('.category-filter-btn');
    const marketplaceListings = document.getElementById('marketplaceListings');

    // --- Gamification Elements ---
    const userPointsDisplay = document.getElementById('userPoints');
    const completeTaskBtn = document.getElementById('completeTaskBtn');
    const imageUploadForm = document.getElementById('imageUploadForm');
    const imageFile = document.getElementById('imageFile');
    const fileNameDisplay = document.getElementById('fileName');
    const imageDescriptionInput = document.getElementById('imageDescription');

    // --- Data Storage (Placeholders - Your team will replace with real data/API calls) ---
    // Make sure these image and video paths exist in your 'images' and 'videos' folders
    const cityData = {
        'fez': {
            name: 'فاس',
            description: 'فاس هي أقدم المدن الإمبراطورية في المغرب، وتعرف بمدينة الجوامع. تعتبر المركز الثقافي والديني للبلاد وتشتهر بمدينتها القديمة المدرجة ضمن قائمة اليونسكو للتراث العالمي.',
            image: 'FES.jpg', // UPDATED: Using the provided FES.jpg image
            video: 'videos/fez-tour.mp4' // Placeholder video file
        },
        'rabat': {
            name: 'الرباط',
            description: 'عاصمة المغرب السياسية، تتميز بمزيج فريد من التاريخ العريق والحداثة. تحتوي على معالم تاريخية مثل صومعة حسان ومدينة شالة الأثرية.',
            image: 'images/rabat.jpg',
            video: 'videos/rabat-tour.mp4'
        },
        'marrakech': {
            name: 'مراكش',
            description: 'مدينة التاريخ والجمال، تشتهر بساحة جامع الفنا الصاخبة وحدائق ماجوريل الهادئة.',
            image: 'images/marrakech.jpg',
            video: 'videos/marrakech-tour.mp4'
        },
        'casablanca': {
            name: 'الدار البيضاء',
            description: 'المركز الاقتصادي والتجاري للمغرب، تجمع بين الطابع العصري والمعالم التاريخية كمسجد الحسن الثاني الشهير.',
            image: 'images/casablanca.jpg',
            video: 'videos/casablanca-tour.mp4'
        },
        'chefchaouen': {
            name: 'شفشاون',
            description: 'مدينة ساحرة بلونها الأزرق المميز، تقع في جبال الريف وتشتهر بشوارعها الهادئة وجمال طبيعتها.',
            image: 'images/chefchaouen.jpg',
            video: 'videos/chefchaouen-tour.mp4'
        },
        'tangier': {
            name: 'طنجة',
            description: 'بوابة المغرب إلى أوروبا، مدينة ذات تاريخ غني وموقع استراتيجي يطل على البحر الأبيض المتوسط والمحيط الأطلسي.',
            image: 'images/tangier.jpg',
            video: 'videos/tangier-tour.mp4'
        },
        'agadir': {
            name: 'أغادير',
            description: 'مدينة الشمس والشواطئ، وجهة سياحية رئيسية في جنوب المغرب، مثالية للاسترخاء والرياضات المائية.',
            image: 'images/agadir.jpg',
            video: 'videos/agadir-tour.mp4'
        },
        'essaouira': {
            name: 'الصويرة',
            description: 'مدينة الرياح، تشتهر بمينائها القديم وأسوارها التاريخية وفنونها الحرفية. وجهة مفضلة لعشاق رياضة ركوب الأمواج.',
            image: 'images/essaouira.jpg',
            video: 'videos/essaouira-tour.mp4'
        },
        'meknes': {
            name: 'مكناس',
            description: 'إحدى المدن الإمبراطورية، تعرف بأسوارها الضخمة وقصورها الفاخرة، مثل قصر الباهية وموقع وليلي الروماني القريب.',
            image: 'images/meknes.jpg',
            video: 'videos/meknes-tour.mp4'
        },
        'ouarzazate': {
            name: 'ورزازات',
            description: 'بوابة الصحراء المغربية، تُعرف بكونها هوليوود أفريقيا بفضل استوديوهات الأفلام والقصبات التاريخية كقصبة آيت بن حدو.',
            image: 'images/ouarzazate.jpg',
            video: 'videos/ouarzazate-tour.mp4'
        },
        'merzouga': {
            name: 'مرزوكة',
            description: 'قرية صغيرة في الصحراء، تشتهر بالكثبان الرملية الكبيرة "عرق الشبي" التي توفر تجربة سياحية فريدة في قلب الصحراء.',
            image: 'images/merzouga.jpg',
            video: 'videos/merzouga-tour.mp4'
        },
        'dakhla': {
            name: 'الداخلة',
            description: 'جوهرة الصحراء المغربية، تُعرف بجمال شواطئها الهادئة والفريدة من نوعها، وتعتبر وجهة عالمية لرياضة ركوب الأمواج الشراعي.',
            image: 'images/dakhla.jpg',
            video: 'videos/dakhla-tour.mp4'
        }
    };

    // --- Chat Functions ---
    // Scrolls the chat message area to the bottom
    function scrollToBottom() {
        if (chatMessages) {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }

    // Scrolls the chat message area to the top
    function scrollToTop() {
        if (chatMessages) {
            chatMessages.scrollTop = 0;
        }
    }

    // Adds a new message to the chat display
    function addMessage(messageText, sender) {
        if (!chatMessages) return;

        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${sender}-message`);
        messageDiv.innerHTML = `<p>${messageText}</p>`;
        chatMessages.appendChild(messageDiv);
        scrollToBottom(); // Auto-scroll to latest message
    }

    // Handles sending a user message and triggering AI response
    function sendMessage() {
        if (!chatInput) return;

        const messageText = chatInput.value.trim();
        if (messageText !== '') {
            addMessage(messageText, 'user');
            chatInput.value = ''; // Clear input field

            // Placeholder for actual AI API call (e.g., OpenAI API)
            // This is where you would integrate with your backend to get a real AI response.
            setTimeout(() => {
                const aiResponse = "مرحباً! أنا مساعد Réservi LIA الذكي، كيف يمكنني مساعدتك اليوم؟ (هذا رد آلي، سيتم ربطنا بالذكاء الاصطناعي قريباً!)";
                addMessage(aiResponse, 'ai');
            }, 1000); // Simulate AI thinking for 1 second
        }
    }

    // --- Event Listeners: Chat & Navigation ---
    if (scrollToBottomBtn) {
        scrollToBottomBtn.addEventListener('click', scrollToBottom);
    }
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', scrollToTop);
    }
    if (sendMessageBtn) {
        sendMessageBtn.addEventListener('click', sendMessage);
    }
    if (chatInput) {
        chatInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                sendMessage();
            }
        });
    }

    // Auto-scroll chat to bottom on initial load
    scrollToBottom();

    // Toggle mobile navigation menu
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            // Toggle body scroll lock when menu is active
            document.body.classList.toggle('no-scroll');
        });
    }

    // Close mobile menu when a navigation link is clicked
    document.querySelectorAll('.main-nav ul li a').forEach(item => {
        item.addEventListener('click', () => {
            if (mainNav && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    });

    // Simple login button functionality (can be replaced with actual auth flow)
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            alert("جاري توجيهك لصفحة تسجيل الدخول باستخدام جوجل. (ميزة قادمة!)");
            // Here, you would redirect to your Google OAuth login page
        });
    }

    // --- City Selection Functionality (Tourism Spots) ---
    if (toggleCityDropdown && cityDropdownList && cityDetailContainer && cityDetailImage && cityDetailName && cityDetailDescription && cityDetailVideo) {
        // Toggle the city dropdown list visibility
        toggleCityDropdown.addEventListener('click', () => {
            cityDropdownList.classList.toggle('active');
        });

        // Handle selection of a city from the dropdown
        cityDropdownList.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior
            const cityLink = event.target.closest('a'); // Get the clicked <a> element

            if (cityLink) {
                const cityId = cityLink.dataset.cityId; // Get city ID from data-city-id attribute
                const city = cityData[cityId]; // Retrieve city data from our data object

                if (city) {
                    // Populate the city detail container with information
                    cityDetailImage.src = city.image;
                    cityDetailName.textContent = city.name;
                    cityDetailDescription.textContent = city.description;
                    cityDetailVideo.src = city.video;
                    cityDetailVideo.load(); // Load the video
                    cityDetailVideo.play(); // Auto-play the video

                    cityDetailContainer.style.display = 'block'; // Show the container
                    cityDropdownList.classList.remove('active'); // Hide the dropdown list

                    // Smooth scroll to the displayed city details
                    cityDetailContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });

        // Hide dropdown if clicked outside
        document.addEventListener('click', function(event) {
            if (!toggleCityDropdown.contains(event.target) && !cityDropdownList.contains(event.target)) {
                cityDropdownList.classList.remove('active');
            }
        });
    }

    // --- Marketplace Filtering ---
    if (marketplaceListings && categoryFilterBtns.length > 0) {
        categoryFilterBtns.forEach(button => {
            button.addEventListener('click', () => {
                // Remove 'active' class from all buttons
                categoryFilterBtns.forEach(btn => btn.classList.remove('active'));
                // Add 'active' class to the clicked button
                button.classList.add('active');

                const category = button.dataset.category;
                const cards = marketplaceListings.querySelectorAll('.marketplace-card');

                cards.forEach(card => {
                    if (category === 'all' || card.classList.contains(category)) {
                        card.style.display = 'flex'; // Show card
                    } else {
                        card.style.display = 'none'; // Hide card
                    }
                });
            });
        });
    }


    // --- Gamification: Points System ---
    let userPoints = 0; // Initialize user points (should come from backend in real app)

    if (completeTaskBtn && userPointsDisplay) {
        completeTaskBtn.addEventListener('click', () => {
            // Simulate completing a task: add 20 points
            userPoints += 20;
            userPointsDisplay.textContent = userPoints; // Update points display
            alert('تهانينا! لقد أكملت مهمة وربحت 20 نقطة. 🏆'); // User notification
        });
    }

    // --- Gamification: Image Upload Form ---
    if (imageFile && fileNameDisplay && imageUploadForm && imageDescriptionInput) {
        // Update file name display when a file is chosen
        imageFile.addEventListener('change', () => {
            if (imageFile.files.length > 0) {
                fileNameDisplay.textContent = imageFile.files[0].name;
            } else {
                fileNameDisplay.textContent = 'لم يتم اختيار صورة';
            }
        });

        // Handle image upload form submission
        imageUploadForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent default form submission (page reload)

            const file = imageFile.files[0];
            const description = imageDescriptionInput.value.trim();

            if (file && description) {
                // In a real application, you would send 'file' and 'description'
                // to your backend server here (e.g., using FormData and Fetch API).
                alert('تم إرسال الصورة والوصف بنجاح! شكراً لمشاركتك. سيتم مراجعتها قريباً. ✨');

                // Reset the form after successful submission
                imageUploadForm.reset();
                fileNameDisplay.textContent = 'لم يتم اختيار صورة';
            } else {
                alert('الرجاء اختيار صورة وكتابة وصف لها قبل الإرسال.');
            }
        });
    }
});
