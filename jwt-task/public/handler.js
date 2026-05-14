function foo() {
    const token = sessionStorage.getItem('token');
    if(token) {
        window.location.href = '/dashboard.html';
    }
}