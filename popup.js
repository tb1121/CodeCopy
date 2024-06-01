document.getElementById('copyButton').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: () => {
        const codeElement = document.querySelector('code');
        if (codeElement) {
          const textToCopy = codeElement.innerText; // Use innerText to preserve formatting
          navigator.clipboard.writeText(textToCopy).then(() => {
            alert('Code copied to clipboard!');
          }).catch(err => {
            console.error('Failed to copy: ', err);
          });
        } else {
          console.error('No code element found.');
        }
      }
    });
  });
});
