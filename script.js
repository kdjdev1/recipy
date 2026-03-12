document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. Global Utilities --- */

    // Check if we are on specific pages
    const isArchivePage = document.getElementById('recipe-grid') !== null;
    const isRecipePage = document.getElementById('recipe-header') !== null;

    // Liquid Glass Scroll Effect
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.05)';
            } else {
                header.style.boxShadow = 'none';
            }
        });
    }

    // Homepage Testimonials
    const testimonials = document.querySelectorAll('.testimonial-slide');
    if (testimonials.length > 0) {
        const prevBtn = document.getElementById('prev-testimonial');
        const nextBtn = document.getElementById('next-testimonial');
        let currentSlide = 0;

        function showSlide(index) {
            testimonials.forEach((slide, i) => {
                slide.style.display = i === index ? 'block' : 'none';
                slide.style.opacity = i === index ? '1' : '0';
            });
        }

        showSlide(currentSlide);

        if (nextBtn && prevBtn) {
            nextBtn.addEventListener('click', () => {
                currentSlide = (currentSlide + 1) % testimonials.length;
                showSlide(currentSlide);
            });
            prevBtn.addEventListener('click', () => {
                currentSlide = (currentSlide - 1 + testimonials.length) % testimonials.length;
                showSlide(currentSlide);
            });
        }
    }


    /* --- 2. Archive Page Logic --- */
    if (isArchivePage && window.recipesDB) {
        const grid = document.getElementById('recipe-grid');
        const countText = document.getElementById('results-count');
        const paginationNav = document.getElementById('pagination-nav');
        const sortSelect = document.getElementById('sort-select');

        // Filter inputs
        const checkboxes = document.querySelectorAll('.ingredient-checkbox');

        let filteredRecipes = [...window.recipesDB];
        let currentPage = 1;
        const recipesPerPage = 12;

        function renderGrid() {
            grid.innerHTML = '';

            // Calculate pagination indices
            const startIndex = (currentPage - 1) * recipesPerPage;
            const endIndex = startIndex + recipesPerPage;
            const paginatedItems = filteredRecipes.slice(startIndex, endIndex);

            if (paginatedItems.length === 0) {
                grid.innerHTML = '<p class="col-span-full py-20 text-center text-typography-muted font-serif text-xl">No recipes found matching your criteria.</p>';
                countText.textContent = '0 Results';
                renderPagination();
                return;
            }

            countText.textContent = `Showing ${startIndex + 1} to ${Math.min(endIndex, filteredRecipes.length)} of ${filteredRecipes.length} Results`;

            paginatedItems.forEach(r => {
                // Build a card
                const a = document.createElement('a');
                a.href = `recipe.html?id=${r.id}`;
                a.className = 'group block';
                a.innerHTML = `
                    <div class="aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-base-surface border border-typography-muted/10 shadow-sm relative bento-item">
                        <img src="${r.image}" alt="${r.title}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy">
                        <div class="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-2 py-1 flex items-center gap-1 rounded-full border border-white/50 text-xs font-bold text-typography-main shadow-sm">
                            <svg class="w-3 h-3 text-brand" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                            ${r.rating}
                        </div>
                    </div>
                    <div>
                        <span class="text-xs uppercase tracking-widest text-typography-muted font-semibold block mb-1">${r.cuisine}</span>
                        <h4 class="font-serif text-xl text-typography-main group-hover:text-brand transition-colors leading-tight mb-2">${r.title}</h4>
                        <p class="text-sm flex items-center gap-2 text-typography-muted">
                            <span>${r.time} mins</span> &bull; <span>${r.difficulty}</span>
                        </p>
                    </div>
                `;
                grid.appendChild(a);
            });

            renderPagination();
        }

        function renderPagination() {
            paginationNav.innerHTML = '';
            const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);
            if (totalPages <= 1) return;

            // Prev Button
            const prev = document.createElement('button');
            prev.className = `w-10 h-10 rounded-full border border-typography-muted/30 flex items-center justify-center transition-colors focus:ring-2 focus:ring-brand ${currentPage === 1 ? 'opacity-50 cursor-not-allowed text-typography-muted' : 'text-typography-main hover:bg-base-surface hover:text-brand'}`;
            prev.innerHTML = '&larr;';
            prev.disabled = currentPage === 1;
            prev.onclick = () => { currentPage--; renderGrid(); window.scrollTo(0, 0); };
            paginationNav.appendChild(prev);

            // Limited page numbers strategy (e.g. show 1, 2, 3, 4, 5... or current surroundings)
            // For simplicity, showing a max of 5 visible page buttons
            let startPage = Math.max(1, currentPage - 2);
            let endPage = Math.min(totalPages, startPage + 4);
            if (endPage - startPage < 4) {
                startPage = Math.max(1, endPage - 4);
            }

            for (let i = startPage; i <= endPage; i++) {
                const btn = document.createElement('button');
                if (i === currentPage) {
                    btn.className = 'w-10 h-10 rounded-full border-none bg-brand text-white font-medium flex items-center justify-center focus:ring-2 focus:ring-offset-2 focus:ring-brand';
                } else {
                    btn.className = 'w-10 h-10 rounded-full border border-transparent hover:border-typography-muted/30 font-medium flex items-center justify-center text-typography-main hover:bg-base-surface transition-colors focus:ring-2 focus:ring-brand';
                }
                btn.textContent = i;
                btn.onclick = () => { currentPage = i; renderGrid(); window.scrollTo(0, 0); };
                paginationNav.appendChild(btn);
            }

            // Next Button
            const next = document.createElement('button');
            next.className = `w-10 h-10 rounded-full border border-typography-muted/30 flex items-center justify-center transition-colors focus:ring-2 focus:ring-brand ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed text-typography-muted' : 'text-typography-main hover:bg-base-surface hover:text-brand'}`;
            next.innerHTML = '&rarr;';
            next.disabled = currentPage === totalPages;
            next.onclick = () => { currentPage++; renderGrid(); window.scrollTo(0, 0); };
            paginationNav.appendChild(next);
        }

        function applyFilters() {
            // In a real app we'd map checkbox states to filter logic.
            // For this procedural demo, we'll randomize a bit or do basic sorting based on select.

            // Reset
            filteredRecipes = [...window.recipesDB];

            // Active filters detection (Mocking partial logic based on text content)
            const activeFilters = [];
            checkboxes.forEach(cb => {
                if (cb.checked) {
                    const label = cb.closest('label').querySelector('span:last-child').textContent.trim();
                    activeFilters.push(label);
                }
            });

            if (activeFilters.length > 0) {
                filteredRecipes = filteredRecipes.filter(r => {
                    // Check Difficulty
                    if (activeFilters.includes(r.difficulty)) return true;
                    // Check tags
                    if (r.tags.some(tag => activeFilters.includes(tag))) return true;
                    // Check time (mocking logic)
                    if (activeFilters.includes('Under 30 mins') && r.time < 30) return true;
                    if (activeFilters.includes('30 - 60 mins') && r.time >= 30 && r.time <= 60) return true;
                    if (activeFilters.includes('Over 1 hour') && r.time > 60) return true;

                    return false;
                });
            }

            // Apply sort
            const sortVal = sortSelect.value;
            if (sortVal === 'popularity') {
                filteredRecipes.sort((a, b) => b.rating - a.rating);
            } else if (sortVal === 'time-asc') {
                filteredRecipes.sort((a, b) => a.time - b.time);
            } else {
                // Latest (id desc)
                filteredRecipes.sort((a, b) => parseInt(b.id) - parseInt(a.id));
            }

            currentPage = 1;
            renderGrid();
        }

        // Event listeners for filters
        checkboxes.forEach(cb => cb.addEventListener('change', applyFilters));
        sortSelect.addEventListener('change', applyFilters);

        // Buttons
        const applyBtn = document.querySelector('button.bg-typography-main');
        const clearBtn = document.querySelector('button.bg-transparent.text-typography-muted');

        if (applyBtn) applyBtn.addEventListener('click', applyFilters);
        if (clearBtn) clearBtn.addEventListener('click', () => {
            checkboxes.forEach(cb => cb.checked = false);
            sortSelect.value = 'latest';
            applyFilters();
        });

        // Init Grid
        renderGrid();
    }


    /* --- 3. Recipe Detail Page Logic --- */
    if (isRecipePage && window.recipesDB) {

        // Setup Checkbox interactions globally
        function initCheckboxes() {
            document.querySelectorAll('.ingredient-checkbox').forEach(checkbox => {
                checkbox.addEventListener('change', function () {
                    const textElement = this.closest('label').querySelector('.ingredient-text');
                    if (this.checked) {
                        textElement.style.textDecoration = 'line-through';
                        textElement.style.color = 'var(--color-text-muted)';
                    } else {
                        textElement.style.textDecoration = 'none';
                        textElement.style.color = 'inherit';
                    }
                });
            });
        }

        // Get ID from URL or default to 1
        const urlParams = new URLSearchParams(window.location.search);
        const recipeId = urlParams.get('id') || '1';

        const recipe = window.recipesDB.find(r => r.id === recipeId) || window.recipesDB[0];

        // Inject Header
        document.getElementById('recipe-header').innerHTML = `
            <nav class="text-xs font-medium uppercase tracking-widest text-typography-muted mb-4 flex items-center gap-2">
                <a href="archive.html" class="hover:text-brand transition-colors">${recipe.cuisine}</a>
                <span>/</span>
                <span class="text-typography-main">Recipes</span>
            </nav>
            <h1 class="text-5xl md:text-6xl font-serif text-typography-main mb-6">${recipe.title}</h1>
            <p class="text-xl text-typography-muted font-serif italic max-w-2xl">${recipe.description}</p>
        `;

        // Inject Meta & Tag Badges
        document.getElementById('recipe-meta').innerHTML = `
            <div class="rounded-2xl overflow-hidden shadow-xl image-zoom-container">
                <img src="${recipe.image}" alt="${recipe.title}" class="w-full h-auto object-cover aspect-[4/5]" loading="eager">
            </div>
            <div class="bg-base-surface p-8 rounded-2xl border border-typography-muted/10 shadow-sm grid grid-cols-2 gap-y-6 gap-x-4">
                <div>
                    <span class="block text-xs uppercase tracking-widest text-typography-muted mb-1 font-semibold">Prep Time</span>
                    <span class="text-lg font-serif text-typography-main">${recipe.prepTime} mins</span>
                </div>
                <div>
                    <span class="block text-xs uppercase tracking-widest text-typography-muted mb-1 font-semibold">Cook Time</span>
                    <span class="text-lg font-serif text-typography-main">${recipe.cookTime} mins</span>
                </div>
                <div>
                    <span class="block text-xs uppercase tracking-widest text-typography-muted mb-1 font-semibold">Servings</span>
                    <span class="text-lg font-serif text-typography-main">${recipe.servings} Portions</span>
                </div>
                <div>
                    <span class="block text-xs uppercase tracking-widest text-typography-muted mb-1 font-semibold">Difficulty</span>
                    <span class="text-lg text-brand font-serif italic">${recipe.difficulty}</span>
                </div>
                <div class="col-span-2 pt-4 border-t border-typography-muted/20">
                    <span class="block text-xs uppercase tracking-widest text-typography-muted mb-2 font-semibold">Dietary Profile</span>
                    <div class="flex flex-wrap gap-2">
                        ${recipe.tags.map(t => `<span class="px-3 py-1 bg-typography-muted/10 text-typography-main text-xs font-medium rounded-full">${t}</span>`).join('')}
                    </div>
                </div>
            </div>
        `;

        // Inject Ingredients
        const ingHtml = recipe.ingredientGroups.map(group => `
            <h3 class="text-sm font-bold uppercase tracking-widest text-typography-muted mb-6 mt-8 border-b border-typography-muted/20 pb-2">${group.name}</h3>
            <ul class="space-y-4 mb-8">
                ${group.items.map(item => `
                    <li>
                        <label class="custom-checkbox flex items-start cursor-pointer group">
                            <input type="checkbox" class="ingredient-checkbox">
                            <span class="checkmark mt-0.5 shadow-sm"></span>
                            <span class="ingredient-text text-lg transition-colors select-none">${item}</span>
                        </label>
                    </li>
                `).join('')}
            </ul>
        `).join('');

        document.getElementById('recipe-ingredients').innerHTML = `
            <h2 class="font-serif text-3xl mb-8 flex items-center gap-4">
                <span class="flex-shrink-0 w-8 h-8 rounded-full bg-brand text-white flex items-center justify-center text-sm font-serif">1</span>
                The Mise en Place
            </h2>
            <div class="bg-base-surface p-8 rounded-2xl border border-typography-muted/10 shadow-sm">
                ${ingHtml}
            </div>
        `;

        // Inject Instructions
        const instHtml = recipe.instructions.map((inst, idx) => `
            <div class="mb-8">
                <h3 class="font-bold text-lg mb-3 tracking-wide text-typography-main">Step ${idx + 1}: ${inst.title}</h3>
                ${inst.note ? `
                    <div class="bg-brand/5 border-l-4 border-brand p-5 rounded-r-lg mb-4">
                        <p class="text-sm font-medium text-brand mb-0 uppercase tracking-widest">Chef's Note</p>
                        <p class="text-typography-main italic mt-2 text-base">${inst.note}</p>
                    </div>
                ` : ''}
                <p class="text-typography-muted leading-relaxed">${inst.text}</p>
            </div>
        `).join('');

        document.getElementById('recipe-instructions').innerHTML = `
            <h2 class="font-serif text-3xl mb-8 flex items-center gap-4">
                <span class="flex-shrink-0 w-8 h-8 rounded-full bg-brand text-white flex items-center justify-center text-sm font-serif">2</span>
                Method
            </h2>
            <div class="space-y-12 max-w-[65ch]">
                ${instHtml}
            </div>
        `;

        // Fire checkbox bindings for newly injected nodes
        initCheckboxes();
    }

});
