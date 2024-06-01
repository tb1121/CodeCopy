// Create a style element
const style = document.createElement('style');
style.innerHTML = `
  /* Initially hide the button */
  .code-container button {
    display: none;
  }

  /* Show the button when the code block is hovered over */
  .code-container:hover button {
    display: block;
    position: absolute; /* Position the button absolutely */
    top: 0; /* Adjust the positioning as needed */
    right: 0; /* Adjust the positioning as needed */
  }

  /* Style for the notification */
  .copy-notification {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    z-index: 1001;
    display: none;
  }
`;

// Append the style element to the document head
document.head.appendChild(style);

// Function to show notification
function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'copy-notification';
  notification.innerText = message;
  document.body.appendChild(notification);
  notification.style.display = 'block';
  
  setTimeout(() => {
    notification.style.display = 'none';
    document.body.removeChild(notification);
  }, 2000); // Hide after 2 seconds
}

document.querySelectorAll('code').forEach((codeBlock) => {
  // Create a container div for the code block and button
  const container = document.createElement('div');
  container.className = 'code-container';
  container.style.position = 'relative'; // Ensure the container is positioned relative

  // Create the button
  const button = document.createElement('button');
  button.innerText = 'Copy code';
  button.style.marginBottom = '10px';
  button.style.padding = '5px 10px';
  button.style.backgroundColor = '#4CAF50';
  button.style.color = 'white';
  button.style.border = 'none';
  button.style.borderRadius = '5px';
  button.style.cursor = 'pointer';
  button.style.zIndex = '1000'; // Ensure the button appears on top

  button.addEventListener('click', () => {
    const textToCopy = codeBlock.innerText; // Use innerText to preserve formatting
    navigator.clipboard.writeText(textToCopy).then(() => {
      showNotification('Code copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  });

  // Wrap the code block in the container
  codeBlock.parentNode.insertBefore(container, codeBlock);
  container.appendChild(codeBlock);
  container.appendChild(button);
});
