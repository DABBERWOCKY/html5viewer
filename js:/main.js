document.getElementById("fileInput").addEventListener("change", handleFiles);

async function handleFiles(event) {
    const files = event.target.files;
    const previewContainer = document.getElementById("previewContainer");
    previewContainer.innerHTML = ""; // Clear existing previews

    for (let file of files) {
        if (file.type !== "application/zip") continue;

        const zip = new JSZip();
        const content = await zip.loadAsync(file);

        const adContainer = document.createElement("div");
        adContainer.classList.add("ad-preview");

        // Extract and display index.html
        let indexHtml = null;
        for (let fileName in content.files) {
            if (fileName.endsWith("index.html")) {
                indexHtml = fileName;
                break;
            }
        }

        if (!indexHtml) {
            adContainer.innerHTML = `<p>Error: No index.html found in ${file.name}</p>`;
        } else {
            const htmlContent = await content.file(indexHtml).async("text");
            const iframe = document.createElement("iframe");
            iframe.srcdoc = htmlContent;
            iframe.width = "300";
            iframe.height = "250";
            adContainer.appendChild(iframe);
        }

        previewContainer.appendChild(adContainer);
    }
}