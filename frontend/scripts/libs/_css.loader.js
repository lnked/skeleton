document.addEventListener('DOMContentLoaded', () => {
    const styles = [
        '/main.min.css',
        '/vendors.min.css'
    ];

    styles.forEach((path) => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = path;
        document.head.appendChild(link);
    });
});
