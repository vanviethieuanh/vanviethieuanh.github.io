// Code block enhancements: language labels and copy buttons
document.addEventListener('DOMContentLoaded', function() {
  // Target the outer wrapper divs that have language class
  const codeWrappers = document.querySelectorAll('div[class*="language-"]');
  
  codeWrappers.forEach(function(wrapper) {
    // Get the language from the wrapper's class name
    const classList = Array.from(wrapper.classList);
    const languageClass = classList.find(cls => cls.startsWith('language-'));
    const language = languageClass ? languageClass.replace('language-', '').toUpperCase() : 'CODE';
    
    // Skip if header already exists
    if (wrapper.querySelector('.code-header')) {
      return;
    }
    
    // Get the highlight block for code extraction
    const highlightBlock = wrapper.querySelector('.highlight');
    if (!highlightBlock) {
      return;
    }
    
    // Create header container
    const header = document.createElement('div');
    header.className = 'code-header';
    
    // Create language label
    const langLabel = document.createElement('span');
    langLabel.className = 'code-language';
    langLabel.textContent = language;
    
    // Create copy button
    const copyBtn = document.createElement('button');
    copyBtn.className = 'code-copy-btn';
    copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy';
    copyBtn.setAttribute('aria-label', 'Copy code to clipboard');
    
    // Add click handler for copy button
    copyBtn.addEventListener('click', function() {
      const codeElement = highlightBlock.querySelector('code');
      const code = codeElement.textContent;
      
      navigator.clipboard.writeText(code).then(function() {
        // Change button text to show success
        copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        copyBtn.classList.add('copied');
        
        // Reset button after 2 seconds
        setTimeout(function() {
          copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy';
          copyBtn.classList.remove('copied');
        }, 2000);
      }).catch(function(err) {
        console.error('Failed to copy code: ', err);
        copyBtn.innerHTML = '<i class="fas fa-times"></i> Error';
        setTimeout(function() {
          copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy';
        }, 2000);
      });
    });
    
    // Append elements to header
    header.appendChild(langLabel);
    header.appendChild(copyBtn);
    
    // Insert header as first child of wrapper div
    wrapper.insertBefore(header, wrapper.firstChild);
  });
});
