document.addEventListener('DOMContentLoaded', () => {
    const styles = ['https://i5.walmartimages.com/.../style.css', ...];
    styles.forEach((path) => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = path;
        document.head.appendChild(link);
    });
});
