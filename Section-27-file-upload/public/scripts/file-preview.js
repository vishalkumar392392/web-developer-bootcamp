const filePickerImage = document.getElementById("image");
const imagePreview = document.getElementById("image-preview");

function showImage() {
  const files = filePickerImage.files;
  if (!files || files.length === 0) return;

  const pickedFile = files[0];
  console.log(pickedFile);
  imagePreview.src = URL.createObjectURL(pickedFile);
  imagePreview.style.display = 'block';
}

filePickerImage.addEventListener("change", showImage);
