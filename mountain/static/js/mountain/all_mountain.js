const goMountainPage = (e) => {
    const id = e.target.parentElement.dataset.id;
    location.href = `/mountains_detail/${id}`;
};

const afterMeetObserver = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            let imgElement = entry.target;
            imgElement.setAttribute('src', imgElement.dataset.src);
            observer.unobserve(imgElement);
        }
    })
}

const imageObserveSetting = () => {
    const intersectionObserverOptions = {
        root: null,
        rootMargin: '500px',
        threshold: 0
    }
    observer = new IntersectionObserver(afterMeetObserver, intersectionObserverOptions);
    let imgs = document.querySelectorAll('.image-wrapper > img');
    imgs.forEach(img => {
        observer.observe(img);
    })
}

const showTheResionMountains = (e) => {
    const region = e.target.nextElementSibling.textContent;
    document.querySelectorAll('.image-wrapper').forEach(mtImage => {
        if (region === '전체 산') {
            mtImage.classList.remove('hide');
            return;
        }

        if (mtImage.dataset.region != region) {
            mtImage.classList.add('hide');
        } else {
            mtImage.classList.remove('hide');
        }
    })
}

// 실행부
document.querySelectorAll('.image-wrapper').forEach(mountainImg => {
    mountainImg.addEventListener('click', goMountainPage);
})

document.querySelectorAll('input[name="btnradio"]').forEach(regionBtn => {
    regionBtn.addEventListener('click', showTheResionMountains);
})

let observer;
document.addEventListener("DOMContentLoaded", function () {
    imageObserveSetting();
});