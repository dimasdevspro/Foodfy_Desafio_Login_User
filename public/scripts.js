function paginate(selectedPage, totalPages) {
    let pages = [],
      oldPage;
  
    for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
      const firstAndLastPage = currentPage == 1 || currentPage == totalPages;
      const pagesAfterSelectedPage = currentPage <= selectedPage + 2;
      const pagesBeforeSelectedPage = currentPage >= selectedPage - 2;
  
      if (
        firstAndLastPage ||
        (pagesBeforeSelectedPage && pagesAfterSelectedPage)
      ) {
        if (oldPage && currentPage - oldPage > 2) {
          pages.push("...");
        }
        if (oldPage && currentPage - oldPage == 2) {
          page.push(oldPage + 1);
        }
        pages.push(currentPage);
        oldPage = currentPage;
      }
    }
  
    return pages;
  }
  
function createPagination(pagination){
    const filter = pagination.dataset.filter;
  const page = +pagination.dataset.page;
  const total = +pagination.dataset.total;
  const pages = paginate(page, total);
  
  let elements = "";
  
  for (let page of pages) {
    if (String(page).includes("...")) {
      elements += `<span>${page}</span>`;
    } else {
          if (filter) {
                 elements += `<a href="?page=${page}&filter=${filter}">${page}</a>`;
          } else {
              elements += `<a href="?page=${page}">${page}</a>`;
            }
      }
  }
  pagination.innerHTML = elements;
  
  }

const pagination = document.querySelector(".pagination")
  
if(pagination){
      createPagination(pagination)
  }
  
const cards = document.querySelectorAll('.card_link');

for (let i=0; i < cards.length; i++) {
    const recipe = cards[i]
    recipe.addEventListener('click', () => {
        window.location.href = `/admin/recipes/${i}`
    })
}

const PhotosUpload = {
    input: "",
    preview: document.querySelector('#photos-preview'),
    uploadLimit: 5,
    files: [], 
    handleFileInput(event){
        const { files: fileList } = event.target
        PhotosUpload.input = event.target

        if (PhotosUpload.hasLimit(event)) return

        Array.from(fileList).forEach(file =>{
            
            PhotosUpload.files.push(file)
            
            const reader = new FileReader()

            reader.onload = ()=> {
                const image = new Image()
                image.src = String(reader.result)

                const div = PhotosUpload.getContainer(image)
                
                PhotosUpload.preview.appendChild(div)
            }
            reader.readAsDataURL(file)
        })

        PhotosUpload.input.files = PhotosUpload.getAllFiles()
    },
    hasLimit(event){
        const { uploadLimit, input, preview } = PhotosUpload
        const {files: fileList } = input
        if (fileList.length > uploadLimit){
            alert(`Envie no máximo ${uploadLimit} fotos`)
            event.preventDefault()
            return true
        }

        const photosDiv = []
        preview.childNodes.forEach(item => {
            if(item.classList && item.classList.value == "photo")
            photosDiv.push(item)
        })

        const totalPhotos = fileList.length + photosDiv.length
        if(totalPhotos > uploadLimit){
            alert("Você atingiu o limite máximo de fotos.")
            event.preventDefault()
            return true
        }

        return false
    },
    getAllFiles(){
        const dataTransfer = new ClipboardEvent("").clipboardData || new DataTransfer()

        PhotosUpload.files.forEach(file => dataTransfer.items.add(file))

        return dataTransfer.files

    },
    getContainer(image){
        const div = document.createElement('div')
        div.classList.add('photo')

        div.onclick = PhotosUpload.removePhoto

        div.appendChild(image)

        div.appendChild(PhotosUpload.getRemoveButton())
        return div
    },
    getRemoveButton(){
        const button = document.createElement("i")
        button.classList.add('material-icons')
        button.innerHTML = "close"
        return button
    },
    removePhoto(event) {
        const photoDiv = event.target.parentNode // <div class="photo">
        const photosArray = Array.from(PhotosUpload.preview.children)
        const index = photosArray.indexOf(photoDiv)
            
        PhotosUpload.files.splice(index, 1)
        PhotosUpload.input.files = PhotosUpload.getAllFiles()

        photoDiv.remove();
    },
    removeOldPhoto(event) {
        const photoDiv = event.target.parentNode

        if(photoDiv.id){
            const removedFiles = document.querySelector('input[name="removed_files"]')
            if (removedFiles) {
                removedFiles.value += `${photoDiv.id},`
            }
        }

        photoDiv.remove()
    },
    
}

