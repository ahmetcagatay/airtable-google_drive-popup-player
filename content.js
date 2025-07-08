document.addEventListener("mouseover", (event) => {
    const target = event.target;

    if (target.tagName.toLowerCase() === "a") {
        const url = target.href;

        if (url.includes("drive.google.com/file/")) {
            checkAndPlayVideo(url, target);
        }
    }
});

function checkAndPlayVideo(url, anchorElement) {
    const fileId = extractDriveFileId(url);
    if (!fileId) return;

    const iframe = document.createElement("iframe");
    iframe.style.position = "absolute";
    iframe.style.width = "300px";
    iframe.style.height = "480px";
    iframe.style.border = "1px solid #ccc";
    iframe.style.zIndex = 9999;

    const rect = anchorElement.getBoundingClientRect();
    const iframeHeight = 480;
    const viewportHeight = window.innerHeight;

    let topPosition = rect.bottom + window.scrollY;
    let leftPosition = rect.left + window.scrollX;

    if (rect.bottom + iframeHeight > viewportHeight) {
        topPosition = rect.top + window.scrollY - iframeHeight;
    }

    iframe.style.top = `${topPosition}px`;
    iframe.style.left = `${leftPosition}px`;
    iframe.allow = "autoplay";

    iframe.src = `https://drive.google.com/file/d/${fileId}/preview`;
    document.body.appendChild(iframe);

    setTimeout(() => {
        const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true, view: window });
        iframe.contentWindow.document.body.dispatchEvent(clickEvent);
    }, 500);

    let isHovering = true;

    anchorElement.addEventListener("mouseleave", () => {
        isHovering = false;
        setTimeout(() => {
            if (!isHovering) iframe.remove();
        }, 200);
    });

    iframe.addEventListener("mouseenter", () => {
        isHovering = true;
    });

    iframe.addEventListener("mouseleave", () => {
        isHovering = false;
        setTimeout(() => {
            if (!isHovering) iframe.remove();
        }, 200);
    });
}

function extractDriveFileId(url) {
    const match = url.match(/\/d\/(.*?)\//);
    return match ? match[1] : null;
}
