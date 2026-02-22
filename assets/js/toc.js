// Table of Contents Generator
(function () {
  "use strict";

  // Wait for DOM to be ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initTOC);
  } else {
    initTOC();
  }

  function initTOC() {
    const tocList = document.querySelector(".toc-list");
    const postBody = document.querySelector(".post-body");

    if (!tocList || !postBody) return;

    // Get all h2 and h3 headings from the post content
    const headings = postBody.querySelectorAll("h2, h3");

    if (headings.length === 0) {
      // Hide TOC if no headings
      const tocSidebar = document.querySelector(".toc-sidebar");
      if (tocSidebar) {
        tocSidebar.style.display = "none";
      }
      return;
    }

    // Generate TOC
    headings.forEach((heading, index) => {
      // Generate ID if it doesn't exist
      if (!heading.id) {
        heading.id = `heading-${index}`;
      }

      // Create list item
      const li = document.createElement("li");
      li.className = `toc-${heading.tagName.toLowerCase()}`;

      // Create link
      const link = document.createElement("a");
      link.href = `#${heading.id}`;
      link.textContent = heading.textContent;
      link.dataset.target = heading.id;

      // Click event for smooth scrolling
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.getElementById(this.dataset.target);
        if (target) {
          // Smooth scroll to target
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });

          // Update URL without jumping
          history.pushState(null, null, `#${this.dataset.target}`);

          // Update active state
          updateActiveLink(this);
        }
      });

      li.appendChild(link);
      tocList.appendChild(li);
    });

    // Scroll spy - highlight current section
    const observerOptions = {
      rootMargin: "-80px 0px -80% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          const link = tocList.querySelector(`a[data-target="${id}"]`);
          if (link) {
            updateActiveLink(link);
          }
        }
      });
    }, observerOptions);

    // Observe all headings
    headings.forEach((heading) => {
      observer.observe(heading);
    });

    // Handle initial hash in URL
    if (window.location.hash) {
      const targetId = window.location.hash.substring(1);
      const link = tocList.querySelector(`a[data-target="${targetId}"]`);
      if (link) {
        updateActiveLink(link);
      }
    }
  }

  function updateActiveLink(activeLink) {
    const allLinks = document.querySelectorAll(".toc-list a");
    allLinks.forEach((link) => link.classList.remove("active"));
    activeLink.classList.add("active");

    // Auto-scroll the active link into view within the TOC
    const tocList = activeLink.closest(".toc-list");
    if (tocList) {
      const linkRect = activeLink.getBoundingClientRect();
      const listRect = tocList.getBoundingClientRect();

      // Check if link is not fully visible in the scrollable area
      if (linkRect.top < listRect.top || linkRect.bottom > listRect.bottom) {
        activeLink.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  }
})();
