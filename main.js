var selected_Image = document.getElementById("selected-image")
let selector_position = 0;
var wrapper = document.getElementById("gallery-images")
var pagination_wrapper = document.getElementById("links")
var image_elements = document.getElementsByClassName("gallery-image")
let current_page = 1;
let next_button = document.getElementById("onClickNext")
let back_button = document.getElementById("onClickBack")
let buttons = document.getElementsByClassName('page_buttons')


const images_per_page = 9;



let filenames = [
    "Pictures/mx5-nb.jpg",
    "Pictures/zx4rr.jpg",
    "Pictures/nsr-250r.jpg",
    "Pictures/r45.jpg",
    "Pictures/re-sm.jpg",
    "Pictures/celica-supra.jpg",
    "Pictures/speed-triples.jpg",
    "Pictures/r80-gs.jpg",
    "Pictures/r75.jpg",
    "Pictures/mx5-nc.jpg",
    "Pictures/africa.jpg",
    "Pictures/vmax-1.jpg",
    "Pictures/vmax-2.jpg",
    "Pictures/mrs.jpg",
    "Pictures/mr2-1.jpg",
    "Pictures/mr2-2.jpg",
    "Pictures/supra-5.jpg",
    "Pictures/supra-4.jpg",
    "Pictures/c4.jpg",
    "Pictures/c5.jpg",


]





SetSelectedImage(selector_position)

function DisplayImages(images, wrapper, images_per_page, page) {
    wrapper.innerHTML = ""
    page--
    let start = images_per_page * page
    let end = start + images_per_page
    let image_elements = images.slice(start, end)

    for (let i = 0; i < image_elements.length; i++) {
        let current_item =  image_elements[i]
        let item_element = document.createElement('img')
        item_element.classList.add('gallery-image')
        item_element.src = current_item
        item_element.addEventListener('click', function () {
            selector_position = i
            SetSelectedImage(i)
        })
        wrapper.appendChild(item_element)
    }
}

function SetupPagination(items, wrapper, images_per_page) {
    wrapper.innerHTML = ""
    let page_count = Math.ceil(items.length / images_per_page);
    for (let i = 1; i < page_count + 1; i++) {
        let btn = PaginationButton(i, items)
        wrapper.appendChild(btn)
    }
}

function PaginationButton(page,images) {
    let button = document.createElement('button')
    button.innerText = page
    button.classList.add('page_buttons')

    if (current_page == page) {
        button.classList.add('active')
        
    }
    button.addEventListener('click', function () {
        current_page = page
        DisplayImages(images, wrapper, images_per_page, page)
        let current_btn = document.querySelector('button.active')
        current_btn.classList.remove('active');

        button.classList.add('active')
    })
    return button;
}

function SetSelectedImage(position) {
    console.log(position)
    

    if (position > images_per_page -1 ) {
        selector_position = 0;
        current_page++
        
        //document.querySelector('button.active').classList.remove('active');
        //buttons[current_page].classList.add('active')
        

        DisplayImages(filenames, wrapper, images_per_page, current_page)
        selected_Image.src = image_elements[selector_position].src
    }
   
    else if (position < 0) {
        selector_position = 8;
        current_page--

        document.querySelector('button.active').classList.remove('active');
        buttons[current_page].classList.add('active')
        console.log(buttons[current_page])

        DisplayImages(filenames, wrapper, images_per_page, current_page)
        selected_Image.src = image_elements[selector_position].src
    }
    else
    {
       selected_Image.src = image_elements[position].src
    }
    
    if (selected_Image.src.trim().split('/').pop() == filenames[filenames.length - 1].trim().split('/').pop()) {
        next_button.style.visibility = "hidden"
        
    }
    else  {

        next_button.style.visibility = "visible"

    }
    if (selected_Image.src.trim().split('/').pop() == filenames[0].trim().split('/').pop()) {
        back_button.style.visibility = "hidden"
       
    }
    else {

        back_button.style.visibility = "visible"

    }
    
    

}

next_button.addEventListener('click', function () {
    selector_position++
    SetSelectedImage(selector_position)
})
back_button.addEventListener('click', function () {
    selector_position--
    SetSelectedImage(selector_position)
})


DisplayImages(filenames, wrapper, images_per_page, current_page)


SetupPagination(filenames, pagination_wrapper, images_per_page)
SetSelectedImage(0)



