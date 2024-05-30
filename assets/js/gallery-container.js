document.addEventListener("DOMContentLoaded", function() {
    var imageList = [
        "img_1.webp", "img_2.webp", "img_3.webp",
        "img_4.webp", "img_5.webp", "img_6.webp",
        "img_7.webp", "img_8.webp", "img_9.webp",
        "img_10.webp", "img_11.webp", "img_12.webp",
        "img_14.webp", "img_15.webp", "img_16.webp",
        "img_17.webp", "img_18.webp", "img_19.webp"
    ];

    var container = document.getElementById('image-container');
    var modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    var modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    var closeModal = document.createElement('span');
    closeModal.className = 'close-modal';
    closeModal.innerHTML = '&times;';
    modalContent.appendChild(closeModal);
    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);

    imageList.forEach(function(imageFileName) {
        var imgElement = document.createElement('img');
        imgElement.src = `assets/img/portfolio/03/${imageFileName}`;
        imgElement.style.width = '370px';  // Establece el ancho de la imagen
        imgElement.style.height = '370px'; // Establece el alto de la imagen
        imgElement.style.objectFit = 'cover';  // Asegura que la imagen se recorte para ajustarse al tamaño, no se deforme
        imgElement.style.cursor = 'pointer';
        container.appendChild(imgElement);
    });

    var currentIndex = 0;

    function updateImage(index) {
        const imgTag = modalContent.querySelector('img') || document.createElement('img');
        imgTag.src = `assets/img/portfolio/03/${imageList[index]}`;
        if (!modalContent.contains(imgTag)) {
            modalContent.appendChild(imgTag);
        }
    }

    container.addEventListener('click', function(e) {
        if (e.target.tagName === 'IMG') {
            currentIndex = imageList.indexOf(e.target.src.split('/').pop());
            modalOverlay.style.display = 'flex';
            modalContent.innerHTML = `<img src="${e.target.src}" alt="Zoomed Image">` + closeModal.outerHTML;
        }
    });

    closeModal.addEventListener('click', function() {
        modalOverlay.style.display = 'none';
        modalContent.innerHTML = closeModal.outerHTML;
    });

    window.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modalOverlay.style.display = 'none';
            modalContent.innerHTML = closeModal.outerHTML;
        } else if (e.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % imageList.length;
            updateImage(currentIndex);
        } else if (e.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + imageList.length) % imageList.length;
            updateImage(currentIndex);
        }
    });

    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            modalOverlay.style.display = 'none';
            modalContent.innerHTML = closeModal.outerHTML;
        }
    });

    modalOverlay.addEventListener('wheel', function(e) {
        e.preventDefault();
        if (e.deltaY < 0) {
            currentIndex = (currentIndex - 1 + imageList.length) % imageList.length;
        } else {
            currentIndex = (currentIndex + 1) % imageList.length;
        }
        updateImage(currentIndex);
    });
});