const ImageGallery = {
  highlight: document.querySelector('.highlight > img'),
  previews: document.querySelectorAll('.gallery-preview img'),
  setImage(e) {
      const { target } = e

      ImageGallery.previews.forEach(preview => preview.classList.remove('active'))
      target.classList.add('active')

      ImageGallery.highlight.src = target.src
      Lightbox.image.src = target.src
  }
}

const Lightbox = {
  target: document.querySelector('.lightbox-target'),
  image: document.querySelector('.lightbox-target img'),
  closeButton: document.querySelector('.lightbox-target a.lightbox-close'),
  open() {
      Lightbox.target.style.opacity = 1
      Lightbox.target.style.top = 0
      Lightbox.target.style.bottom = 0
      Lightbox.closeButton.style.top = 0
  },
  close() {
      Lightbox.target.style.opacity = 0
      Lightbox.target.style.top = "-100%"
      Lightbox.target.style.bottom = "initial"
      Lightbox.closeButton.style.top = "-80px"
  }
}

const showHidesIngredients = document.querySelectorAll('.topic-ingredients')

for (let showHidesIngredient of showHidesIngredients) {
const buttonrecipe = showHidesIngredient.querySelector('h4')
buttonrecipe.addEventListener('click', function (){
  if (buttonrecipe.innerHTML == "Esconder") {
      showHidesIngredient.querySelector('.ingredients').classList.add('hidden');
      buttonrecipe.innerHTML = "Mostrar"
  } else {
      showHidesIngredient.querySelector('.ingredients').classList.remove('hidden');
      buttonrecipe.innerHTML = "Esconder"
  }
})
}

const showHidesPreparations = document.querySelectorAll('.topic-preparation')

for (let showHidesPreparation of showHidesPreparations) {
const buttonPreparation = showHidesPreparation.querySelector('h4')
buttonPreparation.addEventListener('click', function (){
  if (buttonPreparation.innerHTML == "Esconder") {
      showHidesPreparation.querySelector('.preparation').classList.add('hidden');
      buttonPreparation.innerHTML = "Mostrar"
  } else {
      showHidesPreparation.querySelector('.preparation').classList.remove('hidden');
      buttonPreparation.innerHTML = "Esconder"
  }
})
}

const showHidesInformations = document.querySelectorAll('.topic-information')

for (let showHidesInformation of showHidesInformations) {
const buttonInformation = showHidesInformation.querySelector('h4')
buttonInformation.addEventListener('click', function (){
  if (buttonInformation.innerHTML == "Esconder") {
      showHidesInformation.querySelector('.information').classList.add('hidden');
      buttonInformation.innerHTML = "Mostrar"
  } else {
      showHidesInformation.querySelector('.information').classList.remove('hidden');
      buttonInformation.innerHTML = "Esconder"
  }
})
}

function addIngredient() {
const ingredients = document.querySelector("#ingredients");
const fieldContainer = document.querySelectorAll(".ingredients");

const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);

if (newField.children[0].value == "") return false;

newField.children[0].value = "";
ingredients.appendChild(newField);
}

document
.querySelector(".add-ingredient")
.addEventListener("click", addIngredient);

function addPreparation() {
const preparations = document.querySelector("#preparations");
const fieldContainer = document.querySelectorAll(".preparations");

const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);

if (newField.children[0].value == "") return false;

newField.children[0].value = "";
preparations.appendChild(newField);
}

document
.querySelector(".add-preparation")
.addEventListener("click", addPreparation);

const Validate = {
  apply(input, func){
      
      Validate.clearErrors(input)

      let results = Validate[func](input.value) // Mask.formatBRL
      input.value = results.value

      if (results.error)
      Validate.displayError(input, results.error)

  }, 
  displayError(input, error) {
      const div = document.createElement('div')
      div.classList.add('error')
      div.innerHTML = error
      input.parentNode.appendChild(div)        
      input.focus()
  },
  clearErrors(input){
      const errorDiv = input.parentNode.querySelector(".error")
      if (errorDiv)
      errorDiv.remove()
  },
  isEmail(value) {
      let error = null
      const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
       
      if(!value.match(mailFormat))
      error = "Email inválido"

      return {
          error,
          value
      }
  }
  }