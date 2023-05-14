const openButtons = document.querySelectorAll("[data-open-modal]")
const modals = document.querySelectorAll("[data-modal]")
const closeButtons = document.querySelectorAll("[data-close-modal]")

openButtons.forEach((openButton, index) => {
  const modal = modals[index]
  const closeButton = closeButtons[index]
  
  openButton.addEventListener("click", () => {
      modal.showModal()
  })

  modal.addEventListener("click", e => {
      const modalDimensions = modal.getBoundingClientRect()
      if (
          e.clientX < modalDimensions.left ||
          e.clientX > modalDimensions.right ||
          e.clientY < modalDimensions.top ||
          e.clientY > modalDimensions.bottom
      ) {
          modal.close()
      }
  })

  closeButton.addEventListener("click", () => {
      modal.close()
  })
})
